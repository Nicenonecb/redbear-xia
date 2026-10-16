import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../config';
import { hasArt, placeArt, type ArtSlot } from '../art/slots';

const MAX_W = 380;
const MAX_H = 440;

/**
 * 说话时的立绘：有图才显示，从画面下角淡入，说完淡出。
 * left 用在任新野这类"我方 / 中立"的人，right 用在胖虎这类对手。
 */
export class Portrait {
  private img: Phaser.GameObjects.Image | null = null;

  constructor(
    private readonly scene: Phaser.Scene,
    private slot: ArtSlot,
    private readonly side: 'left' | 'right',
  ) {}

  /** 换一张（胖虎变身后换成猛虎） */
  setSlot(slot: ArtSlot) {
    if (slot === this.slot) return;
    const showing = !!this.img?.visible;
    this.img?.destroy();
    this.img = null;
    this.slot = slot;
    if (showing) this.show();
  }

  show() {
    if (!hasArt(this.scene, this.slot)) return;
    if (!this.img) {
      const x = this.side === 'left' ? 20 : GAME_WIDTH - 20;
      this.img = placeArt(this.scene, this.slot, x, GAME_HEIGHT, MAX_W, MAX_H, this.side === 'left' ? 0 : 1, 1);
      this.img?.setDepth(39).setAlpha(0);
    }
    if (!this.img) return;
    this.img.setVisible(true);
    this.scene.tweens.add({ targets: this.img, alpha: 1, duration: 250 });
  }

  hide() {
    const img = this.img;
    if (!img) return;
    this.scene.tweens.add({ targets: img, alpha: 0, duration: 200, onComplete: () => img.setVisible(false) });
  }
}
