import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH } from '../../config';
import type { HitSpec } from '../../combat/moveTable';
import type { Vec } from './ground';
import type { MapHurtable } from './MapActor';

/**
 * 地图上的木人桩：不还手、不会倒。挨打时闪白、往挨打的方向歪、被推开一点再弹回原位。
 * 也是个挡路的东西（脚下的圆），闪避时可以穿过去。
 */
export class MapDummy implements MapHurtable {
  readonly radius = 24;
  readonly height = 104;
  totalDamage = 0;
  hitCount = 0;
  private readonly g: Phaser.GameObjects.Graphics;
  private readonly shadow: Phaser.GameObjects.Ellipse;
  private offset: Vec = { x: 0, y: 0 };
  private velocity: Vec = { x: 0, y: 0 };
  private hitstop = 0;
  private flash = 0;
  private stun = 0;
  private stunDir: Vec = { x: 1, y: 0 };

  constructor(
    scene: Phaser.Scene,
    private readonly home: Vec,
  ) {
    this.shadow = scene.add.ellipse(home.x, home.y, 64, 20, COLORS.ink, 0.2).setDepth(home.y - 1);
    this.g = scene.add.graphics();
    scene.add
      .text(home.x, home.y + 22, '木人桩', {
        fontFamily: FONT_BRUSH,
        fontSize: '18px',
        color: CSS_COLORS.ink,
        stroke: CSS_COLORS.paper,
        strokeThickness: 4,
      })
      .setOrigin(0.5)
      .setAlpha(0.6)
      .setDepth(home.y);
  }

  get pos(): Vec {
    return { x: this.home.x + this.offset.x, y: this.home.y + this.offset.y };
  }

  takeHit(hit: HitSpec, dir: Vec) {
    this.totalDamage += hit.damage;
    this.hitCount++;
    this.hitstop = hit.hitstop;
    this.flash = hit.hitstop + 3;
    this.stun = hit.hitstun;
    this.stunDir = dir;
    const push = hit.knockback.x / 60;
    this.velocity = { x: dir.x * push, y: dir.y * push };
  }

  tick() {
    if (this.flash > 0) this.flash--;
    if (this.hitstop > 0) {
      this.hitstop--;
      return;
    }
    if (this.stun > 0) this.stun--;
    // 被打退后像弹簧一样回到原位
    for (const k of ['x', 'y'] as const) {
      this.offset[k] += this.velocity[k];
      this.velocity[k] = (this.velocity[k] - this.offset[k] * 0.06) * 0.8;
    }
  }

  draw() {
    const g = this.g;
    const { x, y } = this.pos;
    const shake = this.hitstop > 0 ? Phaser.Math.Between(-3, 3) : 0;
    // 往挨打的方向歪：左右歪成斜的，前后歪成矮一点
    const lean = this.stun > 0 ? Math.min(this.stun, 12) : 0;
    const lx = this.stunDir.x * lean;
    const squash = 1 - Math.abs(this.stunDir.y) * lean * 0.006;
    const P = (px: number, py: number) => ({ x: x + shake + px + lx * (-py / 100), y: y + py * squash });
    const fill = this.flash > 0 ? 0xffffff : COLORS.ink;

    g.clear().setDepth(y);
    this.shadow.setPosition(x, y).setDepth(y - 1);
    g.fillStyle(COLORS.ink);
    g.fillPoints([P(-24, 0), P(24, 0), P(15, -9), P(-15, -9)], true);
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
    const post = [P(-11, -9), P(11, -9), P(11, -94), P(-11, -94)];
    g.fillPoints(post, true);
    g.strokePoints(post, true);
    const head = P(0, -102);
    g.fillCircle(head.x, head.y, 11);
    g.strokeCircle(head.x, head.y, 11);
  }
}
