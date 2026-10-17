import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_HEIGHT, GAME_WIDTH } from '../config';
import type { HeroView } from '../art/heroView';
import { sfx } from '../audio/sfx';
import { drawInkMountains } from '../art/inkMountains';
import { addPaperGrain, coverArt, placeArt } from '../art/slots';
import { HEROES } from '../characters/heroes';
import type { Fighter } from '../entities/Fighter';
import { sceneForStep } from '../game/flow';
import type { HeroId } from '../game/progression';
import { startRun } from '../game/run';

const ORDER: HeroId[] = ['wenShaohua', 'yuWuxia'];
const CARD = { w: 460, h: 470, y: 150 };
/** 立绘放大倍数 */
const SCALE = 2.4;

/**
 * 选角界面「红熊门下」：两位徒弟各占一张卡，选中的那张描朱红，发带长发随风飘。
 * A/D 选择，J / 空格 / 回车确定；鼠标点卡片也行。
 */
export class SelectScene extends Phaser.Scene {
  private index = 0;
  private frames!: Phaser.GameObjects.Graphics;
  /** 没有立绘图的主角用剪影画，card 是对应第几张卡 */
  private views: { view: HeroView; stand: Fighter; card: number }[] = [];
  /** 有立绘图的主角：选中的那张亮一点、大一点 */
  private arts: { img: Phaser.GameObjects.Image; card: number; scale: number }[] = [];
  private cards: Phaser.Geom.Rectangle[] = [];
  private chosen = false;

  constructor() {
    super('Select');
  }

  create() {
    this.chosen = false;
    this.views = [];
    this.arts = [];
    this.cards = [];
    if (!coverArt(this, 'bg_select')) {
      drawInkMountains(this, { width: GAME_WIDTH, horizon: 460, bottom: GAME_HEIGHT, layers: 3, seed: 'select' });
    }
    addPaperGrain(this);
    this.add
      .text(GAME_WIDTH / 2, 70, '红熊门下', { fontFamily: FONT_BRUSH, fontSize: '56px', color: CSS_COLORS.ink })
      .setOrigin(0.5);
    this.frames = this.add.graphics();

    ORDER.forEach((id, i) => {
      const hero = HEROES[id];
      const rect = new Phaser.Geom.Rectangle(GAME_WIDTH / 2 - CARD.w - 20 + i * (CARD.w + 40), CARD.y, CARD.w, CARD.h);
      this.cards.push(rect);
      const left = rect.x + 34;
      this.add.text(left, rect.y + 28, hero.def.name, { fontFamily: FONT_BRUSH, fontSize: '48px', color: CSS_COLORS.ink }).setDepth(12);
      this.add
        .text(left, rect.y + 90, `${hero.region} · ${hero.weapon}`, { fontFamily: FONT_BRUSH, fontSize: '24px', color: CSS_COLORS.red })
        .setDepth(12);
      this.add
        .text(left, rect.bottom - 120, hero.blurb, { fontFamily: FONT_BRUSH, fontSize: '20px', color: CSS_COLORS.ink, lineSpacing: 6 })
        .setDepth(12);

      // 立绘：有图用图，没图就用战斗里同一套画法放大画在卡片右侧
      const art = placeArt(this, id === 'wenShaohua' ? 'portrait_wenShaohua' : 'portrait_yuWuxia', rect.right - 125, rect.bottom - 116, 240, 350);
      if (art) {
        art.setDepth(11);
        this.arts.push({ img: art, card: i, scale: art.scaleX });
        return;
      }
      const view = hero.createView(this);
      view.setScale(SCALE);
      const stand = standIn(rect.right - 110, rect.y + 330, i === 0 ? 1 : -1, hero.def.ammo?.max ?? 0);
      this.views.push({ view, stand, card: i });
    });

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT - 40, 'A / D 选择 · J 确定 · Esc 返回', {
        fontFamily: FONT_BRUSH,
        fontSize: '22px',
        color: CSS_COLORS.ink,
        stroke: CSS_COLORS.paper,
        strokeThickness: 5,
      })
      .setOrigin(0.5)
      .setAlpha(0.8);

    this.input.keyboard!.on('keydown', (e: KeyboardEvent) => this.onKey(e));
    this.input.on('pointerdown', (p: Phaser.Input.Pointer) => {
      const i = this.cards.findIndex((r) => r.contains(p.worldX, p.worldY));
      if (i >= 0) {
        this.index = i;
        this.confirm();
      }
    });
    sfx.startAmbient();
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => sfx.stopAmbient());
    this.cameras.main.fadeIn(400, 239, 231, 214);
  }

  update(_time: number, delta: number) {
    this.frames.clear();
    this.cards.forEach((r, i) => {
      const selected = i === this.index;
      this.frames.fillStyle(COLORS.paper, selected ? 0.96 : 0.75);
      this.frames.fillRect(r.x, r.y, r.width, r.height);
      this.frames.lineStyle(selected ? 5 : 2, selected ? COLORS.red : COLORS.ink, selected ? 1 : 0.6);
      this.frames.strokeRect(r.x, r.y, r.width, r.height);
    });
    for (const { img, card, scale } of this.arts) {
      const selected = card === this.index;
      img.setAlpha(selected ? 1 : 0.5).setScale(scale * (selected ? 1.04 : 1));
    }
    // 选中的那位发带、长发跟着风飘，没选中的定格
    for (const { view, stand, card } of this.views) view.draw(stand, card === this.index ? delta : 0);
  }

  private onKey(e: KeyboardEvent) {
    if (this.chosen || e.repeat) return;
    if (['KeyA', 'ArrowLeft', 'KeyD', 'ArrowRight'].includes(e.code)) {
      this.index = 1 - this.index;
      sfx.play('ui-move');
    } else if (['KeyJ', 'Space', 'Enter'].includes(e.code)) this.confirm();
    else if (e.code === 'Escape') this.scene.start('Title');
  }

  private confirm() {
    if (this.chosen) return;
    this.chosen = true;
    sfx.play('ui-confirm');
    const run = startRun(ORDER[this.index]);
    const { key, data } = sceneForStep(run.step);
    const cam = this.cameras.main;
    cam.fadeOut(500, 239, 231, 214);
    cam.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => this.scene.start(key, data));
  }
}

/**
 * 选角界面里给画法用的"假人"：只带画画要读的那几个字段，站着不动。
 * 画布整体放大 SCALE 倍，所以坐标要先除回去
 */
function standIn(x: number, feetY: number, facing: 1 | -1, ammo: number) {
  return {
    x: x / SCALE,
    feetY: feetY / SCALE,
    facing,
    runner: { move: null, frame: 0 },
    body: { velocity: { x: 0, y: 0 } },
    grounded: true,
    evading: false,
    mercyFrames: 0,
    flash: 0,
    dead: false,
    hurtFrames: 0,
    chargeRatio: 0,
    ammo,
    isLocked: () => false,
  } as unknown as Fighter;
}
