import Phaser from 'phaser';
import { PANGHU } from '../characters/pangHu';
import type { HitSpec } from '../combat/moveTable';
import { Actor } from './Actor';
import type { Fighter } from './Fighter';

export type PangHuStage = 'intro' | 'fight' | 'transform' | 'tiger' | 'defeated';

/**
 * 第一关 Boss 胖虎。人形用大刀（冲锋劈砍、震地），半血变身猛虎。
 * 霸体：挨打只闪白、顿帧，不会被打断。
 * 事件：'move' 招式事件、'transform' 开始变身、'roar' 仰天长啸、'burst' 水墨炸开化虎、'defeated' 被打败。
 */
export class PangHu extends Actor {
  stage: PangHuStage = 'intro';
  /** 当前阶段已经过了多少帧，变身演出按它排时间 */
  stageFrame = 0;
  form: 'human' | 'tiger' = 'human';
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
    if (this.stage === 'fight') this.fight();
    else if (this.stage === 'transform') this.transform();
    else if (this.stage === 'tiger') this.prowl();
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

    if (this.runner.move) {
      this.advanceMove();
      if (this.runner.move) return this.applyMoveMotion();
      this.cooldown = this.rng.between(PANGHU.cooldown.min, PANGHU.cooldown.max);
    }

    this.faceTarget();
    const dist = Math.abs(this.target.x - this.x);
    if (--this.cooldown <= 0 && dist <= PANGHU.attackRange && !this.target.dead) {
      const id = dist > PANGHU.chargeRange || this.rng.frac() < 0.3 ? 'chargeChop' : 'slam';
      this.startMove(PANGHU.moves[id]);
      return this.applyMoveMotion();
    }
    // 够不着就往前走，走到冲锋能砍到的距离
    this.body.setAllowGravity(true);
    this.body.setVelocityX(dist > PANGHU.attackRange - 40 ? PANGHU.walkSpeed * this.facing : 0);
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

  /** 猛虎形态占位：盯着玩家来回踱步，招式明天接上 */
  private prowl() {
    this.faceTarget();
    const dist = Math.abs(this.target.x - this.x);
    const speed = PANGHU.tiger.walkSpeed;
    this.body.setAllowGravity(true);
    this.body.setVelocityX(dist > 300 ? speed * this.facing : dist < 160 ? -speed * 0.6 * this.facing : 0);
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
