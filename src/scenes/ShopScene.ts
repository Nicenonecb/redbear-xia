import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_WIDTH } from '../config';
import { sfx } from '../audio/sfx';
import { drawInkMountains } from '../art/inkMountains';
import { hasArt } from '../art/slots';
import { drawTeaStall } from '../art/teaStall';
import { CHAPTER1_SHOP_LINES } from '../game/chapter1';
import { advanceRun } from '../game/flow';
import { PROGRESSION, WEAPONS } from '../game/progression';
import { getRun, runStats, startRun, type RunState } from '../game/run';
import { ChoicePanel, type ChoiceOption } from '../ui/ChoicePanel';
import { Portrait } from '../ui/Portrait';
import { SpeechBubble } from '../ui/SpeechBubble';

const GROUND_Y = 620;
const STALL_X = 250;
/** 任新野头顶，气泡从这里冒出来 */
const HEAD = { x: STALL_X - 10, y: GROUND_Y - 200 };

/**
 * 任新野的茶摊：战斗房和关底之间歇脚的地方。
 * 卖三样东西：强化当前武器、下一档武器、金疮药；顺嘴透露下一关 Boss 的情报。
 */
export class ShopScene extends Phaser.Scene {
  private run!: RunState;
  private bubble!: SpeechBubble;
  private panel!: ChoicePanel;
  private lines: string[] = [];
  private leaving = false;

  constructor() {
    super('Shop');
  }

  create() {
    this.run = getRun() ?? startRun('wenShaohua');
    this.leaving = false;
    drawInkMountains(this, { width: GAME_WIDTH, horizon: 300, bottom: GROUND_Y, layers: 3, seed: 'tea-stall' });
    this.add.rectangle(GAME_WIDTH / 2, GROUND_Y + 50, GAME_WIDTH, 100, COLORS.ink);
    drawTeaStall(this, STALL_X, GROUND_Y, !hasArt(this, 'portrait_renXinye'));
    this.add.text(24, 20, '竹林 · 任新野的茶摊', { fontFamily: FONT_BRUSH, fontSize: '28px', color: CSS_COLORS.ink });

    new Portrait(this, 'portrait_renXinye', 'left').show();
    this.bubble = new SpeechBubble(this);
    this.lines = [CHAPTER1_SHOP_LINES.greeting, CHAPTER1_SHOP_LINES.intel];
    this.say(this.lines.shift()!);

    this.panel = new ChoicePanel(this, {
      title: '买点什么？',
      subtitle: this.status(),
      layout: 'column',
      noDim: true,
      stayOpen: true,
      centerX: 880,
      options: this.options(),
      onPick: (i) => this.buy(i),
    });
    sfx.startAmbient();
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => sfx.stopAmbient());
    this.cameras.main.fadeIn(400, 239, 231, 214);
  }

  update(_time: number, delta: number) {
    // 招呼念完接着说情报
    if (this.bubble.done && this.lines.length) this.say(this.lines.shift()!);
    this.bubble.update(delta, HEAD.x, HEAD.y);
  }

  private say(line: string) {
    this.bubble.say(line, 1800);
  }

  private status() {
    const s = runStats(this.run);
    return `铜钱 ${this.run.coins} 文 · 气血 ${this.run.hp}/${s.maxHp} · ${s.weaponName}`;
  }

  private options(): ChoiceOption[] {
    const run = this.run;
    const { refine, potion } = PROGRESSION.shop;
    const weapons = WEAPONS[run.hero];
    const current = weapons[run.weapon.tier];
    const next = weapons[run.weapon.tier + 1];
    const refinePrice = refine.prices[run.weapon.refine];
    const maxHp = runStats(run).maxHp;
    const price = (p: number) => (run.coins >= p ? `${p} 文` : `${p} 文（差 ${p - run.coins}）`);
    return [
      refinePrice === undefined
        ? { label: `强化${current.name}`, detail: '已强化到头', disabled: true }
        : { label: `强化${current.name}（伤害 +10%）`, detail: price(refinePrice), disabled: run.coins < refinePrice },
      next
        ? { label: `购买${next.name}`, detail: price(next.price), disabled: run.coins < next.price }
        : { label: '购买新兵器', detail: '已是最好的', disabled: true },
      run.hp >= maxHp
        ? { label: `${potion.name}（回复一半气血）`, detail: '气血是满的', disabled: true }
        : { label: `${potion.name}（回复一半气血）`, detail: price(potion.price), disabled: run.coins < potion.price },
      { label: '告辞', detail: '前面就是山寨' },
    ];
  }

  private buy(i: number) {
    if (this.leaving) return;
    const run = this.run;
    const { refine, potion } = PROGRESSION.shop;
    if (i === 3) return this.leave();
    if (i === 0) {
      run.coins -= refine.prices[run.weapon.refine];
      run.weapon.refine++;
    } else if (i === 1) {
      run.coins -= WEAPONS[run.hero][run.weapon.tier + 1].price;
      run.weapon.tier++;
      run.weapon.refine = 0;
    } else if (i === 2) {
      run.coins -= potion.price;
      const maxHp = runStats(run).maxHp;
      run.hp = Math.min(maxHp, run.hp + Math.round(maxHp * potion.heal));
    }
    sfx.play('coin');
    this.lines = [];
    this.say(Phaser.Utils.Array.GetRandom(CHAPTER1_SHOP_LINES.bought));
    this.panel.update(this.options(), this.status());
  }

  private leave() {
    this.leaving = true;
    this.panel.close();
    this.lines = [];
    this.say(CHAPTER1_SHOP_LINES.farewell);
    this.time.delayedCall(1400, () => advanceRun(this));
  }
}

