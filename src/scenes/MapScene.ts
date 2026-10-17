import Phaser from 'phaser';
import { COLORS } from '../config';
import type { ArtSlot } from '../art/slots';
import { sfx } from '../audio/sfx';
import { HEROES } from '../characters/heroes';
import { endRun, getRun, runStats, startRun, type RunState } from '../game/run';
import { Controls } from '../input/Controls';
import { CHAPTER1_MAP, type MapArea, type Pt } from '../map/chapter1Map';
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
import { MapSprite } from '../map/MapSprite';
import { WALK_MARGIN, distToPath, keepInside } from '../map/walkable';
import type { UIScene } from './UIScene';

/** 主角在地图上画多高（设计像素） */
const HERO_HEIGHT = 170;
/** 主角脚下的碰撞圆有多大 */
const HERO_RADIUS = 18;
/** 挡在主角前面的竹子淡到多透明；淡入淡出要多久（毫秒） */
const SEE_THROUGH_ALPHA = 0.35;
const SEE_THROUGH_FADE = 150;
/** 竹子离能走的边界多远才开始长：贴着边界种一排，看着就是一堵竹墙 */
const BAMBOO_GAP = 40;
/** 边界上那排竹子隔多远一丛 */
const EDGE_SPACING = 90;

/**
 * 第一章 · 竹林的大地图（斜俯视）。第 1 阶段：只有走路——
 * WASD 八个方向走，竹丛和山石挡路，人物按前后自动遮挡，镜头跟着人，走进新区域亮出区域题卡。
 */
export class MapScene extends Phaser.Scene {
  private run!: RunState;
  private controls!: Controls;
  private hero!: Phaser.GameObjects.Zone;
  private body!: Phaser.Physics.Arcade.Body;
  private sprite!: MapSprite;
  private facing = { x: 0, y: 1 };
  private ui!: UIScene;
  private area: MapArea | null = null;
  private seenAreas = new Set<string>();
  /** 地图上的竹子和山石，连同它在地图上占的范围（判断挡没挡住主角用） */
  private props: { img: Phaser.GameObjects.Image; rect: Phaser.Geom.Rectangle }[] = [];

  constructor() {
    super({ key: 'Map', physics: { arcade: { gravity: { x: 0, y: 0 } } } });
  }

  create() {
    this.run = getRun() ?? startRun('wenShaohua', false);
    this.controls = new Controls(this);
    this.area = null;
    this.seenAreas = new Set();
    this.props = [];
    const M = CHAPTER1_MAP;

    bakeMapTextures(this, M.seed);
    this.physics.world.setBounds(0, 0, M.width, M.height);

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

    // 主角：脚下一个小碰撞圆，贴图按朝向换
    const hero = HEROES[this.run.hero];
    this.hero = this.add.zone(M.start.x, M.start.y, HERO_RADIUS * 2, HERO_RADIUS * 2);
    this.physics.add.existing(this.hero);
    this.body = this.hero.body as Phaser.Physics.Arcade.Body;
    this.body.setCircle(HERO_RADIUS).setCollideWorldBounds(true);
    const fallback = (this.run.hero === 'wenShaohua' ? 'portrait_wenShaohua' : 'portrait_yuWuxia') as ArtSlot;
    this.sprite = new MapSprite(this, this.run.hero, fallback, HERO_HEIGHT, 70);

    const cam = this.cameras.main;
    cam.setBounds(0, 0, M.width, M.height);
    cam.startFollow(this.hero, true, 0.12, 0.12);

    this.scene.launch('UI', { heroName: hero.def.name, hint: 'WASD / 方向键 走 · Esc 返回标题' });
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
    let dx = this.controls.moveX;
    let dy = this.controls.moveY;
    const moving = dx !== 0 || dy !== 0;
    if (moving) {
      const len = Math.hypot(dx, dy);
      dx /= len;
      dy /= len;
      this.facing = { x: dx, y: dy };
    }
    const speed = HEROES[this.run.hero].def.moveSpeed * runStats(this.run).speedScale;
    this.body.setVelocity(dx * speed, dy * speed);

    // 钻进竹林了就推回路上（贴着边走会顺着滑过去）
    const feet = keepInside(CHAPTER1_MAP, { x: this.body.x + HERO_RADIUS, y: this.body.y + HERO_RADIUS });
    this.body.position.set(feet.x - HERO_RADIUS, feet.y - HERO_RADIUS);
    this.sprite.update(feet.x, feet.y, this.facing, moving && this.body.speed > 10, delta);
    this.seeThrough(feet, delta);
    this.ui.setHp(this.run.hp, runStats(this.run).maxHp);
    this.checkArea(feet);
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
