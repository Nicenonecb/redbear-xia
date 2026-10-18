import Phaser from 'phaser';
import { COLORS } from '../config';
import { hasArt, type ArtSlot } from '../art/slots';
import type { MoveRunner } from '../combat/MoveRunner';

/** 斜俯视下的八个朝向；朝左的三个用朝右的图水平翻转 */
export type Dir8 = 's' | 'se' | 'e' | 'ne' | 'n' | 'nw' | 'w' | 'sw';
const DIRS: Dir8[] = ['e', 'se', 's', 'sw', 'w', 'nw', 'n', 'ne'];
const MIRROR: Partial<Record<Dir8, Dir8>> = { w: 'e', sw: 'se', nw: 'ne' };

/**
 * 出招姿势：站着 / 蓄势（收剑、举刀）/ 打出去的一瞬间。
 * 第三批的姿势图叫 map_<名字>_<姿势>_<朝向>；没有姿势图就用站姿图，代码做后仰、前冲顶着
 */
export type Pose = 'idle' | 'ready' | 'strike';

/** 地图精图里脚底离图片底边留了 6% 的空白（见出图清单），立绘顶着时脚就在底边 */
const MAP_ART_FOOT = 0.94;

/** 由面向（地面上的方向）算出八个朝向里最近的一个 */
export function dirOf(fx: number, fy: number): Dir8 {
  const a = Math.atan2(fy, fx);
  const i = Math.round(a / (Math.PI / 4));
  return DIRS[(i + 8) % 8];
}

/**
 * 按招式表的帧号算出该摆哪个姿势：蓄力招一直是蓄势；有判定或放飞行道具的招，
 * 前摇是蓄势，判定帧到收招前半段是打出去；闪避这类没有攻击的招照常站着（冲刺由代码做）
 */
export function poseOf(runner: MoveRunner): Pose {
  const m = runner.move;
  if (!m) return 'idle';
  if (m.hold) return 'ready';
  const attacks = !!m.hit || !!m.events?.some((e) => e.type === 'spawn');
  if (!attacks) return 'idle';
  if (runner.frame < m.startup) return 'ready';
  return runner.frame < m.startup + m.active + m.recovery * 0.5 ? 'strike' : 'idle';
}

export interface SpriteState {
  /** 脚底在地面上的位置 */
  x: number;
  y: number;
  /** 离地多高（被打飞时） */
  z?: number;
  facing: { x: number; y: number };
  moving: boolean;
  pose?: Pose;
  /** 受击闪白 */
  flash?: boolean;
  /** 顿帧中：原地抖 */
  shaking?: boolean;
  /** 闪避中：半透明、留残影 */
  evading?: boolean;
  /** 受击保护期：一闪一闪 */
  blinking?: boolean;
}

/**
 * 地图上一个人物的样子：脚下的影子 + 一张按朝向、姿势换的贴图。
 * 贴图优先用第三批的地图精图，没有就用立绘顶着（只有正面，左右翻转）。
 * 走路时上下轻轻起伏、身子往前倾一点；站着时有呼吸感；蓄势往后收、出招往前冲；闪避留残影。
 * 这些动作都是代码做的，贴图本身不动。
 */
export class MapSprite {
  readonly shadow: Phaser.GameObjects.Ellipse;
  readonly img: Phaser.GameObjects.Image;
  private dir: Dir8 = 's';
  private pose: Pose = 'idle';
  private time = Math.random() * 1000;
  private baseScale = 1;
  /** 当前贴图是不是专门的姿势图（是的话就不用代码做后仰前冲了） */
  private poseArt = false;
  private ghosts: { img: Phaser.GameObjects.Image; life: number }[] = [];
  private ghostTimer = 0;

  constructor(
    private readonly scene: Phaser.Scene,
    /** 地图精图的名字，比如 wenShaohua */
    private readonly mapName: string,
    /** 没有地图精图时用哪张立绘顶着 */
    private readonly fallback: ArtSlot,
    /** 人物在地图上多高（设计像素） */
    private readonly height: number,
    shadowWidth: number,
  ) {
    this.shadow = scene.add.ellipse(0, 0, shadowWidth, shadowWidth * 0.32, COLORS.ink, 0.22);
    this.img = scene.add.image(0, 0, '__WHITE');
    this.applyTexture('s', 'idle');
  }

  /** 每个画面帧调用 */
  update(s: SpriteState, delta: number) {
    this.time += delta;
    const pose = s.pose ?? 'idle';
    const dir = dirOf(s.facing.x, s.facing.y);
    if (dir !== this.dir || pose !== this.pose) this.applyTexture(dir, pose);

    const z = s.z ?? 0;
    const step = s.moving ? Math.abs(Math.sin(this.time * 0.013)) : 0;
    const breathe = s.moving || pose !== 'idle' ? 0 : Math.sin(this.time * 0.003) * 0.01;
    // 没有姿势图时：蓄势往后收一点、身子后仰，出招往前冲、前倾
    let ox = 0;
    let oy = 0;
    let lean = s.moving ? s.facing.x * 0.05 * (0.6 + step * 0.4) : 0;
    let squash = 1;
    if (!this.poseArt && pose === 'ready') {
      ox = -s.facing.x * 10;
      oy = -s.facing.y * 6;
      lean = -s.facing.x * 0.16;
      squash = 0.92;
    } else if (!this.poseArt && pose === 'strike') {
      ox = s.facing.x * 16;
      oy = s.facing.y * 10;
      lean = s.facing.x * 0.2;
      squash = 1.04;
    }
    const shake = s.shaking ? Phaser.Math.Between(-2, 2) : 0;
    this.img.setPosition(s.x + ox + shake, s.y + oy - z - step * 6);
    const sx = this.baseScale * (this.mirrored ? -1 : 1) * (1 - breathe * 0.5);
    this.img.setScale(sx, this.baseScale * (1 + breathe) * squash);
    this.img.setRotation(lean);
    if (s.flash) this.img.setTintFill(0xffffff);
    else this.img.clearTint();
    const blink = s.blinking && Math.floor(this.time / 70) % 2 === 0;
    this.img.setAlpha(s.evading ? 0.55 : blink ? 0.35 : 1);
    // 被打飞时影子留在地上、变小变淡
    this.shadow.setPosition(s.x, s.y).setScale((1 - step * 0.08) * (1 - Math.min(z, 120) / 240));
    this.shadow.setAlpha(1 - Math.min(z, 120) / 200);
    // 前后遮挡：脚越靠下（离镜头越近）画得越靠前
    this.img.setDepth(s.y);
    this.shadow.setDepth(s.y - 1);
    this.updateGhosts(!!s.evading, delta);
  }

  setVisible(v: boolean) {
    this.img.setVisible(v);
    this.shadow.setVisible(v);
  }

  destroy() {
    this.img.destroy();
    this.shadow.destroy();
    for (const g of this.ghosts) g.img.destroy();
    this.ghosts = [];
  }

  /** 闪避残影：无敌帧里每隔一小段留一个淡墨身影，慢慢淡掉 */
  private updateGhosts(evading: boolean, delta: number) {
    if (evading) {
      this.ghostTimer -= delta;
      if (this.ghostTimer <= 0) {
        this.ghostTimer = 45;
        const g = this.scene.add
          .image(this.img.x, this.img.y, this.img.texture.key)
          .setOrigin(this.img.originX, this.img.originY)
          .setScale(this.img.scaleX, this.img.scaleY)
          .setRotation(this.img.rotation)
          .setTintFill(COLORS.inkLight)
          .setDepth(this.img.depth - 2);
        this.ghosts.push({ img: g, life: 1 });
      }
    } else {
      this.ghostTimer = 0;
    }
    for (const g of this.ghosts) {
      g.life -= delta / 260;
      g.img.setAlpha(Math.max(0, g.life) * 0.4);
      if (g.life <= 0) g.img.destroy();
    }
    this.ghosts = this.ghosts.filter((g) => g.life > 0);
  }

  /** 朝左的三个方向都用朝右的图翻过来；只有立绘顶着时也是往左走就翻 */
  private get mirrored() {
    return !!MIRROR[this.dir];
  }

  private artSlot(pose: Pose, dir: Dir8) {
    return (pose === 'idle' ? `map_${this.mapName}_${dir}` : `map_${this.mapName}_${pose}_${dir}`) as ArtSlot;
  }

  private applyTexture(dir: Dir8, pose: Pose) {
    this.dir = dir;
    this.pose = pose;
    const own = MIRROR[dir] ?? dir;
    const poseSlot = this.artSlot(pose, own);
    const idleSlot = this.artSlot('idle', own);
    this.poseArt = pose !== 'idle' && hasArt(this.scene, poseSlot);
    const slot = this.poseArt ? poseSlot : hasArt(this.scene, idleSlot) ? idleSlot : null;
    if (slot) {
      this.img.setTexture(`art:${slot}`).setOrigin(0.5, MAP_ART_FOOT);
      // 精图里人物大约占画面 70～80% 高，按整张图的高度来缩放，同一个人的各张图大小就一致
      this.baseScale = this.height / (this.img.height * 0.75);
    } else {
      this.img.setTexture(hasArt(this.scene, this.fallback) ? `art:${this.fallback}` : '__WHITE').setOrigin(0.5, 1);
      this.baseScale = this.height / this.img.height;
    }
  }
}
