import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_WIDTH } from '../config';

/** 每个字打出来的间隔（毫秒） */
const CHAR_MS = 55;
const PAD = 12;

/** 头顶的台词气泡：宣纸底、浓墨边，一个字一个字打出来，念完停留一会儿再消失。 */
export class SpeechBubble {
  private readonly bg: Phaser.GameObjects.Graphics;
  private readonly text: Phaser.GameObjects.Text;
  private line = '';
  private elapsed = 0;
  private holdMs = 0;

  constructor(scene: Phaser.Scene) {
    this.bg = scene.add.graphics().setDepth(40);
    this.text = scene.add
      .text(0, 0, '', { fontFamily: FONT_BRUSH, fontSize: '24px', color: CSS_COLORS.ink, lineSpacing: 6 })
      .setDepth(41)
      .setVisible(false);
  }

  /** 换行请在台词里自己写 \n */
  say(line: string, holdMs = 1600) {
    this.line = line;
    this.elapsed = 0;
    this.holdMs = holdMs;
  }

  /** 念完并且停留时间也过了 */
  get done() {
    return this.elapsed >= this.line.length * CHAR_MS + this.holdMs;
  }

  /** x, y：说话人头顶 */
  update(delta: number, x: number, y: number) {
    this.bg.clear();
    if (!this.line || this.done) {
      this.text.setVisible(false);
      return;
    }
    this.elapsed += delta;

    // 气泡按整句的大小画，打字过程中不会忽大忽小
    this.text.setText(this.line);
    const w = this.text.width;
    const h = this.text.height;
    this.text.setText(this.line.slice(0, Math.floor(this.elapsed / CHAR_MS) + 1)).setVisible(true);

    const left = Phaser.Math.Clamp(x - w / 2 - PAD, 10, GAME_WIDTH - w - PAD * 2 - 10);
    const top = y - h - PAD * 2 - 16;
    const tailX = Phaser.Math.Clamp(x, left + 20, left + w + PAD * 2 - 20);

    this.bg.fillStyle(COLORS.paper, 0.96);
    this.bg.lineStyle(2, COLORS.ink);
    this.bg.fillRect(left, top, w + PAD * 2, h + PAD * 2);
    this.bg.strokeRect(left, top, w + PAD * 2, h + PAD * 2);
    this.bg.fillTriangle(tailX - 9, top + h + PAD * 2 - 1, tailX + 9, top + h + PAD * 2 - 1, tailX, y - 4);
    this.bg.lineBetween(tailX - 9, top + h + PAD * 2, tailX, y - 4);
    this.bg.lineBetween(tailX + 9, top + h + PAD * 2, tailX, y - 4);
    this.text.setPosition(left + PAD, top + PAD);
  }
}
