import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_WIDTH } from '../config';
import { EnemyView } from '../art/enemyView';
import { drawThrowingKnife } from '../art/projectiles';
import { ENEMIES } from '../characters/bandits';
import type { Hurtable } from '../combat/hitbox';
import type { MoveEvent } from '../combat/moveTable';
import { Enemy } from '../entities/Enemy';
import { Projectile } from '../entities/Projectile';
import { CHAPTER1_ROOMS, type RoomDef, type SpawnDef } from '../game/chapter1';
import { CombatScene, GROUND_Y } from './CombatScene';

/** 上一波清完后隔多少帧刷下一波 */
const WAVE_GAP = 50;
/** 走到这里就算出了房间 */
const EXIT_X = GAME_WIDTH - 50;

export interface RoomData {
  room: number;
}

/**
 * 战斗房：进场封门，敌人分波刷出，清完右侧出口亮起，走过去进下一间。
 * 最后一间出去就是关底胖虎。
 */
export class RoomScene extends CombatScene {
  protected override playerStartX = 140;
  private roomIndex = 0;
  private room!: RoomDef;
  private enemies: { enemy: Enemy; view: EnemyView }[] = [];
  private wave = 0;
  private waveTimer = 0;
  private cleared = false;
  private gates!: Phaser.GameObjects.Graphics;
  private waveText!: Phaser.GameObjects.Text;
  private exitText!: Phaser.GameObjects.Text;
  private spawnCount = 0;

  constructor() {
    super('Room');
  }

  protected get stageName() {
    return this.room.name;
  }

  init(data: Partial<RoomData>) {
    this.roomIndex = data.room ?? 0;
    this.room = CHAPTER1_ROOMS[this.roomIndex];
    this.backgroundSeed = this.room.seed;
  }

  protected setup() {
    this.enemies = [];
    this.wave = 0;
    this.waveTimer = WAVE_GAP;
    this.cleared = false;
    this.spawnCount = 0;
    this.gates = this.add.graphics().setDepth(3);
    this.waveText = this.add
      .text(GAME_WIDTH - 24, 20, '', { fontFamily: FONT_BRUSH, fontSize: '24px', color: CSS_COLORS.ink })
      .setOrigin(1, 0);
    this.exitText = this.add
      .text(EXIT_X - 20, GROUND_Y - 150, '出\n口\n↓', {
        fontFamily: FONT_BRUSH,
        fontSize: '30px',
        color: CSS_COLORS.red,
        align: 'center',
        lineSpacing: -4,
      })
      .setOrigin(0.5, 0)
      .setVisible(false);
    this.tweens.add({ targets: this.exitText, alpha: 0.35, duration: 700, yoyo: true, repeat: -1 });
  }

  protected foes(): Hurtable[] {
    return this.enemies.map((e) => e.enemy);
  }

  protected tickWorld() {
    const enemies = this.enemies.map((e) => e.enemy);
    for (const e of enemies) {
      e.tick();
      this.reportHits(e.resolveHits([this.player]));
      e.separateFrom(enemies);
    }
    for (const entry of this.enemies) if (entry.enemy.gone) entry.view.destroy();
    this.enemies = this.enemies.filter((e) => !e.enemy.gone);

    if (this.cleared) {
      if (this.player.x >= EXIT_X) this.leave();
      return;
    }
    if (this.enemies.some((e) => !e.enemy.dead)) return;
    if (this.wave >= this.room.waves.length) {
      this.cleared = true;
      return;
    }
    if (--this.waveTimer <= 0) {
      this.spawnWave(this.room.waves[this.wave]);
      this.wave++;
      this.waveTimer = WAVE_GAP;
    }
  }

  protected renderWorld(delta: number) {
    for (const e of this.enemies) e.view.draw(delta);
    this.drawGates();
    const total = this.room.waves.length;
    this.waveText.setText(this.cleared ? '清场' : `第 ${Math.max(1, this.wave)} / ${total} 波`);
    this.exitText.setVisible(this.cleared);
  }

  protected override foeHitboxes() {
    return this.enemies.map((e) => e.enemy.activeHitbox());
  }

  protected override debugLines() {
    return this.enemies.map(({ enemy: e }) => {
      const move = e.runner.move ? `${e.runner.move.name}@${e.runner.frame}` : e.hurtFrames > 0 ? '硬直' : '—';
      return `${e.def.name}：${move} · 气血 ${e.hp}/${e.maxHp}`;
    });
  }

  private spawnWave(wave: SpawnDef[]) {
    const perSide = { left: 0, right: 0 };
    for (const s of wave) {
      const i = perSide[s.side]++;
      const x = s.side === 'right' ? GAME_WIDTH - 90 - i * 70 : 90 + i * 70;
      const def = ENEMIES[s.enemy];
      const enemy = new Enemy(this, x, GROUND_Y, def, this.player, `${this.room.seed}-${this.spawnCount++}`);
      this.physics.add.collider(enemy.zone, this.ground);
      // 大怪挡路，小怪可以穿过去；闪避时谁都能穿
      if (def.superArmor) this.physics.add.collider(this.player.zone, enemy.zone, undefined, () => !this.player.evading && !enemy.dead);
      enemy.events.on('move', (e: MoveEvent) => this.onEnemyMove(enemy, e));
      this.enemies.push({ enemy, view: new EnemyView(this, enemy) });
    }
  }

  private onEnemyMove(enemy: Enemy, e: MoveEvent) {
    if (e.type === 'vfx' && e.name === 'shake') this.shake();
    if (e.type === 'spawn' && e.name === 'knife' && enemy.def.projectile) {
      const spec = enemy.def.projectile;
      const draw = drawThrowingKnife(spec.hit.box.w);
      this.projectiles.push(
        new Projectile(this, enemy.x + 24 * enemy.facing, enemy.feetY - 46, enemy.facing, spec, 'enemy', draw),
      );
    }
  }

  /** 两边竹篱笆封门；清场后右边的篱笆撤掉，出口亮起 */
  private drawGates() {
    const g = this.gates;
    g.clear();
    const fence = (x: number) => {
      for (let i = 0; i < 3; i++) {
        g.fillStyle(COLORS.ink, 0.85);
        g.fillRect(x + i * 9, GROUND_Y - 120 + (i % 2) * 8, 6, 120 - (i % 2) * 8);
      }
      g.fillRect(x - 3, GROUND_Y - 96, 30, 4);
      g.fillRect(x - 3, GROUND_Y - 48, 30, 4);
    };
    fence(6);
    if (!this.cleared) {
      fence(GAME_WIDTH - 32);
    } else {
      // 出口的光：一道朱红从地面往上淡出去
      g.fillGradientStyle(COLORS.red, COLORS.red, COLORS.red, COLORS.red, 0, 0, 0.45, 0.45);
      g.fillRect(GAME_WIDTH - 46, GROUND_Y - 200, 46, 200);
    }
  }

  private leave() {
    const next = this.roomIndex + 1;
    if (next < CHAPTER1_ROOMS.length) this.transitionTo('Room', { room: next });
    else this.transitionTo('PangHu');
  }
}
