import Phaser from 'phaser';
import { COLORS } from '../config';
import { hasArt, type ArtSlot } from '../art/slots';

/** 斜俯视下的八个朝向；朝左的三个用朝右的图水平翻转 */
export type Dir8 = 's' | 'se' | 'e' | 'ne' | 'n' | 'nw' | 'w' | 'sw';
const DIRS: Dir8[] = ['e', 'se', 's', 'sw', 'w', 'nw', 'n', 'ne'];
const MIRROR: Partial<Record<Dir8, Dir8>> = { w: 'e', sw: 'se', nw: 'ne' };

/** 由面向（地面上的方向）算出八个朝向里最近的一个 */
export function dirOf(fx: number, fy: number): Dir8 {
  const a = Math.atan2(fy, fx);
  const i = Math.round(a / (Math.PI / 4));
  return DIRS[(i + 8) % 8];
}

/**
 * 地图上一个人物的样子：脚下的影子 + 一张按朝向换的贴图。
 * 贴图优先用第三批的地图精图 `map_<名字>_<朝向>`，没有就用立绘顶着（只有正面，左右翻转）。
 * 走路时上下轻轻起伏、身子往前倾一点；站着时有呼吸感。所有动作都是代码做的，贴图本身不动。
 */
export class MapSprite {
  readonly shadow: Phaser.GameObjects.Ellipse;
  readonly img: Phaser.GameObjects.Image;
  private dir: Dir8 = 's';
  private time = Math.random() * 1000;
  private baseScale = 1;

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
    this.img = scene.add.image(0, 0, this.textureFor('s')).setOrigin(0.5, 1);
    this.applyTexture('s');
  }

  /** 每个画面帧调用：x, y 是脚底在地面上的位置 */
  update(x: number, y: number, facing: { x: number; y: number }, moving: boolean, delta: number) {
    this.time += delta;
    const dir = dirOf(facing.x, facing.y);
    if (dir !== this.dir) this.applyTexture(dir);

    const step = moving ? Math.abs(Math.sin(this.time * 0.013)) : 0;
    const breathe = moving ? 0 : Math.sin(this.time * 0.003) * 0.01;
    this.img.setPosition(x, y - step * 6);
    this.img.setScale(this.baseScale * (this.mirrored ? -1 : 1) * (1 - breathe * 0.5), this.baseScale * (1 + breathe));
    // 走起来身子往前倾一点（只看左右分量）
    this.img.setRotation(moving ? facing.x * 0.05 * (0.6 + step * 0.4) : 0);
    this.shadow.setPosition(x, y).setScale(1 - step * 0.08);
    // 前后遮挡：脚越靠下（离镜头越近）画得越靠前
    this.img.setDepth(y);
    this.shadow.setDepth(y - 1);
  }

  setVisible(v: boolean) {
    this.img.setVisible(v);
    this.shadow.setVisible(v);
  }

  destroy() {
    this.img.destroy();
    this.shadow.destroy();
  }

  /** 朝左的三个方向都用朝右的图翻过来；只有立绘顶着时也是往左走就翻 */
  private get mirrored() {
    return !!MIRROR[this.dir];
  }

  private hasMapArt(dir: Dir8) {
    return hasArt(this.scene, `map_${this.mapName}_${dir}` as ArtSlot);
  }

  private textureFor(dir: Dir8) {
    const own = MIRROR[dir] ?? dir;
    if (this.hasMapArt(own)) return `art:map_${this.mapName}_${own}`;
    return hasArt(this.scene, this.fallback) ? `art:${this.fallback}` : '__WHITE';
  }

  private applyTexture(dir: Dir8) {
    this.dir = dir;
    this.img.setTexture(this.textureFor(dir));
    this.baseScale = this.height / this.img.height;
  }
}
