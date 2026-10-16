import Phaser from 'phaser';
import type { HitResult, Hurtable } from '../combat/hitbox';
import type { Action, Controls } from '../input/Controls';
import { InputBuffer } from '../combat/InputBuffer';
import { inRange, type CharacterDef, type HitSpec, type MoveId } from '../combat/moveTable';
import { Actor } from './Actor';

/** 受击硬直结束后，再保护多少帧不会被连着打 */
const MERCY_FRAMES = 50;

/** 由一局的成长算出来的属性，见 game/run.ts 的 runStats */
export interface FighterStats {
  hp: number;
  maxHp: number;
  damageScale: number;
  speedScale: number;
  /** 闪避无敌帧额外延长几帧 */
  evadeBonus: number;
}

/**
 * 玩家操控的角色。按键先进输入缓冲，再由招式表的起手招和取消窗口决定出哪一招；
 * 帧数、位移、无敌、判定全部来自招式表。
 * 逻辑按固定 60 帧推进（tick），画面由各角色自己的 View 读取状态来画。
 * 事件：'move' 招式事件、'dead' 气血打空、'rescue' 红熊该出手了（见 rescueBelow）。
 */
export class Fighter extends Actor {
  readonly buffer = new InputBuffer();
  /** 受击硬直剩余帧数 */
  hurtFrames = 0;
  /** 受击后的保护帧，期间不会再被打中 */
  mercyFrames = 0;
  /**
   * 红熊救场的气血比例线：被打到这条线以下（包括本该被打死的那一下）就保住 1 点气血、发出 'rescue'。
   * 0 表示这一章已经救过了
   */
  rescueBelow = 0;
  /** 剩余弹药（于无瑕的飞镖），没有弹药系统的角色一直是 0 */
  ammo = 0;
  /** 暂时不能用的按键（掷扇飞在外面时不能挥扇） */
  private readonly locked = new Set<Action>();
  private speedScale = 1;
  private evadeBonus = 0;
  private usedInAir = new Set<MoveId>();

  constructor(
    scene: Phaser.Scene,
    x: number,
    feetY: number,
    readonly def: CharacterDef,
    private readonly controls: Controls,
    stats?: FighterStats,
  ) {
    super(scene, x, feetY, def.body, stats?.maxHp ?? def.hp);
    if (stats) this.applyStats(stats);
    this.ammo = def.ammo?.max ?? 0;
  }

  isLocked(action: Action) {
    return this.locked.has(action);
  }

  lock(action: Action, locked: boolean) {
    if (locked) this.locked.add(action);
    else this.locked.delete(action);
  }

  /** 近战打中会回弹药 */
  override resolveHits(targets: Hurtable[]): HitResult[] {
    const results = super.resolveHits(targets);
    const ammo = this.def.ammo;
    if (ammo && results.length) this.ammo = Math.min(ammo.max, this.ammo + ammo.refillOnMeleeHit * results.length);
    return results;
  }

  /** 换上新的成长属性（进场时、升级后、商店买完东西后） */
  applyStats(stats: FighterStats) {
    this.maxHp = stats.maxHp;
    this.hp = Math.min(stats.hp, stats.maxHp);
    this.damageScale = stats.damageScale;
    this.speedScale = stats.speedScale;
    this.evadeBonus = stats.evadeBonus;
  }

  /** 闪避的无敌帧，身法加点会往后延长 */
  override get evading() {
    const move = this.runner.move;
    if (!move?.invuln) return false;
    return inRange(this.runner.frame, { from: move.invuln.from, to: move.invuln.to + this.evadeBonus });
  }

  override get invulnerable() {
    return this.evading || this.mercyFrames > 0 || this.dead;
  }

  /** 蓄力招的当前蓄力比例，不在蓄力时为 0 */
  get chargeRatio() {
    const hold = this.runner.move?.hold;
    return hold ? Math.min(1, this.runner.heldFrames / hold.fullFrames) : 0;
  }

  takeHit(hit: HitSpec, dir: 1 | -1) {
    if (this.invulnerable) return;
    this.hp = Math.max(0, this.hp - hit.damage);
    if (this.rescueBelow > 0 && this.hp < this.maxHp * this.rescueBelow) {
      this.hp = Math.max(1, this.hp);
      this.rescueBelow = 0;
      this.events.emit('rescue', this);
    }
    this.runner.stop();
    this.hurtFrames = hit.hitstun;
    this.mercyFrames = hit.hitstun + MERCY_FRAMES;
    this.flash = hit.hitstop + 4;
    this.body.setVelocity(hit.knockback.x * dir, hit.knockback.y);
    this.freeze(hit.hitstop);
    if (this.dead) this.events.emit('dead', this);
  }

  tick() {
    if (!this.beginTick()) return;
    if (this.mercyFrames > 0) this.mercyFrames--;

    if (this.dead || this.hurtFrames > 0) {
      if (this.hurtFrames > 0) this.hurtFrames--;
      this.body.setAllowGravity(true);
      if (this.grounded) this.body.setVelocityX(this.body.velocity.x * 0.8);
      this.buffer.age();
      return;
    }
    if (this.grounded) this.usedInAir.clear();

    const current = this.runner.move;
    if (current) {
      const next = this.buffer.consume((a) => this.allow(a, this.runner.cancelInto(a)));
      const hold = current.hold;
      if (next) {
        this.begin(next);
      } else if (hold && this.runner.frame >= current.startup - 1 && !this.controls.isDown(hold.action)) {
        this.begin(hold.release, this.chargeRatio);
      } else {
        if (hold && this.controls.isDown(hold.action)) this.runner.heldFrames++;
        this.advanceMove();
      }
    }

    if (!this.runner.move) {
      const next = this.buffer.consume((a) => this.allow(a, this.def.neutral[a]));
      if (next) this.begin(next);
    }

    if (this.runner.move) this.applyMoveMotion();
    else this.freeMove();

    this.buffer.age();
  }

  private allow(action: Action, id: MoveId | undefined) {
    if (!id || this.locked.has(action)) return undefined;
    if (this.def.ammo?.action === action && this.ammo <= 0) return undefined;
    if (this.def.moves[id].oncePerAir && !this.grounded && this.usedInAir.has(id)) return undefined;
    return id;
  }

  private begin(id: MoveId, charge = 0) {
    const move = this.def.moves[id];
    // 出招瞬间可以按方向键转身
    const dir = this.controls.moveX;
    if (dir) this.facing = dir > 0 ? 1 : -1;
    if (move.oncePerAir && !this.grounded) this.usedInAir.add(id);
    if (this.def.ammo && id === this.def.neutral[this.def.ammo.action]) this.ammo--;
    this.startMove(move, charge);
  }

  private freeMove() {
    const dir = this.controls.moveX;
    this.body.setAllowGravity(true);
    this.body.setVelocityX(dir * this.def.moveSpeed * this.speedScale);
    if (dir) this.facing = dir > 0 ? 1 : -1;
    if (this.grounded && this.buffer.consume((a) => (a === 'jump' ? a : undefined))) {
      this.body.setVelocityY(-this.def.jumpSpeed);
    }
  }
}
