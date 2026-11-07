import Phaser from 'phaser';
import { COLORS } from '../config';
import { hasArt, type ArtSlot } from '../art/slots';
import { placeMapArt } from './mapArt';
import { renderScale } from '../render/sharp';
import type { Pt } from './chapter1Map';

/**
 * 胖虎山寨后院的囤粮：几袋粮、几捆兵器，是往山上送的。
 * 有图（prop_grain_sacks、prop_weapon_bundle）就用图，没有就用代码画麻袋和捆好的刀枪。
 * 只是摆着；拔剑打赢放完人以后，主角会走过来翻出账本（见 PangHuBoss.readLedger）
 */
export class Hoard {
  /** 主角走到这儿翻账本 */
  readonly standAt: Pt;
  /** 粮堆脚下挡路的圆 */
  readonly solids: { at: Pt; r: number }[];

  constructor(
    private readonly scene: Phaser.Scene,
    readonly at: Pt,
  ) {
    this.standAt = { x: at.x + 40, y: at.y + 125 };
    this.solids = [
      { at: { x: at.x, y: at.y }, r: 80 },
      { at: { x: at.x + 150, y: at.y + 15 }, r: 45 },
    ];
    this.drawSacks(at.x, at.y);
    this.drawWeapons(at.x + 150, at.y + 15);
  }

  /**
   * 一堆麻袋：后排三袋、前排两袋，扎口朝上，鼓鼓囊囊。
   * 没有粮袋的图时，用 Canvas 按水墨物件图的路子画一张贴图（宣纸色打底、右下压淡墨、
   * 干笔勾边、麻布纹、一根朱红扎绳），按屏幕倍数画，摆上去和别的物件图一个样
   */
  private drawSacks(x: number, y: number) {
    if (hasArt(this.scene, 'prop_grain_sacks' as ArtSlot)) {
      placeMapArt(this.scene, 'prop_grain_sacks' as ArtSlot, x, y, 230);
      return;
    }
    const key = `gen:grainSacks@${renderScale().toFixed(2)}`;
    const W = 300;
    const H = 230;
    const footY = 205;
    if (!this.scene.textures.exists(key)) bakeSacks(this.scene, key, W, H, footY);
    const shadow = this.scene.add.graphics().setDepth(y - 1);
    shadow.fillStyle(COLORS.ink, 0.16);
    shadow.fillEllipse(x + 6, y + 2, 270, 52);
    this.scene.add
      .image(x, y, key)
      .setOrigin(0.5, footY / H)
      .setScale(1 / renderScale())
      .setDepth(y);
  }

  /** 两捆兵器：麻绳捆着的一束长枪、一束刀，斜靠在木架上 */
  private drawWeapons(x: number, y: number) {
    // 有专门的图就用；没有就借山寨里那张兵器架（同一个山寨的东西，不算拿别人顶替）
    for (const [slot, width] of [['prop_weapon_bundle', 150], ['prop_weapon_rack', 150]] as const)
      if (hasArt(this.scene, slot as ArtSlot)) {
        placeMapArt(this.scene, slot as ArtSlot, x, y, width);
        return;
      }
    const g = this.scene.add.graphics().setDepth(y);
    g.fillStyle(COLORS.ink, 0.18);
    g.fillEllipse(x, y + 2, 150, 36);
    // 木架
    g.lineStyle(6, 0x5b4630, 1);
    g.lineBetween(x - 60, y, x - 50, y - 90);
    g.lineBetween(x + 60, y, x + 50, y - 90);
    g.lineBetween(x - 55, y - 70, x + 55, y - 70);
    // 一束长枪：枪杆、枪头
    for (let i = 0; i < 6; i++) {
      const bx = x - 35 + i * 7;
      g.lineStyle(4, 0x6b5235, 1);
      g.lineBetween(bx, y - 4, bx + 26, y - 170);
      g.fillStyle(0x8d939a, 1);
      g.fillTriangle(bx + 22, y - 168, bx + 30, y - 168, bx + 28, y - 192);
    }
    // 一束刀
    for (let i = 0; i < 4; i++) {
      const bx = x + 15 + i * 9;
      g.lineStyle(7, 0x8d939a, 1);
      g.lineBetween(bx, y - 6, bx - 10, y - 110);
      g.lineStyle(5, 0x3b2c1d, 1);
      g.lineBetween(bx, y - 6, bx + 2, y + 6);
    }
    // 麻绳
    g.lineStyle(5, 0xa88c5c, 1);
    g.lineBetween(x - 40, y - 60, x + 50, y - 55);
    g.lineBetween(x - 36, y - 110, x + 30, y - 100);
    g.lineStyle(2, COLORS.ink, 0.6);
    g.strokeRect(x - 62, y - 92, 124, 92);
  }
}

/** 一只麻袋在贴图上的位置：base 是袋底正中，w、h 是袋子宽高，tilt 往左右歪一点 */
interface SackSpec {
  x: number;
  y: number;
  w: number;
  h: number;
  tilt: number;
  rope?: boolean;
}

/** 画一张麻袋堆的贴图（W×H 设计像素，按渲染倍数放大） */
function bakeSacks(scene: Phaser.Scene, key: string, W: number, H: number, footY: number) {
  const k = renderScale();
  const tex = scene.textures.createCanvas(key, Math.ceil(W * k), Math.ceil(H * k))!;
  const c = tex.getContext();
  c.scale(k, k);
  const rng = new Phaser.Math.RandomDataGenerator(['grain-sacks']);
  const cx = W / 2;
  // 先画后排、再画前排，前面的压住后面的
  const sacks: SackSpec[] = [
    { x: cx - 80, y: footY - 36, w: 104, h: 100, tilt: -0.07 },
    { x: cx + 8, y: footY - 44, w: 110, h: 108, tilt: 0.03, rope: true },
    { x: cx + 92, y: footY - 30, w: 100, h: 96, tilt: 0.09 },
    { x: cx - 42, y: footY, w: 112, h: 102, tilt: -0.04 },
    { x: cx + 56, y: footY + 2, w: 108, h: 98, tilt: 0.06 },
  ];
  for (const s of sacks) drawSack(c, rng, s);
  // 袋口漏出来的几粒米
  c.fillStyle = 'rgba(214, 196, 150, 0.95)';
  for (let i = 0; i < 18; i++) {
    const gx = cx - 110 + rng.frac() * 70;
    const gy = footY - 2 + rng.frac() * 14;
    c.beginPath();
    c.ellipse(gx, gy, 2.2, 1.3, rng.frac() * 3, 0, Math.PI * 2);
    c.fill();
  }
  tex.refresh();
}

/** 麻袋的轮廓：袋底鼓、袋身往上收、扎口一圈，上面翘一撮麻布 */
function sackPath(c: CanvasRenderingContext2D, w: number, h: number, j: () => number) {
  const hw = w / 2;
  c.beginPath();
  c.moveTo(-hw * 0.82 + j(), -h * 0.05);
  // 袋底
  c.bezierCurveTo(-hw * 0.5, h * 0.06, hw * 0.5, h * 0.06, hw * 0.82 + j(), -h * 0.05);
  // 右边鼓出去再收到扎口
  c.bezierCurveTo(hw * 1.1 + j(), -h * 0.32, hw * 0.98 + j(), -h * 0.7, hw * 0.34, -h * 0.8);
  // 扎口往上翘的那撮麻布（短短一撮，参差不齐）
  c.bezierCurveTo(hw * 0.4, -h * 0.86, hw * 0.36 + j(), -h * 0.95, hw * 0.16, -h * 0.93);
  c.lineTo(hw * 0.04, -h * 0.98 + j());
  c.lineTo(-hw * 0.1, -h * 0.92);
  c.bezierCurveTo(-hw * 0.24, -h * 0.97 + j(), -hw * 0.4, -h * 0.9, -hw * 0.34, -h * 0.8);
  // 左边下来
  c.bezierCurveTo(-hw * 1.0 + j(), -h * 0.7, -hw * 1.08 + j(), -h * 0.32, -hw * 0.82, -h * 0.05);
  c.closePath();
}

function drawSack(c: CanvasRenderingContext2D, rng: Phaser.Math.RandomDataGenerator, s: SackSpec) {
  const { w, h } = s;
  c.save();
  c.translate(s.x, s.y);
  c.rotate(s.tilt);
  const flat = () => 0;
  // 袋身：宣纸色，左上受光、右下渐暗
  sackPath(c, w, h, flat);
  const body = c.createLinearGradient(-w * 0.5, -h, w * 0.5, 0);
  body.addColorStop(0, '#e6dcc4');
  body.addColorStop(0.5, '#c4b595');
  body.addColorStop(1, '#7c6d55');
  c.fillStyle = body;
  c.fill();
  // 背光一侧压一层淡墨（只压在袋子里面）
  c.save();
  sackPath(c, w, h, flat);
  c.clip();
  const wash = c.createRadialGradient(w * 0.42, -h * 0.25, 4, w * 0.42, -h * 0.25, w * 0.75);
  wash.addColorStop(0, 'rgba(26, 23, 20, 0.5)');
  wash.addColorStop(1, 'rgba(26, 23, 20, 0)');
  c.fillStyle = wash;
  c.fillRect(-w, -h * 1.1, w * 2, h * 1.3);
  // 袋底贴地的一圈暗
  const ground = c.createLinearGradient(0, -h * 0.2, 0, h * 0.05);
  ground.addColorStop(0, 'rgba(26, 23, 20, 0)');
  ground.addColorStop(1, 'rgba(26, 23, 20, 0.45)');
  c.fillStyle = ground;
  c.fillRect(-w, -h * 0.2, w * 2, h * 0.3);
  // 麻布纹：一道道很淡的短横、短竖
  c.lineWidth = 0.8;
  for (let i = 0; i < 220; i++) {
    const px = (rng.frac() - 0.5) * w;
    const py = -rng.frac() * h * 0.85;
    const len = 3 + rng.frac() * 6;
    c.strokeStyle = i % 5 ? `rgba(26, 23, 20, ${0.08 + rng.frac() * 0.14})` : `rgba(246, 240, 226, ${0.3 + rng.frac() * 0.3})`;
    c.beginPath();
    if (i % 2) {
      c.moveTo(px, py);
      c.lineTo(px + len, py + (rng.frac() - 0.5) * 1.5);
    } else {
      c.moveTo(px, py);
      c.lineTo(px + (rng.frac() - 0.5) * 1.5, py + len);
    }
    c.stroke();
  }
  // 袋身的褶子：从扎口往下撇两三笔
  c.lineCap = 'round';
  for (let i = 0; i < 3; i++) {
    const fx = (i - 1) * w * 0.16 + (rng.frac() - 0.5) * 6;
    c.strokeStyle = 'rgba(26, 23, 20, 0.28)';
    c.lineWidth = 1.4 + rng.frac();
    c.beginPath();
    c.moveTo(fx * 0.5, -h * 0.76);
    c.quadraticCurveTo(fx * 1.4, -h * 0.55, fx * 1.8 + (rng.frac() - 0.5) * 8, -h * (0.36 + rng.frac() * 0.12));
    c.stroke();
  }
  c.restore();
  // 干笔勾边：同一条轮廓抖着描三遍，浓淡粗细不一，像飞白
  for (let pass = 0; pass < 3; pass++) {
    sackPath(c, w, h, () => (rng.frac() - 0.5) * 3);
    c.strokeStyle = `rgba(26, 23, 20, ${[0.9, 0.35, 0.25][pass]})`;
    c.lineWidth = [2.6, 4.2, 1.2][pass];
    c.lineJoin = 'round';
    c.stroke();
  }
  // 扎绳：一圈麻绳，正中那袋用朱红
  const ry = -h * 0.8;
  c.strokeStyle = s.rope ? '#b3261e' : '#5b4630';
  c.lineWidth = 4;
  c.beginPath();
  c.moveTo(-w * 0.17, ry);
  c.quadraticCurveTo(0, ry + 5, w * 0.17, ry - 1);
  c.stroke();
  if (s.rope) {
    // 绳头垂下来两截
    c.lineWidth = 2.6;
    c.beginPath();
    c.moveTo(w * 0.12, ry);
    c.quadraticCurveTo(w * 0.2, ry + 14, w * 0.16, ry + 26);
    c.moveTo(w * 0.15, ry);
    c.quadraticCurveTo(w * 0.27, ry + 10, w * 0.26, ry + 20);
    c.stroke();
  }
  c.restore();
}
