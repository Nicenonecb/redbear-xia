import Phaser from 'phaser';
import type { Box, HitSpec } from './moveTable';

/** 能被打中的东西：敌人、Boss、木人桩 */
export interface Hurtable {
  /** 无敌时判定直接跳过，不算打中过 */
  readonly invulnerable?: boolean;
  hurtbox(): Phaser.Geom.Rectangle;
  /** dir：攻击方向，1 向右，-1 向左 */
  takeHit(hit: HitSpec, dir: 1 | -1): void;
}

/** 一次实际打中：damage 已经乘过攻击方的伤害倍率 */
export interface HitResult {
  target: Hurtable;
  hit: HitSpec;
}

/** 把招式表里的相对判定框换算成世界坐标 */
export function boxToRect(box: Box, x: number, y: number, facing: 1 | -1) {
  const cx = x + box.x * facing;
  const cy = y + box.y;
  return new Phaser.Geom.Rectangle(cx - box.w / 2, cy - box.h / 2, box.w, box.h);
}

export const overlaps = Phaser.Geom.Intersects.RectangleToRectangle;
