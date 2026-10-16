import Phaser from 'phaser';
import { COLORS } from '../config';
import { boxToRect, overlaps, type Hurtable } from '../combat/hitbox';
import { SWORD_QI_LEVELS, swordQiLevel, type SwordQiLevel } from '../characters/wenShaohua';

/** 少华一剑放出的剑气：一道水墨月牙，朱红描边，蓄满时能穿透。 */
export class SwordQi {
  alive = true;
  readonly level: SwordQiLevel;
  private readonly hitTargets = new Set<Hurtable>();
  private readonly g: Phaser.GameObjects.Graphics;
  private life: number;
  private hitstop = 0;

  constructor(
    scene: Phaser.Scene,
    private x: number,
    private readonly y: number,
    private readonly dir: 1 | -1,
    charge: number,
  ) {
    this.level = swordQiLevel(charge);
    this.life = this.level.life;
    this.g = scene.add.graphics({ x, y });
    this.g.scaleX = dir;
    this.drawCrescent();
  }

  hitbox() {
    return boxToRect(this.level.hit.box, this.x, this.y, this.dir);
  }

  tick(targets: Hurtable[]) {
    if (!this.alive) return;
    if (this.hitstop > 0) {
      this.hitstop--;
      return;
    }
    this.x += (this.level.speed / 60) * this.dir;
    this.life--;

    const { hit, pierce } = this.level;
    for (const t of targets) {
      if (this.hitTargets.has(t) || !overlaps(this.hitbox(), t.hurtbox())) continue;
      this.hitTargets.add(t);
      t.takeHit(hit, this.dir);
      this.hitstop = hit.hitstop;
      if (!pierce) return this.destroy();
    }
    if (this.life <= 0) return this.destroy();

    this.g.setPosition(this.x, this.y);
    this.g.setAlpha(Math.min(1, this.life / 8));
  }

  private destroy() {
    this.alive = false;
    this.g.destroy();
  }

  private drawCrescent() {
    const tier = SWORD_QI_LEVELS.indexOf(this.level);
    const h = this.level.hit.box.h;
    const span = Phaser.Math.DegToRad(70);
    const r = h / 2 / Math.sin(span);
    const cx = -r * 0.5;
    const thickness = h * 0.22;
    const outer: Phaser.Math.Vector2[] = [];
    const inner: Phaser.Math.Vector2[] = [];
    for (let i = 0; i <= 12; i++) {
      const a = Phaser.Math.Linear(-span, span, i / 12);
      outer.push(new Phaser.Math.Vector2(cx + Math.cos(a) * r, Math.sin(a) * r));
      inner.push(new Phaser.Math.Vector2(cx - thickness + Math.cos(a) * r, Math.sin(a) * r));
    }
    this.g.fillStyle(COLORS.ink, 0.9);
    this.g.fillPoints([...outer, ...inner.reverse()], true);
    this.g.lineStyle(tier === 2 ? 5 : 3, COLORS.red, 1);
    this.g.strokePoints(outer);
    if (tier === 2) {
      // 蓄满：后面再拖一道淡墨残影
      this.g.lineStyle(4, COLORS.inkLight, 0.5);
      this.g.strokePoints(outer.map((p) => new Phaser.Math.Vector2(p.x - thickness * 1.8, p.y * 0.9)));
    }
  }
}
