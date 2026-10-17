import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_HEIGHT, GAME_WIDTH } from '../config';
import { hasArt, type ArtSlot } from '../art/slots';
import { HealthBar } from '../ui/HealthBar';

/** 区域题卡：淡入、停住、淡出各多长（毫秒） */
const CARD_IN = 400;
const CARD_HOLD = 1900;
const CARD_OUT = 500;
/** 题卡里的画多宽；题卡摆在右上角，镜头跟着人、人总在画面正中，放正中会把人挡住 */
const CARD_WIDTH = 340;

export interface UIData {
  heroName: string;
  hint: string;
}

/**
 * 地图上的界面层：单独一个场景叠在地图上面，不跟着地图镜头走。
 * 左上角区域名和血条、底部操作提示、走进新区域时一闪而过的题卡（用那片区域的横版画当插图）。
 */
export class UIScene extends Phaser.Scene {
  private areaText!: Phaser.GameObjects.Text;
  private hpBar!: HealthBar;
  private hp = { now: 1, max: 1 };
  private card: { container: Phaser.GameObjects.Container; t: number } | null = null;

  constructor() {
    super('UI');
  }

  create(data: UIData) {
    this.card = null;
    const backdrop = this.add.graphics();
    backdrop.fillGradientStyle(COLORS.paper, COLORS.paper, COLORS.paper, COLORS.paper, 0.85, 0, 0.85, 0);
    backdrop.fillRect(0, 0, 420, 120);
    this.areaText = this.add.text(24, 20, '', { fontFamily: FONT_BRUSH, fontSize: '28px', color: CSS_COLORS.ink });
    this.hpBar = new HealthBar(this, 24, 84, 240, data.heroName);
    this.add
      .text(24, GAME_HEIGHT - 40, data.hint, {
        fontFamily: FONT_BRUSH,
        fontSize: '20px',
        color: CSS_COLORS.ink,
        stroke: CSS_COLORS.paper,
        strokeThickness: 5,
      })
      .setAlpha(0.85);
  }

  setArea(name: string) {
    this.areaText.setText(name);
  }

  setHp(now: number, max: number) {
    this.hp = { now, max };
  }

  /** 走进一片新区域：右上角亮出这片区域的画和名字 */
  showAreaCard(name: string, art: ArtSlot) {
    this.card?.container.destroy();
    const container = this.add.container(0, 0).setAlpha(0);
    const cx = GAME_WIDTH - 24 - CARD_WIDTH / 2;
    const y = 120;
    let nameY = y + 30;
    if (hasArt(this, art)) {
      const img = this.add.image(cx, y, `art:${art}`);
      img.setScale(CARD_WIDTH / img.width);
      nameY = y + img.displayHeight / 2 + 34;
      const frame = this.add.graphics();
      frame.lineStyle(3, COLORS.ink, 0.9);
      frame.strokeRect(cx - img.displayWidth / 2, y - img.displayHeight / 2, img.displayWidth, img.displayHeight);
      container.add([img, frame]);
    }
    container.add(
      this.add
        .text(cx, nameY, name, {
          fontFamily: FONT_BRUSH,
          fontSize: '44px',
          color: CSS_COLORS.ink,
          stroke: CSS_COLORS.paper,
          strokeThickness: 7,
        })
        .setOrigin(0.5),
    );
    this.card = { container, t: 0 };
  }

  update(_time: number, delta: number) {
    this.hpBar.draw(this.hp.now / this.hp.max, delta);
    const card = this.card;
    if (!card) return;
    card.t += delta;
    const t = card.t;
    const alpha = t < CARD_IN ? t / CARD_IN : t < CARD_IN + CARD_HOLD ? 1 : 1 - (t - CARD_IN - CARD_HOLD) / CARD_OUT;
    card.container.setAlpha(Math.max(0, alpha));
    card.container.y = t < CARD_IN ? (1 - t / CARD_IN) * -16 : 0;
    if (t >= CARD_IN + CARD_HOLD + CARD_OUT) {
      card.container.destroy();
      this.card = null;
    }
  }
}
