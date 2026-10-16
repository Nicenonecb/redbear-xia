import Phaser from 'phaser';
import { GAME_WIDTH } from '../config';
import { sfx } from '../audio/sfx';
import { PangHuView } from '../art/pangHuView';
import { drawRoarRing, drawShockwave } from '../art/projectiles';
import { PANGHU } from '../characters/pangHu';
import type { Hurtable } from '../combat/hitbox';
import { totalFrames, type MoveEvent } from '../combat/moveTable';
import { PangHu } from '../entities/PangHu';
import { Projectile } from '../entities/Projectile';
import { PROGRESSION } from '../game/progression';
import { ChoicePanel } from '../ui/ChoicePanel';
import { HealthBar } from '../ui/HealthBar';
import { Portrait } from '../ui/Portrait';
import { SpeechBubble } from '../ui/SpeechBubble';
import { CombatScene, GROUND_Y } from './CombatScene';

const BOSS_BAR_WIDTH = 520;

/**
 * 第一关关底：竹林，山大王胖虎。
 * 开场白念完后二选一【拔剑 / 给钱】：钱给够了直接放行，不够嘲讽一句照样开打（钱照收）。
 * 半血变身猛虎；红熊救场之后再给一次给钱的机会。打败或者放行都算过关，接着是红熊的嘱咐。
 * 冲击波、虎啸音波都是两边各放一道。
 */
export class PangHuScene extends CombatScene {
  protected readonly stageName = '竹林 · 山大王';
  private boss!: PangHu;
  private bossView!: PangHuView;
  private bossBar!: HealthBar;
  private bubble!: SpeechBubble;
  private portrait!: Portrait;
  /** 一串台词念完以后要做的事 */
  private queue: { line: string; hold: number }[] = [];
  private afterTalk: (() => void) | null = null;
  private won = false;

  constructor() {
    super('PangHu');
  }

  protected setup() {
    this.boss = new PangHu(this, 1000, GROUND_Y, this.player);
    this.physics.add.collider(this.boss.zone, this.ground);
    // 闪避的无敌帧里可以从胖虎身上穿过去
    this.physics.add.collider(this.player.zone, this.boss.zone, undefined, () => !this.player.evading);
    this.bossView = new PangHuView(this);
    this.bossBar = new HealthBar(this, (GAME_WIDTH - BOSS_BAR_WIDTH) / 2, 52, BOSS_BAR_WIDTH, PANGHU.name);
    this.bossBar.setVisible(false);
    this.bubble = new SpeechBubble(this);
    this.portrait = new Portrait(this, 'portrait_pangHu', 'right');
    this.queue = [];
    this.afterTalk = null;
    this.won = false;
    this.talk([PANGHU.lines.intro], () => this.offerBribe());

    this.boss.events.on('move', (e: MoveEvent) => this.onBossMove(e));
    this.boss.events.on('transform', () => this.clearEnemyProjectiles());
    this.boss.events.on('roar', () => {
      sfx.play('roar');
      this.bubble.say(PANGHU.lines.transform, 900);
      this.shake(0.006, 900);
    });
    this.boss.events.on('burst', () => {
      sfx.play('burst');
      this.bossView.burst(this.boss.x, this.boss.feetY - 60);
      this.cameras.main.flash(250, 239, 231, 214);
      this.shake(0.014, 300);
    });
    this.boss.events.on('defeated', () => {
      this.clearEnemyProjectiles();
      this.talk([PANGHU.lines.defeated], () => this.win('竹林 · 过关'));
    });
  }

  protected foes(): Hurtable[] {
    return [this.boss];
  }

  protected tickWorld() {
    this.boss.tick();
    this.reportHits(this.boss.resolveHits([this.player]));
  }

  /** 红熊救完场，胖虎再给一次给钱的机会 */
  protected override onRescued() {
    if (this.boss.stage !== 'defeated' && this.run.coins > 0) this.offerBribe();
  }

  protected renderWorld(delta: number) {
    if (this.afterTalk && this.bubble.done) {
      const next = this.queue.shift();
      if (next) this.bubble.say(next.line, next.hold);
      else {
        const then = this.afterTalk;
        this.afterTalk = null;
        then();
      }
    }

    this.bossView.draw(this.boss, delta);
    this.bossBar.draw(this.boss.hp / this.boss.maxHp, delta);
    const headY = this.boss.feetY - (this.boss.form === 'human' ? 132 : 100);
    this.bubble.update(delta, this.boss.x, headY);
  }

  protected override foeHitboxes() {
    return [this.boss.activeHitbox()];
  }

  protected override debugLines() {
    const { move, frame } = this.boss.runner;
    const moveLine = move ? `${move.name} ${frame}/${totalFrames(move) - 1}` : '—';
    return [`胖虎：${this.boss.stage} · ${moveLine} · 气血 ${this.boss.hp}/${this.boss.maxHp}`];
  }

  private onBossMove(e: MoveEvent) {
    this.onFoeMove(e);
    if (e.type === 'spawn' && e.name === 'roarRing') {
      const spec = PANGHU.roarRing;
      const draw = drawRoarRing(spec.hit.box.h);
      const y = this.boss.feetY - spec.hit.box.h / 2 + 20;
      for (const dir of [1, -1] as const) {
        // 从胖虎正中间往外扩，贴身站着也躲不掉
        this.projectiles.push(new Projectile(this, this.boss.x, y, dir, spec, 'enemy', draw));
      }
    }
    if (e.type === 'spawn' && e.name === 'shockwave') {
      const { hit } = PANGHU.shockwave;
      const draw = drawShockwave(hit.box.w, hit.box.h);
      const y = this.boss.feetY - hit.box.h / 2;
      for (const dir of [1, -1] as const) {
        this.projectiles.push(new Projectile(this, this.boss.x + 100 * dir, y, dir, PANGHU.shockwave, 'enemy', draw));
      }
    }
  }

  /** 依次念几句台词（念的时候战斗暂停），念完再做 then */
  private talk(lines: string[], then: () => void) {
    this.setPaused('talk', true);
    this.portrait.setSlot(this.boss.form === 'tiger' ? 'portrait_pangHuTiger' : 'portrait_pangHu');
    this.portrait.show();
    const [first, ...rest] = lines;
    this.bubble.say(first, 1200);
    this.queue = rest.map((line) => ({ line, hold: 1400 }));
    this.afterTalk = () => {
      this.setPaused('talk', false);
      this.portrait.hide();
      then();
    };
  }

  /** 【拔剑 / 给钱】 */
  private offerBribe() {
    this.setPaused('bribe', true);
    const coins = this.run.coins;
    new ChoicePanel(this, {
      title: '拔剑，还是给钱？',
      subtitle: `身上有 ${coins} 文`,
      options: [
        { label: '拔剑', detail: '和他过两招' },
        { label: '给钱', detail: coins > 0 ? '破财消灾' : '囊中羞涩', disabled: coins <= 0 },
      ],
      onPick: (i) => (i === 0 ? this.drawSword() : this.chooseAmount()),
    });
  }

  private chooseAmount() {
    const { small, enough } = PROGRESSION.bribe;
    const coins = this.run.coins;
    const amounts = [small, enough, coins];
    new ChoicePanel(this, {
      title: '给多少？',
      subtitle: `身上有 ${coins} 文`,
      layout: 'column',
      options: [
        { label: `给 ${small} 文`, disabled: coins < small },
        { label: `给 ${enough} 文`, disabled: coins < enough },
        { label: '倾囊相助', detail: `${coins} 文` },
        { label: '算了，拔剑' },
      ],
      onPick: (i) => (i === 3 ? this.drawSword() : this.pay(amounts[i])),
      onCancel: () => this.offerBribe(),
    });
  }

  private pay(amount: number) {
    this.setPaused('bribe', false);
    this.run.coins -= amount;
    const { enough, generous } = PROGRESSION.bribe;
    if (amount < enough) {
      // 钱照收，照样开打
      const taunt = Phaser.Utils.Array.GetRandom(PANGHU.lines.bribePoor);
      this.talk([taunt], () => this.drawSword());
      return;
    }
    this.boss.yieldPath();
    this.clearEnemyProjectiles();
    this.bossBar.setVisible(false);
    const lines = amount >= generous ? [PANGHU.lines.bribePass, PANGHU.lines.bribeGenerous] : [PANGHU.lines.bribePass];
    this.talk(lines, () => this.win('竹林 · 放行'));
  }

  private drawSword() {
    this.setPaused('bribe', false);
    this.boss.startFight();
    this.bossBar.setVisible(true);
  }

  private win(title: string) {
    if (this.won) return;
    this.won = true;
    this.finish(title, () => this.leave(), 1800);
  }

  /** 变身和被打败时收掉场上的冲击波，玩家也能喘口气 */
  private clearEnemyProjectiles() {
    for (const p of this.projectiles) if (p.team === 'enemy') p.destroy();
    this.projectiles = this.projectiles.filter((p) => p.alive);
  }
}
