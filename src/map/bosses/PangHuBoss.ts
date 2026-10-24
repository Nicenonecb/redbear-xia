import { Captives } from '../Captives';
import Phaser from 'phaser';
import { COLORS } from '../../config';
import type { ArtSlot } from '../../art/slots';
import { InkSplat } from '../../art/inkSplat';
import { sfx } from '../../audio/sfx';
import { PANGHU } from '../../characters/pangHu';
import type { MoveEvent } from '../../combat/moveTable';
import { PROGRESSION } from '../../game/progression';
import { stageFor, stepOf } from '../../game/stages';
import { renderScale } from '../../render/sharp';
import { GROUND_SQUASH, areaOf, dirTo } from '../combat/ground';
import { MapPangHu } from '../combat/MapPangHu';
import { RingWave } from '../combat/RingWave';
import { DustPuff, InkVortex, SlashFx } from '../combat/fx';
import { LOOKS } from '../looks';
import { MapSprite, poseOf } from '../MapSprite';
import { fillSector, type MapScene } from '../../scenes/MapScene';
import type { BossController } from './BossController';
const BOSS_INTRO_RANGE = 560;
export class PangHuBoss implements BossController {
  readonly events = new Phaser.Events.EventEmitter();
  boss: MapPangHu | null = null;
  private captives?: Captives;
  private bossSprite!: MapSprite;
  private tigerSprite!: MapSprite;
  private bossIntro = false;
  private bossIntroduced = false;
  private vortex: InkVortex | null = null;
  constructor(private readonly host: MapScene) {}
  get actor() { return this.boss; }
  tick() { this.boss?.tick(); }
  hitTargets() { return this.boss && !this.boss.dead ? [this.boss] : []; }
  afterRescue() { if (this.boss && ['fight', 'tiger'].includes(this.boss.stage) && this.host.run.coins > 0) this.offerBribe(); }
  dispose() { this.boss?.events.removeAllListeners(); this.events.removeAllListeners(); this.vortex?.stop(); this.bossSprite?.destroy(); this.tigerSprite?.destroy(); }
  spawn() {
    if (this.host.run.stage === 0) this.captives = new Captives(this.host);
    const at = stageFor(this.host.run).map.boss;
    const boss = new MapPangHu(at.x, at.y, this.host.player, this.host.walk);
    this.boss = boss;
    this.bossSprite = new MapSprite(this.host, LOOKS.pangHu.mapName, LOOKS.pangHu.fallback, LOOKS.pangHu.height, LOOKS.pangHu.shadow);
    this.tigerSprite = new MapSprite(this.host, LOOKS.tiger.mapName, LOOKS.tiger.fallback, LOOKS.tiger.height, LOOKS.tiger.shadow);
    this.tigerSprite.setVisible(false);
    boss.events.on('move', (e: MoveEvent) => this.onBossMove(e));
    boss.events.on('transform', () => this.onTransform());
    boss.events.on('roar', () => this.onTransformRoar());
    boss.events.on('wrap', () => this.onTransformWrap());
    boss.events.on('burst', () => this.onTransformBurst());
    boss.events.on('land', () => {
      this.host.cameras.main.shake(200, 0.01);
      this.host.overlays.push(new DustPuff(this.host, { ...boss.pos }, { x: 0, y: 1 }, 500));
    });
    boss.events.once('defeated', () => this.onBossDefeated());
  }

  /** 过了山寨前那一关、走近胖虎：念开场白，然后【拔剑 / 给钱】 */
  checkIntro(boss = this.boss!) {
    if (this.bossIntro || boss.stage !== 'intro' || this.host.run.step < stepOf(stageFor(this.host.run), 'boss')) return;
    if (boss.distToTarget > BOSS_INTRO_RANGE) return;
    this.bossIntro = true;
    boss.facing = dirTo(boss.pos, this.host.player.pos, boss.facing);
    this.host.player.vel = { x: 0, y: 0 };
    sfx.play('growl');
    this.bossTalk([...(this.host.run.stage === 0 ? ['嘿嘿，又来一个想救美人的？我这后院的姑娘，可都是给我大哥备下的！'] : []), PANGHU.lines.intro], () => this.offerBribe());
  }

  /** 胖虎说话：右下角亮立绘（变身后是猛虎），气泡从立绘嘴边冒出来 */
  private bossTalk(lines: string[], then: () => void, slot?: ArtSlot) {
    const boss = this.boss!;
    const tiger = boss.form === 'tiger';
    this.host.talk(lines, then, () => this.host.headOf(boss.pos, tiger ? LOOKS.tiger.height : LOOKS.pangHu.height), {
      slot: slot ?? (tiger ? 'portrait_pangHuTiger' : 'portrait_pangHu'),
      side: 'right',
    });
  }

  /** 【拔剑 / 给钱】 */
  offerBribe() {
    this.host.pauses.add('bribe');
    const coins = this.host.run.coins;
    this.host.ui.choice({
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
    const coins = this.host.run.coins;
    const amounts = [small, enough, coins];
    this.host.ui.choice({
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
      onCancel: () => {
        this.host.pauses.delete('bribe');
        this.offerBribe();
      },
    });
  }

  private pay(amount: number) {
    this.host.pauses.delete('bribe');
    this.host.run.coins -= amount;
    sfx.play('coin');
    const { enough, generous } = PROGRESSION.bribe;
    if (amount < enough) {
      // 钱照收，照样开打
      this.bossTalk([Phaser.Utils.Array.GetRandom(PANGHU.lines.bribePoor)], () => this.drawSword(), 'portrait_pangHu_taunt');
      return;
    }
    const boss = this.boss!;
    this.host.run.paidOff = true;
    boss.yieldPath();
    for (const pr of this.host.projectiles) if (pr.team === 'enemy') pr.destroy();
    for (const r of this.host.rings) if (r.team === 'enemy') r.destroy();
    const lines = amount >= generous ? [PANGHU.lines.bribePass, PANGHU.lines.bribeGenerous] : [PANGHU.lines.bribePass];
    this.bossTalk(lines, () => this.events.emit('yield'), 'portrait_pangHu_greedy');
  }

  private drawSword() {
    this.host.pauses.delete('bribe');
    if (!this.bossIntroduced) {
      this.bossIntroduced = true;
      this.host.ui.bossCard();
    }
    this.boss!.startFight();
  }

  private onBossMove(e: MoveEvent) {
    const boss = this.boss!;
    if (e.type === 'sfx') sfx.play(e.name);
    if (e.type === 'vfx' && e.name === 'shake') this.host.cameras.main.shake(200, 0.01);
    if (e.type === 'spawn' && e.name === 'shockwave') {
      const w = PANGHU.shockwave;
      this.host.rings.push(new RingWave(this.host, { ...boss.pos }, w.speed, w.life, 44, w.hit, 'enemy', 'fx_shock_ring'));
    }
    if (e.type === 'spawn' && e.name === 'roarRing') {
      const w = PANGHU.roarRing;
      this.host.rings.push(new RingWave(this.host, { ...boss.pos }, w.speed, w.life, 56, w.hit, 'enemy', 'fx_roar_ring', true));
    }
    // 重刀落下、猛虎挥爪：甩出一道刀光 / 爪痕
    const m = boss.runner.move;
    if (e.type === 'sfx' && (e.name === 'chop' || e.name === 'claw') && m?.hit) {
      const area = areaOf(m.hit);
      const claw = e.name === 'claw';
      this.host.overlays.push(new SlashFx(this.host, { ...boss.pos }, boss.facing, { reach: area.reach, arc: area.arc, heavy: !claw, art: claw ? 'fx_claw' : undefined }, 80));
    }
  }

  render(delta: number) {
    const boss = this.boss;
    if (!boss) return;
    const tiger = boss.form === 'tiger';
    const sprite = tiger ? this.tigerSprite : this.bossSprite;
    const look = tiger ? LOOKS.tiger : LOOKS.pangHu;
    const state = {
      x: boss.pos.x,
      y: boss.pos.y,
      z: boss.z,
      facing: boss.facing,
      moving: !boss.runner.move && Math.hypot(boss.vel.x, boss.vel.y) > 10,
      pose: poseOf(boss.runner, look.poses),
      flash: boss.flash > 0,
      shaking: boss.frozen || (boss.stage === 'transform' && boss.stageFrame < PANGHU.transform.burstAt),
    };
    sprite.update(state, delta);
    if (boss.stage === 'transform' && !tiger) {
      // 墨气裹住以后，人形和猛虎一闪一闪地交替，越闪越快
      const t = PANGHU.transform;
      const f = boss.stageFrame;
      const k = Phaser.Math.Clamp((f - t.wrapAt) / (t.burstAt - t.wrapAt), 0, 1);
      this.bossSprite.inkOver = k * 0.75;
      const period = Math.max(3, Math.round(12 - k * 9));
      const showTiger = f > t.wrapAt + 15 && Math.floor(f / period) % 2 === 1;
      this.tigerSprite.setVisible(showTiger);
      this.bossSprite.img.setVisible(!showTiger);
      if (showTiger) {
        this.tigerSprite.inkOver = 0.6;
        this.tigerSprite.update({ ...state, shaking: true }, delta);
      }
      if (this.vortex) this.vortex.power = k;
    }
    const ratio = boss.hp / boss.maxHp;
    const showBar = boss.stage !== 'intro' && boss.stage !== 'yield';
    this.host.ui.setBoss(showBar ? (boss.dead ? 0 : ratio) : null);
  }

  /** 变身开始：时间放慢、镜头推近、主角定住，胖虎放狠话 */
  private onTransform() {
    const boss = this.boss!;
    this.host.cinematic = true;
    this.host.timeScale = 0.4;
    this.host.player.vel = { x: 0, y: 0 };
    this.host.cameras.main.zoomTo(renderScale() * 1.35, 600, 'Sine.easeInOut');
    this.host.ui.say(PANGHU.lines.transform, 1200, () => this.host.headOf(boss.pos, LOOKS.pangHu.height));
    this.bossSprite.forceArt('map_pangHu_transform_1');
    for (const pr of this.host.projectiles) if (pr.team === 'enemy') pr.destroy();
  }

  /** 仰天怒吼：怒吼横幅扫过，时间恢复 */
  private onTransformRoar() {
    this.host.timeScale = 1;
    this.host.ui.cutIn('cutin_pangHu_roar');
    sfx.play('roar');
    this.host.cameras.main.shake(400, 0.012);
  }

  /** 墨气从地上卷起来裹住胖虎 */
  private onTransformWrap() {
    this.vortex = new InkVortex(this.host, { ...this.boss!.pos });
    this.host.overlays.push(this.vortex);
    this.tigerSprite.forceArt('map_pangHu_transform_2');
  }

  /** 墨气炸开、满屏一白，猛虎显形，气浪把主角推开 */
  private onTransformBurst() {
    const boss = this.boss!;
    this.vortex?.stop();
    this.vortex = null;
    this.host.cameras.main.flash(380, 255, 252, 245);
    this.host.cameras.main.shake(500, 0.02);
    this.host.ui.cutIn('cutin_tiger_reveal');
    sfx.play('roar');
    sfx.play('slam');
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const at = { x: boss.pos.x + Math.cos(a) * 90, y: boss.pos.y + Math.sin(a) * 90 * GROUND_SQUASH };
      this.host.overlays.push(new InkSplat(this.host, at.x, at.y - 60, 170, 0.9, at.y + 2));
    }
    this.bossSprite.setVisible(false);
    this.bossSprite.img.setVisible(false);
    this.tigerSprite.forceArt(null);
    this.tigerSprite.inkOver = 0;
    this.tigerSprite.setVisible(true);
    // 一圈只吓人不伤人的气浪
    this.host.rings.push(new RingWave(this.host, { ...boss.pos }, 900, 30, 60, { ...PANGHU.roarRing.hit, damage: 0 }, 'player', 'fx_shock_ring'));
    this.host.player.shove(dirTo(boss.pos, this.host.player.pos, { x: 0, y: 1 }), 620);
    this.host.cinematic = false;
    this.host.time.delayedCall(700, () => this.host.cameras.main.zoomTo(renderScale(), 600, 'Sine.easeInOut'));
  }

  /** 打赢了：墨炸开，他变回人形一屁股坐在地上认怂，然后过关 */
  private onBossDefeated() {
    const boss = this.boss!;
    sfx.play('ink');
    for (const pr of this.host.projectiles) if (pr.team === 'enemy') pr.destroy();
    for (const r of this.host.rings) if (r.team === 'enemy') r.destroy();
    this.host.overlays.push(new InkSplat(this.host, boss.pos.x, boss.pos.y - 80, 260, 0.9, boss.pos.y + 2));
    this.bossTalk([this.host.run.stage === 0 ? '少侠饶命！人你带走，带走！……我二哥不会放过你的！' : PANGHU.lines.defeated], () => {
      this.host.pauses.add('release');
      if (this.captives) this.captives.release(() => this.events.emit('defeated'));
      else this.events.emit('defeated');
    }, 'portrait_pangHu_beaten');
  }

  drawWarnings(g: Phaser.GameObjects.Graphics, gl: Phaser.GameObjects.Graphics) {
    const boss = this.boss;
    const m = boss?.runner.move;
    if (!boss || !m) return;
    const f = boss.runner.frame;
    const k = Math.min(1, f / m.startup);
    const startup = f < m.startup;
    if (m.id === 'chargeChop' && f < m.startup + 18) {
      // 冲过来的路线：冲刺距离 + 刀够得着的距离
      const len = 300 + 130;
      const p0 = boss.pos;
      const p1 = { x: p0.x + boss.facing.x * len, y: p0.y + boss.facing.y * len };
      g.lineStyle(110, COLORS.red, startup ? 0.1 + k * 0.28 : 0.15);
      g.lineBetween(p0.x, p0.y, p1.x, p1.y);
      g.lineStyle(3, COLORS.red, 0.6);
      g.lineBetween(p0.x, p0.y, p1.x, p1.y);
    }
    if (m.id === 'slam' && startup) {
      g.fillStyle(COLORS.red, 0.12 + k * 0.3);
      fillSector(g, boss.pos, boss.facing, areaOf(m.hit!));
      // 冲击波会扩到多远：淡淡一圈
      const R = (PANGHU.shockwave.speed * PANGHU.shockwave.life) / 60;
      g.lineStyle(2, COLORS.red, 0.15 + k * 0.25);
      g.strokeEllipse(boss.pos.x, boss.pos.y, R * 2, R * 2 * GROUND_SQUASH);
    }
    if (m.id === 'pounce' && boss.activeArea() === null && f < m.startup + m.active) {
      g.fillStyle(COLORS.red, 0.15 + k * 0.3);
      fillSector(g, boss.aim, { x: 0, y: 1 }, areaOf(m.hit!));
      g.lineStyle(3, COLORS.red, 0.7);
      const r = areaOf(m.hit!).reach;
      g.strokeEllipse(boss.aim.x, boss.aim.y, r * 2, r * 2 * GROUND_SQUASH);
    }
    if (m.id === 'roar' && startup) {
      for (let i = 0; i < 3; i++) {
        const r = 60 + ((f * 3 + i * 40) % 120);
        g.lineStyle(3, COLORS.red, (0.15 + k * 0.4) * (1 - (r - 60) / 120));
        g.strokeEllipse(boss.pos.x, boss.pos.y, r * 2, r * 2 * GROUND_SQUASH);
      }
    }
    if ((m.id === 'claw1' || m.id === 'claw2') && startup && m.startup - f <= 10) {
      this.host.glint(gl, boss.pos, boss.facing, LOOKS.tiger.height, 1 - (m.startup - f) / 10);
    }
  }

}
