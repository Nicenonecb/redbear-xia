import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_WIDTH } from '../config';
import { EnemyView } from '../art/enemyView';
import { drawThrowingKnife } from '../art/projectiles';
import { ENEMIES } from '../characters/bandits';
import type { Hurtable } from '../combat/hitbox';
import type { MoveEvent } from '../combat/moveTable';
import { Coin } from '../entities/Coin';
import { Enemy } from '../entities/Enemy';
import { Projectile } from '../entities/Projectile';
import { CHAPTER1_ROOMS, type RoomDef, type SpawnDef } from '../game/chapter1';
import { PROGRESSION, type StatId } from '../game/progression';
import { applyLevelUp, gainExp } from '../game/run';
import { ChoicePanel } from '../ui/ChoicePanel';
import { CombatScene, GROUND_Y } from './CombatScene';

/** 上一波清完后隔多少帧刷下一波 */
const WAVE_GAP = 50;
/** 走到这里就算出了房间 */
const EXIT_X = GAME_WIDTH - 50;

export interface RoomData {
  room: number;
}

/**
 * 战斗房：进场封门，敌人分波刷出。打倒敌人得经验、掉铜钱。
 * 清场后先把攒下的升级选掉，然后右侧出口亮起，走过去进下一步。
 */
export class RoomScene extends CombatScene {
  protected override playerStartX = 140;
  private roomIndex = 0;
  private room!: RoomDef;
  private enemies: { enemy: Enemy; view: EnemyView }[] = [];
  private wave = 0;
  private waveTimer = 0;
  private cleared = false;
  /** 升级选完了，出口才开 */
  private exitOpen = false;
  private coins: Coin[] = [];
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
    this.exitOpen = false;
    this.coins = [];
    this.spawnCount = 0;
    this.gates = this.add.graphics().setDepth(21);
    const backdrop = this.add.graphics().setDepth(49);
    backdrop.fillGradientStyle(COLORS.paper, COLORS.paper, COLORS.paper, COLORS.paper, 0, 0.85, 0, 0.85);
    backdrop.fillRect(GAME_WIDTH - 260, 0, 260, 70);
    this.waveText = this.add
      .text(GAME_WIDTH - 50, 20, '', { fontFamily: FONT_BRUSH, fontSize: '24px', color: CSS_COLORS.ink })
      .setOrigin(1, 0)
      .setDepth(50);
    this.exitText = this.add
      .text(EXIT_X - 20, GROUND_Y - 150, '出\n口\n↓', {
        fontFamily: FONT_BRUSH,
        fontSize: '30px',
        color: CSS_COLORS.red,
        align: 'center',
        lineSpacing: -4,
      })
      .setOrigin(0.5, 0)
      .setDepth(21)
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
    for (const c of this.coins) if (c.tick(this.player)) this.run.coins += c.value;
    this.coins = this.coins.filter((c) => !c.collected);

    if (this.cleared) {
      if (this.exitOpen && this.player.x >= EXIT_X) this.leave();
      return;
    }
    if (this.enemies.some((e) => !e.enemy.dead)) return;
    if (this.wave >= this.room.waves.length) {
      this.cleared = true;
      this.offerLevelUps();
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
    this.exitText.setVisible(this.exitOpen);
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
      enemy.events.once('dead', () => this.onEnemyDead(enemy));
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
    if (!this.exitOpen) {
      fence(GAME_WIDTH - 32);
    } else {
      // 出口的光：一道朱红从地面往上淡出去
      g.fillGradientStyle(COLORS.red, COLORS.red, COLORS.red, COLORS.red, 0, 0, 0.45, 0.45);
      g.fillRect(GAME_WIDTH - 46, GROUND_Y - 200, 46, 200);
    }
  }

  /** 打倒敌人：给经验，掉铜钱；升级了在头顶提示一下，等清场再选 */
  private onEnemyDead(enemy: Enemy) {
    const def = enemy.def;
    if (gainExp(this.run, def.exp) > 0) this.toast('升级！', this.player.x, this.player.feetY - 110);
    let total = Phaser.Math.Between(def.coins[0], def.coins[1]);
    while (total > 0) {
      const value = Math.min(total, total >= 10 ? 5 : 1);
      total -= value;
      this.coins.push(new Coin(this, enemy.x, enemy.feetY - 40, value, GROUND_Y));
    }
  }

  /** 清场后一次选完攒下的升级，每次三选一 */
  private offerLevelUps() {
    if (this.run.pendingLevelUps <= 0) {
      this.exitOpen = true;
      return;
    }
    this.setPaused('levelUp', true);
    const stats: StatId[] = ['attack', 'vitality', 'agility'];
    const L = PROGRESSION.levelUp;
    new ChoicePanel(this, {
      title: `第 ${this.run.level - this.run.pendingLevelUps + 1} 重 · 功力精进`,
      subtitle: this.run.pendingLevelUps > 1 ? `还有 ${this.run.pendingLevelUps} 次可选` : undefined,
      options: stats.map((id) => ({ label: L[id].name, detail: `${L[id].detail}\n（已加 ${this.run.stats[id]} 次）` })),
      onPick: (i) => {
        applyLevelUp(this.run, stats[i]);
        this.refreshPlayerStats();
        if (stats[i] === 'vitality') this.player.hp = Math.min(this.player.maxHp, this.player.hp + L.vitality.hp);
        this.setPaused('levelUp', false);
        this.offerLevelUps();
      },
    });
  }
}
