import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_HEIGHT, GAME_WIDTH } from '../config';
import { hasArt, queueMapArt, trimArtTextures, type ArtSlot } from '../art/slots';
import { InkSplat } from '../art/inkSplat';
import { drawThrowingKnife } from '../art/projectiles';
import { VoicePlayer, queueVoice } from '../audio/voice';
import { sfx } from '../audio/sfx';
import { ENEMIES, ENEMY_INTROS, type EnemyId } from '../characters/enemies';
import { HEROES, type HeroEntry } from '../characters/heroes';
import type { GroundArea, MoveEvent } from '../combat/moveTable';
import type { SpawnDef } from '../game/chapter1';
import { STAGE_BALANCE } from '../game/difficulty';
import { advanceRun } from '../game/flow';
import { PROGRESSION, RESCUE_LINES, type StatId } from '../game/progression';
import { applyLevelUp, endRun, gainExp, getRun, runStats, startRun, type RunState } from '../game/run';
import { saveRun } from '../game/save';
import { Controls } from '../input/Controls';
import { type MapArea, type Pt } from '../map/chapter1Map';
import { GROUND_SQUASH, areaOf, groundAngle, type Vec } from '../map/combat/ground';
import type { MapActor, MapHitResult, MapHurtable } from '../map/combat/MapActor';
import { MapCoin } from '../map/combat/MapCoin';
import { MapEnemy } from '../map/combat/MapEnemy';
import { MapFighter } from '../map/combat/MapFighter';
import { ZhangBoss } from '../map/bosses/ZhangBoss';
import { BaoBoss } from '../map/bosses/BaoBoss';
import { PangHuBoss } from '../map/bosses/PangHuBoss';
import type { BossController } from '../map/bosses/BossController';
import { stageFor, stepOf, roomStepOf } from '../game/stages';
import { MapProjectile } from '../map/combat/MapProjectile';
import { RingWave } from '../map/combat/RingWave';
import { ArtPop, ChargeAura, DustPuff, SlashFx, type Overlay } from '../map/combat/fx';
import { Encounter } from '../map/Encounter';
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
  placeMapArt,
} from '../map/mapArt';
import { MapSprite, poseOf } from '../map/MapSprite';
import { WALK_MARGIN, distToPath, type WalkableMap } from '../map/walkable';
import { DamageNumbers } from '../ui/DamageNumbers';
import type { ScreenPoint, UIScene } from './UIScene';

/** 第三批地面图平铺开一块多大（设计像素）；青石板铺得密一点，一块块石板和人的比例才对 */
const GROUND_ART_TILE = 640;
const GROUND_STONE_TILE = 360;
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
/** 走到任新野跟前多近能说话 */
const TALK_RANGE = 150;
/** 红熊救场演出多长（毫秒）、第几成时开口 */
const RESCUE_MS = 2800;
const RESCUE_LINE_AT = 0.42;
/** 胖虎走到这么近（地面距离）就开口念开场白 */

/** 走到离茶摊这么近，任新野就招呼一声 */
const GREET_RANGE = 450;

/**
 * 第一章 · 竹林的大地图（斜俯视），整章都在这一张图上走完：
 * 入山、深处两场遭遇战（走进空地两头竹篱合上，山贼一波波杀进来，清完选升级、篱笆落下、存档）→
 * 任新野的茶摊（走到跟前按 J 进去买东西，也可以直接走过去）→ 山寨前的遭遇战（有头目）→
 * 胖虎山寨（开场白 →【拔剑 / 给钱】→ 开打，半血变身猛虎）→ 红熊的信。
 * 濒死时红熊救场一次。战斗判定是脚下朝面向张开的扇形。
 */
export class MapScene extends Phaser.Scene {
  run!: RunState;
  private controls!: Controls;
  private heroEntry!: HeroEntry;
  player!: MapFighter;
  /** 镜头跟着的点（主角脚下） */
  private camTarget!: Phaser.GameObjects.Zone;
  private sprite!: MapSprite;
  ui!: UIScene;
  private area: MapArea | null = null;
  private seenAreas = new Set<string>();
  /** 地图上的竹子和山石，连同它在地图上占的范围（判断挡没挡住主角用） */
  private props: { img: Phaser.GameObjects.Image; rect: Phaser.Geom.Rectangle }[] = [];
  /** 能走的范围：地图本身加上遭遇战时竹篱圈住的那一块 */
  walk!: WalkableMap;
  private encounters: Encounter[] = [];
  private coins: MapCoin[] = [];
  /** 暂停的原因（念台词、选升级、救场演出）；有任何一个逻辑帧都不推进 */
  pauses = new Set<string>();
  /** 正在念的一串台词，念完做 then */
  talking: { lines: string[]; then: () => void; where: () => ScreenPoint; portrait?: { slot: ArtSlot; side: 'left' | 'right' } } | null =
    null;
  private renSprite!: MapSprite;
  /** 铺满屏幕、跟着镜头走的那几层地面 */
  private groundLayers: Phaser.GameObjects.TileSprite[] = [];
  private renPrompt!: Phaser.GameObjects.Text;
  private renGreeted = false;
  private rescueShow: { t: number; startHp: number; targetHp: number; said: boolean } | null = null;
  /** 胖虎名牌只在第一次拔剑时亮 */
  private leaving = false;
  projectiles: MapProjectile[] = [];
  overlays: Overlay[] = [];
  private numbers!: DamageNumbers;
  private accumulator = 0;
  private aura: ChargeAura | null = null;
  /** 连段里刀光左右交替 */
  private slashFlip = false;
  private lastPhase: string | null = null;
  private debug!: Phaser.GameObjects.Graphics;
  private showDebug = false;
  private enemies: { enemy: MapEnemy; sprite: MapSprite; look: MapLook }[] = [];
  rings: RingWave[] = [];
  /** 地上的红色预警（扇形、红线、红圈），每帧重画 */
  private warn!: Phaser.GameObjects.Graphics;
  /** 出招前武器上的一下闪光 */
  glints!: Phaser.GameObjects.Graphics;
  /** 变身演出中：主角不能动，逻辑放慢 */
  cinematic = false;
  timeScale = 1;
  private over = false;
  private voice!: VoicePlayer;
  controller!: BossController;
  get boss() {
    return this.controller?.actor;
  }
  get stage() {
    return stageFor(this.run);
  }

  constructor() {
    super('Map');
  }

  /**
   * 进地图前加载这一局用得上的第三批图（第一次进来要等几秒，画一道墨条；之后再进就不用等了）
   */
  preload() {
    queueVoice(this, ['redBear_rescue_1', 'redBear_rescue_2', 'redBear_rescue_3']);
    const hero = (getRun() ?? startRun('wenShaohua', false)).hero;
    if (!queueMapArt(this, hero)) return;
    const cx = GAME_WIDTH / 2;
    const cy = GAME_HEIGHT / 2;
    const label = this.add
      .text(cx, cy - 40, '研墨中……', { fontFamily: FONT_BRUSH, fontSize: '30px', color: CSS_COLORS.ink })
      .setOrigin(0.5);
    const bar = this.add.graphics();
    const draw = (p: number) => {
      bar.clear();
      bar.fillStyle(COLORS.ink, 0.15);
      bar.fillRect(cx - 210, cy, 420, 6);
      bar.fillStyle(COLORS.ink, 0.9);
      bar.fillRect(cx - 210, cy, 420 * p, 6);
      bar.fillStyle(COLORS.red);
      bar.fillCircle(cx - 210 + 420 * p, cy + 3, 4);
    };
    draw(0);
    this.load.on(Phaser.Loader.Events.PROGRESS, draw);
    this.load.once(Phaser.Loader.Events.COMPLETE, () => {
      label.destroy();
      bar.destroy();
    });
  }

  create() {
    trimArtTextures(this);
    this.voice = new VoicePlayer(this);
    this.run = getRun() ?? startRun('wenShaohua', false);
    this.controls = new Controls(this);
    this.area = null;
    this.seenAreas = new Set();
    this.props = [];
    this.projectiles = [];
    this.overlays = [];
    this.accumulator = 0;
    this.aura = null;
    this.lastPhase = null;
    const M = this.stage.map;

    bakeMapTextures(this, M.seed);

    this.drawGround();

    this.scatterProps();
    if (this.run.stage > 0)
      for (let i = 0; i < 9; i++) {
        const cloud = (placeMapArt(this, 'prop_cloud', 1100 + i * 530, 2200 - i * 155, 800)?.img ??
          this.add.ellipse(1100 + i * 530, 2200 - i * 155, 800, 180, 0xf6f2e9)).setAlpha(0.16).setDepth(8000);
        this.tweens.add({ targets: cloud, x: cloud.x + 170, alpha: 0.3, duration: 7500 + i * 170, yoyo: true, repeat: -1 });
      }
    this.walk = { path: M.path, pathWidth: M.pathWidth, areas: M.areas, lock: null, solids: [] };
    this.placeDecor();
    this.coins = [];
    this.pauses = new Set();
    this.talking = null;
    this.rescueShow = null;
    this.leaving = false;
    this.renGreeted = false;
    this.warn = this.add.graphics().setDepth(-2900);
    this.glints = this.add.graphics().setDepth(TOP_DEPTH - 1);
    this.rings = [];
    this.cinematic = false;
    this.timeScale = 1;
    this.over = false;

    // 主角：逻辑在 MapFighter 里，画面在 MapSprite 里
    this.heroEntry = HEROES[this.run.hero];
    // 读档时出现在上一个关口那里
    const at = M.respawn[Math.min(this.run.step, M.respawn.length - 1)];
    this.player = new MapFighter(at.x, at.y, this.heroEntry.def, this.controls, this.walk, {
      ...runStats(this.run),
      hp: this.run.hp,
    });
    this.player.rescueBelow = this.run.rescueUsed ? 0 : PROGRESSION.rescue.below;
    this.player.events.on('move', (e: MoveEvent) => this.onPlayerMove(e));
    this.player.events.on('rescue', () => this.rescue());
    this.player.onLethal = () => {
      if (!this.run.heartCharm) return false;
      this.run.heartCharm = false;
      this.run.hp = 1;
      saveRun(this.run);
      this.cameras.main.flash(220, 255, 235, 120);
      for (let i = 0; i < 8; i++) {
        const shard = this.add.rectangle(this.player.pos.x, this.player.pos.y - 100, 6, 13, 0xe6bc55).setDepth(TOP_DEPTH);
        this.tweens.add({
          targets: shard,
          x: shard.x + Math.cos((i * Math.PI) / 4) * 80,
          y: shard.y + Math.sin((i * Math.PI) / 4) * 65,
          angle: i * 80,
          alpha: 0,
          duration: 500,
          onComplete: () => shard.destroy(),
        });
      }
      sfx.play('ink');
      this.toast('护心符 · 碎', this.player.pos.x, this.player.pos.y - 170);
      return true;
    };
    this.player.events.once('dead', () => this.onPlayerDead());
    const fallback = (this.run.hero === 'wenShaohua' ? 'portrait_wenShaohua' : 'portrait_yuWuxia') as ArtSlot;
    this.sprite = new MapSprite(this, this.run.hero, fallback, HERO_HEIGHT, 70);
    this.numbers = new DamageNumbers(this, TOP_DEPTH);
    this.enemies = [];
    this.encounters = M.areas
      .filter((a) => a.room !== undefined)
      .map((a) => new Encounter(this, a, this.stage.rooms[a.room!], this.walk, M.path, this.run.step > roomStepOf(this.stage, a.room!)));
    this.spawnRen();
    this.controller =
      this.stage.boss === 'zhangHuatian'
        ? new ZhangBoss(this)
        : this.stage.boss === 'baoJinliang'
          ? new BaoBoss(this)
          : new PangHuBoss(this);
    this.controller.events.on('overlay', (effect: Overlay) => this.overlays.push(effect));
    this.controller.events.on('ring', (ring: RingWave) => this.rings.push(ring));
    this.controller.spawn();
    if (this.stage.boss !== 'pangHu')
      this.boss?.events.on('move', (e: MoveEvent) => {
        if (e.type === 'sfx') {
          sfx.play(e.name);
          const b = this.boss!;
          const hit = b.runner.move?.hit;
          if (hit) this.overlays.push(new SlashFx(this, { ...b.pos }, b.facing, { ...areaOf(hit), heavy: true }));
        }
      });
    this.controller.events.on('yield', () => this.win(`${this.stage.name} · 放行`));
    this.controller.events.on('defeated', () => this.win(`${this.stage.name} · 过关`));

    this.camTarget = this.add.zone(at.x, at.y - 60, 1, 1);
    const cam = this.cameras.main;
    cam.setBounds(0, 0, M.width, M.height);
    cam.startFollow(this.camTarget, true, 0.12, 0.12);

    this.debug = this.add.graphics().setDepth(TOP_DEPTH);
    this.showDebug = false;
    this.input.keyboard!.on('keydown-BACKTICK', () => (this.showDebug = !this.showDebug));

    this.scene.launch('UI', { heroName: this.heroEntry.def.name, hint: this.heroEntry.mapHint, run: this.run, player: this.player });
    this.ui = this.scene.get('UI') as UIScene;

    this.input.keyboard!.on('keydown-ESC', () => {
      if (this.pauses.size || this.leaving) return;
      // 存档留着，回到标题可以继续
      endRun(false);
      this.scene.stop('UI');
      this.scene.start('Title');
    });
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scene.stop('UI');
      this.controller.dispose();
      sfx.stopAmbient();
    });
    sfx.startAmbient();
    cam.fadeIn(500, 239, 231, 214);
  }

  update(_time: number, delta: number) {
    this.controls.update();
    if (!this.pauses.size && !this.leaving) {
      for (const action of this.controls.justPressedActions) {
        // 站在任新野跟前，J 是说话不是出招
        if (action === 'attack' && this.canVisitShop()) {
          this.visitShop();
          continue;
        }
        this.player.buffer.push(action);
      }
      this.accumulator = Math.min(this.accumulator + delta * this.timeScale, FRAME_MS * MAX_CATCHUP_FRAMES);
      while (this.accumulator >= FRAME_MS && !this.pauses.size) {
        this.accumulator -= FRAME_MS;
        this.tick();
      }
    }
    this.updateTalk();
    this.updateRescue(delta);
    this.render(delta);
  }

  /**
   * 一个逻辑帧：主角行动 → 和挡路的东西挤开 → 山贼、胖虎行动并结算他们的招 →
   * 结算主角的招、飞行道具、墨圈 → 捡铜钱 → 遭遇战刷波
   */
  private tick() {
    const p = this.player;
    if (!this.cinematic) p.tick();
    const enemies = this.enemies.map((e) => e.enemy);
    const boss = this.boss;
    if (!p.evading) {
      for (const e of enemies) if (e.def.superArmor && !e.dead) p.pushOutOf(e);
      if (boss && !boss.dead && !boss.invulnerable) p.pushOutOf(boss);
    }
    this.watchPlayerMove();

    const flags = enemies.filter((e) => e.def.id === 'bannerman' && !e.dead && e.hurtFrames === 0);
    for (const e of enemies) {
      e.attackSpeed = flags.some((f) => f !== e && Math.hypot(f.pos.x - e.pos.x, f.pos.y - e.pos.y) < 400) ? 1.2 : 1;
      e.tick();
      this.reportHits(e.resolveHits([p]));
      e.separateFrom(enemies);
    }
    for (const entry of this.enemies) if (entry.enemy.gone) entry.sprite.destroy();
    this.enemies = this.enemies.filter((e) => !e.enemy.gone);
    if (boss) {
      this.controller.checkIntro();
      this.controller.tick();
      this.reportHits(boss.resolveHits([p]));
    }

    const foes: MapHurtable[] = this.enemies.map((e) => e.enemy).filter((e) => !e.dead);
    foes.push(...this.controller.hitTargets());
    this.reportHits(p.resolveHits(foes));
    for (const pr of this.projectiles) this.reportHits(pr.tick(pr.team === 'player' ? foes : [p]));
    this.projectiles = this.projectiles.filter((pr) => pr.alive);
    for (const r of this.rings) this.reportHits(r.tick(r.team === 'player' ? foes : [p]));
    this.rings = this.rings.filter((r) => r.alive);
    for (const c of this.coins) {
      if (!c.tick(p.pos)) continue;
      this.run.coins += c.value;
      sfx.play('coin');
    }
    this.coins = this.coins.filter((c) => !c.collected);
    this.tickEncounters();
  }

  /** 每个画面帧：画人、特效，竹子透明，界面，区域题卡 */
  private render(delta: number) {
    const p = this.player;
    this.followGround();
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
    for (const e of this.encounters) e.draw(delta);
    this.renSprite.update({ x: this.stage.map.renXinye.x, y: this.stage.map.renXinye.y, facing: { x: 0, y: 1 }, moving: false }, delta);
    this.renPrompt.setVisible(this.canVisitShop() && !this.pauses.size);
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
    this.controller.render(delta);
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
      if (e.name === 'dodge') {
        this.overlays.push(new DustPuff(this, { ...p.pos }, { x: -p.facing.x, y: -p.facing.y }));
        this.overlays.push(new ArtPop(this, 'fx_dash_trail', p.pos.x, p.pos.y - 10, 240, p.pos.y - 2, groundAngle(p.facing), true, 420));
      }
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
      this.overlays.push(new ArtPop(this, 'fx_hit', x, y - target.height / 2, heavy ? 170 : 110, y + 3));
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

  /** 走进有遭遇战的空地就开打；场上清空了刷下一波；最后一波清完先选升级再开篱笆 */
  private tickEncounters() {
    const p = this.player.pos;
    for (const enc of this.encounters) {
      if (enc.shouldStart(p)) {
        enc.start();
        sfx.play('bamboo-knock');
      }
      if (enc.state !== 'fighting') continue;
      const alive = this.enemies.filter((e) => !e.enemy.dead).length;
      const result = enc.tick(alive, (sp, at) => this.spawnEnemy(sp, at));
      this.ui.setWave(`第 ${Math.max(1, enc.wave)} / ${enc.waves} 波`);
      if (result === 'done') {
        enc.state = 'cleared';
        this.ui.setWave('清场');
        this.offerLevelUps(() => this.finishEncounter(enc));
      }
    }
    this.greet();
    // 没进茶摊直接往山寨走：算是路过了
    if (this.run.step === stepOf(this.stage, 'shop') && this.area?.id === 'campFront') this.passCheckpoint();
  }

  private finishEncounter(enc: Encounter) {
    enc.open();
    this.ui.setWave(null);
    sfx.play('bamboo-knock');
    this.toast('过关', this.player.pos.x, this.player.pos.y - 200);
    this.passCheckpoint();
  }

  /** 过了一个关口：一局往前走一步，存档（主角当前的气血也存进去） */
  private passCheckpoint() {
    this.run.step++;
    this.run.hp = this.player.hp;
    saveRun(this.run);
  }

  /** 清场后一次选完攒下的升级，每次三选一；选完了再做 then */
  private offerLevelUps(then: () => void) {
    if (this.run.pendingLevelUps <= 0) return then();
    this.pauses.add('levelUp');
    const stats: StatId[] = ['attack', 'vitality', 'agility'];
    const L = PROGRESSION.levelUp;
    this.ui.choice({
      title: `第 ${this.run.level - this.run.pendingLevelUps + 1} 重 · 功力精进`,
      confirmWithEnter: true,
      subtitle: this.run.pendingLevelUps > 1 ? `还有 ${this.run.pendingLevelUps} 次可选` : undefined,
      options: stats.map((id) => ({
        label: L[id].name,
        detail: `${L[id].detail}\n（已加 ${this.run.stats[id]} 次）`,
        icon: `icon_stat_${id}` as const,
      })),
      onPick: (i) => {
        applyLevelUp(this.run, stats[i]);
        this.player.applyStats({ ...runStats(this.run), hp: this.player.hp });
        if (stats[i] === 'vitality') this.player.hp = Math.min(this.player.maxHp, this.player.hp + L.vitality.hp);
        this.pauses.delete('levelUp');
        this.offerLevelUps(then);
      },
    });
  }

  /** 遭遇战刷出一个山贼：一刷出来就盯上主角；这一局第一次见到的还弹登场提示 */
  spawnEnemy(sp: SpawnDef, at: Pt) {
    const base = ENEMIES[sp.enemy];
    const balance = STAGE_BALANCE[this.run.stage];
    const def = {
      ...base,
      hp: Math.round(base.hp * balance.hp),
      exp: Math.round(base.exp * balance.exp),
      coins: base.coins.map((c) => Math.round(c * balance.coins)) as [number, number],
    };
    const enemy = new MapEnemy(
      at.x,
      at.y,
      def,
      this.player,
      this.walk,
      `${this.run.stage}-${this.run.step}-${this.enemies.length}-${this.run.seed ?? this.time.now}`,
    );
    enemy.damageScale = balance.damage;
    const baseLook: MapLook = LOOKS[def.id] ?? LOOKS[def.look];
    const portrait = `portrait_${def.id}` as ArtSlot;
    const look = { ...baseLook, fallback: hasArt(this, portrait) ? portrait : baseLook.fallback };
    const sprite = new MapSprite(this, look.mapName, look.fallback, look.height, look.shadow);
    enemy.events.on('move', (e: MoveEvent) => this.onEnemyMove(enemy, e));
    enemy.events.once('dead', () => this.onEnemyDead(enemy));
    enemy.alert();
    this.enemies.push({ enemy, sprite, look });
    this.overlays.push(new DustPuff(this, { ...at }, { x: 0, y: 1 }, 420));
    this.introduce(sp.enemy);
  }

  clearBossAdds() {
    for (const e of this.enemies) {
      e.enemy.hp = 0;
      e.sprite.destroy();
    }
    this.enemies = [];
    for (const p of this.projectiles) if (p.team === 'enemy') p.destroy();
    for (const r of this.rings) if (r.team === 'enemy') r.destroy();
  }

  private introduce(id: EnemyId) {
    const seen = (this.run.seenEnemies ??= []);
    if (seen.includes(id)) return;
    seen.push(id);
    const intro = ENEMY_INTROS[id];
    this.ui.introCard(
      hasArt(this, `portrait_${id}` as ArtSlot) ? (`portrait_${id}` as ArtSlot) : intro.slot,
      ENEMIES[id].name,
      intro.tip,
      intro.tier,
    );
  }

  // ---------------- 任新野的茶摊 ----------------

  private spawnRen() {
    const at = this.stage.map.renXinye;
    this.renSprite = new MapSprite(this, 'renXinye', 'portrait_renXinye', 190, 80);
    this.renPrompt = this.add
      .text(at.x, at.y - 230, 'J · 和任新野说话', {
        fontFamily: FONT_BRUSH,
        fontSize: '22px',
        color: CSS_COLORS.ink,
        stroke: CSS_COLORS.paper,
        strokeThickness: 5,
      })
      .setOrigin(0.5)
      .setDepth(TOP_DEPTH)
      .setVisible(false);
  }

  /** 走近茶摊，任新野招呼一声（还没进过就招呼进来，进过了就送一句） */
  private greet() {
    if (this.renGreeted || this.talking || this.run.step < stepOf(this.stage, 'shop')) return;
    const at = this.stage.map.renXinye;
    if (Math.hypot(this.player.pos.x - at.x, this.player.pos.y - at.y) > GREET_RANGE) return;
    this.renGreeted = true;
    const line = this.run.step === stepOf(this.stage, 'shop') ? this.stage.shopLines.greeting : this.stage.shopLines.farewell;
    this.ui.say(line, 1800, () => this.headOf(at, 190));
  }

  /** 走到茶摊跟前（还没进过茶摊、附近也没在打架）才能进去 */
  private canVisitShop() {
    if (this.run.step !== stepOf(this.stage, 'shop') || this.walk.lock) return false;
    const at = this.stage.map.renXinye;
    return Math.hypot(this.player.pos.x - at.x, this.player.pos.y - at.y) < TALK_RANGE;
  }

  /** 进茶摊：切换到独立商店场景，买完出来 advanceRun 会回到地图、站在茶摊前 */
  private visitShop() {
    this.leaving = true;
    this.run.hp = this.player.hp;
    sfx.play('ui-confirm');
    const cam = this.cameras.main;
    cam.fadeOut(400, 239, 231, 214);
    cam.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.stop('UI');
      this.scene.start('Shop');
    });
  }

  private onEnemyMove(enemy: MapEnemy, e: MoveEvent) {
    if (e.type === 'sfx') sfx.play(e.name);
    if (e.type === 'vfx' && e.name === 'shake') this.cameras.main.shake(180, 0.008);
    if (e.type === 'spawn' && e.name === 'knife' && enemy.def.projectile) {
      const spec = enemy.def.projectile;
      const { x, y } = enemy.pos;
      const f = enemy.facing;
      const draw =
        enemy.def.id === 'archer'
          ? (g: Phaser.GameObjects.Graphics) => {
              g.lineStyle(3, COLORS.ink);
              g.lineBetween(-25, 0, 25, 0);
              g.fillStyle(COLORS.ink);
              g.fillTriangle(30, 0, 19, -5, 19, 5);
              g.lineBetween(-18, 0, -25, -5);
              g.lineBetween(-18, 0, -25, 5);
            }
          : drawThrowingKnife(spec.hit.box.w);
      this.projectiles.push(new MapProjectile(this, x + f.x * 24, y + f.y * 24, { ...f }, spec, 'enemy', draw, enemy.damageScale, 70));
    }
  }

  /** 打倒山贼：溅一大团墨、掉铜钱（自己飞到主角身上），给经验；升级了提示一下，清场再选 */
  private onEnemyDead(enemy: MapEnemy) {
    const def = enemy.def;
    const { x, y } = enemy.pos;
    sfx.play('ink');
    this.overlays.push(new InkSplat(this, x, y - enemy.height / 2, def.tier === 'brute' ? 220 : 140, 0.85, y + 2));
    let total = this.run.seed
      ? new Phaser.Math.RandomDataGenerator([`${this.run.seed}-${this.run.stage}-${this.run.step}-${def.id}-${x}-${y}`]).between(
          def.coins[0],
          def.coins[1],
        )
      : Phaser.Math.Between(def.coins[0], def.coins[1]);
    while (total > 0) {
      const value = Math.min(total, total >= 10 ? 5 : 1);
      total -= value;
      this.coins.push(new MapCoin(this, { x, y }, value));
    }
    if (gainExp(this.run, def.exp) > 0) {
      this.toast('升级！', this.player.pos.x, this.player.pos.y - 200);
      sfx.play('levelup');
    }
  }

  // ---------------- 胖虎 ----------------

  /** 过关大字，过一会儿去看红熊的信 */
  win(title: string) {
    if (this.leaving) return;
    this.leaving = true;
    this.ui.setBoss(null);
    this.ui.banner(title);
    this.time.delayedCall(1800, () => {
      this.run.hp = this.player.hp;
      this.scene.stop('UI');
      advanceRun(this);
    });
  }

  // ---------------- 台词、救场 ----------------

  /** 依次念几句台词（念的时候整个地图暂停），念完再做 then */
  talk(lines: string[], then: () => void, where: () => ScreenPoint, portrait?: { slot: ArtSlot; side: 'left' | 'right' }) {
    this.pauses.add('talk');
    const [first, ...rest] = lines;
    this.ui.say(first, 1200, where, portrait);
    this.talking = { lines: rest, then, where, portrait };
  }

  private updateTalk() {
    const t = this.talking;
    if (!t || !this.ui.talkDone) return;
    const next = t.lines.shift();
    if (next) return this.ui.say(next, 1400, t.where, t.portrait);
    this.talking = null;
    this.ui.endTalk();
    this.pauses.delete('talk');
    t.then();
  }

  /**
   * 红熊濒死救场：画面一暗，红熊救场的横幅特写扫过，红熊从左下角现身说一句话，气血回到一半。
   * 演出期间整个地图暂停；打胖虎时救完再给一次给钱的机会
   */
  private rescue() {
    this.run.rescueUsed = true;
    this.pauses.add('rescue');
    sfx.play('rescue');
    this.ui.setDim(true);
    this.ui.cutIn('cutin_redBear');
    const p = this.player;
    this.rescueShow = { t: 0, startHp: p.hp, targetHp: Math.max(p.hp, Math.round(p.maxHp * PROGRESSION.rescue.healTo)), said: false };
  }

  private updateRescue(delta: number) {
    const r = this.rescueShow;
    if (!r) return;
    r.t = Math.min(1, r.t + delta / RESCUE_MS);
    if (!r.said && r.t >= RESCUE_LINE_AT) {
      r.said = true;
      const line = Phaser.Math.Between(0, RESCUE_LINES.length - 1);
      void this.voice.play(`redBear_rescue_${line + 1}`, RESCUE_LINES[line]);
      this.ui.say(RESCUE_LINES[line], 1100, () => this.headOf(this.player.pos, HERO_HEIGHT), {
        slot: 'portrait_redBear',
        side: 'left',
      });
    }
    const heal = Phaser.Math.Clamp((r.t - 0.25) / 0.35, 0, 1);
    this.player.hp = Math.round(Phaser.Math.Linear(r.startHp, r.targetHp, heal));
    if (r.t < 0.8) return;
    this.ui.setDim(false);
    if (r.t < 1) return;
    this.rescueShow = null;
    this.ui.endTalk();
    this.pauses.delete('rescue');
    this.controller.afterRescue();
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
    for (const { enemy: e } of this.enemies)
      if (e.def.id === 'bannerman' && !e.dead) {
        g.lineStyle(3, 0xd1ab40, 0.7);
        g.strokeEllipse(e.pos.x, e.pos.y, 800, 520);
        g.lineBetween(e.pos.x, e.pos.y - 20, e.pos.x, e.pos.y - 200);
        g.fillStyle(0xd1ab40, 0.8);
        g.fillTriangle(e.pos.x, e.pos.y - 200, e.pos.x + 65, e.pos.y - 170, e.pos.x, e.pos.y - 145);
      }
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
    this.controller.drawWarnings(g, gl);
  }

  /** 武器上的一下闪光：一个朱红十字星，闪出来再缩回去 */
  glint(g: Phaser.GameObjects.Graphics, at: Vec, facing: Vec, height: number, t: number) {
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
  headOf(at: Vec, height: number): ScreenPoint {
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
    const area = this.stage.map.areas.find((a) => Phaser.Math.Distance.Between(p.x, p.y, a.center.x, a.center.y) < a.radius) ?? null;
    if (!area || area === this.area) return;
    this.area = area;
    this.ui.setArea(area.name);
    if (this.seenAreas.has(area.id)) return;
    this.seenAreas.add(area.id);
    this.ui.showAreaCard(area.name, area.art);
  }

  /** 摆地图上的大件：路牌、茶摊、山寨（寨门、聚义厅、火盆……）、寨墙；脚下挡路的圆记进能走的范围 */
  private placeDecor() {
    const M = this.stage.map;
    for (const d of M.decor) {
      const art = placeMapArt(this, d.slot, d.at.x, d.at.y, d.width);
      if (!art) {
        if (this.run.stage > 0) {
          const g = this.add.graphics().setDepth(d.at.y);
          g.lineStyle(4, COLORS.ink, 0.65);
          g.strokeRect(d.at.x - d.width / 2, d.at.y - 110, d.width, 110);
          this.add
            .text(
              d.at.x,
              d.at.y - 60,
              d.slot.includes('tent') ? '军帐' : d.slot.includes('banner') ? '彰' : d.slot.includes('gate') ? '宫门' : '遗迹',
              { fontFamily: FONT_BRUSH, fontSize: '26px', color: CSS_COLORS.ink },
            )
            .setOrigin(0.5)
            .setDepth(d.at.y + 1);
        }
        continue;
      }
      if (d.flat) art.img.setDepth(-2990);
      else this.props.push(art);
      if (d.r) this.walk.solids!.push({ at: d.solidAt ?? d.at, r: d.r });
      for (const sd of d.solids ?? []) this.walk.solids!.push({ at: sd, r: sd.r });
    }
    const wall = M.campWall;
    const camp = M.areas.find((a) => a.id === 'camp')!;
    const step = Phaser.Math.RadToDeg((wall.width * 0.85) / wall.radius);
    for (let deg = wall.from; deg <= wall.to; deg += step) {
      if (deg > wall.gap[0] && deg < wall.gap[1]) continue;
      const a = Phaser.Math.DegToRad(deg);
      const x = camp.center.x + Math.cos(a) * wall.radius;
      const y = camp.center.y + Math.sin(a) * wall.radius * 0.8;
      const art = placeMapArt(this, 'prop_camp_wall', x, y, wall.width);
      if (art) this.props.push(art);
    }
  }

  /**
   * 地面：竹林泥地平铺 → 一层大墨晕打散重复 → 空地稍亮 → 石板路 → 山寨里换成黄土地。
   * 有第三批的地面图（ground_*）就用图：泥地整张铺，石板路和黄土地用遮罩只露出路和山寨那一块；
   * 没有就用代码画的占位
   */
  private drawGround() {
    const M = this.stage.map;
    const ground = (slot: string, fallback: ArtSlot): ArtSlot => (hasArt(this, slot as ArtSlot) ? (slot as ArtSlot) : fallback);
    const forest = ground(
      this.run.stage === 1 ? 'ground_pine_forest' : this.run.stage === 2 ? 'ground_snow_rock' : 'ground_forest',
      'ground_forest',
    );
    const path = ground(
      this.run.stage === 1 ? 'ground_mountain_path' : this.run.stage === 2 ? 'ground_stone_stairs' : 'ground_stone',
      'ground_stone',
    );
    const arena = ground(
      this.run.stage === 1 ? 'ground_drill_yard' : this.run.stage === 2 ? 'ground_palace' : 'ground_camp',
      'ground_camp',
    );
    // 平铺的地面不铺满整张地图（那样每层都要一张 6400×4400 的大贴图，几百兆显存），
    // 只铺一块屏幕大小的，钉在镜头上；镜头走到哪，纹理就跟着挪到哪，看起来就是铺满的
    const layers: { t: Phaser.GameObjects.TileSprite; region?: Phaser.Geom.Rectangle }[] = [];
    const tiled = (key: string, tile: number, depth: number, region?: Phaser.Geom.Rectangle) => {
      const w = region?.width ?? GAME_WIDTH + 64;
      const h = region?.height ?? GAME_HEIGHT + 64;
      const t = this.add
        .tileSprite(region?.x ?? 0, region?.y ?? 0, w, h, key)
        .setOrigin(0)
        .setDepth(depth);
      // 按"原图"的宽来算（t.frame 是这块平铺自己的画布，大小跟着平铺走，不能用）
      t.setTileScale(tile / this.textures.getFrame(key).width);
      if (!region) layers.push({ t });
      return t;
    };
    if (hasArt(this, forest)) tiled(`art:${forest}`, GROUND_ART_TILE, -3000);
    else tiled('gen:ground', GROUND_TILE, -3000);
    tiled('gen:groundWash', GROUND_WASH_TILE, -3000);
    this.groundLayers = layers.map((l) => l.t);

    const floor = this.add.graphics().setDepth(-2999);
    for (const a of M.areas) {
      floor.fillStyle(COLORS.paper, 0.35);
      floor.fillEllipse(a.center.x, a.center.y, a.radius * 2.1, a.radius * 1.5);
    }
    // 山寨的黄土地、青石板路：只在那一块铺（贴图跟着那一块大小走），再用遮罩剪出形状
    const camp = M.areas.find((a) => a.id === 'camp')!;
    if (hasArt(this, arena)) {
      const rx = camp.radius * 1.1;
      const ry = camp.radius * 0.95;
      const region = new Phaser.Geom.Rectangle(camp.center.x - rx, camp.center.y - ry, rx * 2, ry * 2);
      const shape = this.make.graphics({}, false);
      shape.fillStyle(0xffffff);
      shape.fillEllipse(camp.center.x, camp.center.y, rx * 2, ry * 2);
      tiled(`art:${arena}`, GROUND_ART_TILE, -2998, region).setMask(shape.createGeometryMask()).setAlpha(0.85);
    }
    if (hasArt(this, path)) {
      floor.lineStyle(M.pathWidth + 70, COLORS.inkLight, 0.08);
      floor.strokePoints(M.path);
      // 路是一条斜着的长带，一整块包住它太大了：每一段路单独铺一块
      for (let i = 0; i < M.path.length - 1; i++) {
        const a = M.path[i];
        const b = M.path[i + 1];
        const pad = M.pathWidth / 2 + 4;
        const x0 = Math.floor(Math.min(a.x, b.x) - pad);
        const y0 = Math.floor(Math.min(a.y, b.y) - pad);
        const region = new Phaser.Geom.Rectangle(
          x0,
          y0,
          Math.ceil(Math.abs(a.x - b.x) + pad * 2),
          Math.ceil(Math.abs(a.y - b.y) + pad * 2),
        );
        const shape = this.make.graphics({}, false);
        shape.lineStyle(M.pathWidth, 0xffffff);
        shape.lineBetween(a.x, a.y, b.x, b.y);
        shape.fillStyle(0xffffff);
        shape.fillCircle(a.x, a.y, M.pathWidth / 2);
        shape.fillCircle(b.x, b.y, M.pathWidth / 2);
        const t = tiled(`art:${path}`, GROUND_STONE_TILE, -2997, region).setMask(shape.createGeometryMask());
        // 各段的纹理对齐到同一张网格上，接头处石板缝是连着的
        t.setTilePosition(x0 / t.tileScaleX, y0 / t.tileScaleY);
      }
    } else {
      drawStonePath(floor, M.path, M.pathWidth, M.seed);
    }
  }

  /** 每个画面帧：铺满屏幕的那几层地面跟着镜头挪，纹理按地图坐标对齐，走起来地面不会跟着人滑 */
  private followGround() {
    const v = this.cameras.main.worldView;
    const x = Math.floor(v.x) - 32;
    const y = Math.floor(v.y) - 32;
    for (const t of this.groundLayers) {
      const w = Math.ceil(v.width) + 64;
      const h = Math.ceil(v.height) + 64;
      if (t.width !== w || t.height !== h) t.setSize(w, h);
      t.setPosition(x, y).setTilePosition(x / t.tileScaleX, y / t.tileScaleY);
    }
  }

  /**
   * 种竹子：先沿着能走的边界（石板路两边、每片空地一圈）密密种一排，像一堵墙；
   * 再往外按网格撒满，格子里随机挪一挪，偶尔夹一块山石。竹子只是画面，挡人靠 walkable.ts
   */
  private scatterProps() {
    const M = this.stage.map;
    const rng = new Phaser.Math.RandomDataGenerator([M.seed]);
    const clearOfPath = M.pathWidth / 2 + WALK_MARGIN + BAMBOO_GAP;
    const clear = (x: number, y: number, slack = 0) =>
      x > 0 &&
      y > 0 &&
      x < M.width &&
      y < M.height &&
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

  /**
   * 种一丛竹子 / 摆一块石头。有第三批的竹丛、山石图就用图（大中小随机挑，偶尔夹灌木、竹桩），
   * 没有就用代码画的占位
   */
  private placeProp(rng: Phaser.Math.RandomDataGenerator, x: number, y: number, rock: boolean) {
    const choices: [ArtSlot, number][] =
      !rock && this.run.stage > 0
        ? [
            ['prop_pine_big', this.run.stage === 1 ? 340 : 260],
            ['prop_pine_small', 220],
            ['prop_rock_big', 230],
          ]
        : rock
          ? [
              ['prop_rock_big', 230],
              ['prop_rock_small', 150],
              ['prop_bush', 170],
              ['prop_stump', 140],
              ['prop_pine', 300],
            ]
          : [
              ['prop_bamboo_big', 250],
              ['prop_bamboo_big', 250],
              ['prop_bamboo_mid', 220],
              ['prop_bamboo_mid', 220],
              ['prop_bamboo_small', 150],
            ];
    const [slot, width] = rng.pick(choices);
    const art = placeMapArt(this, slot, x, y, width * rng.realInRange(0.85, 1.12));
    if (art) {
      if (rng.frac() < 0.5) art.img.setFlipX(true);
      this.props.push(art);
      return;
    }
    const size = rock ? ROCK_SIZE : BAMBOO_SIZE;
    const key = rock ? `gen:rock${rng.between(0, ROCK_VARIANTS - 1)}` : `gen:bamboo${rng.between(0, BAMBOO_VARIANTS - 1)}`;
    const img = this.add
      .image(x, y, key)
      .setOrigin(0.5, size.footY / size.h)
      .setDepth(y);
    img.setScale((size.w / img.width) * rng.realInRange(0.85, 1.1));
    if (rng.frac() < 0.5) img.setFlipX(true);
    // 竹子只算竿和叶子那一块（贴图两边留白不算），山石算整块
    const w = img.displayWidth * (rock ? 0.8 : 0.6);
    this.props.push({
      img,
      rect: new Phaser.Geom.Rectangle(
        x - w / 2,
        y - img.displayHeight * (size.footY / size.h),
        w,
        img.displayHeight * (size.footY / size.h),
      ),
    });
  }
}

/** 在地上画一个压扁的扇形（判定范围、红色预警） */
export function fillSector(g: Phaser.GameObjects.Graphics, at: Vec, facing: Vec, area: GroundArea) {
  const base = groundAngle(facing);
  const half = Phaser.Math.DegToRad(Math.min(area.arc, 360)) / 2;
  const pts: Vec[] = area.arc >= 360 || area.from ? [] : [{ ...at }];
  const steps = area.arc >= 360 ? 32 : 20;
  for (let i = 0; i <= steps; i++) {
    const a = base - half + (2 * half * i) / steps;
    pts.push({ x: at.x + Math.cos(a) * area.reach, y: at.y + Math.sin(a) * area.reach * GROUND_SQUASH });
  }
  if (area.from)
    for (let i = steps; i >= 0; i--) {
      const a = base - half + (2 * half * i) / steps;
      pts.push({ x: at.x + Math.cos(a) * area.from, y: at.y + Math.sin(a) * area.from * GROUND_SQUASH });
    }
  g.fillPoints(pts, true);
}
