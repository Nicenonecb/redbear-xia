import type Phaser from 'phaser';
import type { ProjectileSpec } from '../combat/moveTable';
import type { Fighter } from './Fighter';
import { Projectile } from './Projectile';

/**
 * 于无瑕掷出去的扇子：先往前飞，越飞越慢，到最远处掉头飞回主人手里。
 * 掉头时清空"打过谁"的记录，所以去程、回程各能打中同一个人一次。
 * 回到手边（或者飞太久）就消失，发出 onCaught。
 */
export class Boomerang extends Projectile {
  private outbound = true;
  private travelled = 0;
  private spin = 0;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    dir: 1 | -1,
    spec: ProjectileSpec,
    draw: (g: Phaser.GameObjects.Graphics) => void,
    damageScale: number,
    private readonly owner: Fighter,
    /** 最远飞多少像素 */
    private readonly range: number,
    private readonly onCaught: () => void,
  ) {
    super(scene, x, y, dir, spec, 'player', draw, damageScale);
  }

  protected override advance() {
    const speed = this.spec.speed / 60;
    this.spin += 0.45;
    this.g.rotation = this.spin * this.dir;
    if (this.outbound) {
      // 快到最远处时减速
      const left = this.range - this.travelled;
      const step = Math.max(speed * 0.25, Math.min(speed, left * 0.12 + speed * 0.25));
      this.x += step * this.dir;
      this.travelled += step;
      if (this.travelled >= this.range - 1) {
        this.outbound = false;
        this.hitTargets.clear();
      }
      return;
    }
    // 回程：追着主人现在的位置飞
    const tx = this.owner.x;
    const ty = this.owner.feetY - 44;
    const dx = tx - this.x;
    const dy = ty - this.y;
    const d = Math.hypot(dx, dy);
    if (d < speed * 1.2) {
      this.destroy();
      this.onCaught();
      return;
    }
    this.x += (dx / d) * speed;
    this.y += (dy / d) * speed;
    this.dir = dx >= 0 ? 1 : -1;
  }

  override destroy() {
    const wasAlive = this.alive;
    super.destroy();
    // 飞太久没接住也算回到手里，免得扇子丢了就再也挥不了
    if (wasAlive && this.life <= 0) this.onCaught();
  }
}
