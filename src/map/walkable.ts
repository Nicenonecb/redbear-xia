import Phaser from 'phaser';
import type { MapArea, Pt } from './chapter1Map';

/**
 * 大地图上哪里能走：沿石板路一条走廊，加上路边的几片空地；其余都是竹林，走不进去。
 * 不靠一丛丛竹子的碰撞圈来挡（圈和圈之间总有缝，人会从竹丛中间钻过去），
 * 而是直接算"出界多远"，出界了就沿边界推回来——贴着竹林走时会顺着边滑过去，不会卡住。
 * 以后地图上的山贼也用同一套规矩。
 */
export interface WalkableMap {
  path: Pt[];
  pathWidth: number;
  areas: MapArea[];
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

/** 出界多远：负数是在能走的地方里面，正数是已经钻进竹林多深（设计像素） */
export function outside(m: WalkableMap, x: number, y: number) {
  let d = distToPath(x, y, m.path) - (m.pathWidth / 2 + WALK_MARGIN);
  for (const a of m.areas) d = Math.min(d, Phaser.Math.Distance.Between(x, y, a.center.x, a.center.y) - (a.radius - AREA_INSET));
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
