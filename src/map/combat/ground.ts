import type { GroundArea, HitSpec } from '../../combat/moveTable';

/**
 * 大地图上的判定几何。地图坐标就是画面上的位置：x 往右、y 往画面下方。
 * 斜俯视 45° 看下去，地面上的圆在画面上是压扁的椭圆（影子、刀光、冲击墨圈都这么画），
 * 所以判定也按"压扁的地面"来量距离：竖直方向的距离先除以 GROUND_SQUASH 再算。
 * 这样画面上看到刀光扫到哪儿，判定就到哪儿。
 * 人和东西都按脚下的一个圆来算（半径 radius），出招的范围是脚下朝面向张开的扇形。
 */

/** 斜俯视 45° 下地面上的圆看起来压扁成多少（sin 45°） */
export const GROUND_SQUASH = 0.7;

/** 画面上的一个方向，换算成地面上的方向（单位向量） */
export function groundAngleDir(v: { x: number; y: number }) {
  return normalize({ x: v.x, y: v.y / GROUND_SQUASH });
}

/** 画面上的方向在地面上是多少角度（弧度）：画压扁的扇形、刀光时用 */
export function groundAngle(v: { x: number; y: number }) {
  return Math.atan2(v.y / GROUND_SQUASH, v.x);
}

/** 画面上的一段位移，换算成地面上的长度 */
export function groundDist(dx: number, dy: number) {
  return Math.hypot(dx, dy / GROUND_SQUASH);
}

export interface Vec {
  x: number;
  y: number;
}

/** 没写 area 的招按 box 算：前后够得着的最远处当半径，张开 110° */
const DEFAULT_ARC = 110;

export function areaOf(hit: HitSpec): GroundArea {
  return hit.area ?? { reach: hit.box.x + hit.box.w / 2, arc: DEFAULT_ARC };
}

export function normalize(v: Vec): Vec {
  const len = Math.hypot(v.x, v.y);
  return len > 1e-6 ? { x: v.x / len, y: v.y / len } : { x: 0, y: 1 };
}

/** 从 a 指向 b 的单位方向；两个点重合时退回 fallback */
export function dirTo(a: Vec, b: Vec, fallback: Vec): Vec {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.hypot(dx, dy) > 1e-6 ? normalize({ x: dx, y: dy }) : fallback;
}

/**
 * 半径 r 的目标有没有被扇形扫到：离圆心不超过 reach（算上目标自己的半径），
 * 而且方向落在扇形张开的角度里（目标越近、越胖，角度上越宽容）
 */
export function inArea(origin: Vec, facing: Vec, area: GroundArea, target: Vec, r: number) {
  // 都换到地面上来量：竖直方向拉回去
  const dx = target.x - origin.x;
  const dy = (target.y - origin.y) / GROUND_SQUASH;
  const f = groundAngleDir(facing);
  const dist = Math.hypot(dx, dy);
  if (dist - r > area.reach) return false;
  if (area.from && dist + r < area.from) return false;
  if (area.arc >= 360 || dist <= r) return true;
  const cos = (dx * f.x + dy * f.y) / dist;
  const angle = Math.acos(Math.max(-1, Math.min(1, cos)));
  const tolerance = Math.asin(Math.min(1, r / dist));
  return angle <= (area.arc * Math.PI) / 360 + tolerance;
}
