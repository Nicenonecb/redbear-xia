import Phaser from 'phaser';
import type { Controls } from '../input/Controls';
import { InputBuffer } from '../combat/InputBuffer';
import type { CharacterDef, HitSpec, MoveId } from '../combat/moveTable';
import { Actor } from './Actor';

/** 受击硬直结束后，再保护多少帧不会被连着打 */
const MERCY_FRAMES = 50;

/**
 * 玩家操控的角色。按键先进输入缓冲，再由招式表的起手招和取消窗口决定出哪一招；
 * 帧数、位移、无敌、判定全部来自招式表。
 * 逻辑按固定 60 帧推进（tick），画面由各角色自己的 View 读取状态来画。
 * 事件：'move' 招式事件、'dead' 气血打空。
 */
export class Fighter extends Actor {
  readonly buffer = new InputBuffer();
  /** 受击硬直剩余帧数 */
  hurtFrames = 0;
  /** 受击后的保护帧，期间不会再被打中 */
  mercyFrames = 0;
  private usedInAir = new Set<MoveId>();

  constructor(
    scene: Phaser.Scene,
    x: number,
    feetY: number,
    readonly def: CharacterDef,
    private readonly controls: Controls,
  ) {
    super(scene, x, feetY, def.body, def.hp);
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
      const next = this.buffer.consume((a) => this.allow(this.runner.cancelInto(a)));
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
      const next = this.buffer.consume((a) => this.allow(this.def.neutral[a]));
      if (next) this.begin(next);
    }

    if (this.runner.move) this.applyMoveMotion();
    else this.freeMove();

    this.buffer.age();
  }

  private allow(id: MoveId | undefined) {
    if (!id) return undefined;
    if (this.def.moves[id].oncePerAir && !this.grounded && this.usedInAir.has(id)) return undefined;
    return id;
  }

  private begin(id: MoveId, charge = 0) {
    const move = this.def.moves[id];
    // 出招瞬间可以按方向键转身
    const dir = this.controls.moveX;
    if (dir) this.facing = dir > 0 ? 1 : -1;
    if (move.oncePerAir && !this.grounded) this.usedInAir.add(id);
    this.startMove(move, charge);
  }

  private freeMove() {
    const dir = this.controls.moveX;
    this.body.setAllowGravity(true);
    this.body.setVelocityX(dir * this.def.moveSpeed);
    if (dir) this.facing = dir > 0 ? 1 : -1;
    if (this.grounded && this.buffer.consume((a) => (a === 'jump' ? a : undefined))) {
      this.body.setVelocityY(-this.def.jumpSpeed);
    }
  }
}
