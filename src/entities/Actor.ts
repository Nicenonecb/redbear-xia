import Phaser from 'phaser';
import { MoveRunner } from '../combat/MoveRunner';
import { inRange, type HitSpec, type MoveDef, type MoveEvent } from '../combat/moveTable';
import { boxToRect, overlaps, type HitResult, type Hurtable } from '../combat/hitbox';

/**
 * 主角和敌人共用的部分：物理身体、按招式表播放招式、判定、顿帧、气血。
 * 子类决定每帧出哪一招：玩家读输入，敌人跑 AI。
 */
export abstract class Actor implements Hurtable {
  readonly runner = new MoveRunner();
  /** 招式事件（音效、特效、生成飞行道具），监听 'move' */
  readonly events = new Phaser.Events.EventEmitter();
  readonly zone: Phaser.GameObjects.Zone;
  readonly body: Phaser.Physics.Arcade.Body;
  facing: 1 | -1 = 1;
  hp: number;
  /** 受击闪白剩余帧数，给画面用 */
  flash = 0;
  /** 伤害倍率：武器、升级都乘在这里 */
  damageScale = 1;

  private hitstop = 0;
  private frozenVelocity = { x: 0, y: 0 };

  constructor(
    scene: Phaser.Scene,
    x: number,
    feetY: number,
    size: { w: number; h: number },
    public maxHp: number,
  ) {
    this.hp = maxHp;
    this.zone = scene.add.zone(x, feetY - size.h / 2, size.w, size.h);
    scene.physics.add.existing(this.zone);
    this.body = this.zone.body as Phaser.Physics.Arcade.Body;
    this.body.setCollideWorldBounds(true);
  }

  get x() {
    return this.body.center.x;
  }

  get feetY() {
    return this.body.bottom;
  }

  get grounded() {
    return this.body.blocked.down || this.body.touching.down;
  }

  get dead() {
    return this.hp <= 0;
  }

  /** 招式自带的无敌帧（闪避） */
  get evading() {
    return !!this.runner.move && inRange(this.runner.frame, this.runner.move.invuln);
  }

  get invulnerable() {
    return this.evading;
  }

  hurtbox() {
    return new Phaser.Geom.Rectangle(this.body.x, this.body.y, this.body.width, this.body.height);
  }

  activeHitbox() {
    const hit = this.runner.move?.hit;
    if (!hit || this.runner.phase !== 'active') return null;
    return boxToRect(hit.box, this.x, this.feetY, this.facing);
  }

  /** 用当前招式的判定打 targets，命中就结算并顿帧。击退方向朝着远离自己的一侧 */
  resolveHits(targets: Hurtable[]): HitResult[] {
    const box = this.activeHitbox();
    const spec = this.runner.move?.hit;
    if (!box || !spec) return [];
    const hit = { ...spec, damage: Math.round(spec.damage * this.damageScale) };
    const results: HitResult[] = [];
    for (const t of targets) {
      if (t.invulnerable || this.runner.hitTargets.has(t)) continue;
      const hurt = t.hurtbox();
      if (!overlaps(box, hurt)) continue;
      this.runner.hitTargets.add(t);
      t.takeHit(hit, hurt.centerX >= this.x ? 1 : -1);
      this.freeze(hit.hitstop);
      results.push({ target: t, hit });
    }
    return results;
  }

  abstract takeHit(hit: HitSpec, dir: 1 | -1): void;

  /** 顿帧：定住若干逻辑帧，结束后恢复原来的速度 */
  freeze(frames: number) {
    if (this.hitstop === 0) this.frozenVelocity = { x: this.body.velocity.x, y: this.body.velocity.y };
    this.hitstop = Math.max(this.hitstop, frames);
    this.body.setVelocity(0, 0);
    this.body.setAllowGravity(false);
  }

  /** 每个逻辑帧开头调用。顿帧中返回 false，这一帧什么都不做 */
  protected beginTick() {
    if (this.flash > 0) this.flash--;
    if (this.hitstop <= 0) return true;
    if (--this.hitstop === 0) this.body.setVelocity(this.frozenVelocity.x, this.frozenVelocity.y);
    return false;
  }

  protected startMove(move: MoveDef, charge = 0) {
    this.emit(this.runner.start(move, charge));
  }

  protected advanceMove() {
    this.emit(this.runner.advance());
  }

  /** 按招式表的位移段设置速度 */
  protected applyMoveMotion() {
    const { move, frame } = this.runner;
    if (!move) return;
    const floating = inRange(frame, move.noGravity);
    const seg = move.motion?.find((s) => inRange(frame, s));
    this.body.setAllowGravity(!floating);
    if (seg) {
      this.body.setVelocityX(seg.vx * this.facing);
      if (seg.vy !== undefined) this.body.setVelocityY(seg.vy);
    } else if (this.grounded) {
      // 地面出招站定；空中保留一点惯性
      this.body.setVelocityX(0);
    } else {
      this.body.setVelocityX(this.body.velocity.x * 0.88);
    }
    if (floating && seg?.vy === undefined) this.body.setVelocityY(0);
  }

  private emit(events: MoveEvent[]) {
    for (const e of events) this.events.emit('move', e, this);
  }
}
