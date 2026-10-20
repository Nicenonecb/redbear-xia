import Phaser from 'phaser';
import type { ProjectileSpec } from '../../combat/moveTable';
import type { Team } from '../../entities/Projectile';
import { hasArt, type ArtSlot } from '../../art/slots';
import { groundDist, type Vec } from './ground';
import type { MapHitResult, MapHurtable } from './MapActor';

/**
 * 地图上的飞行道具：剑气、飞镖、飞刀。沿一个方向贴地直飞，同一目标只打一次，不穿透的打中就消失。
 * 外观还是横版那套画法（以道具中心为原点、面朝右），转到飞行方向上画；离地 lift 像素高，影子落在地上。
 * 判定是道具脚下一个圆，半径取判定框长宽里大的那一半。
 */
export class MapProjectile {
  alive = true;
  readonly pos: Vec;
  protected readonly hitTargets = new Set<MapHurtable>();
  protected readonly g: Phaser.GameObjects.Graphics;
  protected readonly shadow: Phaser.GameObjects.Ellipse;
  protected life: number;
  private hitstop = 0;
  /** 消失时调用（掷扇飞完要把扇子还给主角） */
  onGone?: () => void;
  /** 有特效图时用图代替代码画的样子 */
  private art: Phaser.GameObjects.Image | null = null;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    protected dir: Vec,
    readonly spec: ProjectileSpec,
    readonly team: Team,
    draw: (g: Phaser.GameObjects.Graphics) => void,
    private readonly damageScale = 1,
    /** 离地多高（设计像素） */
    private readonly lift = 60,
  ) {
    this.pos = { x, y };
    this.life = spec.life;
    this.shadow = scene.add.ellipse(x, y, this.radius * 2, this.radius * 0.6, 0x1a1714, 0.18);
    this.g = scene.add.graphics();
    this.g.setRotation(Math.atan2(dir.y, dir.x));
    draw(this.g);
    this.place();
  }

  /** 有这张特效图（只画朝右的）就换成图，转到飞行方向；width 是图显示多宽 */
  useArt(scene: Phaser.Scene, slot: ArtSlot, width: number) {
    if (!hasArt(scene, slot)) return this;
    this.art = scene.add.image(0, 0, `art:${slot}`).setRotation(Math.atan2(this.dir.y, this.dir.x));
    this.art.setScale(width / this.art.width);
    this.g.setVisible(false);
    this.place();
    return this;
  }

  get radius() {
    return Math.max(this.spec.hit.box.w, this.spec.hit.box.h) / 2;
  }

  tick(targets: MapHurtable[]): MapHitResult[] {
    if (!this.alive) return [];
    if (this.hitstop > 0) {
      this.hitstop--;
      return [];
    }
    this.advance();
    if (!this.alive) return [];
    this.life--;

    const hit = { ...this.spec.hit, damage: Math.round(this.spec.hit.damage * this.damageScale) };
    const results: MapHitResult[] = [];
    for (const t of targets) {
      if (t.invulnerable || this.hitTargets.has(t)) continue;
      if (groundDist(t.pos.x - this.pos.x, t.pos.y - this.pos.y) > this.radius + t.radius) continue;
      this.hitTargets.add(t);
      t.takeHit(hit, this.dir);
      this.hitstop = hit.hitstop;
      results.push({ target: t, hit });
      if (!this.spec.pierce) {
        this.destroy();
        return results;
      }
    }
    if (this.life <= 0) {
      this.destroy();
      return results;
    }
    this.place();
    this.g.setAlpha(Math.min(1, this.life / 8));
    this.art?.setAlpha(Math.min(1, this.life / 8));
    return results;
  }

  /** 每帧怎么飞：默认直线 */
  protected advance() {
    this.pos.x += (this.spec.speed / 60) * this.dir.x;
    this.pos.y += (this.spec.speed / 60) * this.dir.y;
  }

  private place() {
    this.g.setPosition(this.pos.x, this.pos.y - this.lift).setDepth(this.pos.y + 1);
    this.art?.setPosition(this.pos.x, this.pos.y - this.lift).setDepth(this.pos.y + 1);
    this.shadow.setPosition(this.pos.x, this.pos.y).setDepth(this.pos.y);
  }

  destroy() {
    if (!this.alive) return;
    this.alive = false;
    this.g.destroy();
    this.art?.destroy();
    this.shadow.destroy();
    this.onGone?.();
  }
}
