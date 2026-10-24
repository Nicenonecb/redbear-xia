import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_HEIGHT, GAME_WIDTH } from '../config';
import { drawInkMountains } from '../art/inkMountains';
import { drawRedBear } from '../art/redBear';
import { addPaperGrain, coverArt, hasArt, placeArt } from '../art/slots';
import { stageFor } from '../game/stages';
import { advanceRun } from '../game/flow';
import { getRun } from '../game/run';

/** 每个字打出来的间隔（毫秒） */
const CHAR_MS = 70;

/**
 * 过关嘱咐：红熊留给徒弟的一封信，一个字一个字写出来，落款"红熊"、盖一枚私印。
 * 写完再按键：有结尾插画就翻到插画页"第一章 · 竹林 · 完"，再按键回标题（这一局到此结束）。
 */
export class LetterScene extends Phaser.Scene {
  private text!: Phaser.GameObjects.Text;
  private letter = '';
  private elapsed = 0;
  private finished = false;
  /** 已经翻到结尾插画页 */
  private ending = false;

  constructor() {
    super('Letter');
  }

  create() {
    const run = getRun();
    this.letter = run ? stageFor(run).letters[run.hero] : '';
    this.elapsed = 0;
    this.finished = false;
    this.ending = false;

    if (!coverArt(this, 'bg_letter')) {
      drawInkMountains(this, { width: GAME_WIDTH, horizon: 420, bottom: GAME_HEIGHT, layers: 3, seed: 'letter' });
    }
    addPaperGrain(this);
    if (!placeArt(this, 'portrait_redBear', GAME_WIDTH - 200, GAME_HEIGHT, 360, 560)) {
      drawRedBear(this.add.graphics(), GAME_WIDTH - 200, GAME_HEIGHT - 40, 1.25, 0.85);
    }

    // 信纸：有旧信笺的图就用图，没有就画一张
    if (hasArt(this, 'paper_letter')) {
      this.add.image(520, 320, 'art:paper_letter').setDisplaySize(800, 456);
    } else {
      const paper = this.add.graphics();
      paper.fillStyle(COLORS.paper, 0.96);
      paper.fillRect(140, 110, 760, 420);
      paper.lineStyle(2, COLORS.ink, 0.8);
      paper.strokeRect(140, 110, 760, 420);
    }

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

  /** 写到一半按键就直接写完；写完再按键翻到结尾插画（没有插画就直接回标题），再按键回标题 */
  private next() {
    if (!this.finished) {
      this.elapsed = this.letter.length * CHAR_MS;
      return;
    }
    if (!this.ending && hasArt(this, 'ending_chapter1')) {
      this.showEnding();
      return;
    }
    advanceRun(this);
  }

  private showEnd() {
    this.finished = true;
    this.text.setText(this.letter);
    this.add.text(840, 470, '—— 红熊', { fontFamily: FONT_BRUSH, fontSize: '30px', color: CSS_COLORS.ink }).setOrigin(1, 0);
    placeArt(this, 'seal_signature', 880, 488, 58, 58, 0.5, 0.5)?.setAngle(-6);
    // 有结尾插画时"第一章 · 完"放到插画页上
    if (hasArt(this, 'ending_chapter1')) {
      const hint = this.add
        .text(520, 600, '按任意键继续', { fontFamily: FONT_BRUSH, fontSize: '22px', color: CSS_COLORS.ink, stroke: CSS_COLORS.paper, strokeThickness: 5 })
        .setOrigin(0.5)
        .setAlpha(0);
      this.tweens.add({ targets: hint, alpha: 0.8, duration: 900, delay: 400 });
      return;
    }
    const end = this.add
      .text(520, 590, `${stageFor(getRun()!).name} · 完`, { fontFamily: FONT_BRUSH, fontSize: '40px', color: CSS_COLORS.paper })
      .setOrigin(0.5)
      .setAlpha(0);
    const hint = this.add
      .text(520, 640, '按任意键继续旅程', { fontFamily: FONT_BRUSH, fontSize: '22px', color: CSS_COLORS.paper })
      .setOrigin(0.5)
      .setAlpha(0);
    this.tweens.add({ targets: [end, hint], alpha: 1, duration: 900, delay: 400 });
  }

  /** 结尾插画页：少年站在竹林尽头的山路口，远处是更大的群山；右上角写"第一章 · 竹林 · 完" */
  private showEnding() {
    this.ending = true;
    const page = this.add.container(0, 0).setDepth(80).setAlpha(0);
    const img = coverArt(this, 'ending_chapter1');
    if (img) page.add(img);
    const style = { fontFamily: FONT_BRUSH, color: CSS_COLORS.ink, stroke: CSS_COLORS.paper, strokeThickness: 6 };
    page.add([
      this.add.text(GAME_WIDTH - 90, 110, `${stageFor(getRun()!).name} · 完`, { ...style, fontSize: '52px' }).setOrigin(1, 0),
      this.add.text(GAME_WIDTH - 92, 186, '继续登山', { ...style, fontSize: '26px' }).setOrigin(1, 0),
      this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 40, '按任意键继续', { ...style, fontSize: '22px' }).setOrigin(0.5).setAlpha(0.8),
    ]);
    this.tweens.add({ targets: page, alpha: 1, duration: 900 });
  }
}
