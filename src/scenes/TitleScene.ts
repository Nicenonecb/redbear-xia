import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_HEIGHT, GAME_WIDTH } from '../config';
import { sfx } from '../audio/sfx';
import { FallingLeaves, drawBambooForest } from '../art/bamboo';
import { drawInkMountains } from '../art/inkMountains';
import { drawRedBear } from '../art/redBear';
import { addPaperGrain, placeArt } from '../art/slots';
import { CHAPTER1_STEPS } from '../game/chapter1';
import { sceneForStep } from '../game/flow';
import { setRun, startRun } from '../game/run';
import { describeSave, loadRun } from '../game/save';

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
    addPaperGrain(this);
    // 底部压一道渐淡的墨，下面那几行提示字在亮的标题画上也看得清
    const band = this.add.graphics();
    band.fillGradientStyle(COLORS.ink, COLORS.ink, COLORS.ink, COLORS.ink, 0, 0, 0.78, 0.78);
    band.fillRect(0, GAME_HEIGHT - 190, GAME_WIDTH, 190);
    // 浏览器要等玩家第一次按键或点击才放出声音，在那之前风声先排着
    sfx.startAmbient();
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => sfx.stopAmbient());

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

    // 朱红印章：有篆刻印的图就用图，没有就画一个红方块写"红熊"
    const sealX = cx + 290;
    const sealY = 150;
    const seal = placeArt(this, 'seal_redBear', sealX, sealY, 84, 84, 0.5, 0.5);
    if (seal) {
      seal.setAngle(-4);
    } else {
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
    }

    // 有存档：J 继续、N 重新开始；没有存档：任意键入江湖
    const saved = loadRun();
    const prompt = this.add
      .text(cx, GAME_HEIGHT - 100, saved ? '— J · 继续　　N · 重新开始 —' : '— 按任意键 · 入江湖 —', {
        fontFamily: FONT_BRUSH,
        fontSize: '30px',
        color: CSS_COLORS.paper,
      })
      .setOrigin(0.5);
    if (saved) {
      this.add
        .text(cx, GAME_HEIGHT - 140, describeSave(saved), { fontFamily: FONT_BRUSH, fontSize: '20px', color: CSS_COLORS.paper })
        .setOrigin(0.5)
        .setAlpha(0.85);
    }
    this.tweens.add({ targets: prompt, alpha: 0.25, duration: 900, yoyo: true, repeat: -1 });
    this.add
      .text(cx, GAME_HEIGHT - 48, 'P · 练功场　　B · 直接打胖虎　　M · 静音　　- / = · 音量', { fontFamily: FONT_BRUSH, fontSize: '20px', color: CSS_COLORS.paper })
      .setOrigin(0.5)
      .setAlpha(0.6);

    this.cameras.main.fadeIn(600, 239, 231, 214);

    // P 进练功场，B 用温少华直接打胖虎（调试用，不存档）
    this.entering = false;
    this.input.keyboard!.on('keydown', (e: KeyboardEvent) => {
      if (e.code === 'KeyP') return this.enterGame('Game');
      if (e.code === 'KeyB') {
        const run = startRun('wenShaohua', false);
        run.step = CHAPTER1_STEPS.findIndex((s) => s.kind === 'boss');
        return this.enterGame('PangHu');
      }
      if (!saved) return this.enterGame('Select');
      if (['KeyJ', 'Enter', 'Space'].includes(e.code)) this.continueRun(saved);
      else if (e.code === 'KeyN') this.enterGame('Select');
    });
    this.input.once('pointerdown', () => (saved ? this.continueRun(saved) : this.enterGame('Select')));
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

  /** 读档：接着上次走到的那一步 */
  private continueRun(saved: NonNullable<ReturnType<typeof loadRun>>) {
    setRun(saved);
    const { key, data } = sceneForStep(saved.step);
    this.enterGame(key, data);
  }

  private enterGame(scene: string, data?: object) {
    if (this.entering) return;
    this.entering = true;
    const cam = this.cameras.main;
    cam.fadeOut(400, 239, 231, 214);
    cam.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => this.scene.start(scene, data));
  }
}
