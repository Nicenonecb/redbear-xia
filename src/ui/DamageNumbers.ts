import Phaser from 'phaser';
import { CSS_COLORS, FONT_BRUSH } from '../config';

/**
 * 跳出来的伤害数字：打别人是浓墨字，自己挨打是朱红字。
 * 重击字更大，先放大再缩回去，然后往上飘着淡出。
 */
export class DamageNumbers {
  constructor(
    private readonly scene: Phaser.Scene,
    /** 画在哪一层；大地图上要压在所有人和竹子上面 */
    private readonly depth = 45,
  ) {}

  show(x: number, y: number, amount: number, taken: boolean, heavy: boolean) {
    const text = this.scene.add
      .text(x + Phaser.Math.Between(-10, 10), y, `${amount}`, {
        fontFamily: FONT_BRUSH,
        fontSize: heavy ? '42px' : '30px',
        color: taken ? CSS_COLORS.red : CSS_COLORS.ink,
        stroke: CSS_COLORS.paper,
        strokeThickness: 5,
      })
      .setOrigin(0.5)
      .setDepth(this.depth);
    if (heavy) {
      text.setScale(1.6);
      this.scene.tweens.add({ targets: text, scale: 1, duration: 140, ease: 'Back.Out' });
    }
    this.scene.tweens.add({
      targets: text,
      y: y - 56,
      alpha: 0,
      delay: 220,
      duration: 650,
      ease: 'Cubic.Out',
      onComplete: () => text.destroy(),
    });
  }
}
