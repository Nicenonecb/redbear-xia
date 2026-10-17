import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_HEIGHT, GAME_WIDTH } from '../config';
import { hasArt, type ArtSlot } from '../art/slots';

/** 停留多久（毫秒），前后各留一点淡入淡出 */
const DURATION = 3200;
const FADE = 300;
const PORTRAIT_H = 230;

/**
 * 敌人登场提示：某种敌人这一局第一次出现时，在右下角弹一张小卡：立绘、名字、一句打法提示。
 * 不暂停战斗，按画面帧推进，几秒后自己淡掉。没有立绘图时只显示名字和提示。
 */
export class IntroCard {
  private readonly container: Phaser.GameObjects.Container;
  private t = 0;

  constructor(scene: Phaser.Scene, slot: ArtSlot, name: string, tip: string, tier: string) {
    const w = 380;
    const h = 128;
    const x = GAME_WIDTH - w - 30;
    const y = GAME_HEIGHT - h - 70;
    this.container = scene.add.container(0, 0).setDepth(48).setAlpha(0);

    const bg = scene.add.graphics();
    bg.fillStyle(COLORS.paper, 0.92);
    bg.fillRoundedRect(x, y, w, h, 10);
    bg.lineStyle(2, COLORS.red, 0.9);
    bg.strokeRoundedRect(x, y, w, h, 10);
    this.container.add(bg);

    // 立绘从卡片上沿探出来一截
    let textX = x + 20;
    if (hasArt(scene, slot)) {
      const img = scene.add.image(x + 70, y + h - 6, `art:${slot}`).setOrigin(0.5, 1);
      img.setScale(PORTRAIT_H / img.height);
      this.container.add(img);
      textX = x + 140;
    }
    this.container.add([
      scene.add.text(textX, y + 16, tier, { fontFamily: FONT_BRUSH, fontSize: '18px', color: CSS_COLORS.red }),
      scene.add.text(textX, y + 38, name, { fontFamily: FONT_BRUSH, fontSize: '30px', color: CSS_COLORS.ink }),
      scene.add.text(textX, y + 78, tip, {
        fontFamily: FONT_BRUSH,
        fontSize: '18px',
        color: CSS_COLORS.ink,
        wordWrap: { width: x + w - textX - 14, useAdvancedWrap: true },
      }),
    ]);
  }

  get done() {
    return this.t >= DURATION;
  }

  update(delta: number) {
    if (this.done) return;
    this.t += delta;
    const alpha = Math.min(1, this.t / FADE, (DURATION - this.t) / FADE);
    this.container.setAlpha(Math.max(0, alpha));
    this.container.y = (1 - Math.min(1, this.t / FADE)) * 20;
    if (this.done) this.container.destroy();
  }
}
