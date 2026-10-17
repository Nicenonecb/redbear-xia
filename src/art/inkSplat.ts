import Phaser from 'phaser';
import { hasArt, stripFrames } from './slots';

const LIFE = 420;

/**
 * 命中、化墨时溅开的一团墨点：从墨点素材里随机挑一个形状，随机转个角度，
 * 先一下子放大，再慢慢淡掉。没有墨点素材就什么都不做（代码画的墨点照样有）。
 * 按画面帧推进，可以交给 CombatScene.addOverlay。
 */
export class InkSplat {
  private readonly img: Phaser.GameObjects.Image | null;
  private t = 0;
  private baseScale = 1;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    size: number,
    private readonly alpha = 0.85,
  ) {
    const frames = stripFrames('fx_ink_splats');
    this.img = hasArt(scene, 'fx_ink_splats')
      ? scene.add
          .image(x, y, 'art:fx_ink_splats', Phaser.Math.Between(0, frames - 1))
          .setDepth(7)
          .setRotation(Math.random() * Math.PI * 2)
          .setAlpha(this.alpha)
      : null;
    if (this.img) {
      this.baseScale = size / this.img.width;
      this.img.setScale(this.baseScale * 0.6);
    }
  }

  get done() {
    return !this.img || this.t >= LIFE;
  }

  update(delta: number) {
    if (!this.img || this.done) return;
    this.t += delta;
    const p = this.t / LIFE;
    this.img.setScale(this.baseScale * (0.6 + 0.4 * Math.min(1, p * 4)));
    // 前 35% 保持浓墨，之后慢慢淡掉
    this.img.setAlpha(this.alpha * (p < 0.35 ? 1 : 1 - (p - 0.35) / 0.65));
    if (this.done) this.img.destroy();
  }
}
