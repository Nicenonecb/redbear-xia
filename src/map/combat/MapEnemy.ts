import Phaser from 'phaser';
import type { EnemyDef, HitSpec, MoveId } from '../../combat/moveTable';
import type { WalkableMap } from '../walkable';
import { dirTo, groundDist, normalize, type Vec } from './ground';
import { MapActor } from './MapActor';
import type { MapFighter } from './MapFighter';

/** 倒地后留多少帧再消失（画面上是化成墨散掉） */
const DEATH_FRAMES = 40;
/** 主角走到这么近（地面距离），守在路上的山贼才动手 */
const AGGRO_RANGE = 460;

/**
 * 地图上的普通敌人（小怪、大怪），斜俯视版的 Enemy。行为全由 EnemyDef 决定：
 * 守在原地，主角走近了（或者挨了打）才动手；动起手来保持在想要的距离上，
 * 冷却好了就从出招列表里按权重挑一招，出招那一刻朝向主角、之后方向就定死了（看准了能躲）。
 * 小怪挨打会被打断、击退；大怪有霸体。
 * 事件：'move' 招式事件、'dead' 被打倒、'aggro' 发现主角。
 */
export class MapEnemy extends MapActor {
  hurtFrames = 0;
  deathFrames = 0;
  /** 发现主角了没有 */
  aggro = false;
  private cooldown: number;
  private readonly rng: Phaser.Math.RandomDataGenerator;
  /** 绕着主角站位时偏左还是偏右，几个人不会排成一条线 */
  private readonly flank: number;

  constructor(
    x: number,
    y: number,
    readonly def: EnemyDef,
    private readonly target: MapFighter,
    walk: WalkableMap,
    seed: string,
  ) {
    super(x, y, Math.max(16, def.body.w * 0.6), def.body.h * 1.6, def.hp, walk);
    this.rng = new Phaser.Math.RandomDataGenerator([seed]);
    this.cooldown = this.rng.between(30, 60);
    this.flank = this.rng.pick([-1, 1]) * this.rng.realInRange(0.3, 0.9);
    this.facing = dirTo(this.pos, target.pos, { x: 0, y: 1 });
  }

  override get invulnerable() {
    return this.dead;
  }

  get gone() {
    return this.dead && this.deathFrames >= DEATH_FRAMES;
  }

  /** 倒下以后化墨到哪一步了（0~1） */
  get dissolve() {
    return this.dead ? Math.min(1, this.deathFrames / DEATH_FRAMES) : 0;
  }

  /** 离主角多远（地面距离） */
  get distToTarget() {
    return groundDist(this.target.pos.x - this.pos.x, this.target.pos.y - this.pos.y);
  }

  alert() {
    if (this.aggro || this.dead) return;
    this.aggro = true;
    this.events.emit('aggro', this);
  }

  takeHit(hit: HitSpec, dir: Vec) {
    if (this.invulnerable) return;
    this.alert();
    this.hp = Math.max(0, this.hp - hit.damage);
    this.flash = hit.hitstop + 3;
    if (!this.def.superArmor || this.dead) {
      this.runner.stop();
      this.hurtFrames = hit.hitstun;
      this.knockBack(hit, dir);
    }
    this.freeze(hit.hitstop);
    if (this.dead) this.events.emit('dead', this);
  }

  tick() {
    if (!this.beginTick()) return;

    if (this.dead || this.hurtFrames > 0) {
      if (this.dead) this.deathFrames++;
      else this.hurtFrames--;
      this.vel = { x: this.vel.x * 0.82, y: this.vel.y * 0.82 };
      return this.integrate();
    }
    if (!this.aggro) {
      if (this.distToTarget < AGGRO_RANGE && !this.target.dead) this.alert();
      this.vel = { x: 0, y: 0 };
      return this.integrate();
    }

    const current = this.runner.move;
    if (current) {
      this.advanceMove();
      if (this.runner.move) {
        this.applyMoveMotion();
        return this.integrate();
      }
      if (current.followUp) {
        this.begin(current.followUp);
        return this.integrate();
      }
      this.cooldown = this.rng.between(this.def.cooldown.min, this.def.cooldown.max);
    }

    this.faceTarget();
    const dist = this.distToTarget;
    if (--this.cooldown <= 0 && !this.target.dead) {
      const next = this.choose(dist);
      if (next) {
        this.begin(next);
        return this.integrate();
      }
    }

    // 保持距离：太远靠近，太近后退；在想要的距离上就绕着主角慢慢挪，不呆站
    const [near, far] = this.def.range;
    const speed = this.def.walkSpeed;
    const f = this.facing;
    const side = { x: -f.y * this.flank, y: f.x * this.flank };
    let v: Vec;
    if (dist > far) v = { x: f.x + side.x * 0.4, y: f.y + side.y * 0.4 };
    else if (dist < near) v = { x: -f.x * 0.7, y: -f.y * 0.7 };
    else v = { x: side.x * 0.35, y: side.y * 0.35 };
    const len = Math.hypot(v.x, v.y);
    const scale = len > 1 ? speed / len : speed;
    this.vel = { x: v.x * scale, y: v.y * scale };
    this.integrate();
  }

  /** 和同伴挤开，免得几个人叠成一个 */
  separateFrom(others: MapEnemy[]) {
    if (this.dead || this.def.superArmor) return;
    for (const o of others) if (o !== this && !o.dead) this.pushOutOf({ pos: o.pos, radius: o.radius * 0.9 });
  }

  private choose(dist: number): MoveId | undefined {
    const usable = this.def.attacks.filter((a) => dist <= a.maxDist && dist >= (a.minDist ?? 0));
    if (!usable.length) return undefined;
    let roll = this.rng.frac() * usable.reduce((sum, a) => sum + a.weight, 0);
    for (const a of usable) {
      roll -= a.weight;
      if (roll <= 0) return a.move;
    }
    return usable[usable.length - 1].move;
  }

  private begin(id: MoveId) {
    this.faceTarget();
    this.startMove(this.def.moves[id]);
    this.applyMoveMotion();
  }

  private faceTarget() {
    this.facing = normalize(dirTo(this.pos, this.target.pos, this.facing));
  }
}
