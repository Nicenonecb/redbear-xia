import Phaser from 'phaser';
import { MoveRunner } from '../../combat/MoveRunner';
import { inRange, type HitSpec, type MoveDef, type MoveEvent } from '../../combat/moveTable';
import { keepInside, type WalkableMap } from '../walkable';
import { GROUND_SQUASH, areaOf, dirTo, inArea, type Vec } from './ground';

/** 被打飞时往上抛的重力（像素/秒²）：招式表里击退的 y 分量在地图上变成"弹起来多高" */
const GRAVITY = 1800;

/** 地图上能被打中的东西：主角、山贼、胖虎、木人桩 */
export interface MapHurtable {
  /** 脚下的位置 */
  readonly pos: Vec;
  /** 脚下圆的半径：判定、互相挤开都用它 */
  readonly radius: number;
  /** 身高：伤害数字、溅墨出在哪里 */
  readonly height: number;
  readonly invulnerable?: boolean;
  /** dir：攻击的方向（单位向量，从攻击者指向自己） */
  takeHit(hit: HitSpec, dir: Vec): void;
}

export interface MapHitResult {
  target: MapHurtable;
  hit: HitSpec;
}

/**
 * 地图上主角和敌人共用的部分（斜俯视版的 Actor）：脚下的位置和速度、面向（八个方向里任意一个）、
 * 按招式表播放招式、扇形判定、顿帧、被打飞弹起。
 * 招式表还是横版那一套：位移段的 vx 沿面向走，击退的 x 沿攻击方向推开、y 变成往上弹。
 * 逻辑按固定 60 帧推进，不用 Arcade 物理；走出能走的范围就推回来（见 walkable.ts）。
 */
export abstract class MapActor implements MapHurtable {
  readonly runner = new MoveRunner();
  /** 招式事件（音效、特效、放飞行道具），监听 'move' */
  readonly events = new Phaser.Events.EventEmitter();
  readonly pos: Vec;
  vel: Vec = { x: 0, y: 0 };
  /** 离地多高（被打飞时）和往上的速度 */
  z = 0;
  vz = 0;
  /** 面向：单位向量 */
  facing: Vec = { x: 0, y: 1 };
  hp: number;
  /** 受击闪白剩余帧数，给画面用 */
  flash = 0;
  /** 伤害倍率：武器、升级都乘在这里 */
  damageScale = 1;

  private hitstop = 0;
  private frozenVelocity: Vec = { x: 0, y: 0 };

  constructor(
    x: number,
    y: number,
    public radius: number,
    public height: number,
    public maxHp: number,
    protected readonly walk: WalkableMap,
  ) {
    this.pos = { x, y };
    this.hp = maxHp;
  }

  get dead() {
    return this.hp <= 0;
  }

  get grounded() {
    return this.z <= 0;
  }

  /** 正在顿帧（画面上抖一抖） */
  get frozen() {
    return this.hitstop > 0;
  }

  /** 招式自带的无敌帧（闪避） */
  get evading() {
    return !!this.runner.move && inRange(this.runner.frame, this.runner.move.invuln);
  }

  get invulnerable() {
    return this.evading;
  }

  /** 当前招式正在生效的判定扇形 */
  activeArea() {
    const hit = this.runner.move?.hit;
    if (!hit || this.runner.phase !== 'active') return null;
    return areaOf(hit);
  }

  /** 用当前招式的判定打 targets，命中就结算并顿帧。击退方向从自己指向对方 */
  resolveHits(targets: MapHurtable[]): MapHitResult[] {
    const area = this.activeArea();
    const spec = this.runner.move?.hit;
    if (!area || !spec) return [];
    const hit = { ...spec, damage: Math.round(spec.damage * this.damageScale) };
    const results: MapHitResult[] = [];
    for (const t of targets) {
      if (t === this || t.invulnerable || this.runner.hitTargets.has(t)) continue;
      if (!inArea(this.pos, this.facing, area, t.pos, t.radius)) continue;
      this.runner.hitTargets.add(t);
      t.takeHit(hit, dirTo(this.pos, t.pos, this.facing));
      this.freeze(hit.hitstop);
      results.push({ target: t, hit });
    }
    return results;
  }

  abstract takeHit(hit: HitSpec, dir: Vec): void;

  /** 被打中：往攻击方向推开，往上弹起来 */
  protected knockBack(hit: HitSpec, dir: Vec) {
    this.vel = { x: dir.x * hit.knockback.x, y: dir.y * hit.knockback.x };
    if (hit.knockback.y < 0) this.vz = -hit.knockback.y * 0.6;
  }

  /** 顿帧：定住若干逻辑帧，结束后恢复原来的速度 */
  freeze(frames: number) {
    if (this.hitstop === 0) this.frozenVelocity = { ...this.vel };
    this.hitstop = Math.max(this.hitstop, frames);
    this.vel = { x: 0, y: 0 };
  }

  /** 每个逻辑帧开头调用。顿帧中返回 false，这一帧什么都不做 */
  protected beginTick() {
    if (this.flash > 0) this.flash--;
    if (this.hitstop <= 0) return true;
    if (--this.hitstop === 0) this.vel = { ...this.frozenVelocity };
    return false;
  }

  protected startMove(move: MoveDef, charge = 0) {
    this.emit(this.runner.start(move, charge));
  }

  protected advanceMove() {
    this.emit(this.runner.advance());
  }

  /** 按招式表的位移段沿面向设置速度；没有位移段就站定出招 */
  protected applyMoveMotion() {
    const { move, frame } = this.runner;
    if (!move) return;
    const seg = move.motion?.find((s) => inRange(frame, s));
    const speed = seg?.vx ?? 0;
    this.vel = { x: this.facing.x * speed, y: this.facing.y * speed };
  }

  /** 每个逻辑帧最后调用：按速度走一步（出界推回），被打飞的往下落 */
  protected integrate() {
    if (this.hitstop > 0) return;
    const next = keepInside(this.walk, { x: this.pos.x + this.vel.x / 60, y: this.pos.y + this.vel.y / 60 });
    this.pos.x = next.x;
    this.pos.y = next.y;
    if (this.z > 0 || this.vz > 0) {
      this.vz -= GRAVITY / 60;
      this.z = Math.max(0, this.z + this.vz / 60);
      if (this.z === 0) this.vz = 0;
    }
  }

  /** 和别的东西挤开（脚下的圆不重叠）；solid 不动，只推自己 */
  pushOutOf(solid: { pos: Vec; radius: number }) {
    // 在地面上量（竖直方向拉回去），推开以后再压扁回画面
    const dx = this.pos.x - solid.pos.x;
    const dy = (this.pos.y - solid.pos.y) / GROUND_SQUASH;
    const d = Math.hypot(dx, dy);
    const min = this.radius + solid.radius;
    if (d >= min) return;
    const n = d > 1e-6 ? { x: dx / d, y: dy / d } : { x: -this.facing.x, y: -this.facing.y };
    const next = keepInside(this.walk, { x: solid.pos.x + n.x * min, y: solid.pos.y + n.y * min * GROUND_SQUASH });
    this.pos.x = next.x;
    this.pos.y = next.y;
  }

  private emit(events: MoveEvent[]) {
    for (const e of events) this.events.emit('move', e, this);
  }
}
