import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_HEIGHT, GAME_WIDTH } from '../config';
import { hasArt, type ArtSlot } from '../art/slots';
import { BossCard } from '../ui/BossCard';
import { ChoicePanel, type ChoiceConfig } from '../ui/ChoicePanel';
import { CutIn } from '../ui/CutIn';
import { HealthBar } from '../ui/HealthBar';
import { IntroCard } from '../ui/IntroCard';
import { Portrait } from '../ui/Portrait';
import { RunHud } from '../ui/RunHud';
import { SpeechBubble } from '../ui/SpeechBubble';
import type { RunState } from '../game/run';
import type { MapFighter } from '../map/combat/MapFighter';

/** 区域题卡：淡入、停住、淡出各多长（毫秒） */
const CARD_IN = 400;
const CARD_HOLD = 1900;
const CARD_OUT = 500;
/** 题卡里的画多宽；题卡摆在右上角，镜头跟着人、人总在画面正中，放正中会把人挡住 */
const CARD_WIDTH = 340;

export interface UIData {
  heroName: string;
  hint: string;
  run: RunState;
  player: MapFighter;
}

/** 画面上的一个点（1280×720 的设计坐标） */
export type ScreenPoint = { x: number; y: number };

/**
 * 地图上的界面层：单独一个场景叠在地图上面，不跟着地图镜头走。
 * 左上角区域名和血条、底部操作提示、走进新区域时一闪而过的题卡（用那片区域的横版画当插图）；
 * Boss 的血条和名牌、横幅特写、人物头顶的台词气泡（跟着地图上的人走）、胜败大字。
 */
export class UIScene extends Phaser.Scene {
  private areaText!: Phaser.GameObjects.Text;
  private hpBar!: HealthBar;
  private hp = { now: 1, max: 1 };
  private card: { container: Phaser.GameObjects.Container; t: number } | null = null;
  private bossBar!: HealthBar;
  private boss: number | null = null;
  private overlays: { update(delta: number): void; readonly done: boolean }[] = [];
  private bubble!: SpeechBubble;
  /** 说话的人现在在画面上哪儿（每帧问一次，人走了气泡跟着走） */
  private speaker: (() => ScreenPoint) | null = null;
  /** 说话时角上的立绘：left 我方 / 中立（红熊、任新野），right 对手（胖虎） */
  private portraits!: Record<'left' | 'right', Portrait>;
  private hud!: RunHud;
  private run!: RunState;
  private player!: MapFighter;
  private waveText!: Phaser.GameObjects.Text;
  private dim!: Phaser.GameObjects.Graphics;
  private dimAlpha = 0;
  private dimTarget = 0;

  constructor() {
    super('UI');
  }

  create(data: UIData) {
    this.card = null;
    const backdrop = this.add.graphics();
    backdrop.fillGradientStyle(COLORS.paper, COLORS.paper, COLORS.paper, COLORS.paper, 0.85, 0, 0.85, 0);
    backdrop.fillRect(0, 0, 420, 120);
    backdrop.fillRect(0, 120, 420, 30);
    this.areaText = this.add.text(24, 20, '', { fontFamily: FONT_BRUSH, fontSize: '28px', color: CSS_COLORS.ink });
    this.hpBar = new HealthBar(this, 24, 84, 240, data.heroName);
    this.run = data.run;
    this.player = data.player;
    this.hud = new RunHud(this, 24, 104);
    this.waveText = this.add
      .text(GAME_WIDTH - 30, GAME_HEIGHT - 40, '', {
        fontFamily: FONT_BRUSH,
        fontSize: '24px',
        color: CSS_COLORS.ink,
        stroke: CSS_COLORS.paper,
        strokeThickness: 5,
      })
      .setOrigin(1, 0.5);
    this.dim = this.add.graphics().setDepth(30);
    this.dimAlpha = 0;
    this.dimTarget = 0;
    this.portraits = { left: new Portrait(this, 'portrait_redBear', 'left'), right: new Portrait(this, 'portrait_pangHu', 'right') };
    this.add
      .text(24, GAME_HEIGHT - 40, data.hint, {
        fontFamily: FONT_BRUSH,
        fontSize: '20px',
        color: CSS_COLORS.ink,
        stroke: CSS_COLORS.paper,
        strokeThickness: 5,
      })
      .setAlpha(0.85);
    this.bossBar = new HealthBar(this, GAME_WIDTH / 2 - 300, 64, 600, '山大王 · 胖虎');
    this.bossBar.setVisible(false);
    this.boss = null;
    this.overlays = [];
    this.bubble = new SpeechBubble(this);
    this.speaker = null;
  }

  /** Boss 血条：传气血比例显示，传 null 收起来 */
  setBoss(ratio: number | null, name = '山大王 · 胖虎') {
    if ((ratio === null) !== (this.boss === null)) this.bossBar.setVisible(ratio !== null);
    this.bossBar.setName(name);
    this.boss = ratio;
  }

  /** 横幅特写从右往左扫过去 */
  cutIn(slot: ArtSlot) {
    this.overlays.push(new CutIn(this, slot, GAME_HEIGHT * 0.42, 80));
  }

  /** Boss 名牌 */
  bossCard(name = '胖虎', title = '山大王', art: ArtSlot = 'card_boss_pangHu') {
    this.overlays.push(new BossCard(this, art, title, name));
  }

  /**
   * 冒一句台词；where 每帧返回说话人头顶在画面上的位置。
   * portrait 给了就在画面角上亮出说话人的立绘，气泡从立绘嘴边冒出来
   */
  say(line: string, holdMs: number, where: () => ScreenPoint, portrait?: { slot: ArtSlot; side: 'left' | 'right' }) {
    this.speaker = where;
    this.bubble.say(line, holdMs);
    for (const side of ['left', 'right'] as const) {
      const p = this.portraits[side];
      if (portrait?.side === side) {
        p.setSlot(portrait.slot);
        p.show();
      } else p.hide();
    }
  }

  /** 这句台词念完、停留时间也过了 */
  get talkDone() {
    return this.bubble.done;
  }

  /** 收起立绘 */
  endTalk() {
    this.portraits.left.hide();
    this.portraits.right.hide();
  }

  /** 选项面板（升级三选一、拔剑还是给钱） */
  activeChoice?: ChoicePanel;
  choice(config: ChoiceConfig) {
    this.activeChoice?.close();
    return this.activeChoice = new ChoicePanel(this, config);
  }

  /** 这一局第一次见到的敌人：右下角弹一张登场提示 */
  introCard(slot: ArtSlot, name: string, tip: string, tier: string) {
    this.overlays.push(new IntroCard(this, slot, name, tip, tier));
  }

  /** 右下角的波数（遭遇战里），null 收起来 */
  setWave(text: string | null) {
    this.waveText.setText(text ?? '');
  }

  /** 画面压暗（红熊救场） */
  setDim(on: boolean) {
    this.dimTarget = on ? 0.55 : 0;
  }


  /** 画面正中的大字（胜败乃兵家常事、过关） */
  banner(text: string) {
    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40, text, {
        fontFamily: FONT_BRUSH,
        fontSize: '72px',
        color: CSS_COLORS.ink,
        stroke: CSS_COLORS.paper,
        strokeThickness: 8,
      })
      .setOrigin(0.5)
      .setDepth(90);
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
    if (this.boss !== null) this.bossBar.draw(this.boss, delta);
    for (const o of this.overlays) o.update(delta);
    this.overlays = this.overlays.filter((o) => !o.done);
    const head = this.portraits.left.head ?? this.portraits.right.head;
    const at = head ?? this.speaker?.() ?? { x: -1000, y: -1000 };
    this.bubble.update(delta, at.x, at.y);
    this.hud.draw(this.run, this.player);
    this.dimAlpha += (this.dimTarget - this.dimAlpha) * Math.min(1, delta / 120);
    this.dim.clear();
    if (this.dimAlpha > 0.01) {
      this.dim.fillStyle(COLORS.ink, this.dimAlpha);
      this.dim.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }
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
