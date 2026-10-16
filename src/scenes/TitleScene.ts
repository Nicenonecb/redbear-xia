import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_HEIGHT, GAME_WIDTH } from '../config';
import { drawInkMountains } from '../art/inkMountains';
import { CHAPTER1_STEPS } from '../game/chapter1';
import { sceneForStep } from '../game/flow';
import { startRun } from '../game/run';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    const cx = GAME_WIDTH / 2;

    drawInkMountains(this, { width: GAME_WIDTH, horizon: 380, bottom: GAME_HEIGHT, layers: 4, seed: 'title' });

    this.add
      .text(cx, 200, '红熊大侠', { fontFamily: FONT_BRUSH, fontSize: '128px', color: CSS_COLORS.ink })
      .setOrigin(0.5);

    this.add
      .text(cx, 300, 'RED BEAR · WAY OF THE XIA', {
        fontFamily: 'Georgia, serif',
        fontSize: '22px',
        color: CSS_COLORS.ink,
        letterSpacing: 6,
      })
      .setOrigin(0.5)
      .setAlpha(0.7);

    // 朱红印章
    const sealX = cx + 290;
    const sealY = 150;
    this.add.rectangle(sealX, sealY, 64, 64, COLORS.red).setAngle(-4);
    this.add
      .text(sealX, sealY, '红\n熊', {
        fontFamily: FONT_BRUSH,
        fontSize: '26px',
        color: CSS_COLORS.paper,
        align: 'center',
        lineSpacing: -6,
      })
      .setOrigin(0.5)
      .setAngle(-4);

    const prompt = this.add
      .text(cx, GAME_HEIGHT - 90, '— 按任意键 · 入江湖 —', {
        fontFamily: FONT_BRUSH,
        fontSize: '30px',
        color: CSS_COLORS.paper,
      })
      .setOrigin(0.5);
    this.tweens.add({ targets: prompt, alpha: 0.25, duration: 900, yoyo: true, repeat: -1 });
    this.add
      .text(cx, GAME_HEIGHT - 48, 'P · 练功场　　B · 直接打胖虎', { fontFamily: FONT_BRUSH, fontSize: '20px', color: CSS_COLORS.paper })
      .setOrigin(0.5)
      .setAlpha(0.6);

    this.cameras.main.fadeIn(600, 239, 231, 214);

    // 任意键开新的一局，从第一间战斗房开始；P 进练功场，B 直接打胖虎（调试用）
    this.entering = false;
    this.input.keyboard!.on('keydown', (e: KeyboardEvent) => {
      if (e.code === 'KeyP') return this.enterGame('Game');
      const run = startRun('wenShaohua');
      if (e.code === 'KeyB') run.step = CHAPTER1_STEPS.findIndex((s) => s.kind === 'boss');
      const { key, data } = sceneForStep(run.step);
      this.enterGame(key, data);
    });
    this.input.once('pointerdown', () => {
      startRun('wenShaohua');
      this.enterGame('Room', { room: 0 });
    });
  }

  private entering = false;

  private enterGame(scene: string, data?: object) {
    if (this.entering) return;
    this.entering = true;
    const cam = this.cameras.main;
    cam.fadeOut(400, 239, 231, 214);
    cam.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => this.scene.start(scene, data));
  }
}
