import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_HEIGHT, GAME_WIDTH } from '../config';
import { sfx } from '../audio/sfx';
import { FallingLeaves, drawBambooForest } from '../art/bamboo';
import type { HeroView } from '../art/heroView';
import { drawRedBear } from '../art/redBear';
import { HEROES, type HeroEntry } from '../characters/heroes';
import type { HitResult, Hurtable } from '../combat/hitbox';
import type { MoveEvent } from '../combat/moveTable';
import { CombatDebug } from '../debug/CombatDebug';
import { Fighter } from '../entities/Fighter';
import type { Projectile } from '../entities/Projectile';
import { advanceRun } from '../game/flow';
import { PROGRESSION, RESCUE_LINES } from '../game/progression';
import { endRun, getRun, runStats, startRun, type RunState } from '../game/run';
import { Controls } from '../input/Controls';
import { DamageNumbers } from '../ui/DamageNumbers';
import { HealthBar } from '../ui/HealthBar';
import { RunHud } from '../ui/RunHud';
import { SpeechBubble } from '../ui/SpeechBubble';

export const GROUND_Y = 620;
/** 逻辑帧固定 60 帧/秒，招式表的帧数才有意义，和显示器刷新率无关 */
const FRAME_MS = 1000 / 60;
/** 卡顿时最多补几帧，避免一次跳太远 */
const MAX_CATCHUP_FRAMES = 6;
/** 顿帧达到这么多帧算重击：字更大，还会震屏 */
const HEAVY_HITSTOP = 8;
/** 红熊救场演出多长（毫秒） */
const RESCUE_MS = 2200;

/**
 * 战斗场景的公共部分：水墨背景和地面、主角、固定帧步进、飞行道具、血条和一局的界面、
 * 红熊濒死救场、调试显示。子类只管摆敌人、写敌人每帧做什么。
 */
export abstract class CombatScene extends Phaser.Scene {
  protected controls!: Controls;
  protected player!: Fighter;
  protected run!: RunState;
  protected ground!: Phaser.GameObjects.Rectangle;
  protected projectiles: Projectile[] = [];
  private hero!: HeroEntry;
  private view!: HeroView;
  private playerBar!: HealthBar;
  private hud!: RunHud;
  private numbers!: DamageNumbers;
  private debug!: CombatDebug;
  private leaves!: FallingLeaves;
  private accumulator = 0;
  /** 已经弹出结束大字（胜败、过关），不再重复 */
  private ended = false;
  /** 已经在切去下一步 */
  private leaving = false;
  /** 暂停战斗的原因（选项面板、救场演出）；有任何一个都不推进逻辑帧 */
  private pauses = new Set<string>();
  /** 正在播的红熊救场演出 */
  private rescueShow: {
    t: number;
    bearX: number;
    startHp: number;
    targetHp: number;
    dim: Phaser.GameObjects.Graphics;
    bear: Phaser.GameObjects.Graphics;
    bubble: SpeechBubble;
  } | null = null;

  /** 左上角的场景名 */
  protected abstract readonly stageName: string;
  /** 远山的随机种子 */
  protected backgroundSeed = 'bamboo-1';
  /** 玩家出场位置 */
  protected playerStartX = 360;
  /** 摆敌人、加碰撞，玩家已经创建好了 */
  protected abstract setup(): void;
  /** 玩家的攻击能打到谁 */
  protected abstract foes(): Hurtable[];
  /** 每个逻辑帧在玩家和飞行道具之后调用：敌人行动、结算敌人的攻击 */
  protected abstract tickWorld(): void;
  /** 每个画面帧调用：画敌人、更新界面 */
  protected abstract renderWorld(delta: number): void;

  /** 敌方正在生效的攻击判定，给调试显示用 */
  protected foeHitboxes(): (Phaser.Geom.Rectangle | null)[] {
    return [];
  }

  /** 调试显示里额外的状态行 */
  protected debugLines(): string[] {
    return [];
  }

  /** 红熊救场演出结束、战斗恢复时调用 */
  protected onRescued() {}

  create() {
    this.controls = new Controls(this);
    this.projectiles = [];
    this.accumulator = 0;
    this.ended = false;
    this.leaving = false;
    this.pauses = new Set();
    this.rescueShow = null;
    // 从练功场或调试快捷键直接进来时没有一局，临时开一局
    this.run = getRun() ?? startRun('wenShaohua');

    drawBambooForest(this, { width: GAME_WIDTH, height: GAME_HEIGHT, groundY: GROUND_Y, seed: this.backgroundSeed });
    this.leaves = new FallingLeaves(this, GAME_WIDTH, GROUND_Y);

    // 地面：一道浓墨
    this.ground = this.add.rectangle(GAME_WIDTH / 2, GROUND_Y + 50, GAME_WIDTH, 100, COLORS.ink);
    this.physics.add.existing(this.ground, true);

    this.hero = HEROES[this.run.hero];
    this.player = new Fighter(this, this.playerStartX, GROUND_Y, this.hero.def, this.controls, {
      ...runStats(this.run),
      hp: this.run.hp,
    });
    this.player.rescueBelow = this.run.rescueUsed ? 0 : PROGRESSION.rescue.below;
    this.physics.add.collider(this.player.zone, this.ground);
    this.player.events.on('move', (e: MoveEvent) => this.onPlayerMove(e));
    this.player.events.on('rescue', () => this.rescue());
    this.player.events.once('dead', () => this.onPlayerDead());
    this.view = this.hero.createView(this);

    // 左上角垫一块淡淡的宣纸，竹林再密也看得清血条和字
    const backdrop = this.add.graphics().setDepth(49);
    backdrop.fillGradientStyle(COLORS.paper, COLORS.paper, COLORS.paper, COLORS.paper, 0.85, 0, 0.85, 0);
    backdrop.fillRect(0, 0, 420, 140);
    this.add.text(24, 20, this.stageName, { fontFamily: FONT_BRUSH, fontSize: '28px', color: CSS_COLORS.ink }).setDepth(50);
    this.playerBar = new HealthBar(this, 24, 84, 240, this.hero.def.name);
    this.hud = new RunHud(this, 24, 104);
    this.numbers = new DamageNumbers(this);
    this.add
      .text(24, GAME_HEIGHT - 40, this.hero.hint, { fontFamily: FONT_BRUSH, fontSize: '20px', color: CSS_COLORS.paper })
      .setAlpha(0.8)
      .setDepth(50);

    this.setup();
    this.debug = new CombatDebug(this);

    sfx.startAmbient();
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => sfx.stopAmbient());

    this.input.keyboard!.on('keydown-ESC', () => {
      if (this.pauses.size) return;
      endRun();
      this.scene.start('Title');
    });
    this.cameras.main.fadeIn(400, 239, 231, 214);
  }

  update(_time: number, delta: number) {
    this.controls.update();
    if (!this.pauses.size) {
      for (const action of this.controls.justPressedActions) this.player.buffer.push(action);
      this.accumulator = Math.min(this.accumulator + delta, FRAME_MS * MAX_CATCHUP_FRAMES);
      while (this.accumulator >= FRAME_MS && !this.pauses.size) {
        this.accumulator -= FRAME_MS;
        this.tick();
      }
    }

    this.updateRescue(delta);
    this.leaves.update(delta);
    this.view.draw(this.player, delta);
    this.playerBar.draw(this.player.hp / this.player.maxHp, delta);
    this.hud.draw(this.run, this.player);
    this.renderWorld(delta);
    this.debug.draw(
      this.player,
      this.foes().map((f) => f.hurtbox()),
      [...this.foeHitboxes(), ...this.projectiles.map((p) => p.hitbox())],
      this.debugLines(),
    );
  }

  get isPaused() {
    return this.pauses.size > 0;
  }

  /** 暂停 / 恢复战斗；reason 用来区分是谁暂停的，几个原因同时存在时要全部解除才恢复 */
  protected setPaused(reason: string, paused: boolean) {
    if (paused) this.pauses.add(reason);
    else this.pauses.delete(reason);
  }

  /** 升级、买东西之后把一局的成长重新套到主角身上，当前气血不变 */
  protected refreshPlayerStats() {
    this.player.applyStats({ ...runStats(this.run), hp: this.player.hp });
  }

  /** 把当前气血写回一局，再走到下一步 */
  protected leave() {
    if (this.leaving) return;
    this.leaving = true;
    this.run.hp = this.player.hp;
    advanceRun(this);
  }

  /** 震屏：重击、砸地 */
  protected shake(strength = 0.008, duration = 180) {
    this.cameras.main.shake(duration, strength);
  }

  /** 每一次实际打中都报到这里：跳伤害数字，重击震屏 */
  protected reportHits(results: HitResult[]) {
    for (const { target, hit } of results) {
      const box = target.hurtbox();
      const heavy = hit.hitstop >= HEAVY_HITSTOP;
      this.numbers.show(box.centerX, box.top - 10, hit.damage, target === this.player, heavy);
      sfx.play(target === this.player ? 'hurt' : heavy ? 'hit-heavy' : 'hit');
      if (heavy) this.shake(0.006, 120);
    }
  }

  /** 敌人招式表里的音效、震屏事件，各个战斗场景共用 */
  protected onFoeMove(e: MoveEvent) {
    if (e.type === 'sfx') sfx.play(e.name);
    if (e.type === 'vfx' && e.name === 'shake') this.shake();
  }

  /** 头顶飘一行字（升级、拿到东西） */
  protected toast(text: string, x: number, y: number, color: string = CSS_COLORS.red) {
    const t = this.add
      .text(x, y, text, { fontFamily: FONT_BRUSH, fontSize: '30px', color, stroke: CSS_COLORS.paper, strokeThickness: 5 })
      .setOrigin(0.5)
      .setDepth(46);
    this.tweens.add({ targets: t, y: y - 50, alpha: 0, delay: 500, duration: 700, onComplete: () => t.destroy() });
  }

  /** 战斗结束：大字提示，过一会儿切到下一个场景 */
  protected finish(title: string, next: () => void, delayMs = 2600) {
    if (this.ended) return;
    this.ended = true;
    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40, title, { fontFamily: FONT_BRUSH, fontSize: '72px', color: CSS_COLORS.ink })
      .setOrigin(0.5)
      .setDepth(60);
    this.time.delayedCall(delayMs, next);
  }

  private tick() {
    this.player.tick();
    const foes = this.foes();
    this.reportHits(this.player.resolveHits(foes));
    for (const p of this.projectiles) this.reportHits(p.tick(p.team === 'player' ? foes : [this.player]));
    this.projectiles = this.projectiles.filter((p) => p.alive);
    this.tickWorld();
  }

  private onPlayerMove(e: MoveEvent) {
    if (e.type === 'sfx') sfx.play(e.name);
    if (e.type === 'spawn') {
      this.hero.spawn({ scene: this, player: this.player, addProjectile: (p) => this.projectiles.push(p) }, e.name);
    }
  }

  /**
   * 红熊濒死救场：画面一暗，红熊的剪影在徒弟身后闪现，说一句话，把气血回到一半。
   * 演出期间整场战斗暂停。动画按画面帧推进（不用 tween），逐帧测试时也能跑
   */
  private rescue() {
    this.run.rescueUsed = true;
    this.setPaused('rescue', true);
    sfx.play('rescue');
    const p = this.player;
    const bubble = new SpeechBubble(this);
    bubble.say(Phaser.Utils.Array.GetRandom(RESCUE_LINES), 1500);
    this.rescueShow = {
      t: 0,
      bearX: Phaser.Math.Clamp(p.x - 90 * p.facing, 80, GAME_WIDTH - 80),
      startHp: p.hp,
      targetHp: Math.max(p.hp, Math.round(p.maxHp * PROGRESSION.rescue.healTo)),
      dim: this.add.graphics().setDepth(30),
      bear: this.add.graphics().setDepth(31),
      bubble,
    };
  }

  private updateRescue(delta: number) {
    const r = this.rescueShow;
    if (!r) return;
    r.t = Math.min(1, r.t + delta / RESCUE_MS);
    // 前 15% 渐暗、红熊现身，最后 20% 一起淡掉
    const a = Math.min(Phaser.Math.Clamp(r.t / 0.15, 0, 1), Phaser.Math.Clamp((1 - r.t) / 0.2, 0, 1));
    r.dim.clear();
    r.dim.fillStyle(COLORS.ink, 0.55 * a);
    r.dim.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    r.bear.clear();
    drawRedBear(r.bear, r.bearX, GROUND_Y, 1.1, a, Math.sin(r.t * 8) * 4);
    r.bubble.update(delta, r.bearX, GROUND_Y - 230);
    // 气血在演出中段涨回去
    const heal = Phaser.Math.Clamp((r.t - 0.25) / 0.35, 0, 1);
    this.player.hp = Math.round(Phaser.Math.Linear(r.startHp, r.targetHp, heal));
    if (r.t < 1) return;

    r.dim.destroy();
    r.bear.destroy();
    r.bubble.destroy();
    this.rescueShow = null;
    this.setPaused('rescue', false);
    this.onRescued();
  }

  private onPlayerDead() {
    endRun();
    sfx.play('death');
    this.finish('胜败乃兵家常事', () => {
      const cam = this.cameras.main;
      cam.fadeOut(500, 239, 231, 214);
      cam.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => this.scene.start('Title'));
    });
  }
}
