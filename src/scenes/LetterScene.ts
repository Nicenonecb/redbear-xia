import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_HEIGHT, GAME_WIDTH } from '../config';
import { drawInkMountains } from '../art/inkMountains';
import { drawRedBear } from '../art/redBear';
import { CHAPTER1_LETTERS } from '../game/chapter1';
import { endRun, getRun } from '../game/run';

/** 每个字打出来的间隔（毫秒） */
const CHAR_MS = 70;

/**
 * 过关嘱咐：红熊留给徒弟的一封信，一个字一个字写出来，落款"红熊"。
 * 写完显示"第一章 · 完"，按任意键回到标题（这一局到此结束）。
 */
export class LetterScene extends Phaser.Scene {
  private text!: Phaser.GameObjects.Text;
  private letter = '';
  private elapsed = 0;
  private finished = false;

  constructor() {
    super('Letter');
  }

  create() {
    const run = getRun();
    this.letter = CHAPTER1_LETTERS[run?.hero ?? 'wenShaohua'];
    this.elapsed = 0;
    this.finished = false;

    drawInkMountains(this, { width: GAME_WIDTH, horizon: 420, bottom: GAME_HEIGHT, layers: 3, seed: 'letter' });
    const bear = this.add.graphics();
    drawRedBear(bear, GAME_WIDTH - 200, GAME_HEIGHT - 40, 1.25, 0.85);

    // 信纸
    const paper = this.add.graphics();
    paper.fillStyle(COLORS.paper, 0.96);
    paper.fillRect(140, 110, 760, 420);
    paper.lineStyle(2, COLORS.ink, 0.8);
    paper.strokeRect(140, 110, 760, 420);

    this.add.text(180, 140, '红熊 · 嘱咐', { fontFamily: FONT_BRUSH, fontSize: '36px', color: CSS_COLORS.red });
    this.text = this.add.text(180, 200, '', {
      fontFamily: FONT_BRUSH,
      fontSize: '30px',
      color: CSS_COLORS.ink,
      lineSpacing: 16,
    });

    this.input.keyboard!.on('keydown', () => this.next());
    this.input.on('pointerdown', () => this.next());
    this.cameras.main.fadeIn(600, 239, 231, 214);
  }

  update(_time: number, delta: number) {
    if (this.finished) return;
    this.elapsed += delta;
    const shown = Math.min(this.letter.length, Math.floor(this.elapsed / CHAR_MS));
    this.text.setText(this.letter.slice(0, shown));
    if (shown >= this.letter.length) this.showEnd();
  }

  /** 写到一半按键就直接写完；写完再按键回标题 */
  private next() {
    if (!this.finished) {
      this.elapsed = this.letter.length * CHAR_MS;
      return;
    }
    endRun();
    const cam = this.cameras.main;
    cam.fadeOut(600, 239, 231, 214);
    cam.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => this.scene.start('Title'));
  }

  private showEnd() {
    this.finished = true;
    this.text.setText(this.letter);
    this.add.text(860, 470, '—— 红熊', { fontFamily: FONT_BRUSH, fontSize: '30px', color: CSS_COLORS.ink }).setOrigin(1, 0);
    const end = this.add
      .text(520, 590, '第一章 · 竹林 · 完', { fontFamily: FONT_BRUSH, fontSize: '40px', color: CSS_COLORS.paper })
      .setOrigin(0.5)
      .setAlpha(0);
    const hint = this.add
      .text(520, 640, '第二章 敬请期待　　按任意键回到标题', { fontFamily: FONT_BRUSH, fontSize: '22px', color: CSS_COLORS.paper })
      .setOrigin(0.5)
      .setAlpha(0);
    this.tweens.add({ targets: [end, hint], alpha: 1, duration: 900, delay: 400 });
  }
}
