import type { Action, Controls } from '../../input/Controls';
import { InputBuffer } from '../../combat/InputBuffer';
import { inRange, type CharacterDef, type HitSpec, type MoveId } from '../../combat/moveTable';
import type { FighterStats } from '../../game/run';
import type { WalkableMap } from '../walkable';
import { normalize, type Vec } from './ground';
import { MapActor, type MapHitResult, type MapHurtable } from './MapActor';

/** 受击硬直结束后，再保护多少帧不会被连着打 */
const MERCY_FRAMES = 50;
/** 地图上主角脚下的圆多大、身高多少 */
const HERO_RADIUS = 18;
const HERO_HEIGHT = 150;

/**
 * 玩家在大地图上操控的角色。
 * 按键先进输入缓冲，再由招式表的起手招和取消窗口决定出哪一招；
 * 不同的是八个方向都能走、都能出招：出招瞬间按着方向键就朝那边出，闪避也朝那边冲。
 * 地图上没有跳。
 * 事件：'move' 招式事件、'dead' 气血打空、'rescue' 红熊该出手了（见 rescueBelow）。
 */
export class MapFighter extends MapActor {
  readonly buffer = new InputBuffer();
  /** 受击硬直剩余帧数 */
  hurtFrames = 0;
  /** 受击后的保护帧，期间不会再被打中 */
  mercyFrames = 0;
  /** 气血低于此比例时触发救场；0 表示本关已使用 */
  rescueBelow = 0;
  /** 剩余弹药（于无瑕的飞镖） */
  ammo = 0;
  onLethal?: () => boolean;
  /** 正在走路（不在出招、不在硬直），给画面用 */
  walking = false;
  private readonly locked = new Set<Action>();
  private speedScale = 1;
  private evadeBonus = 0;

  constructor(
    x: number,
    y: number,
    readonly def: CharacterDef,
    private readonly controls: Controls,
    walk: WalkableMap,
    stats?: FighterStats,
  ) {
    super(x, y, HERO_RADIUS, HERO_HEIGHT, stats?.maxHp ?? def.hp, walk);
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
  override resolveHits(targets: MapHurtable[]): MapHitResult[] {
    const results = super.resolveHits(targets);
    const ammo = this.def.ammo;
    if (ammo && results.length) this.ammo = Math.min(ammo.max, this.ammo + ammo.refillOnMeleeHit * results.length);
    return results;
  }

  applyStats(stats: FighterStats) {
    this.maxHp = stats.maxHp;
    this.hp = Math.min(stats.hp, stats.maxHp);
    this.damageScale = stats.damageScale;
    this.speedScale = stats.speedScale;
    this.evadeBonus = stats.evadeBonus;
  }

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

  takeHit(hit: HitSpec, dir: Vec) {
    if (this.invulnerable) return;
    this.hp = Math.max(0, this.hp - hit.damage);
    const protectedByCharm = this.hp === 0 && this.onLethal?.();
    if (protectedByCharm) {
      this.hp = 1;
      this.mercyFrames = 120;
    }
    if (!protectedByCharm && this.rescueBelow > 0 && this.hp < this.maxHp * this.rescueBelow) {
      this.hp = Math.max(1, this.hp);
      this.rescueBelow = 0;
      this.events.emit('rescue', this);
    }
    this.runner.stop();
    this.hurtFrames = hit.hitstun;
    this.mercyFrames = Math.max(this.mercyFrames, hit.hitstun + MERCY_FRAMES);
    this.flash = hit.hitstop + 4;
    this.knockBack(hit, dir);
    this.freeze(hit.hitstop);
    if (this.dead) this.events.emit('dead', this);
  }

  /** 被推开（胖虎变身炸开的气浪）：不掉血，踉跄一下 */
  shove(dir: Vec, speed: number) {
    this.runner.stop();
    this.vel = { x: dir.x * speed, y: dir.y * speed };
    this.hurtFrames = 16;
  }

  tick() {
    this.walking = false;
    if (!this.beginTick()) return;
    if (this.mercyFrames > 0) this.mercyFrames--;

    if (this.dead || this.hurtFrames > 0) {
      if (this.hurtFrames > 0) this.hurtFrames--;
      this.vel = { x: this.vel.x * 0.85, y: this.vel.y * 0.85 };
      this.buffer.age();
      this.integrate();
      return;
    }

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
        // 蓄力时还能慢慢转向，瞄准了再放
        if (hold) this.turnToInput();
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
    this.integrate();
  }

  /** 方向键现在指着哪边；没按就是 null */
  private inputDir(): Vec | null {
    const x = this.controls.moveX;
    const y = this.controls.moveY;
    return x || y ? normalize({ x, y }) : null;
  }

  private turnToInput() {
    const dir = this.inputDir();
    if (dir) this.facing = dir;
  }

  private allow(action: Action, id: MoveId | undefined) {
    if (!id || this.locked.has(action)) return undefined;
    if (this.def.ammo?.action === action && this.ammo <= 0) return undefined;
    return id;
  }

  private begin(id: MoveId, charge = 0) {
    // 出招瞬间按着方向键就朝那边出
    this.turnToInput();
    if (this.def.ammo && id === this.def.neutral[this.def.ammo.action]) this.ammo--;
    this.startMove(this.def.moves[id], charge);
  }

  private freeMove() {
    const dir = this.inputDir();
    const speed = this.def.moveSpeed * this.speedScale;
    this.vel = dir ? { x: dir.x * speed, y: dir.y * speed } : { x: 0, y: 0 };
    if (dir) {
      this.facing = dir;
      this.walking = true;
    }
  }
}
