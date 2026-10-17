import Phaser from 'phaser';
import { sfx } from '../audio/sfx';
import { hasArt } from '../art/slots';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_HEIGHT, GAME_WIDTH } from '../config';

export interface ChoiceOption {
  label: string;
  detail?: string;
  /** 不能选（钱不够、已满级），画成淡墨 */
  disabled?: boolean;
}

export interface ChoiceConfig {
  title: string;
  subtitle?: string;
  options: ChoiceOption[];
  /** row：横排的卡片（升级三选一）；column：竖排的列表（商店） */
  layout?: 'row' | 'column';
  onPick: (index: number) => void;
  /** 有这个才能按 K / Esc 退出 */
  onCancel?: () => void;
  /** 选完不自动关闭（商店要连着买） */
  stayOpen?: boolean;
  /** 不盖暗幕（商店里要露出任新野） */
  noDim?: boolean;
  /** 面板的水平中心，默认屏幕正中 */
  centerX?: number;
}

const CARD = { w: 250, h: 170, gap: 36 };
const ROW = { w: 560, h: 66, gap: 12 };

/**
 * 选项面板：宣纸卡片、浓墨边，当前选中的描朱红。
 * A/D 或方向键选，J / 空格 / 回车确定；鼠标点也行。
 */
export class ChoicePanel {
  private readonly container: Phaser.GameObjects.Container;
  private readonly cards: {
    bg: Phaser.GameObjects.Graphics;
    texts: Phaser.GameObjects.Text[];
    /** 文字没被选中时的 y，选中时整张卡往上提一点 */
    baseY: number[];
    rect: Phaser.Geom.Rectangle;
  }[] = [];
  private index = 0;
  private closed = false;
  private readonly onKey = (e: KeyboardEvent) => this.handleKey(e);
  private readonly onPointer = (p: Phaser.Input.Pointer) => this.handlePointer(p);

  constructor(
    private readonly scene: Phaser.Scene,
    private config: ChoiceConfig,
  ) {
    this.container = scene.add.container(0, 0).setDepth(70);
    this.build();
    scene.input.keyboard!.on('keydown', this.onKey);
    scene.input.on('pointerdown', this.onPointer);
  }

  get isOpen() {
    return !this.closed;
  }

  /** 换一套选项（商店买完东西后价格、可选状态会变） */
  update(options: ChoiceOption[], subtitle?: string) {
    this.config = { ...this.config, options, subtitle: subtitle ?? this.config.subtitle };
    this.container.removeAll(true);
    this.cards.length = 0;
    this.build();
  }

  close() {
    if (this.closed) return;
    this.closed = true;
    this.scene.input.keyboard!.off('keydown', this.onKey);
    this.scene.input.off('pointerdown', this.onPointer);
    this.container.destroy();
  }

  private build() {
    const { title, subtitle, options, layout = 'row', noDim } = this.config;
    if (!noDim) {
      const dim = this.scene.add.graphics();
      dim.fillStyle(COLORS.ink, 0.55);
      dim.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      this.container.add(dim);
    }

    const cx = this.config.centerX ?? GAME_WIDTH / 2;
    const titleY = layout === 'row' ? 170 : 120;
    this.drawBackdrop(cx, titleY, options.length, layout);
    // 有卷轴底时标题写在卷面上，用浓墨；没有卷轴、又盖了暗幕时用宣纸色
    const titleColor = noDim || this.usesScroll() ? CSS_COLORS.ink : CSS_COLORS.paper;
    this.container.add(
      this.scene.add.text(cx, titleY, title, { fontFamily: FONT_BRUSH, fontSize: '44px', color: titleColor }).setOrigin(0.5),
    );
    if (subtitle) {
      this.container.add(
        this.scene.add
          .text(cx, titleY + 44, subtitle, { fontFamily: FONT_BRUSH, fontSize: '22px', color: titleColor, align: 'center' })
          .setOrigin(0.5, 0)
          .setAlpha(0.85),
      );
    }

    options.forEach((opt, i) => {
      const rect =
        layout === 'row'
          ? new Phaser.Geom.Rectangle(
              cx - (options.length * CARD.w + (options.length - 1) * CARD.gap) / 2 + i * (CARD.w + CARD.gap),
              300,
              CARD.w,
              CARD.h,
            )
          : new Phaser.Geom.Rectangle(cx - ROW.w / 2, 220 + i * (ROW.h + ROW.gap), ROW.w, ROW.h);
      const bg = this.scene.add.graphics();
      const label = this.scene.add.text(0, 0, opt.label, { fontFamily: FONT_BRUSH, fontSize: layout === 'row' ? '36px' : '28px', color: CSS_COLORS.ink });
      const texts = [label];
      if (layout === 'row') {
        label.setOrigin(0.5, 0).setPosition(rect.centerX, rect.y + 22);
        if (opt.detail) {
          texts.push(
            this.scene.add
              .text(rect.centerX, rect.y + 82, opt.detail, { fontFamily: FONT_BRUSH, fontSize: '22px', color: CSS_COLORS.ink, align: 'center', lineSpacing: 4 })
              .setOrigin(0.5, 0),
          );
        }
      } else {
        label.setOrigin(0, 0.5).setPosition(rect.x + 22, rect.centerY);
        if (opt.detail) {
          texts.push(
            this.scene.add
              .text(rect.right - 22, rect.centerY, opt.detail, { fontFamily: FONT_BRUSH, fontSize: '22px', color: CSS_COLORS.ink })
              .setOrigin(1, 0.5),
          );
        }
      }
      this.container.add([bg, ...texts]);
      this.cards.push({ bg, texts, baseY: texts.map((t) => t.y), rect });
    });

    if (this.config.options[this.index]?.disabled) this.index = this.firstEnabled();
    this.container.add(
      this.scene.add
        .text(cx, GAME_HEIGHT - 70, `A / D 选择 · J 确定${this.config.onCancel ? ' · K 返回' : ''}`, {
          fontFamily: FONT_BRUSH,
          fontSize: '20px',
          color: noDim ? CSS_COLORS.ink : CSS_COLORS.paper,
        })
        .setOrigin(0.5)
        .setAlpha(0.7),
    );
    this.redraw();
  }

  /** 横排的面板矮而宽，正好配横的卷轴；竖排的列表太高，卷轴放不下 */
  private usesScroll() {
    return (this.config.layout ?? 'row') === 'row' && hasArt(this.scene, 'ui_scroll');
  }

  /**
   * 面板底：横排面板铺一幅卷轴，内容写在卷面上；
   * 竖排、又不盖暗幕的（商店）垫一块淡宣纸，免得标题压在花哨的背景上看不清
   */
  private drawBackdrop(cx: number, titleY: number, count: number, layout: 'row' | 'column') {
    if (this.usesScroll()) {
      const contentW = count * CARD.w + (count - 1) * CARD.gap + 80;
      const top = titleY - 40;
      const bottom = 300 + CARD.h + 24;
      // 卷轴图里真正的纸面只占高度的中间 56%、宽度的中间 80%（上下是轴头，左右是木轴），按纸面来放大
      const img = this.scene.add
        .image(cx, (top + bottom) / 2, 'art:ui_scroll')
        .setDisplaySize(contentW / 0.8, (bottom - top) / 0.56);
      this.container.add(img);
      return;
    }
    if (!this.config.noDim || layout !== 'column') return;
    const top = titleY - 50;
    const bottom = 220 + count * (ROW.h + ROW.gap) + 16;
    const w = ROW.w + 60;
    const g = this.scene.add.graphics();
    g.fillStyle(COLORS.paper, 0.88);
    g.fillRoundedRect(cx - w / 2, top, w, bottom - top, 14);
    g.lineStyle(2, COLORS.ink, 0.5);
    g.strokeRoundedRect(cx - w / 2, top, w, bottom - top, 14);
    this.container.add(g);
  }

  private redraw() {
    this.cards.forEach(({ bg, texts, baseY, rect }, i) => {
      const opt = this.config.options[i];
      const selected = i === this.index;
      const lift = selected ? 6 : 0;
      bg.clear();
      bg.fillStyle(COLORS.paper, 0.97);
      bg.fillRect(rect.x, rect.y - lift, rect.width, rect.height);
      bg.lineStyle(selected ? 4 : 2, selected ? COLORS.red : COLORS.ink);
      bg.strokeRect(rect.x, rect.y - lift, rect.width, rect.height);
      texts.forEach((t, k) => t.setAlpha(opt.disabled ? 0.35 : 1).setY(baseY[k] - lift));
    });
  }

  private firstEnabled() {
    return Math.max(0, this.config.options.findIndex((o) => !o.disabled));
  }

  private moveSelection(step: number) {
    const n = this.config.options.length;
    for (let k = 1; k <= n; k++) {
      const i = (this.index + step * k + n * k) % n;
      if (!this.config.options[i].disabled) {
        this.index = i;
        break;
      }
    }
    sfx.play('ui-move');
    this.redraw();
  }

  private pick(i: number) {
    if (this.closed || this.config.options[i]?.disabled) return;
    sfx.play('ui-confirm');
    if (!this.config.stayOpen) this.close();
    this.config.onPick(i);
  }

  private handleKey(e: KeyboardEvent) {
    if (this.closed || e.repeat) return;
    const prev = ['KeyA', 'KeyW', 'ArrowLeft', 'ArrowUp'];
    const next = ['KeyD', 'KeyS', 'ArrowRight', 'ArrowDown'];
    if (prev.includes(e.code)) this.moveSelection(-1);
    else if (next.includes(e.code)) this.moveSelection(1);
    else if (['KeyJ', 'Space', 'Enter'].includes(e.code)) this.pick(this.index);
    else if (['KeyK', 'Escape'].includes(e.code) && this.config.onCancel) {
      this.close();
      this.config.onCancel();
    }
  }

  private handlePointer(p: Phaser.Input.Pointer) {
    const i = this.cards.findIndex((c) => c.rect.contains(p.x, p.y));
    if (i < 0) return;
    this.index = i;
    this.pick(i);
  }
}
