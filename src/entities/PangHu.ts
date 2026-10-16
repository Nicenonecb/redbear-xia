import Phaser from 'phaser';
import { PANGHU } from '../characters/pangHu';
import type { HitSpec } from '../combat/moveTable';
import { Actor } from './Actor';
import type { Fighter } from './Fighter';

export type PangHuStage = 'intro' | 'fight' | 'transform' | 'tiger' | 'defeated';

/**
 * 第一关 Boss 胖虎。人形用大刀（冲锋劈砍、震地），半血变身猛虎（扑击、虎爪连挥、虎啸）。
 * 霸体：挨打只闪白、顿帧，不会被打断。
 * 事件：'move' 招式事件、'transform' 开始变身、'roar' 仰天长啸、'burst' 水墨炸开化虎、'defeated' 被打败。
 */
export class PangHu extends Actor {
  stage: PangHuStage = 'intro';
  /** 当前阶段已经过了多少帧，变身演出按它排时间 */
  stageFrame = 0;
  form: 'human' | 'tiger' = 'human';
  /** 扑击锁定的落点，地上的红圈画在这里 */
  aimX = 0;
  private cooldown = 30;
  private pendingTransform = false;
  private readonly rng = new Phaser.Math.RandomDataGenerator(['panghu']);

  constructor(
    scene: Phaser.Scene,
    x: number,
    feetY: number,
    private readonly target: Fighter,
  ) {
    super(scene, x, feetY, PANGHU.body, PANGHU.hp);
    this.facing = -1;
    this.body.pushable = false;
  }

  /** 开场白没念完、变身演出中都打不动 */
  override get invulnerable() {
    return this.stage !== 'fight' && this.stage !== 'tiger';
  }

  override hurtbox() {
    if (this.form === 'human') return super.hurtbox();
    return new Phaser.Geom.Rectangle(this.x - 70, this.feetY - 80, 140, 80);
  }

  startFight() {
    if (this.stage === 'intro') this.setStage('fight');
  }

  takeHit(hit: HitSpec) {
    if (this.invulnerable) return;
    // 人形最多打到剩 1 点，一定会先变身
    this.hp = Math.max(this.form === 'human' ? 1 : 0, this.hp - hit.damage);
    this.flash = hit.hitstop + 3;
    this.freeze(hit.hitstop);
    if (this.form === 'human' && this.hp <= this.maxHp * PANGHU.transformAt) this.pendingTransform = true;
    if (this.dead) {
      this.runner.stop();
      this.setStage('defeated');
      this.events.emit('defeated');
    }
  }

  tick() {
    if (!this.beginTick()) return;
    this.stageFrame++;
    if (this.stage === 'fight' || this.stage === 'tiger') this.fight();
    else if (this.stage === 'transform') this.transform();
    else this.stand();
  }

  private fight() {
    // 判定帧打完再变身，不会半路吞掉已经出手的刀
    if (this.pendingTransform && this.runner.phase !== 'active') {
      this.pendingTransform = false;
      this.runner.stop();
      this.setStage('transform');
      this.events.emit('transform');
      return this.stand();
    }

    const current = this.runner.move;
    if (current) {
      this.stepMove();
      if (this.runner.move) return;
      if (current.followUp) return this.begin(current.followUp);
      const cd = this.form === 'human' ? PANGHU.cooldown : PANGHU.tiger.cooldown;
      this.cooldown = this.rng.between(cd.min, cd.max);
    }

    this.faceTarget();
    const dist = Math.abs(this.target.x - this.x);
    const next = --this.cooldown <= 0 && !this.target.dead ? this.choose(dist) : undefined;
    if (next) return this.begin(next);

    // 够不着就往前走
    const [speed, keep] =
      this.form === 'human'
        ? [PANGHU.walkSpeed, PANGHU.attackRange - 40]
        : [PANGHU.tiger.walkSpeed, PANGHU.tiger.clawRange + 40];
    this.body.setAllowGravity(true);
    this.body.setVelocityX(dist > keep ? speed * this.facing : 0);
  }

  /** 这一刻出哪一招；返回 undefined 表示先走近 */
  private choose(dist: number) {
    if (this.form === 'human') {
      if (dist > PANGHU.attackRange) return undefined;
      return dist > PANGHU.chargeRange || this.rng.frac() < 0.3 ? 'chargeChop' : 'slam';
    }
    const t = PANGHU.tiger;
    if (dist > t.pounceRange) return 'pounce';
    if (dist < t.clawRange) return this.rng.frac() < 0.6 ? 'claw1' : 'roar';
    return this.rng.frac() < 0.5 ? 'pounce' : 'roar';
  }

  private begin(id: string) {
    this.faceTarget();
    // 扑击在起手这一刻锁定落点，红圈画在这里
    if (id === 'pounce') this.aimX = this.target.x;
    this.startMove(PANGHU.moves[id]);
    this.applyMoveMotion();
  }

  private stepMove() {
    this.advanceMove();
    const { move, frame } = this.runner;
    if (!move) return;
    if (move.id !== 'pounce' || frame < move.startup) return this.applyMoveMotion();
    // 扑击：判定开始那一帧起跳，之后交给重力，落地后滑一小段
    if (frame === move.startup) return this.leap();
    this.body.setAllowGravity(true);
    if (this.grounded) this.body.setVelocityX(this.body.velocity.x * 0.75);
  }

  /** 按红圈位置算起跳速度，正好落在红圈上 */
  private leap() {
    const t = PANGHU.tiger;
    const airtime = (2 * t.leapSpeed) / this.body.world.gravity.y;
    const vx = Phaser.Math.Clamp((this.aimX - this.x) / airtime, -t.maxLeapSpeedX, t.maxLeapSpeedX);
    this.body.setAllowGravity(true);
    this.body.setVelocity(vx, -t.leapSpeed);
  }

  private transform() {
    this.stand();
    const t = PANGHU.transform;
    if (this.stageFrame === t.roarAt) this.events.emit('roar');
    if (this.stageFrame === t.burstAt) {
      this.form = 'tiger';
      this.events.emit('burst');
    }
    if (this.stageFrame >= t.end) this.setStage('tiger');
  }

  private stand() {
    this.body.setAllowGravity(true);
    this.body.setVelocityX(0);
  }

  private faceTarget() {
    this.facing = this.target.x >= this.x ? 1 : -1;
  }

  private setStage(stage: PangHuStage) {
    this.stage = stage;
    this.stageFrame = 0;
  }
}
