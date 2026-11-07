import Phaser from 'phaser';
import { COLORS } from '../../config';
import type { HitSpec } from '../../combat/moveTable';
import type { Team } from '../../combat/moveTable';
import { hasArt, type ArtSlot } from '../../art/slots';
import { GROUND_SQUASH, dirTo, groundDist, type Vec } from './ground';
import type { MapHitResult, MapHurtable } from './MapActor';

/**
 * 往外扩的墨圈：胖虎震地的冲击波、虎啸的音波。从一点往四周扩开，圈走到谁脚下就打谁一下
 * （每个人只打一次），只能靠闪避的无敌帧穿过去，或者离远一点等它散掉。
 * 画面上是一个压扁的墨环，越往外越淡；有 fx_shock_ring / fx_roar_ring 图就用图。
 */
export class RingWave {
  alive = true;
  private r = 0;
  private age = 0;
  private readonly hitTargets = new Set<MapHurtable>();
  private readonly g: Phaser.GameObjects.Graphics;
  private readonly img: Phaser.GameObjects.Image | null;

  constructor(
    scene: Phaser.Scene,
    readonly center: Vec,
    /** 每秒扩多远 */
    private readonly speed: number,
    /** 存在多少帧 */
    private readonly life: number,
    /** 圈有多宽：脚下离圈线这么近就算碰到 */
    private readonly thickness: number,
    private readonly hit: HitSpec,
    readonly team: Team,
    art: ArtSlot,
    /** 音波：画成几道同心的细波纹 */
    private readonly rippled = false,
  ) {
    this.g = scene.add.graphics().setDepth(-2800);
    this.img = hasArt(scene, art) ? scene.add.image(center.x, center.y, `art:${art}`).setDepth(-2800) : null;
  }

  get radius() {
    return this.r;
  }

  tick(targets: MapHurtable[]): MapHitResult[] {
    if (!this.alive) return [];
    this.age++;
    this.r += this.speed / 60;
    const results: MapHitResult[] = [];
    for (const t of targets) {
      if (t.invulnerable || this.hitTargets.has(t)) continue;
      const d = groundDist(t.pos.x - this.center.x, t.pos.y - this.center.y);
      if (Math.abs(d - this.r) > this.thickness / 2 + t.radius) continue;
      this.hitTargets.add(t);
      t.takeHit(this.hit, dirTo(this.center, t.pos, { x: 0, y: 1 }));
      results.push({ target: t, hit: this.hit });
    }
    if (this.age >= this.life) this.destroy();
    return results;
  }

  draw() {
    if (!this.alive) return;
    const k = this.age / this.life;
    const fade = 1 - k * k;
    const { x, y } = this.center;
    if (this.img) {
      this.img.setDisplaySize(this.r * 2.2, this.r * 2.2 * GROUND_SQUASH).setAlpha(fade);
      return;
    }
    const g = this.g;
    g.clear();
    const ring = (r: number, width: number, color: number, alpha: number) => {
      g.lineStyle(width, color, alpha);
      g.strokeEllipse(x, y, r * 2, r * 2 * GROUND_SQUASH);
    };
    if (this.rippled) {
      for (let i = 0; i < 3; i++) ring(this.r - i * 18, 6 - i * 1.5, COLORS.ink, fade * (0.7 - i * 0.2));
      ring(this.r + 4, 2, COLORS.red, fade * 0.8);
    } else {
      // 墨浪：一道宽的淡墨，前沿一道浓墨、一线朱红，后面拖几块碎墨
      ring(this.r - this.thickness * 0.3, this.thickness * 0.8, COLORS.inkLight, fade * 0.35);
      ring(this.r, 7, COLORS.ink, fade * 0.85);
      ring(this.r + 5, 2, COLORS.red, fade * 0.9);
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2 + this.age * 0.01;
        const rr = this.r - 14 - (i % 3) * 8;
        g.fillStyle(COLORS.ink, fade * 0.5);
        g.fillCircle(x + Math.cos(a) * rr, y + Math.sin(a) * rr * GROUND_SQUASH, 4 - (i % 3));
      }
    }
  }

  destroy() {
    if (!this.alive) return;
    this.alive = false;
    this.g.destroy();
    this.img?.destroy();
  }
}
