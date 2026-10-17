import Phaser from 'phaser';
import { CSS_COLORS, FONT_BRUSH, GAME_WIDTH } from '../config';
import { hasArt, type ArtSlot } from '../art/slots';

const DURATION = 2200;
const FADE = 350;

/**
 * Boss 名牌：开打时在画面上方亮出一道墨笔横幅，上面写着"山大王 · 胖虎"。
 * 字由游戏来写，底图有就用，没有就只显示字。按画面帧推进。
 */
export class BossCard {
  private readonly container: Phaser.GameObjects.Container;
  private t = 0;

  constructor(scene: Phaser.Scene, slot: ArtSlot, title: string, name: string) {
    const y = 150;
    this.container = scene.add.container(0, 0).setDepth(47).setAlpha(0);
    if (hasArt(scene, slot)) {
      const img = scene.add.image(GAME_WIDTH / 2, y, `art:${slot}`);
      img.setScale(620 / img.width);
      this.container.add(img);
    }
    this.container.add([
      scene.add
        .text(GAME_WIDTH / 2 - 40, y, title, { fontFamily: FONT_BRUSH, fontSize: '26px', color: CSS_COLORS.paper })
        .setOrigin(1, 0.5),
      scene.add
        .text(GAME_WIDTH / 2 - 20, y, name, { fontFamily: FONT_BRUSH, fontSize: '56px', color: CSS_COLORS.paper })
        .setOrigin(0, 0.5),
    ]);
  }

  get done() {
    return this.t >= DURATION;
  }

  update(delta: number) {
    if (this.done) return;
    this.t += delta;
    this.container.setAlpha(Math.max(0, Math.min(1, this.t / FADE, (DURATION - this.t) / FADE)));
    // 从左往右轻轻滑进来
    this.container.x = (1 - Math.min(1, this.t / FADE)) * -40;
    if (this.done) this.container.destroy();
  }
}
