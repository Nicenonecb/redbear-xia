import Phaser from 'phaser';
import type { MapArea, Pt } from './chapter1Map';

/**
 * 大地图上哪里能走：沿石板路一条走廊，加上路边的几片空地；其余都是竹林，走不进去。
 * 不靠一丛丛竹子的碰撞圈来挡（圈和圈之间总有缝，人会从竹丛中间钻过去），
 * 而是直接算"出界多远"，出界了就沿边界推回来——贴着竹林走时会顺着边滑过去，不会卡住。
 * 以后地图上的山贼也用同一套规矩。
 */
/**
 * 路上的一个拐点。w、edge 说的是从这一点到下一点的那一段：
 * w 这一段路多宽（不写就用整张图的 pathWidth，栈道、石阶比平路窄）；
 * edge 路边是什么：cliff 下坡那一侧（画面下方）是悬崖，mist 两侧都是云海——都走不过去，也不长树
 */
export interface PathPt extends Pt {
  w?: number;
  edge?: 'cliff' | 'mist';
}

export interface WalkableMap {
  path: PathPt[];
  pathWidth: number;
  areas: MapArea[];
  /** 遭遇战时两边竹篱合上：只能在这一圈里走 */
  lock?: { center: Pt; radius: number } | null;
  /** 走不过去的东西（茶摊、聚义厅、寨门柱子）：脚下一个圆 */
  solids?: { at: Pt; r: number }[];
}

/** 走廊比石板路两边各宽出多少：路边留一点草地，再往外就是竹子 */
export const WALK_MARGIN = 50;
/** 空地的能走范围比空地半径小多少（空地边上一圈也种竹子） */
export const AREA_INSET = 10;

/** 点到折线的最短距离：投影到每一段线段上，取最近的那一段 */
export function distToPath(x: number, y: number, path: Pt[]) {
  let best = Infinity;
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i];
    const b = path[i + 1];
    const len2 = (b.x - a.x) ** 2 + (b.y - a.y) ** 2;
    const t = Phaser.Math.Clamp(((x - a.x) * (b.x - a.x) + (y - a.y) * (b.y - a.y)) / len2, 0, 1);
    best = Math.min(best, Phaser.Math.Distance.Between(x, y, a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t));
  }
  return best;
}

/** 第 i 段路多宽 */
export const segmentWidth = (path: PathPt[], i: number, fallback: number) => path[i].w ?? fallback;

/**
 * 离路边多远：点到每一段路的距离减去那一段的半宽（再加 extra），取最小。
 * 负数在路面（加宽后的路面）里面
 */
export function pathEdgeDist(x: number, y: number, path: PathPt[], width: number, extra = 0) {
  let best = Infinity;
  for (let i = 0; i < path.length - 1; i++) {
    const d = distToPath(x, y, [path[i], path[i + 1]]) - (segmentWidth(path, i, width) / 2 + extra);
    if (d < best) best = d;
  }
  return best;
}

/**
 * 这一点是不是在悬崖 / 云海那一侧（离路 depth 以内）：只算标了 edge 的路段，
 * 投影要落在这一段上；cliff 只算画面下方那一侧
 */
export function inVoid(x: number, y: number, path: PathPt[], depth: number) {
  for (let i = 0; i < path.length - 1; i++) {
    const edge = path[i].edge;
    if (!edge) continue;
    const a = path[i];
    const b = path[i + 1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy);
    const t = ((x - a.x) * dx + (y - a.y) * dy) / (len * len);
    if (t < -0.05 || t > 1.05) continue;
    // 法线朝画面下方的那一侧
    let nx = -dy / len;
    let ny = dx / len;
    if (ny < 0 || (ny === 0 && nx < 0)) (nx = -nx), (ny = -ny);
    const side = (x - a.x) * nx + (y - a.y) * ny;
    if (edge === 'cliff' ? side > 0 && side < depth : Math.abs(side) < depth) return true;
  }
  return false;
}

/** 出界多远：负数是在能走的地方里面，正数是已经钻进竹林多深（设计像素） */
export function outside(m: WalkableMap, x: number, y: number) {
  let d = pathEdgeDist(x, y, m.path, m.pathWidth, WALK_MARGIN);
  for (const a of m.areas) d = Math.min(d, Phaser.Math.Distance.Between(x, y, a.center.x, a.center.y) - (a.radius - AREA_INSET));
  if (m.lock) d = Math.max(d, Phaser.Math.Distance.Between(x, y, m.lock.center.x, m.lock.center.y) - m.lock.radius);
  for (const s of m.solids ?? []) d = Math.max(d, s.r - Phaser.Math.Distance.Between(x, y, s.at.x, s.at.y));
  return d;
}

/**
 * 出界了就推回边界上：沿"出界多远"变大最快的方向往回推。
 * 走路的分量里顺着边界的那部分保留下来，所以斜着撞上竹林会贴边滑走
 */
export function keepInside(m: WalkableMap, p: Pt): Pt {
  let { x, y } = p;
  for (let i = 0; i < 3; i++) {
    const d = outside(m, x, y);
    if (d <= 0) break;
    const e = 1;
    const gx = (outside(m, x + e, y) - outside(m, x - e, y)) / (2 * e);
    const gy = (outside(m, x, y + e) - outside(m, x, y - e)) / (2 * e);
    const len = Math.hypot(gx, gy) || 1;
    x -= (gx / len) * (d + 0.01);
    y -= (gy / len) * (d + 0.01);
  }
  return { x, y };
}
