import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_WIDTH } from '../config';
import type { ArtSlot } from '../art/slots';
import { InkSplat } from '../art/inkSplat';
import { drawThrowingKnife } from '../art/projectiles';
import { sfx } from '../audio/sfx';
import { ENEMIES } from '../characters/bandits';
import { HEROES, type HeroEntry } from '../characters/heroes';
import { PANGHU } from '../characters/pangHu';
import type { GroundArea, MoveEvent } from '../combat/moveTable';
import { endRun, gainExp, getRun, runStats, startRun, type RunState } from '../game/run';
import { renderScale } from '../render/sharp';
import { Controls } from '../input/Controls';
import { CHAPTER1_MAP, type MapArea, type Pt } from '../map/chapter1Map';
import { GROUND_SQUASH, areaOf, dirTo, groundAngle, type Vec } from '../map/combat/ground';
import type { MapActor, MapHitResult, MapHurtable } from '../map/combat/MapActor';
import { MapDummy } from '../map/combat/MapDummy';
import { MapEnemy } from '../map/combat/MapEnemy';
import { MapFighter } from '../map/combat/MapFighter';
import { MapPangHu } from '../map/combat/MapPangHu';
import { MapProjectile } from '../map/combat/MapProjectile';
import { RingWave } from '../map/combat/RingWave';
import { ChargeAura, DustPuff, InkVortex, SlashFx, type Overlay } from '../map/combat/fx';
import { LOOKS, type MapLook } from '../map/looks';
import {
  BAMBOO_SIZE,
  BAMBOO_VARIANTS,
  GROUND_TILE,
  GROUND_WASH_TILE,
  ROCK_SIZE,
  ROCK_VARIANTS,
  bakeMapTextures,
  drawStonePath,
} from '../map/mapArt';
import { MapSprite, poseOf } from '../map/MapSprite';
import { WALK_MARGIN, distToPath } from '../map/walkable';
import { DamageNumbers } from '../ui/DamageNumbers';
import type { ScreenPoint, UIScene } from './UIScene';

/** 主角在地图上画多高（设计像素） */
const HERO_HEIGHT = 170;
/** 挡在主角前面的竹子淡到多透明；淡入淡出要多久（毫秒） */
const SEE_THROUGH_ALPHA = 0.35;
const SEE_THROUGH_FADE = 150;
/** 竹子离能走的边界多远才开始长：贴着边界种一排，看着就是一堵竹墙 */
const BAMBOO_GAP = 40;
/** 边界上那排竹子隔多远一丛 */
const EDGE_SPACING = 90;
/** 逻辑帧固定 60 帧/秒，招式表的帧数才有意义；卡顿时最多补几帧 */
const FRAME_MS = 1000 / 60;
const MAX_CATCHUP_FRAMES = 6;
/** 顿帧达到这么多帧算重击：字更大、刀光更重、震屏 */
const HEAVY_HITSTOP = 8;
/** 伤害数字、判定显示压在所有人和竹子上面 */
const TOP_DEPTH = 100000;
/** 第 2 阶段先在"入山"空地里摆几个木人桩试招（第 3 阶段换成山贼） */
const DUMMIES: Pt[] = [
  { x: 1180, y: 3400 },
  { x: 1340, y: 3460 },
  { x: 1240, y: 3600 },
];

/** 胖虎走到这么近（地面距离）就开口念开场白 */
const BOSS_INTRO_RANGE = 560;
/** 开场白念多久（逻辑帧）再开打 */
const BOSS_INTRO_FRAMES = 170;
/** 发现主角的山贼会喊上附近多远的同伙 */
const ALERT_RADIUS = 320;

/**
 * 第一章 · 竹林的大地图（斜俯视）。
 * WASD 八个方向走，竹林走不进去，人物按前后自动遮挡，镜头跟着人，走进新区域亮出区域题卡；
 * 战斗也在地图上打：招式表和横版一样，判定变成脚下朝面向张开的扇形，刀光、剑气朝面向出。
 */
export class MapScene extends Phaser.Scene {
  private run!: RunState;
  private controls!: Controls;
  private heroEntry!: HeroEntry;
  private player!: MapFighter;
  /** 镜头跟着的点（主角脚下） */
  private camTarget!: Phaser.GameObjects.Zone;
  private sprite!: MapSprite;
  private ui!: UIScene;
  private area: MapArea | null = null;
  private seenAreas = new Set<string>();
  /** 地图上的竹子和山石，连同它在地图上占的范围（判断挡没挡住主角用） */
  private props: { img: Phaser.GameObjects.Image; rect: Phaser.Geom.Rectangle }[] = [];
  private dummies: MapDummy[] = [];
  private projectiles: MapProjectile[] = [];
  private overlays: Overlay[] = [];
  private numbers!: DamageNumbers;
  private accumulator = 0;
  private aura: ChargeAura | null = null;
  /** 连段里刀光左右交替 */
  private slashFlip = false;
  private lastPhase: string | null = null;
  private debug!: Phaser.GameObjects.Graphics;
  private showDebug = false;
  private enemies: { enemy: MapEnemy; sprite: MapSprite; look: MapLook }[] = [];
  private boss: MapPangHu | null = null;
  private bossSprite!: MapSprite;
  private tigerSprite!: MapSprite;
  private bossIntro = -1;
  private rings: RingWave[] = [];
  /** 地上的红色预警（扇形、红线、红圈），每帧重画 */
  private warn!: Phaser.GameObjects.Graphics;
  /** 出招前武器上的一下闪光 */
  private glints!: Phaser.GameObjects.Graphics;
  /** 变身演出中：主角不能动，逻辑放慢 */
  private cinematic = false;
  private timeScale = 1;
  private vortex: InkVortex | null = null;
  private over = false;

  constructor() {
    super('Map');
  }

  create() {
    this.run = getRun() ?? startRun('wenShaohua', false);
    this.controls = new Controls(this, 'map');
    this.area = null;
    this.seenAreas = new Set();
    this.props = [];
    this.projectiles = [];
    this.overlays = [];
    this.accumulator = 0;
    this.aura = null;
    this.lastPhase = null;
    const M = CHAPTER1_MAP;

    bakeMapTextures(this, M.seed);

    // 地面：平铺的纹理 → 大片淡墨晕 → 空地稍亮 → 石板路
    const ground = this.add.tileSprite(0, 0, M.width, M.height, 'gen:ground').setOrigin(0).setDepth(-3000);
    ground.setTileScale(GROUND_TILE / ground.frame.width);
    const wash = this.add.tileSprite(0, 0, M.width, M.height, 'gen:groundWash').setOrigin(0).setDepth(-3000);
    wash.setTileScale(GROUND_WASH_TILE / wash.frame.width);
    const floor = this.add.graphics().setDepth(-2999);
    for (const a of M.areas) {
      floor.fillStyle(COLORS.paper, 0.35);
      floor.fillEllipse(a.center.x, a.center.y, a.radius * 2.1, a.radius * 1.5);
    }
    drawStonePath(floor, M.path, M.pathWidth, M.seed);

    this.scatterProps();
    this.dummies = DUMMIES.map((p) => new MapDummy(this, p));
    this.warn = this.add.graphics().setDepth(-2900);
    this.glints = this.add.graphics().setDepth(TOP_DEPTH - 1);
    this.rings = [];
    this.cinematic = false;
    this.timeScale = 1;
    this.vortex = null;
    this.over = false;
    this.bossIntro = -1;

    // 主角：逻辑在 MapFighter 里，画面在 MapSprite 里
    this.heroEntry = HEROES[this.run.hero];
    this.player = new MapFighter(M.start.x, M.start.y, this.heroEntry.def, this.controls, M, {
      ...runStats(this.run),
      hp: this.run.hp,
    });
    this.player.events.on('move', (e: MoveEvent) => this.onPlayerMove(e));
    this.player.events.once('dead', () => this.onPlayerDead());
    const fallback = (this.run.hero === 'wenShaohua' ? 'portrait_wenShaohua' : 'portrait_yuWuxia') as ArtSlot;
    this.sprite = new MapSprite(this, this.run.hero, fallback, HERO_HEIGHT, 70);
    this.numbers = new DamageNumbers(this, TOP_DEPTH);
    this.spawnGuards();
    this.spawnBoss();

    this.camTarget = this.add.zone(M.start.x, M.start.y - 60, 1, 1);
    const cam = this.cameras.main;
    cam.setBounds(0, 0, M.width, M.height);
    cam.startFollow(this.camTarget, true, 0.12, 0.12);

    this.debug = this.add.graphics().setDepth(TOP_DEPTH);
    this.showDebug = false;
    this.input.keyboard!.on('keydown-BACKTICK', () => (this.showDebug = !this.showDebug));

    this.scene.launch('UI', { heroName: this.heroEntry.def.name, hint: this.heroEntry.mapHint });
    this.ui = this.scene.get('UI') as UIScene;

    this.input.keyboard!.on('keydown-ESC', () => {
      endRun(false);
      this.scene.stop('UI');
      this.scene.start('Title');
    });
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scene.stop('UI');
      sfx.stopAmbient();
    });
    sfx.startAmbient();
    cam.fadeIn(500, 239, 231, 214);
  }

  update(_time: number, delta: number) {
    this.controls.update();
    for (const action of this.controls.justPressedActions) this.player.buffer.push(action);
    this.accumulator = Math.min(this.accumulator + delta * this.timeScale, FRAME_MS * MAX_CATCHUP_FRAMES);
    while (this.accumulator >= FRAME_MS) {
      this.accumulator -= FRAME_MS;
      this.tick();
    }
    this.render(delta);
  }

  /**
   * 一个逻辑帧：主角行动 → 和挡路的东西挤开 → 山贼、胖虎行动并结算他们的招 →
   * 结算主角的招、飞行道具、墨圈 → 木人桩晃
   */
  private tick() {
    const p = this.player;
    if (!this.cinematic) p.tick();
    const enemies = this.enemies.map((e) => e.enemy);
    const boss = this.boss;
    if (!p.evading) {
      for (const d of this.dummies) p.pushOutOf(d);
      for (const e of enemies) if (e.def.superArmor && !e.dead) p.pushOutOf(e);
      if (boss && !boss.dead && boss.stage !== 'yield') p.pushOutOf(boss);
    }
    this.watchPlayerMove();

    for (const e of enemies) {
      e.tick();
      this.reportHits(e.resolveHits([p]));
      e.separateFrom(enemies);
    }
    for (const entry of this.enemies) if (entry.enemy.gone) entry.sprite.destroy();
    this.enemies = this.enemies.filter((e) => !e.enemy.gone);
    if (boss) {
      this.tickBossIntro(boss);
      boss.tick();
      this.reportHits(boss.resolveHits([p]));
    }

    const foes: MapHurtable[] = [...this.dummies, ...this.enemies.map((e) => e.enemy).filter((e) => !e.dead)];
    if (boss && !boss.dead) foes.push(boss);
    this.reportHits(p.resolveHits(foes));
    for (const pr of this.projectiles) this.reportHits(pr.tick(pr.team === 'player' ? foes : [p]));
    this.projectiles = this.projectiles.filter((pr) => pr.alive);
    for (const r of this.rings) this.reportHits(r.tick(r.team === 'player' ? foes : [p]));
    this.rings = this.rings.filter((r) => r.alive);
    for (const d of this.dummies) d.tick();
  }

  /** 每个画面帧：画人、木人桩、特效，竹子透明，界面，区域题卡 */
  private render(delta: number) {
    const p = this.player;
    // 变身演出时镜头对着胖虎
    const focus = this.cinematic && this.boss ? this.boss.pos : p.pos;
    this.camTarget.setPosition(focus.x, focus.y - (this.cinematic ? 100 : 60));
    this.sprite.update(
      {
        x: p.pos.x,
        y: p.pos.y,
        z: p.z,
        facing: p.facing,
        moving: p.walking,
        pose: poseOf(p.runner),
        flash: p.flash > 0,
        // 顿帧时抖；蓄满了也微微发抖，憋着一股劲
        shaking: p.frozen || !!this.aura?.full,
        evading: p.evading,
        blinking: !p.evading && p.mercyFrames > 0,
      },
      delta,
    );
    for (const d of this.dummies) d.draw();
    for (const { enemy: e, sprite, look } of this.enemies) {
      sprite.inkOver = e.dissolve;
      sprite.update(
        {
          x: e.pos.x,
          y: e.pos.y,
          z: e.z,
          facing: e.facing,
          moving: !e.runner.move && e.hurtFrames <= 0 && !e.dead && Math.hypot(e.vel.x, e.vel.y) > 10,
          pose: e.dead ? 'idle' : poseOf(e.runner, look.poses),
          flash: e.flash > 0,
          shaking: e.frozen,
        },
        delta,
      );
      sprite.img.setAlpha(1 - e.dissolve);
      sprite.shadow.setAlpha(1 - e.dissolve);
    }
    this.renderBoss(delta);
    for (const r of this.rings) r.draw();
    this.drawWarnings();
    this.aura?.follow(p.pos, p.chargeRatio);
    for (const o of this.overlays) o.update(delta);
    this.overlays = this.overlays.filter((o) => !o.done);
    this.seeThrough(p.pos, delta);
    this.ui.setHp(p.hp, p.maxHp);
    this.checkArea(p.pos);
    this.drawDebug();
  }

  /**
   * 盯着主角的招式：一进判定帧就甩出刀光（连段里左右交替，重招更大更重）；
   * 蓄力招开始时身上聚墨，蓄完就收
   */
  private watchPlayerMove() {
    const r = this.player.runner;
    const phase = r.phase;
    if (phase === 'active' && this.lastPhase !== 'active' && r.move?.hit) {
      const area = areaOf(r.move.hit);
      const heavy = r.move.hit.hitstop >= HEAVY_HITSTOP;
      this.overlays.push(
        new SlashFx(this, { ...this.player.pos }, this.player.facing, {
          reach: area.reach,
          arc: Math.min(area.arc + 20, 200),
          heavy,
          reverse: this.slashFlip,
        }),
      );
      this.slashFlip = !this.slashFlip;
    }
    if (!r.move) this.slashFlip = false;
    this.lastPhase = phase;

    const charging = !!r.move?.hold;
    if (charging && !this.aura) {
      this.aura = new ChargeAura(this);
      this.overlays.push(this.aura);
    } else if (!charging && this.aura) {
      this.aura.stop();
      this.aura = null;
    }
  }

  private onPlayerMove(e: MoveEvent) {
    const p = this.player;
    if (e.type === 'sfx') {
      sfx.play(e.name);
      // 闪避起步：脚下扬起一团墨尘
      if (e.name === 'dodge') this.overlays.push(new DustPuff(this, { ...p.pos }, { x: -p.facing.x, y: -p.facing.y }));
    }
    if (e.type === 'spawn') {
      this.heroEntry.spawnOnMap({ scene: this, player: p, addProjectile: (pr) => this.projectiles.push(pr) }, e.name);
    }
  }

  /** 每一次实际打中：跳伤害数字、溅墨，重击震屏 */
  private reportHits(results: MapHitResult[]) {
    for (const { target, hit } of results) {
      const heavy = hit.hitstop >= HEAVY_HITSTOP;
      const { x, y } = target.pos;
      this.numbers.show(x, y - target.height - 10, hit.damage, target === this.player, heavy);
      this.overlays.push(new InkSplat(this, x, y - target.height / 2, heavy ? 120 : 70, heavy ? 0.9 : 0.7, y + 2));
      sfx.play(target === this.player ? 'hurt' : heavy ? 'hit-heavy' : 'hit');
      if (heavy) this.cameras.main.shake(120, 0.006);
    }
  }

  /** ` 键：画出脚下的圆和正在生效的判定扇形，调手感用 */
  private drawDebug() {
    const g = this.debug;
    g.clear();
    if (!this.showDebug) return;
    const p = this.player;
    const circle = (at: Pt, r: number, color: number) => {
      g.lineStyle(2, color, 0.9);
      g.strokeEllipse(at.x, at.y, r * 2, r * 2 * GROUND_SQUASH);
    };
    circle(p.pos, p.radius, 0x2a6fdb);
    for (const d of this.dummies) circle(d.pos, d.radius, 0x2a6fdb);
    for (const pr of this.projectiles) circle(pr.pos, pr.radius, COLORS.red);
    const actors: MapActor[] = [p, ...this.enemies.map((e) => e.enemy)];
    if (this.boss) actors.push(this.boss);
    for (const a of actors) {
      circle(a.pos, a.radius, 0x2a6fdb);
      const area = a.activeArea();
      if (area) {
        g.fillStyle(COLORS.red, 0.25);
        fillSector(g, a.pos, a.facing, area);
      }
    }
  }

  // ---------------- 山贼 ----------------

  private spawnGuards() {
    this.enemies = [];
    CHAPTER1_MAP.guards.forEach((gd, i) => {
      const def = ENEMIES[gd.id];
      const enemy = new MapEnemy(gd.at.x, gd.at.y, def, this.player, CHAPTER1_MAP, `guard-${i}`);
      const look: MapLook = LOOKS[def.look];
      const sprite = new MapSprite(this, look.mapName, look.fallback, look.height, look.shadow);
      enemy.events.on('move', (e: MoveEvent) => this.onEnemyMove(enemy, e));
      enemy.events.once('dead', () => this.onEnemyDead(enemy));
      enemy.events.once('aggro', () => {
        sfx.play('growl');
        for (const o of this.enemies) {
          if (o.enemy !== enemy && Math.hypot(o.enemy.pos.x - enemy.pos.x, o.enemy.pos.y - enemy.pos.y) < ALERT_RADIUS) o.enemy.alert();
        }
      });
      this.enemies.push({ enemy, sprite, look });
    });
  }

  private onEnemyMove(enemy: MapEnemy, e: MoveEvent) {
    if (e.type === 'sfx') sfx.play(e.name);
    if (e.type === 'vfx' && e.name === 'shake') this.cameras.main.shake(180, 0.008);
    if (e.type === 'spawn' && e.name === 'knife' && enemy.def.projectile) {
      const spec = enemy.def.projectile;
      const { x, y } = enemy.pos;
      const f = enemy.facing;
      this.projectiles.push(new MapProjectile(this, x + f.x * 24, y + f.y * 24, { ...f }, spec, 'enemy', drawThrowingKnife(spec.hit.box.w), 1, 70));
    }
  }

  /** 打倒山贼：溅一大团墨，给经验和铜钱（第 4 阶段接上掉铜钱、升级三选一） */
  private onEnemyDead(enemy: MapEnemy) {
    const def = enemy.def;
    const { x, y } = enemy.pos;
    sfx.play('ink');
    this.overlays.push(new InkSplat(this, x, y - enemy.height / 2, def.tier === 'brute' ? 220 : 140, 0.85, y + 2));
    const coins = Phaser.Math.Between(def.coins[0], def.coins[1]);
    this.run.coins += coins;
    this.toast(`+${coins} 文`, x, y - enemy.height - 20, CSS_COLORS.ink);
    if (gainExp(this.run, def.exp) > 0) {
      this.toast('升级！', this.player.pos.x, this.player.pos.y - 200);
      sfx.play('levelup');
    }
  }

  // ---------------- 胖虎 ----------------

  private spawnBoss() {
    const at = CHAPTER1_MAP.boss;
    const boss = new MapPangHu(at.x, at.y, this.player, CHAPTER1_MAP);
    this.boss = boss;
    this.bossSprite = new MapSprite(this, LOOKS.pangHu.mapName, LOOKS.pangHu.fallback, LOOKS.pangHu.height, LOOKS.pangHu.shadow);
    this.tigerSprite = new MapSprite(this, LOOKS.tiger.mapName, LOOKS.tiger.fallback, LOOKS.tiger.height, LOOKS.tiger.shadow);
    this.tigerSprite.setVisible(false);
    boss.events.on('move', (e: MoveEvent) => this.onBossMove(e));
    boss.events.on('transform', () => this.onTransform());
    boss.events.on('roar', () => this.onTransformRoar());
    boss.events.on('wrap', () => this.onTransformWrap());
    boss.events.on('burst', () => this.onTransformBurst());
    boss.events.on('land', () => {
      this.cameras.main.shake(200, 0.01);
      this.overlays.push(new DustPuff(this, { ...boss.pos }, { x: 0, y: 1 }, 500));
    });
    boss.events.once('defeated', () => this.onBossDefeated());
  }

  /** 主角走近了：亮名牌、念开场白，念完开打（第 4 阶段在这里插进【拔剑 / 给钱】） */
  private tickBossIntro(boss: MapPangHu) {
    if (boss.stage !== 'intro') return;
    if (this.bossIntro < 0) {
      if (boss.distToTarget > BOSS_INTRO_RANGE) return;
      this.bossIntro = 0;
      boss.facing = dirTo(boss.pos, this.player.pos, boss.facing);
      this.ui.bossCard();
      this.ui.say(PANGHU.lines.intro, 1400, () => this.headOf(boss.pos, LOOKS.pangHu.height));
      sfx.play('growl');
      return;
    }
    if (++this.bossIntro >= BOSS_INTRO_FRAMES) boss.startFight();
  }

  private onBossMove(e: MoveEvent) {
    const boss = this.boss!;
    if (e.type === 'sfx') sfx.play(e.name);
    if (e.type === 'vfx' && e.name === 'shake') this.cameras.main.shake(200, 0.01);
    if (e.type === 'spawn' && e.name === 'shockwave') {
      const w = PANGHU.shockwave;
      this.rings.push(new RingWave(this, { ...boss.pos }, w.speed, w.life, 44, w.hit, 'enemy', 'fx_shock_ring'));
    }
    if (e.type === 'spawn' && e.name === 'roarRing') {
      const w = PANGHU.roarRing;
      this.rings.push(new RingWave(this, { ...boss.pos }, w.speed, w.life, 56, w.hit, 'enemy', 'fx_roar_ring', true));
    }
    // 重刀落下、猛虎挥爪：甩出一道刀光 / 爪痕
    const m = boss.runner.move;
    if (e.type === 'sfx' && (e.name === 'chop' || e.name === 'claw') && m?.hit) {
      const area = areaOf(m.hit);
      this.overlays.push(new SlashFx(this, { ...boss.pos }, boss.facing, { reach: area.reach, arc: area.arc, heavy: e.name === 'chop' }, 80));
    }
  }

  private renderBoss(delta: number) {
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
    this.ui.setBoss(boss.stage === 'intro' && this.bossIntro < 0 ? null : boss.dead ? 0 : ratio);
  }

  /** 变身开始：时间放慢、镜头推近、主角定住，胖虎放狠话 */
  private onTransform() {
    const boss = this.boss!;
    this.cinematic = true;
    this.timeScale = 0.4;
    this.player.vel = { x: 0, y: 0 };
    this.cameras.main.zoomTo(renderScale() * 1.35, 600, 'Sine.easeInOut');
    this.ui.say(PANGHU.lines.transform, 1200, () => this.headOf(boss.pos, LOOKS.pangHu.height));
    this.bossSprite.forceArt('map_pangHu_transform_1');
    for (const pr of this.projectiles) if (pr.team === 'enemy') pr.destroy();
  }

  /** 仰天怒吼：怒吼横幅扫过，时间恢复 */
  private onTransformRoar() {
    this.timeScale = 1;
    this.ui.cutIn('cutin_pangHu_roar');
    sfx.play('roar');
    this.cameras.main.shake(400, 0.012);
  }

  /** 墨气从地上卷起来裹住胖虎 */
  private onTransformWrap() {
    this.vortex = new InkVortex(this, { ...this.boss!.pos });
    this.overlays.push(this.vortex);
    this.tigerSprite.forceArt('map_pangHu_transform_2');
  }

  /** 墨气炸开、满屏一白，猛虎显形，气浪把主角推开 */
  private onTransformBurst() {
    const boss = this.boss!;
    this.vortex?.stop();
    this.vortex = null;
    this.cameras.main.flash(380, 255, 252, 245);
    this.cameras.main.shake(500, 0.02);
    this.ui.cutIn('cutin_tiger_reveal');
    sfx.play('roar');
    sfx.play('slam');
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const at = { x: boss.pos.x + Math.cos(a) * 90, y: boss.pos.y + Math.sin(a) * 90 * GROUND_SQUASH };
      this.overlays.push(new InkSplat(this, at.x, at.y - 60, 170, 0.9, at.y + 2));
    }
    this.bossSprite.setVisible(false);
    this.bossSprite.img.setVisible(false);
    this.tigerSprite.forceArt(null);
    this.tigerSprite.inkOver = 0;
    this.tigerSprite.setVisible(true);
    // 一圈只吓人不伤人的气浪
    this.rings.push(new RingWave(this, { ...boss.pos }, 900, 30, 60, { ...PANGHU.roarRing.hit, damage: 0 }, 'player', 'fx_shock_ring'));
    this.player.shove(dirTo(boss.pos, this.player.pos, { x: 0, y: 1 }), 620);
    this.cinematic = false;
    this.time.delayedCall(700, () => this.cameras.main.zoomTo(renderScale(), 600, 'Sine.easeInOut'));
  }

  private onBossDefeated() {
    const boss = this.boss!;
    sfx.play('ink');
    this.overlays.push(new InkSplat(this, boss.pos.x, boss.pos.y - 80, 260, 0.9, boss.pos.y + 2));
    this.ui.say(PANGHU.lines.defeated, 2000, () => this.headOf(boss.pos, LOOKS.tiger.height));
    this.time.delayedCall(1400, () => this.ui.banner('胖虎服了！'));
  }

  private onPlayerDead() {
    if (this.over) return;
    this.over = true;
    endRun();
    sfx.play('death');
    this.ui.banner('胜败乃兵家常事');
    this.time.delayedCall(2600, () => {
      const cam = this.cameras.main;
      cam.fadeOut(500, 239, 231, 214);
      cam.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.scene.stop('UI');
        this.scene.start('Title');
      });
    });
  }

  // ---------------- 预警、工具 ----------------

  /**
   * 地上的红色预警，前摇越往后越亮：头目的扇形、胖虎冲锋的红线、震地的红圈、扑击落点的红圈、虎啸的波纹；
   * 小怪出手前武器上闪一下
   */
  private drawWarnings() {
    const g = this.warn;
    const gl = this.glints;
    g.clear();
    gl.clear();
    for (const { enemy: e, look } of this.enemies) {
      const m = e.runner.move;
      if (!m || e.dead || e.runner.phase !== 'startup') continue;
      const k = e.runner.frame / m.startup;
      if (m.telegraph === 'ground' && m.hit) {
        g.fillStyle(COLORS.red, 0.12 + k * 0.3);
        fillSector(g, e.pos, e.facing, areaOf(m.hit));
      }
      if (m.telegraph === 'glint' && m.startup - e.runner.frame <= 10) {
        this.glint(gl, e.pos, e.facing, look.height, 1 - (m.startup - e.runner.frame) / 10);
      }
    }
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
      this.glint(gl, boss.pos, boss.facing, LOOKS.tiger.height, 1 - (m.startup - f) / 10);
    }
  }

  /** 武器上的一下闪光：一个朱红十字星，闪出来再缩回去 */
  private glint(g: Phaser.GameObjects.Graphics, at: Vec, facing: Vec, height: number, t: number) {
    const x = at.x + facing.x * 26;
    const y = at.y - height * 0.6 + facing.y * 10;
    const s = Math.sin(t * Math.PI) * 18;
    g.fillStyle(0xffffff, 0.9);
    g.fillCircle(x, y, s * 0.25);
    g.lineStyle(3, COLORS.red, 0.9);
    g.lineBetween(x - s, y, x + s, y);
    g.lineBetween(x, y - s, x, y + s);
  }

  /** 地图上一点的头顶在画面（设计坐标）上的哪儿：台词气泡用 */
  private headOf(at: Vec, height: number): ScreenPoint {
    const v = this.cameras.main.worldView;
    const k = GAME_WIDTH / v.width;
    return { x: (at.x - v.x) * k, y: (at.y - height - v.y) * k };
  }

  /** 头顶飘一行字（升级、拿到铜钱） */
  private toast(text: string, x: number, y: number, color: string = CSS_COLORS.red) {
    const t = this.add
      .text(x, y, text, { fontFamily: FONT_BRUSH, fontSize: '28px', color, stroke: CSS_COLORS.paper, strokeThickness: 5 })
      .setOrigin(0.5)
      .setDepth(TOP_DEPTH);
    this.tweens.add({ targets: t, y: y - 50, alpha: 0, delay: 500, duration: 700, onComplete: () => t.destroy() });
  }

  /**
   * 站在竹子后面时，挡住主角的那几丛竹子变半透明，免得人整个被竹林吞掉。
   * 只看脚比主角靠前（画在主角前面）、范围又压着主角的
   */
  private seeThrough(feet: Pt, delta: number) {
    const hero = new Phaser.Geom.Rectangle(feet.x - 35, feet.y - HERO_HEIGHT, 70, HERO_HEIGHT);
    const step = Math.min(1, delta / SEE_THROUGH_FADE);
    for (const { img, rect } of this.props) {
      const target = img.depth > feet.y && Phaser.Geom.Rectangle.Overlaps(rect, hero) ? SEE_THROUGH_ALPHA : 1;
      if (img.alpha !== target) img.setAlpha(Math.abs(target - img.alpha) < 0.01 ? target : img.alpha + (target - img.alpha) * step);
    }
  }

  /** 走进哪片区域：换左上角的名字，第一次进来还亮一下题卡 */
  private checkArea(p: Pt) {
    const area = CHAPTER1_MAP.areas.find((a) => Phaser.Math.Distance.Between(p.x, p.y, a.center.x, a.center.y) < a.radius) ?? null;
    if (!area || area === this.area) return;
    this.area = area;
    this.ui.setArea(area.name);
    if (this.seenAreas.has(area.id)) return;
    this.seenAreas.add(area.id);
    this.ui.showAreaCard(area.name, area.art);
  }

  /**
   * 种竹子：先沿着能走的边界（石板路两边、每片空地一圈）密密种一排，像一堵墙；
   * 再往外按网格撒满，格子里随机挪一挪，偶尔夹一块山石。竹子只是画面，挡人靠 walkable.ts
   */
  private scatterProps() {
    const M = CHAPTER1_MAP;
    const rng = new Phaser.Math.RandomDataGenerator([M.seed]);
    const clearOfPath = M.pathWidth / 2 + WALK_MARGIN + BAMBOO_GAP;
    const clear = (x: number, y: number, slack = 0) =>
      x > 0 && y > 0 && x < M.width && y < M.height &&
      distToPath(x, y, M.path) >= clearOfPath - slack &&
      !M.areas.some((a) => Phaser.Math.Distance.Between(x, y, a.center.x, a.center.y) < a.radius + BAMBOO_GAP - 10 - slack);

    // 路两边的竹墙
    for (let i = 0; i < M.path.length - 1; i++) {
      const a = M.path[i];
      const b = M.path[i + 1];
      const len = Phaser.Math.Distance.Between(a.x, a.y, b.x, b.y);
      const nx = -(b.y - a.y) / len;
      const ny = (b.x - a.x) / len;
      for (let d = 0; d < len; d += EDGE_SPACING) {
        for (const side of [-1, 1]) {
          const off = clearOfPath + rng.realInRange(0, 30);
          const x = Phaser.Math.Linear(a.x, b.x, d / len) + nx * side * off + rng.realInRange(-15, 15);
          const y = Phaser.Math.Linear(a.y, b.y, d / len) + ny * side * off;
          if (clear(x, y, 2)) this.placeProp(rng, x, y, false);
        }
      }
    }
    // 空地一圈的竹墙
    for (const area of M.areas) {
      const r0 = area.radius + BAMBOO_GAP;
      const steps = Math.ceil((Math.PI * 2 * r0) / EDGE_SPACING);
      for (let i = 0; i < steps; i++) {
        const ang = (i / steps) * Math.PI * 2 + rng.realInRange(-0.04, 0.04);
        const r = r0 + rng.realInRange(0, 30);
        const x = area.center.x + Math.cos(ang) * r;
        const y = area.center.y + Math.sin(ang) * r;
        if (clear(x, y, 2)) this.placeProp(rng, x, y, false);
      }
    }
    // 再往外撒满
    const cell = Math.sqrt(M.bambooDensity);
    for (let gy = 0; gy < M.height; gy += cell) {
      for (let gx = 0; gx < M.width; gx += cell) {
        const x = gx + rng.realInRange(0.15, 0.85) * cell;
        const y = gy + rng.realInRange(0.15, 0.85) * cell;
        if (clear(x, y, -40)) this.placeProp(rng, x, y, rng.frac() < 0.1);
      }
    }
  }

  private placeProp(rng: Phaser.Math.RandomDataGenerator, x: number, y: number, rock: boolean) {
    const size = rock ? ROCK_SIZE : BAMBOO_SIZE;
    const key = rock ? `gen:rock${rng.between(0, ROCK_VARIANTS - 1)}` : `gen:bamboo${rng.between(0, BAMBOO_VARIANTS - 1)}`;
    const img = this.add.image(x, y, key).setOrigin(0.5, size.footY / size.h).setDepth(y);
    img.setScale((size.w / img.width) * rng.realInRange(0.85, 1.1));
    if (rng.frac() < 0.5) img.setFlipX(true);
    // 竹子只算竿和叶子那一块（贴图两边留白不算），山石算整块
    const w = img.displayWidth * (rock ? 0.8 : 0.6);
    this.props.push({ img, rect: new Phaser.Geom.Rectangle(x - w / 2, y - img.displayHeight * (size.footY / size.h), w, img.displayHeight * (size.footY / size.h)) });
  }
}

/** 在地上画一个压扁的扇形（判定范围、红色预警） */
function fillSector(g: Phaser.GameObjects.Graphics, at: Vec, facing: Vec, area: GroundArea) {
  const base = groundAngle(facing);
  const half = Phaser.Math.DegToRad(Math.min(area.arc, 360)) / 2;
  const pts: Vec[] = area.arc >= 360 ? [] : [{ ...at }];
  const steps = area.arc >= 360 ? 32 : 20;
  for (let i = 0; i <= steps; i++) {
    const a = base - half + (2 * half * i) / steps;
    pts.push({ x: at.x + Math.cos(a) * area.reach, y: at.y + Math.sin(a) * area.reach * GROUND_SQUASH });
  }
  g.fillPoints(pts, true);
}
