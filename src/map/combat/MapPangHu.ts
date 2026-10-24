import Phaser from 'phaser';
import { PANGHU } from '../../characters/pangHu';
import type { HitSpec } from '../../combat/moveTable';
import type { PangHuStage } from '../../entities/PangHu';
import type { WalkableMap } from '../walkable';
import { dirTo, groundDist, normalize, type Vec } from './ground';
import { MapActor } from './MapActor';
import type { MapFighter } from './MapFighter';

/** 人形、猛虎脚下的圆有多大 */
const HUMAN_RADIUS = 34;
const TIGER_RADIUS = 52;
/** 扑击腾空的往上速度：配合 MapActor 的重力，在空中大约 0.67 秒，落地时判定还没结束 */
const LEAP_VZ = 600;
/** 被打飞时往上抛的重力，要和 MapActor 里的一致，算落点用 */
const GRAVITY = 1800;

/**
 * 地图上的第一关 Boss 胖虎（斜俯视版的 PangHu）。人形用大刀（冲锋劈砍、震地），半血变身猛虎（扑击、虎爪连挥、虎啸）。
 * 霸体：挨打只闪白、顿帧，不会被打断。地图上任何方向都能来：
 * 冲锋劈砍起手那一刻锁定方向，地上沿这个方向亮一道红线；扑击起手锁定主角脚下的落点，亮一个红圈。
 * 事件：'move' 招式事件、'transform' 开始变身、'roar' 仰天长啸、'wrap' 墨气卷起来、'burst' 水墨炸开化虎、'defeated' 被打败。
 */
export class MapPangHu extends MapActor {
  stage: PangHuStage = 'intro';
  stageFrame = 0;
  form: 'human' | 'tiger' = 'human';
  /** 扑击锁定的落点 */
  aim: Vec = { x: 0, y: 0 };
  private cooldown = 30;
  private pendingTransform = false;
  private landed = false;
  private readonly rng = new Phaser.Math.RandomDataGenerator(['panghu']);

  constructor(
    x: number,
    y: number,
    private readonly target: MapFighter,
    walk: WalkableMap,
  ) {
    super(x, y, HUMAN_RADIUS, 200, PANGHU.hp, walk);
  }

  override get invulnerable() {
    return this.stage !== 'fight' && this.stage !== 'tiger';
  }

  /** 扑击只在落地那一下打 */
  override activeArea() {
    const m = this.runner.move;
    if (m?.id === 'pounce' && !this.landed) return null;
    return super.activeArea();
  }

  get distToTarget() {
    return groundDist(this.target.pos.x - this.pos.x, this.target.pos.y - this.pos.y);
  }

  startFight() {
    if (this.stage === 'intro') this.setStage('fight');
  }

  yieldPath() {
    this.runner.stop();
    this.pendingTransform = false;
    this.setStage('yield');
  }

  takeHit(hit: HitSpec) {
    if (this.invulnerable) return;
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
    // 还在山寨里等着：一步也不挪。不然路上打遭遇战时竹篱合上的那一圈会把他也"推回圈里"，
    // 胖虎就被一路拖进每一场遭遇战、站在那儿不走了
    if (this.stage === 'intro') {
      this.vel = { x: 0, y: 0 };
      return;
    }
    if (this.stage === 'fight' || this.stage === 'tiger') this.fight();
    else if (this.stage === 'transform') this.transform();
    else this.vel = { x: 0, y: 0 };
    this.integrate();
  }

  private fight() {
    if (this.pendingTransform && this.runner.phase !== 'active') {
      this.pendingTransform = false;
      this.runner.stop();
      this.vel = { x: 0, y: 0 };
      this.setStage('transform');
      this.events.emit('transform');
      return;
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
    const dist = this.distToTarget;
    const next = --this.cooldown <= 0 && !this.target.dead ? this.choose(dist) : undefined;
    if (next) return this.begin(next);

    const [speed, keep] =
      this.form === 'human'
        ? [PANGHU.walkSpeed, PANGHU.attackRange - 40]
        : [PANGHU.tiger.walkSpeed, PANGHU.tiger.clawRange + 40];
    const s = dist > keep ? speed : 0;
    this.vel = { x: this.facing.x * s, y: this.facing.y * s };
  }

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
    if (id === 'pounce') {
      this.aim = { ...this.target.pos };
      this.landed = false;
    }
    this.startMove(PANGHU.moves[id]);
    this.applyMoveMotion();
  }

  private stepMove() {
    this.advanceMove();
    const { move, frame } = this.runner;
    if (!move) return;
    if (move.id !== 'pounce' || frame < move.startup) return this.applyMoveMotion();
    if (frame === move.startup) return this.leap();
    // 落地那一帧起判定生效，之后滑一小段停下
    if (this.grounded && this.vz === 0) {
      if (!this.landed) this.events.emit('land', this);
      this.landed = true;
      this.vel = { x: this.vel.x * 0.75, y: this.vel.y * 0.75 };
    }
  }

  /** 按红圈位置算起跳速度，正好落在红圈上 */
  private leap() {
    const t = PANGHU.tiger;
    const airtime = (2 * LEAP_VZ) / GRAVITY;
    let vx = (this.aim.x - this.pos.x) / airtime;
    let vy = (this.aim.y - this.pos.y) / airtime;
    const sp = Math.hypot(vx, vy);
    if (sp > t.maxLeapSpeedX) {
      vx *= t.maxLeapSpeedX / sp;
      vy *= t.maxLeapSpeedX / sp;
    }
    this.vel = { x: vx, y: vy };
    this.vz = LEAP_VZ;
    this.z = 0.01;
  }

  private transform() {
    this.vel = { x: 0, y: 0 };
    const t = PANGHU.transform;
    if (this.stageFrame === t.roarAt) this.events.emit('roar');
    if (this.stageFrame === t.wrapAt) this.events.emit('wrap');
    if (this.stageFrame === t.burstAt) {
      this.form = 'tiger';
      this.radius = TIGER_RADIUS;
      this.height = 150;
      this.events.emit('burst');
    }
    if (this.stageFrame >= t.end) this.setStage('tiger');
  }

  private faceTarget() {
    this.facing = normalize(dirTo(this.pos, this.target.pos, this.facing));
  }

  private setStage(stage: PangHuStage) {
    this.stage = stage;
    this.stageFrame = 0;
  }
}
