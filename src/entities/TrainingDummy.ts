import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH } from '../config';
import type { Hurtable } from '../combat/hitbox';
import type { HitSpec } from '../combat/moveTable';

/** 练功用的木人桩：不还手、不会倒，挨打时闪白、晃动、被击退后弹回原位。 */
export class TrainingDummy implements Hurtable {
  totalDamage = 0;
  hitCount = 0;
  /** 挡住角色的静态碰撞体，免得一路连斩直接穿过去 */
  readonly blocker: Phaser.GameObjects.Zone;
  private readonly g: Phaser.GameObjects.Graphics;
  private offset = 0;
  private velocity = 0;
  private hitstop = 0;
  private flash = 0;
  private stun = 0;
  private stunDir: 1 | -1 = 1;

  constructor(
    scene: Phaser.Scene,
    private readonly homeX: number,
    private readonly groundY: number,
  ) {
    this.g = scene.add.graphics();
    this.blocker = scene.add.zone(homeX, groundY - 50, 44, 100);
    scene.physics.add.existing(this.blocker, true);
    scene.add
      .text(homeX, groundY + 24, '木人桩', { fontFamily: FONT_BRUSH, fontSize: '20px', color: CSS_COLORS.paper })
      .setOrigin(0.5)
      .setAlpha(0.7);
  }

  get x() {
    return this.homeX + this.offset;
  }

  hurtbox() {
    return new Phaser.Geom.Rectangle(this.x - 22, this.groundY - 100, 44, 100);
  }

  takeHit(hit: HitSpec, dir: 1 | -1) {
    this.totalDamage += hit.damage;
    this.hitCount++;
    this.hitstop = hit.hitstop;
    this.flash = hit.hitstop + 3;
    this.stun = hit.hitstun;
    this.stunDir = dir;
    this.velocity = (hit.knockback.x * dir) / 60;
  }

  tick() {
    if (this.flash > 0) this.flash--;
    if (this.hitstop > 0) {
      this.hitstop--;
      return;
    }
    if (this.stun > 0) this.stun--;
    // 被打退后像弹簧一样回到原位
    this.offset += this.velocity;
    this.velocity = (this.velocity - this.offset * 0.06) * 0.8;
  }

  draw() {
    const g = this.g;
    const shake = this.hitstop > 0 ? Phaser.Math.Between(-3, 3) : 0;
    const lean = this.stun > 0 ? this.stunDir * Math.min(this.stun, 12) : 0;
    const P = (lx: number, ly: number) => ({ x: this.x + shake + lx + lean * (-ly / 100), y: this.groundY + ly });
    const fill = this.flash > 0 ? 0xffffff : COLORS.ink;

    g.clear();
    g.fillStyle(COLORS.ink);
    g.fillPoints([P(-26, 0), P(26, 0), P(16, -10), P(-16, -10)], true);

    g.lineStyle(7, fill);
    for (const [from, to] of [
      [P(10, -80), P(36, -86)],
      [P(-10, -80), P(-36, -86)],
      [P(10, -58), P(32, -52)],
    ]) {
      g.lineBetween(from.x, from.y, to.x, to.y);
    }

    g.fillStyle(fill);
    g.lineStyle(2, COLORS.ink);
    const post = [P(-11, -10), P(11, -10), P(11, -94), P(-11, -94)];
    g.fillPoints(post, true);
    g.strokePoints(post, true);
    const head = P(0, -102);
    g.fillCircle(head.x, head.y, 11);
    g.strokeCircle(head.x, head.y, 11);
  }
}
