import Phaser from 'phaser';
import type { EnemyDef, HitSpec, MoveId } from '../combat/moveTable';
import { Actor } from './Actor';
import type { Fighter } from './Fighter';

/** 倒地后留多少帧再消失（画面上是化成墨散掉） */
const DEATH_FRAMES = 40;

/**
 * 普通敌人（小怪、大怪），行为全由 EnemyDef 决定：
 * 保持在想要的距离上，冷却好了就从出招列表里按权重挑一招。
 * 小怪挨打会被打断、击退；大怪有霸体。
 * 事件：'move' 招式事件、'dead' 被打倒。
 */
export class Enemy extends Actor {
  /** 受击硬直剩余帧数 */
  hurtFrames = 0;
  /** 倒地后过了多少帧 */
  deathFrames = 0;
  private cooldown: number;
  private readonly rng: Phaser.Math.RandomDataGenerator;

  constructor(
    scene: Phaser.Scene,
    x: number,
    feetY: number,
    readonly def: EnemyDef,
    private readonly target: Fighter,
    seed: string,
  ) {
    super(scene, x, feetY, def.body, def.hp);
    this.rng = new Phaser.Math.RandomDataGenerator([seed]);
    // 刚出场先缓一缓，不会一照面就砍
    this.cooldown = this.rng.between(30, 60);
    this.facing = target.x >= x ? 1 : -1;
    if (def.superArmor) this.body.pushable = false;
  }

  override get invulnerable() {
    return this.dead;
  }

  /** 倒地并且化墨散完了，可以从场上移除 */
  get gone() {
    return this.dead && this.deathFrames >= DEATH_FRAMES;
  }

  takeHit(hit: HitSpec, dir: 1 | -1) {
    if (this.invulnerable) return;
    this.hp = Math.max(0, this.hp - hit.damage);
    this.flash = hit.hitstop + 3;
    if (!this.def.superArmor || this.dead) {
      this.runner.stop();
      this.hurtFrames = hit.hitstun;
      this.body.setVelocity(hit.knockback.x * dir, hit.knockback.y);
    }
    this.freeze(hit.hitstop);
    if (this.dead) this.events.emit('dead', this);
  }

  tick() {
    if (!this.beginTick()) return;
    this.body.setAllowGravity(true);

    if (this.dead) {
      this.deathFrames++;
      if (this.grounded) this.body.setVelocityX(this.body.velocity.x * 0.8);
      return;
    }
    if (this.hurtFrames > 0) {
      this.hurtFrames--;
      if (this.grounded) this.body.setVelocityX(this.body.velocity.x * 0.8);
      return;
    }

    const current = this.runner.move;
    if (current) {
      this.advanceMove();
      if (this.runner.move) return this.applyMoveMotion();
      if (current.followUp) return this.begin(current.followUp);
      this.cooldown = this.rng.between(this.def.cooldown.min, this.def.cooldown.max);
    }

    this.faceTarget();
    const dist = Math.abs(this.target.x - this.x);
    if (--this.cooldown <= 0 && !this.target.dead) {
      const next = this.choose(dist);
      if (next) return this.begin(next);
    }

    // 保持距离：太远靠近，太近后退（后退时仍然面朝玩家）
    const [near, far] = this.def.range;
    const speed = this.def.walkSpeed;
    const vx = dist > far ? speed * this.facing : dist < near ? -speed * 0.7 * this.facing : 0;
    this.body.setVelocityX(vx);
  }

  /** 离同伴太近时往旁边挪一点，免得几个人叠成一个 */
  separateFrom(others: Enemy[]) {
    if (this.dead || this.runner.move || this.hurtFrames > 0) return;
    for (const o of others) {
      if (o === this || o.dead) continue;
      const dx = this.x - o.x;
      if (Math.abs(dx) < 34) this.body.x += (dx >= 0 ? 1 : -1) * 1.5;
    }
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
    this.facing = this.target.x >= this.x ? 1 : -1;
  }
}
