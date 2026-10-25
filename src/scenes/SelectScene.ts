import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_HEIGHT, GAME_WIDTH } from '../config';
import { sfx } from '../audio/sfx';
import { drawInkMountains } from '../art/inkMountains';
import { addPaperGrain, coverArt, placeArt } from '../art/slots';
import { HEROES } from '../characters/heroes';
import { clearSave } from '../game/save';
import type { HeroId } from '../game/progression';
import { startRun } from '../game/run';

const ORDER: HeroId[] = ['wenShaohua', 'yuWuxia'];
/** 卡片尺寸：上下给标题、按键提示留足空，四周露出背景山水 */
const CARD = { w: 420, h: 420, y: 160, gap: 48 };

/**
 * 选角界面「红熊门下」：两位徒弟各占一张卡，选中的那张描朱红、立绘放大。
 * A/D 选择，J / 空格 / 回车确定；鼠标点卡片也行。
 */
export class SelectScene extends Phaser.Scene {
  private index = 0;
  private frames!: Phaser.GameObjects.Graphics;
  /** 有立绘图的主角：选中的那张亮一点、大一点 */
  private arts: { img: Phaser.GameObjects.Image; card: number; scale: number }[] = [];
  private cards: Phaser.Geom.Rectangle[] = [];
  private chosen = false;

  constructor() {
    super('Select');
  }

  create() {
    this.chosen = false;
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
      const rect = new Phaser.Geom.Rectangle(GAME_WIDTH / 2 - CARD.w - CARD.gap / 2 + i * (CARD.w + CARD.gap), CARD.y, CARD.w, CARD.h);
      this.cards.push(rect);
      const left = rect.x + 28;
      this.add.text(left, rect.y + 24, hero.def.name, { fontFamily: FONT_BRUSH, fontSize: '44px', color: CSS_COLORS.ink }).setDepth(12);
      this.add
        .text(left, rect.y + 80, `${hero.region} · ${hero.weapon}`, { fontFamily: FONT_BRUSH, fontSize: '22px', color: CSS_COLORS.red })
        .setDepth(12);
      this.add
        .text(left, rect.bottom - 106, hero.blurb, { fontFamily: FONT_BRUSH, fontSize: '19px', color: CSS_COLORS.ink, lineSpacing: 5 })
        .setDepth(12);

      // 优先使用立绘；缺图时使用已加载的地图站姿，首次进场则用兵器文字回退。
      const art = placeArt(this, id === 'wenShaohua' ? 'portrait_wenShaohua' : 'portrait_yuWuxia', rect.right - 110, rect.bottom - 104, 210, 300)
        ?? placeArt(this, id === 'wenShaohua' ? 'map_wenShaohua_s' : 'map_yuWuxia_s', rect.right - 110, rect.bottom - 104, 210, 300);
      if (art) {
        art.setDepth(11);
        this.arts.push({ img: art, card: i, scale: art.scaleX });
        return;
      }
      this.add.text(rect.right - 110, rect.y + 200, hero.weapon, {
        fontFamily: FONT_BRUSH, fontSize: '56px', color: CSS_COLORS.ink,
      }).setOrigin(0.5).setDepth(11);
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

  update() {
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
    const run = startRun(ORDER[this.index], false);
    run.temporary = false; clearSave();
    const cam = this.cameras.main;
    cam.fadeOut(500, 239, 231, 214);
    cam.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => this.scene.start('Intro'));
  }
}
