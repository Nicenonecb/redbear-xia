import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../config';
import { hasArt, placeArt, type ArtSlot } from '../art/slots';

/** 竖图（人）和横图（猛虎）各自的最大显示尺寸 */
const PORTRAIT_MAX = { w: 380, h: 440 };
const LANDSCAPE_MAX = { w: 560, h: 380 };

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

  /** 立绘正在显示时，返回它头部的位置，台词气泡从这里冒出来 */
  get head(): { x: number; y: number } | null {
    const img = this.img;
    if (!img?.visible || img.getData('hiding')) return null;
    // 气泡放在立绘头顶、稍微偏向画面中间，不挡脸
    const cx = this.side === 'left' ? img.x + img.displayWidth * 0.6 : img.x - img.displayWidth * 0.6;
    return { x: cx, y: img.y - img.displayHeight * 0.98 };
  }

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
      const tex = this.scene.textures.get(`art:${this.slot}`).getSourceImage();
      const max = tex.width > tex.height ? LANDSCAPE_MAX : PORTRAIT_MAX;
      this.img = placeArt(this.scene, this.slot, x, GAME_HEIGHT, max.w, max.h, this.side === 'left' ? 0 : 1, 1);
      this.img?.setDepth(39).setAlpha(0);
    }
    if (!this.img) return;
    this.img.setData('hiding', false);
    this.img.setVisible(true);
    this.scene.tweens.add({ targets: this.img, alpha: 1, duration: 250 });
  }

  hide() {
    const img = this.img;
    if (!img) return;
    // 立刻算作"没在显示"，气泡马上回到人物头上；画面上再淡出
    img.setData('hiding', true);
    this.scene.tweens.add({
      targets: img,
      alpha: 0,
      duration: 200,
      onComplete: () => {
        if (img.getData('hiding')) img.setVisible(false);
      },
    });
  }
}
