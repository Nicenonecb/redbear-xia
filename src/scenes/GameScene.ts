import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_HEIGHT, GAME_WIDTH } from '../config';
import { drawInkMountains } from '../art/inkMountains';
import { WenShaohuaView } from '../art/wenShaohuaView';
import { WEN_SHAOHUA } from '../characters/wenShaohua';
import type { MoveEvent } from '../combat/moveTable';
import { CombatDebug } from '../debug/CombatDebug';
import { Fighter } from '../entities/Fighter';
import { SwordQi } from '../entities/SwordQi';
import { TrainingDummy } from '../entities/TrainingDummy';
import { Controls } from '../input/Controls';

const GROUND_Y = 620;
/** 逻辑帧固定 60 帧/秒，招式表的帧数才有意义，和显示器刷新率无关 */
const FRAME_MS = 1000 / 60;
/** 卡顿时最多补几帧，避免一次跳太远 */
const MAX_CATCHUP_FRAMES = 6;

/**
 * 战斗房占位场景：目前是练功场，温少华对着木人桩试招。
 * 敌人、波次和出口接入后替换木人桩。
 */
export class GameScene extends Phaser.Scene {
  private controls!: Controls;
  private player!: Fighter;
  private view!: WenShaohuaView;
  private dummy!: TrainingDummy;
  private debug!: CombatDebug;
  private swordQi: SwordQi[] = [];
  private accumulator = 0;

  constructor() {
    super('Game');
  }

  create() {
    this.controls = new Controls(this);
    this.swordQi = [];
    this.accumulator = 0;

    drawInkMountains(this, { width: GAME_WIDTH, horizon: 300, bottom: GROUND_Y, layers: 3, seed: 'bamboo-1' });

    // 地面：一道浓墨
    const ground = this.add.rectangle(GAME_WIDTH / 2, GROUND_Y + 50, GAME_WIDTH, 100, COLORS.ink);
    this.physics.add.existing(ground, true);

    this.dummy = new TrainingDummy(this, 820, GROUND_Y);
    this.player = new Fighter(this, 360, GROUND_Y, WEN_SHAOHUA, this.controls);
    this.physics.add.collider(this.player.zone, ground);
    // 闪避的无敌帧里可以穿身而过
    this.physics.add.collider(this.player.zone, this.dummy.blocker, undefined, () => !this.player.invulnerable);
    this.player.events.on('move', (e: MoveEvent) => this.onMoveEvent(e));
    this.view = new WenShaohuaView(this);
    this.debug = new CombatDebug(this);

    this.add.text(24, 20, '竹林 · 练功场', { fontFamily: FONT_BRUSH, fontSize: '28px', color: CSS_COLORS.ink });
    this.add
      .text(
        24,
        GAME_HEIGHT - 40,
        'A/D 移动 · W/空格 跳跃 · J 流云三式 · K 按住蓄力 少华一剑 · L/Shift 闪避 · ` 判定框 · Esc 返回',
        { fontFamily: FONT_BRUSH, fontSize: '20px', color: CSS_COLORS.paper },
      )
      .setAlpha(0.8);

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
    this.dummy.draw();
    this.debug.draw(this.player, this.dummy, this.swordQi);
  }

  private tick() {
    const targets = [this.dummy];
    this.player.tick();
    this.player.resolveHits(targets);
    for (const q of this.swordQi) q.tick(targets);
    this.swordQi = this.swordQi.filter((q) => q.alive);
    this.dummy.tick();
  }

  private onMoveEvent(e: MoveEvent) {
    if (e.type === 'spawn' && e.name === 'swordQi') {
      const p = this.player;
      this.swordQi.push(new SwordQi(this, p.x + 36 * p.facing, p.feetY - 46, p.facing, p.runner.charge));
    }
    // 音效、特效事件先留着，接入音频后在这里分发
  }
}
