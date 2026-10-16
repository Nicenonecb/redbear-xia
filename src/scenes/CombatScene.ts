import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_HEIGHT, GAME_WIDTH } from '../config';
import { drawInkMountains } from '../art/inkMountains';
import { drawSwordQi } from '../art/projectiles';
import { WenShaohuaView } from '../art/wenShaohuaView';
import { SWORD_QI_LEVELS, WEN_SHAOHUA, swordQiLevel } from '../characters/wenShaohua';
import type { HitResult, Hurtable } from '../combat/hitbox';
import type { MoveEvent } from '../combat/moveTable';
import { CombatDebug } from '../debug/CombatDebug';
import { Fighter } from '../entities/Fighter';
import { Projectile } from '../entities/Projectile';
import { Controls } from '../input/Controls';
import { DamageNumbers } from '../ui/DamageNumbers';
import { HealthBar } from '../ui/HealthBar';

export const GROUND_Y = 620;
/** 逻辑帧固定 60 帧/秒，招式表的帧数才有意义，和显示器刷新率无关 */
const FRAME_MS = 1000 / 60;
/** 卡顿时最多补几帧，避免一次跳太远 */
const MAX_CATCHUP_FRAMES = 6;
/** 顿帧达到这么多帧算重击：字更大，还会震屏 */
const HEAVY_HITSTOP = 8;

const HINT = 'A/D 移动 · W/空格 跳跃 · J 流云三式 · K 按住蓄力 少华一剑 · L/Shift 闪避 · ` 判定框 · Esc 返回';

/**
 * 战斗场景的公共部分：水墨背景和地面、温少华、固定帧步进、飞行道具、血条、调试显示。
 * 子类只管摆敌人、写敌人每帧做什么。
 */
export abstract class CombatScene extends Phaser.Scene {
  protected controls!: Controls;
  protected player!: Fighter;
  protected ground!: Phaser.GameObjects.Rectangle;
  protected projectiles: Projectile[] = [];
  private view!: WenShaohuaView;
  private playerBar!: HealthBar;
  private numbers!: DamageNumbers;
  private debug!: CombatDebug;
  private accumulator = 0;
  private ended = false;

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

  create() {
    this.controls = new Controls(this);
    this.projectiles = [];
    this.accumulator = 0;
    this.ended = false;

    drawInkMountains(this, { width: GAME_WIDTH, horizon: 300, bottom: GROUND_Y, layers: 3, seed: this.backgroundSeed });

    // 地面：一道浓墨
    this.ground = this.add.rectangle(GAME_WIDTH / 2, GROUND_Y + 50, GAME_WIDTH, 100, COLORS.ink);
    this.physics.add.existing(this.ground, true);

    this.player = new Fighter(this, this.playerStartX, GROUND_Y, WEN_SHAOHUA, this.controls);
    this.physics.add.collider(this.player.zone, this.ground);
    this.player.events.on('move', (e: MoveEvent) => this.onPlayerMove(e));
    this.player.events.once('dead', () => this.onPlayerDead());
    this.view = new WenShaohuaView(this);

    this.add.text(24, 20, this.stageName, { fontFamily: FONT_BRUSH, fontSize: '28px', color: CSS_COLORS.ink });
    this.playerBar = new HealthBar(this, 24, 84, 240, WEN_SHAOHUA.name);
    this.numbers = new DamageNumbers(this);
    this.add
      .text(24, GAME_HEIGHT - 40, HINT, { fontFamily: FONT_BRUSH, fontSize: '20px', color: CSS_COLORS.paper })
      .setAlpha(0.8);

    this.setup();
    this.debug = new CombatDebug(this);

    this.input.keyboard!.on('keydown-ESC', () => this.scene.start('Title'));
    this.cameras.main.fadeIn(400, 239, 231, 214);
  }

  update(_time: number, delta: number) {
    this.controls.update();
    for (const action of this.controls.justPressedActions) this.player.buffer.push(action);

    this.accumulator = Math.min(this.accumulator + delta, FRAME_MS * MAX_CATCHUP_FRAMES);
    while (this.accumulator >= FRAME_MS) {
      this.accumulator -= FRAME_MS;
      this.tick();
    }

    this.view.draw(this.player, delta);
    this.playerBar.draw(this.player.hp / this.player.maxHp, delta);
    this.renderWorld(delta);
    this.debug.draw(
      this.player,
      this.foes().map((f) => f.hurtbox()),
      [...this.foeHitboxes(), ...this.projectiles.map((p) => p.hitbox())],
      this.debugLines(),
    );
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
      if (heavy) this.shake(0.006, 120);
    }
  }

  /** 淡出后切到下一个场景 */
  protected transitionTo(key: string, data?: object) {
    if (this.ended) return;
    this.ended = true;
    const cam = this.cameras.main;
    cam.fadeOut(400, 239, 231, 214);
    cam.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => this.scene.start(key, data));
  }

  /** 战斗结束：大字提示，过一会儿切到下一个场景 */
  protected finish(title: string, next: string, delayMs = 2600) {
    if (this.ended) return;
    this.ended = true;
    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40, title, { fontFamily: FONT_BRUSH, fontSize: '72px', color: CSS_COLORS.ink })
      .setOrigin(0.5)
      .setDepth(60);
    this.time.delayedCall(delayMs, () => {
      const cam = this.cameras.main;
      cam.fadeOut(500, 239, 231, 214);
      cam.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => this.scene.start(next));
    });
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
    if (e.type === 'spawn' && e.name === 'swordQi') {
      const p = this.player;
      const level = swordQiLevel(p.runner.charge);
      const draw = drawSwordQi(SWORD_QI_LEVELS.indexOf(level), level.hit.box.h);
      this.projectiles.push(
        new Projectile(this, p.x + 36 * p.facing, p.feetY - 46, p.facing, level, 'player', draw, p.damageScale),
      );
    }
    // 音效、特效事件先留着，接入音频后在这里分发
  }

  private onPlayerDead() {
    this.finish('胜败乃兵家常事', this.scene.key);
  }
}
