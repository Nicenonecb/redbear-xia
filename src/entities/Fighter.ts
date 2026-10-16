import Phaser from 'phaser';
import type { Controls } from '../input/Controls';
import { InputBuffer } from '../combat/InputBuffer';
import { MoveRunner } from '../combat/MoveRunner';
import { inRange, type CharacterDef, type MoveEvent, type MoveId } from '../combat/moveTable';
import { boxToRect, overlaps, type Hurtable } from '../combat/hitbox';

/**
 * 玩家操控的角色。按键先进输入缓冲，再由招式表的起手招和取消窗口决定出哪一招；
 * 帧数、位移、无敌、判定全部来自招式表。
 * 逻辑按固定 60 帧推进（tick），画面由各角色自己的 View 读取状态来画。
 */
export class Fighter {
  readonly runner = new MoveRunner();
  readonly buffer = new InputBuffer();
  /** 招式事件（音效、特效、生成剑气），监听 'move' */
  readonly events = new Phaser.Events.EventEmitter();
  readonly zone: Phaser.GameObjects.Zone;
  readonly body: Phaser.Physics.Arcade.Body;
  facing: 1 | -1 = 1;

  private hitstop = 0;
  private frozenVelocity = { x: 0, y: 0 };
  private usedInAir = new Set<MoveId>();

  constructor(
    scene: Phaser.Scene,
    x: number,
    feetY: number,
    readonly def: CharacterDef,
    private readonly controls: Controls,
  ) {
    this.zone = scene.add.zone(x, feetY - def.body.h / 2, def.body.w, def.body.h);
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

  get invulnerable() {
    return !!this.runner.move && inRange(this.runner.frame, this.runner.move.invuln);
  }

  /** 蓄力招的当前蓄力比例，不在蓄力时为 0 */
  get chargeRatio() {
    const hold = this.runner.move?.hold;
    return hold ? Math.min(1, this.runner.heldFrames / hold.fullFrames) : 0;
  }

  hurtbox() {
    return new Phaser.Geom.Rectangle(this.body.x, this.body.y, this.body.width, this.body.height);
  }

  activeHitbox() {
    const hit = this.runner.move?.hit;
    if (!hit || this.runner.phase !== 'active') return null;
    return boxToRect(hit.box, this.x, this.feetY, this.facing);
  }

  tick() {
    if (this.hitstop > 0) {
      if (--this.hitstop === 0) this.body.setVelocity(this.frozenVelocity.x, this.frozenVelocity.y);
      return;
    }
    if (this.grounded) this.usedInAir.clear();

    const current = this.runner.move;
    if (current) {
      const next = this.buffer.consume((a) => this.allow(this.runner.cancelInto(a)));
      const hold = current.hold;
      if (next) {
        this.startMove(next);
      } else if (hold && this.runner.frame >= current.startup - 1 && !this.controls.isDown(hold.action)) {
        this.startMove(hold.release, this.chargeRatio);
      } else {
        if (hold && this.controls.isDown(hold.action)) this.runner.heldFrames++;
        this.emit(this.runner.advance());
      }
    }

    if (!this.runner.move) {
      const next = this.buffer.consume((a) => this.allow(this.def.neutral[a]));
      if (next) this.startMove(next);
    }

    if (this.runner.move) this.applyMoveMotion();
    else this.freeMove();

    this.buffer.age();
  }

  /** 用当前招式的判定打 targets，命中就结算并顿帧 */
  resolveHits(targets: Hurtable[]) {
    const box = this.activeHitbox();
    const hit = this.runner.move?.hit;
    if (!box || !hit) return;
    for (const t of targets) {
      if (this.runner.hitTargets.has(t) || !overlaps(box, t.hurtbox())) continue;
      this.runner.hitTargets.add(t);
      t.takeHit(hit, this.facing);
      this.freeze(hit.hitstop);
    }
  }

  /** 顿帧：定住若干逻辑帧，结束后恢复原来的速度 */
  freeze(frames: number) {
    if (this.hitstop === 0) this.frozenVelocity = { x: this.body.velocity.x, y: this.body.velocity.y };
    this.hitstop = Math.max(this.hitstop, frames);
    this.body.setVelocity(0, 0);
    this.body.setAllowGravity(false);
  }

  private allow(id: MoveId | undefined) {
    if (!id) return undefined;
    if (this.def.moves[id].oncePerAir && !this.grounded && this.usedInAir.has(id)) return undefined;
    return id;
  }

  private startMove(id: MoveId, charge = 0) {
    const move = this.def.moves[id];
    // 出招瞬间可以按方向键转身
    const dir = this.controls.moveX;
    if (dir) this.facing = dir > 0 ? 1 : -1;
    if (move.oncePerAir && !this.grounded) this.usedInAir.add(id);
    this.emit(this.runner.start(move, charge));
  }

  private applyMoveMotion() {
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

  private freeMove() {
    const dir = this.controls.moveX;
    this.body.setAllowGravity(true);
    this.body.setVelocityX(dir * this.def.moveSpeed);
    if (dir) this.facing = dir > 0 ? 1 : -1;
    if (this.grounded && this.buffer.consume((a) => (a === 'jump' ? a : undefined))) {
      this.body.setVelocityY(-this.def.jumpSpeed);
    }
  }

  private emit(events: MoveEvent[]) {
    for (const e of events) this.events.emit('move', e, this);
  }
}
