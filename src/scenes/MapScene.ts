import Phaser from 'phaser';
import { COLORS } from '../config';
import type { ArtSlot } from '../art/slots';
import { InkSplat } from '../art/inkSplat';
import { sfx } from '../audio/sfx';
import { HEROES, type HeroEntry } from '../characters/heroes';
import type { MoveEvent } from '../combat/moveTable';
import { endRun, getRun, runStats, startRun, type RunState } from '../game/run';
import { Controls } from '../input/Controls';
import { CHAPTER1_MAP, type MapArea, type Pt } from '../map/chapter1Map';
import { GROUND_SQUASH, areaOf, groundAngle } from '../map/combat/ground';
import type { MapHitResult, MapHurtable } from '../map/combat/MapActor';
import { MapDummy } from '../map/combat/MapDummy';
import { MapFighter } from '../map/combat/MapFighter';
import type { MapProjectile } from '../map/combat/MapProjectile';
import { ChargeAura, DustPuff, SlashFx, type Overlay } from '../map/combat/fx';
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
import type { UIScene } from './UIScene';

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

    // 主角：逻辑在 MapFighter 里，画面在 MapSprite 里
    this.heroEntry = HEROES[this.run.hero];
    this.player = new MapFighter(M.start.x, M.start.y, this.heroEntry.def, this.controls, M, {
      ...runStats(this.run),
      hp: this.run.hp,
    });
    this.player.events.on('move', (e: MoveEvent) => this.onPlayerMove(e));
    const fallback = (this.run.hero === 'wenShaohua' ? 'portrait_wenShaohua' : 'portrait_yuWuxia') as ArtSlot;
    this.sprite = new MapSprite(this, this.run.hero, fallback, HERO_HEIGHT, 70);
    this.numbers = new DamageNumbers(this, TOP_DEPTH);

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
    this.accumulator = Math.min(this.accumulator + delta, FRAME_MS * MAX_CATCHUP_FRAMES);
    while (this.accumulator >= FRAME_MS) {
      this.accumulator -= FRAME_MS;
      this.tick();
    }
    this.render(delta);
  }

  /** 一个逻辑帧：主角行动 → 和木人桩挤开 → 结算主角的招和飞行道具 → 木人桩晃 */
  private tick() {
    const p = this.player;
    p.tick();
    if (!p.evading) for (const d of this.dummies) p.pushOutOf(d);
    this.watchPlayerMove();
    const foes: MapHurtable[] = this.dummies;
    this.reportHits(p.resolveHits(foes));
    for (const pr of this.projectiles) this.reportHits(pr.tick(pr.team === 'player' ? foes : [p]));
    this.projectiles = this.projectiles.filter((pr) => pr.alive);
    for (const d of this.dummies) d.tick();
  }

  /** 每个画面帧：画人、木人桩、特效，竹子透明，界面，区域题卡 */
  private render(delta: number) {
    const p = this.player;
    this.camTarget.setPosition(p.pos.x, p.pos.y - 60);
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
    const area = p.activeArea();
    if (area) {
      const base = groundAngle(p.facing);
      const half = Phaser.Math.DegToRad(Math.min(area.arc, 360)) / 2;
      const pts: Pt[] = [{ ...p.pos }];
      for (let i = 0; i <= 20; i++) {
        const a = base - half + (2 * half * i) / 20;
        pts.push({ x: p.pos.x + Math.cos(a) * area.reach, y: p.pos.y + Math.sin(a) * area.reach * GROUND_SQUASH });
      }
      g.fillStyle(COLORS.red, 0.25);
      g.fillPoints(pts, true);
    }
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
