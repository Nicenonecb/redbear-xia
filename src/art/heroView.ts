import Phaser from 'phaser';
import { COLORS } from '../config';
import type { Fighter } from '../entities/Fighter';

export type Pt = { x: number; y: number };

/**
 * 主角剪影的公共部分：两层画布（身后的特效、身体）、闪避残影、受击闪白、受击保护期闪烁、
 * 发带剑穗这类跟着身形飘的软物件。每位主角只管自己的身形、兵器和招式姿势。
 */
export abstract class HeroView {
  protected readonly fx: Phaser.GameObjects.Graphics;
  protected readonly g: Phaser.GameObjects.Graphics;
  protected time = 0;
  /** 本帧的墨色：受击闪白时是白色 */
  protected ink: number = COLORS.ink;
  protected flashing = false;
  private ghosts: { x: number; y: number; facing: 1 | -1; life: number }[] = [];
  private ghostTimer = 0;

  constructor(scene: Phaser.Scene) {
    this.fx = scene.add.graphics().setDepth(9);
    this.g = scene.add.graphics().setDepth(10);
  }

  abstract draw(f: Fighter, delta: number): void;

  /** 选角界面里把整个人放大画 */
  setScale(scale: number) {
    this.fx.setScale(scale);
    this.g.setScale(scale);
  }

  /** 每帧开头：清画布；闪避时半透明，受击保护期一闪一闪；受击闪白 */
  protected begin(f: Fighter, delta: number) {
    this.time += delta;
    this.g.clear();
    this.fx.clear();
    const blinking = !f.evading && f.mercyFrames > 0 && Math.floor(this.time / 70) % 2 === 0;
    this.g.setAlpha(f.evading ? 0.55 : blinking ? 0.3 : 1);
    this.flashing = f.flash > 0;
    this.ink = this.flashing ? 0xffffff : COLORS.ink;
    this.drawGhosts(f, delta);
  }

  /** 填一块身体；闪白时描一圈墨边，免得白色融进宣纸背景 */
  protected poly(pts: Pt[]) {
    this.g.fillStyle(this.ink);
    this.g.fillPoints(pts, true);
    if (this.flashing) {
      this.g.lineStyle(1.5, COLORS.ink);
      this.g.strokePoints(pts, true);
    }
  }

  protected circle(p: Pt, r: number) {
    this.g.fillStyle(this.ink);
    this.g.fillCircle(p.x, p.y, r);
    if (this.flashing) {
      this.g.lineStyle(1.5, COLORS.ink);
      this.g.strokeCircle(p.x, p.y, r);
    }
  }

  protected line(a: Pt, b: Pt) {
    this.g.lineBetween(a.x, a.y, b.x, b.y);
  }

  /** 闪避残影：无敌帧里每隔一小段留一个淡墨身影 */
  private drawGhosts(f: Fighter, delta: number) {
    if (f.evading) {
      this.ghostTimer -= delta;
      if (this.ghostTimer <= 0) {
        this.ghosts.push({ x: f.x, y: f.feetY, facing: f.facing, life: 1 });
        this.ghostTimer = 45;
      }
    } else {
      this.ghostTimer = 0;
    }
    for (const gh of this.ghosts) gh.life -= delta / 260;
    this.ghosts = this.ghosts.filter((gh) => gh.life > 0);

    for (const gh of this.ghosts) {
      const at = (x: number, y: number) => ({ x: gh.x + x * gh.facing, y: gh.y + y * 0.85 });
      this.fx.fillStyle(COLORS.inkLight, gh.life * 0.35);
      this.fx.fillPoints([at(-8, -57), at(8, -57), at(16, 0), at(-18, 0)], true);
      const head = at(1, -65);
      this.fx.fillCircle(head.x, head.y, 8.5);
    }
  }

  /** 发带、剑穗、发丝这类软物件：每节受一点重力和后飘，再拉回固定长度 */
  protected follow(chain: Pt[], anchor: Pt, segments: number, segLen: number, facing: 1 | -1, delta: number) {
    if (chain.length !== segments + 1) {
      chain.length = 0;
      for (let i = 0; i <= segments; i++) chain.push({ x: anchor.x, y: anchor.y + i * segLen });
    }
    chain[0] = { x: anchor.x, y: anchor.y };
    const dt = delta / (1000 / 60);
    for (let i = 1; i < chain.length; i++) {
      const p = chain[i];
      const prev = chain[i - 1];
      p.y += 1.2 * dt;
      p.x -= (facing * 0.6 + Math.sin(this.time * 0.004 + i) * 0.4) * dt;
      const dx = p.x - prev.x;
      const dy = p.y - prev.y;
      const d = Math.hypot(dx, dy) || 1;
      p.x = prev.x + (dx / d) * segLen;
      p.y = prev.y + (dy / d) * segLen;
    }
  }
}
