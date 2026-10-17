import Phaser from 'phaser';
import { GAME_WIDTH } from '../config';
import { hasArt, type ArtSlot } from '../art/slots';

/** 从右边冲进来、停一下、往左边冲出去，一共多长（毫秒） */
const DURATION = 1300;

/**
 * 横幅特写：红熊救场、胖虎变身时，一张横图从画面右边扫进来，停一下再从左边扫出去。
 * 按画面帧推进（不用 tween），逐帧测试时也能跑；没有这张图就什么都不做。
 */
export class CutIn {
  private readonly img: Phaser.GameObjects.Image | null;
  private t = 0;

  constructor(scene: Phaser.Scene, slot: ArtSlot, private readonly y: number, depth = 33) {
    this.img = hasArt(scene, slot) ? scene.add.image(GAME_WIDTH * 1.5, y, `art:${slot}`).setDepth(depth) : null;
    if (this.img) this.img.setScale(GAME_WIDTH / this.img.width);
  }

  get done() {
    return !this.img || this.t >= 1;
  }

  update(delta: number) {
    const img = this.img;
    if (!img || this.t >= 1) return;
    this.t = Math.min(1, this.t + delta / DURATION);
    // 前 25% 冲进来，中间停住，最后 25% 冲出去
    const t = this.t;
    const center = GAME_WIDTH / 2;
    let x: number;
    if (t < 0.25) x = Phaser.Math.Linear(GAME_WIDTH * 1.5, center, Phaser.Math.Easing.Cubic.Out(t / 0.25));
    else if (t < 0.75) x = center - (t - 0.25) * 60;
    else x = Phaser.Math.Linear(center - 30, -GAME_WIDTH * 0.5, Phaser.Math.Easing.Cubic.In((t - 0.75) / 0.25));
    img.setPosition(x, this.y);
    img.setAlpha(t < 0.75 ? 1 : 1 - (t - 0.75) / 0.25);
    if (this.t >= 1) img.destroy();
  }
}
