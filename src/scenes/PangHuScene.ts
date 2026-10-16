import { GAME_WIDTH } from '../config';
import { PangHuView } from '../art/pangHuView';
import { drawRoarRing, drawShockwave } from '../art/projectiles';
import { PANGHU } from '../characters/pangHu';
import type { Hurtable } from '../combat/hitbox';
import { totalFrames, type MoveEvent } from '../combat/moveTable';
import { PangHu } from '../entities/PangHu';
import { Projectile } from '../entities/Projectile';
import { HealthBar } from '../ui/HealthBar';
import { SpeechBubble } from '../ui/SpeechBubble';
import { CombatScene, GROUND_Y } from './CombatScene';

const BOSS_BAR_WIDTH = 520;

/**
 * 第一关关底：竹林，山大王胖虎。
 * 开场白念完才开打（念的时候打不动他），半血变身猛虎，打败后过关。
 * 冲击波、虎啸音波都是两边各放一道。
 * 【拔剑 / 给钱】的选项等铜钱和商店做好后接在开场白后面。
 */
export class PangHuScene extends CombatScene {
  protected readonly stageName = '竹林 · 山大王';
  private boss!: PangHu;
  private bossView!: PangHuView;
  private bossBar!: HealthBar;
  private bubble!: SpeechBubble;

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
    this.bubble.say(PANGHU.lines.intro, 1200);

    this.boss.events.on('move', (e: MoveEvent) => this.onBossMove(e));
    this.boss.events.on('transform', () => this.clearEnemyProjectiles());
    this.boss.events.on('roar', () => {
      this.bubble.say(PANGHU.lines.transform, 900);
      this.shake(0.006, 900);
    });
    this.boss.events.on('burst', () => {
      this.bossView.burst(this.boss.x, this.boss.feetY - 60);
      this.cameras.main.flash(250, 239, 231, 214);
      this.shake(0.014, 300);
    });
    this.boss.events.on('defeated', () => {
      this.clearEnemyProjectiles();
      this.bubble.say(PANGHU.lines.defeated, 1400);
    });
  }

  protected foes(): Hurtable[] {
    return [this.boss];
  }

  protected tickWorld() {
    this.boss.tick();
    this.reportHits(this.boss.resolveHits([this.player]));
  }

  protected renderWorld(delta: number) {
    if (this.boss.stage === 'intro' && this.bubble.done) {
      this.boss.startFight();
      this.bossBar.setVisible(true);
    }
    if (this.boss.stage === 'defeated' && this.bubble.done) this.finish('竹林 · 过关', 'Title', 1800);

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
    if (e.type === 'vfx' && e.name === 'shake') this.shake();
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

  /** 变身和被打败时收掉场上的冲击波，玩家也能喘口气 */
  private clearEnemyProjectiles() {
    for (const p of this.projectiles) if (p.team === 'enemy') p.destroy();
    this.projectiles = this.projectiles.filter((p) => p.alive);
  }
}
