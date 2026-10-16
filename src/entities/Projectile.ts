import Phaser from 'phaser';
import { boxToRect, overlaps, type HitResult, type Hurtable } from '../combat/hitbox';
import type { ProjectileSpec } from '../combat/moveTable';

export type Team = 'player' | 'enemy';

/**
 * 飞行道具：直线飞行，同一目标只打一次，不穿透的打中就消失。
 * 剑气、冲击波都用它，外观由 draw 画在以道具中心为原点、面朝右的坐标里。
 */
export class Projectile {
  alive = true;
  private readonly hitTargets = new Set<Hurtable>();
  private readonly g: Phaser.GameObjects.Graphics;
  private life: number;
  private hitstop = 0;

  constructor(
    scene: Phaser.Scene,
    private x: number,
    private readonly y: number,
    private readonly dir: 1 | -1,
    readonly spec: ProjectileSpec,
    readonly team: Team,
    draw: (g: Phaser.GameObjects.Graphics) => void,
    /** 发射者的伤害倍率 */
    private readonly damageScale = 1,
  ) {
    this.life = spec.life;
    this.g = scene.add.graphics({ x, y }).setDepth(8);
    this.g.scaleX = dir;
    draw(this.g);
  }

  hitbox() {
    return boxToRect(this.spec.hit.box, this.x, this.y, this.dir);
  }

  tick(targets: Hurtable[]): HitResult[] {
    if (!this.alive) return [];
    if (this.hitstop > 0) {
      this.hitstop--;
      return [];
    }
    this.x += (this.spec.speed / 60) * this.dir;
    this.life--;

    const hit = { ...this.spec.hit, damage: Math.round(this.spec.hit.damage * this.damageScale) };
    const results: HitResult[] = [];
    for (const t of targets) {
      if (t.invulnerable || this.hitTargets.has(t) || !overlaps(this.hitbox(), t.hurtbox())) continue;
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

    this.g.setPosition(this.x, this.y);
    this.g.setAlpha(Math.min(1, this.life / 8));
    return results;
  }

  destroy() {
    if (!this.alive) return;
    this.alive = false;
    this.g.destroy();
  }
}
