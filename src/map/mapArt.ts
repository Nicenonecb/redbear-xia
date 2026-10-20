import Phaser from 'phaser';
import { COLORS } from '../config';
import { drawLeaf } from '../art/bamboo';
import { hasArt, type ArtSlot } from '../art/slots';
import { renderScale } from '../render/sharp';
import type { Pt } from './chapter1Map';

/**
 * 大地图上代码画的占位美术：地面纹理、竹丛、山石。第三批精图到了以后换掉。
 * 竹丛、山石都先按渲染倍数画成高清贴图（只画一次），再作为普通图片摆到地图上，
 * 这样几百丛竹子也不用每帧重画；放大到 Retina 屏上也是锐利的。
 */

/** 竹丛有几种样子 */
export const BAMBOO_VARIANTS = 5;
export const ROCK_VARIANTS = 3;
/** 竹丛贴图的大小和"脚"的位置（设计像素） */
export const BAMBOO_SIZE = { w: 240, h: 480, footY: 456 };
export const ROCK_SIZE = { w: 180, h: 120, footY: 104 };
/** 地面纹理一块多大，平铺开 */
export const GROUND_TILE = 512;
/** 叠在上面的大墨晕层一块多大（故意不和 GROUND_TILE 成倍数） */
export const GROUND_WASH_TILE = 731;

/** 把一段画法按渲染倍数画成贴图：draw 里所有坐标都乘 k */
function bake(scene: Phaser.Scene, key: string, w: number, h: number, draw: (g: Phaser.GameObjects.Graphics, k: number) => void) {
  if (scene.textures.exists(key)) scene.textures.remove(key);
  const k = renderScale();
  const g = scene.make.graphics({}, false);
  draw(g, k);
  g.generateTexture(key, Math.ceil(w * k), Math.ceil(h * k));
  g.destroy();
}

/** 生成地图要用的全部占位贴图；进地图时调一次 */
export function bakeMapTextures(scene: Phaser.Scene, seed: string) {
  const rng = new Phaser.Math.RandomDataGenerator([seed]);
  bakeGround(scene, rng);
  for (let i = 0; i < BAMBOO_VARIANTS; i++) bakeBamboo(scene, `gen:bamboo${i}`, rng);
  for (let i = 0; i < ROCK_VARIANTS; i++) bakeRock(scene, `gen:rock${i}`, rng);
}

/** 在一块可平铺的贴图上画东西：靠边的会在对边接着画，平铺时看不出接缝 */
function wrapped(S: number, x: number, y: number, fn: (x: number, y: number) => void) {
  for (const dx of [-S, 0, S]) for (const dy of [-S, 0, S]) fn(x + dx, y + dy);
}

/**
 * 一团不规则的淡墨渍：十来个大小不一、压扁程度不同的小椭圆叠在一起，
 * 边缘是碎的，不会像一个个圆圈
 */
function stain(g: Phaser.GameObjects.Graphics, rng: Phaser.Math.RandomDataGenerator, S: number, k: number, spread: number, rMin: number, rMax: number, aMin: number, aMax: number) {
  const cx = rng.realInRange(0, S);
  const cy = rng.realInRange(0, S);
  const n = rng.between(6, 12);
  for (let i = 0; i < n; i++) {
    const x = cx + rng.realInRange(-spread, spread);
    const y = cy + rng.realInRange(-spread, spread) * 0.6;
    const r = rng.realInRange(rMin, rMax);
    const a = rng.realInRange(aMin, aMax);
    const squash = rng.realInRange(0.4, 0.8);
    wrapped(S, x, y, (px, py) => {
      g.fillStyle(COLORS.inkLight, a);
      g.fillEllipse(px * k, py * k, r * 2 * k, r * 2 * squash * k);
    });
  }
}

/** 地面：宣纸底上零碎的极淡墨渍、飞白一样的细墨点，再撒些枯竹叶 */
function bakeGround(scene: Phaser.Scene, rng: Phaser.Math.RandomDataGenerator) {
  const S = GROUND_TILE;
  bake(scene, 'gen:ground', S, S, (g, k) => {
    g.fillStyle(0xe6dcc6);
    g.fillRect(0, 0, S * k, S * k);
    for (let i = 0; i < 28; i++) stain(g, rng, S, k, 50, 6, 24, 0.008, 0.02);
    for (let i = 0; i < 420; i++) {
      const x = rng.realInRange(0, S);
      const y = rng.realInRange(0, S);
      const r = rng.realInRange(0.5, 1.4);
      const a = rng.realInRange(0.05, 0.14);
      wrapped(S, x, y, (px, py) => {
        g.fillStyle(COLORS.inkLight, a);
        g.fillCircle(px * k, py * k, r * k);
      });
    }
    for (let i = 0; i < 26; i++) {
      const x = rng.realInRange(0, S);
      const y = rng.realInRange(0, S);
      const ang = rng.realInRange(0, Math.PI * 2);
      const len = rng.realInRange(10, 20);
      wrapped(S, x, y, (px, py) => drawLeaf(g, px * k, py * k, ang, len * k, len * 0.16 * k, COLORS.inkLight, 0.16));
    }
  });

  // 第二层：几团很大很淡的墨晕，贴图大小和第一层不成倍数，两层叠起来就看不出哪里在重复
  const W = GROUND_WASH_TILE;
  bake(scene, 'gen:groundWash', W, W, (g, k) => {
    for (let i = 0; i < 9; i++) stain(g, rng, W, k, 140, 50, 130, 0.006, 0.014);
  });
}

/**
 * 一丛竹子（斜俯视看过去）：四到七根竿从同一片地面长出来，前面的浓、后面的淡；
 * 竿上有竹节，上半截斜伸出细枝、挂着竹叶；脚下一团淡墨当影子
 */
function bakeBamboo(scene: Phaser.Scene, key: string, rng: Phaser.Math.RandomDataGenerator) {
  const { w, h, footY } = BAMBOO_SIZE;
  bake(scene, key, w, h, (g, k) => {
    const cx = w / 2;
    g.fillStyle(COLORS.ink, 0.16);
    g.fillEllipse(cx * k, footY * k, 150 * k, 40 * k);

    const stalks = Array.from({ length: rng.between(4, 7) }, () => ({
      x: cx + rng.realInRange(-55, 55),
      base: footY + rng.realInRange(-14, 6),
      height: rng.realInRange(250, 420),
      thick: rng.realInRange(7, 12),
      lean: rng.realInRange(-0.07, 0.07),
    }));
    // 后面（base 小）的先画，颜色淡一点
    stalks.sort((a, b) => a.base - b.base);
    for (const s of stalks) {
      const back = s.base < footY - 4;
      const color = back ? COLORS.inkLight : COLORS.ink;
      const alpha = back ? 0.7 : 0.95;
      const top = s.base - s.height;
      const xAt = (y: number) => s.x + (s.base - y) * s.lean;
      g.fillStyle(color, alpha);
      for (let y = s.base; y > top; y -= 48) {
        const y2 = Math.max(top, y - 45);
        g.fillPoints(
          [
            { x: (xAt(y) - s.thick / 2) * k, y: y * k },
            { x: (xAt(y) + s.thick / 2) * k, y: y * k },
            { x: (xAt(y2) + s.thick * 0.42) * k, y: y2 * k },
            { x: (xAt(y2) - s.thick * 0.42) * k, y: y2 * k },
          ],
          true,
        );
        g.fillRect((xAt(y2) - s.thick * 0.6) * k, (y2 - 2) * k, s.thick * 1.2 * k, 3 * k);
      }
      for (let t = 0; t < rng.between(2, 4); t++) {
        const y = Phaser.Math.Linear(top, s.base, rng.realInRange(0.02, 0.5));
        const side = rng.pick([-1, 1]);
        const len = rng.realInRange(28, 50);
        const ex = xAt(y) + side * len;
        const ey = y - len * 0.35;
        g.lineStyle(Math.max(1, s.thick * 0.16) * k, color, alpha);
        g.lineBetween(xAt(y) * k, y * k, ex * k, ey * k);
        for (let l = 0; l < rng.between(3, 5); l++) {
          const a = Phaser.Math.DegToRad(side > 0 ? rng.realInRange(15, 75) : rng.realInRange(105, 165));
          drawLeaf(g, ex * k, ey * k, a, rng.realInRange(24, 38) * k, rng.realInRange(4, 6) * k, color, alpha);
        }
      }
    }
  });
}

/** 一块山石：浓墨块面，左上亮、右下暗，几点青苔 */
function bakeRock(scene: Phaser.Scene, key: string, rng: Phaser.Math.RandomDataGenerator) {
  const { w, h, footY } = ROCK_SIZE;
  bake(scene, key, w, h, (g, k) => {
    const cx = w / 2;
    g.fillStyle(COLORS.ink, 0.15);
    g.fillEllipse(cx * k, footY * k, 150 * k, 34 * k);
    const pts: Pt[] = [];
    const n = 9;
    for (let i = 0; i < n; i++) {
      const a = Math.PI + (i / (n - 1)) * Math.PI;
      const r = rng.realInRange(0.75, 1);
      pts.push({ x: cx + Math.cos(a) * 70 * r, y: footY - 6 + Math.sin(a) * 70 * r * rng.realInRange(0.8, 1.1) });
    }
    g.fillStyle(COLORS.inkLight, 0.95);
    g.fillPoints(pts.map((p) => ({ x: p.x * k, y: p.y * k })), true);
    g.fillStyle(COLORS.ink, 0.85);
    g.fillPoints(
      [pts[4], pts[5], pts[6], pts[7], pts[8], { x: cx + 20, y: footY - 6 }].map((p) => ({ x: p.x * k, y: p.y * k })),
      true,
    );
    g.lineStyle(2 * k, COLORS.paper, 0.5);
    g.lineBetween((cx - 40) * k, (footY - 40) * k, (cx - 10) * k, (footY - 58) * k);
    for (let i = 0; i < 6; i++) {
      g.fillStyle(COLORS.ink, 0.8);
      g.fillCircle((cx + rng.realInRange(-50, 40)) * k, (footY - rng.realInRange(30, 64)) * k, rng.realInRange(1.5, 3) * k);
    }
  });
}

/** 青石板路：一条浅色宽带，两边淡墨晕开，路面上一块块石板 */
export function drawStonePath(g: Phaser.GameObjects.Graphics, path: Pt[], width: number, seed: string) {
  const rng = new Phaser.Math.RandomDataGenerator([seed]);
  // 路边晕开的淡墨
  g.lineStyle(width + 70, COLORS.inkLight, 0.08);
  g.strokePoints(path);
  g.fillStyle(COLORS.inkLight, 0.08);
  for (const p of path) g.fillCircle(p.x, p.y, (width + 70) / 2);
  // 路面
  g.lineStyle(width, 0xd9cfb9, 1);
  g.strokePoints(path);
  g.fillStyle(0xd9cfb9, 1);
  for (const p of path) g.fillCircle(p.x, p.y, width / 2);
  // 石板：沿路每隔一段摆两三块，淡墨勾边
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i];
    const b = path[i + 1];
    const len = Phaser.Math.Distance.Between(a.x, a.y, b.x, b.y);
    const ang = Math.atan2(b.y - a.y, b.x - a.x);
    for (let d = 0; d < len; d += 70) {
      const t = d / len;
      for (let j = 0; j < 2; j++) {
        const off = rng.realInRange(-width * 0.32, width * 0.32);
        const cx = Phaser.Math.Linear(a.x, b.x, t) - Math.sin(ang) * off;
        const cy = Phaser.Math.Linear(a.y, b.y, t) + Math.cos(ang) * off;
        const sw = rng.realInRange(40, 64);
        const sh = rng.realInRange(26, 38);
        const corners = [
          [-sw / 2, -sh / 2],
          [sw / 2, -sh / 2],
          [sw / 2, sh / 2],
          [-sw / 2, sh / 2],
        ].map(([x, y]) => ({ x: cx + x * Math.cos(ang) - y * Math.sin(ang), y: cy + (x * Math.sin(ang) + y * Math.cos(ang)) * 0.7 }));
        g.fillStyle(0xcfc4ac, 1);
        g.fillPoints(corners, true);
        g.lineStyle(1.5, COLORS.inkLight, 0.35);
        g.strokePoints(corners, true);
      }
    }
  }
}

/**
 * 摆一件第三批的地图物件（prop_*）：落地的那一点对准 (x, y)，按"实际画了东西的宽度"缩放到 width。
 * 落地点和左右范围在 public/art/map-anchors.json 里（tools/map-anchors.py 生成）。没有这张图就返回 null
 */
export function placeMapArt(scene: Phaser.Scene, slot: ArtSlot, x: number, y: number, width: number) {
  if (!hasArt(scene, slot)) return null;
  const data = scene.cache.json.get('mapAnchors') as
    | { props: Record<string, { footY: number; left: number; right: number; top: number }> }
    | undefined;
  const a = data?.props[slot];
  const img = scene.add.image(x, y, `art:${slot}`).setDepth(y);
  const w = img.width;
  const h = img.height;
  const left = a?.left ?? 0;
  const right = a?.right ?? w;
  img.setOrigin((left + right) / 2 / w, (a?.footY ?? h) / h);
  img.setScale(width / (right - left));
  /** 实际画了东西的那一块在地图上占的范围（判断挡没挡住主角用） */
  const top = a?.top ?? 0;
  const rect = new Phaser.Geom.Rectangle(x - width / 2, y - ((a?.footY ?? h) - top) * img.scaleY, width, ((a?.footY ?? h) - top) * img.scaleY);
  return { img, rect };
}
