import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_HEIGHT, GAME_WIDTH } from '../config';
import { FallingLeaves, drawBambooForest } from '../art/bamboo';
import { drawInkMountains } from '../art/inkMountains';
import { drawRedBear } from '../art/redBear';
import { placeArt } from '../art/slots';
import { CHAPTER1_STEPS } from '../game/chapter1';
import { startRun } from '../game/run';

/** 远处山崖的位置，红熊站在崖顶 */
const CLIFF = { x: 1010, y: 500 };

export class TitleScene extends Phaser.Scene {
  private leaves!: FallingLeaves;
  private bear?: Phaser.GameObjects.Graphics;

  constructor() {
    super('Title');
  }

  create() {
    const cx = GAME_WIDTH / 2;
    this.bear = undefined;

    // 有标题画就用标题画，没有就用代码画的远山、竹林和崖顶的红熊
    if (!placeArt(this, 'title', cx, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0.5, 0.5)) {
      drawInkMountains(this, { width: GAME_WIDTH, horizon: 380, bottom: GAME_HEIGHT, layers: 4, seed: 'title' });
      drawBambooForest(this, { width: GAME_WIDTH, height: GAME_HEIGHT, groundY: GAME_HEIGHT, seed: 'title-bamboo', backLayers: 1, mountains: false });
      const cliff = this.add.graphics();
      cliff.fillStyle(COLORS.ink, 0.85);
      cliff.fillPoints(
        [
          { x: CLIFF.x - 150, y: GAME_HEIGHT },
          { x: CLIFF.x - 60, y: CLIFF.y + 30 },
          { x: CLIFF.x - 20, y: CLIFF.y },
          { x: CLIFF.x + 40, y: CLIFF.y + 4 },
          { x: CLIFF.x + 110, y: CLIFF.y + 70 },
          { x: CLIFF.x + 230, y: GAME_HEIGHT },
        ],
        true,
      );
      this.bear = this.add.graphics();
    }
    this.leaves = new FallingLeaves(this, GAME_WIDTH, GAME_HEIGHT, 18);

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

    // 任意键进选角界面开新的一局；P 进练功场，B 用温少华直接打胖虎（调试用）
    this.entering = false;
    this.input.keyboard!.on('keydown', (e: KeyboardEvent) => {
      if (e.code === 'KeyP') return this.enterGame('Game');
      if (e.code === 'KeyB') {
        const run = startRun('wenShaohua');
        run.step = CHAPTER1_STEPS.findIndex((s) => s.kind === 'boss');
        return this.enterGame('PangHu');
      }
      this.enterGame('Select');
    });
    this.input.once('pointerdown', () => this.enterGame('Select'));
  }

  private entering = false;

  update(time: number, delta: number) {
    this.leaves.update(delta);
    if (this.bear) {
      // 红熊立在崖顶，披风被山风吹着轻轻摆
      this.bear.clear();
      drawRedBear(this.bear, CLIFF.x + 10, CLIFF.y + 2, 0.5, 0.95, Math.sin(time * 0.0015) * 6);
    }
  }

  private enterGame(scene: string, data?: object) {
    if (this.entering) return;
    this.entering = true;
    const cam = this.cameras.main;
    cam.fadeOut(400, 239, 231, 214);
    cam.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => this.scene.start(scene, data));
  }
}
