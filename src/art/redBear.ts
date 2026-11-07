import Phaser from 'phaser';
import { COLORS } from '../config';

/**
 * 红熊大侠的剪影：身形高大，披风兜帽上一对圆熊耳，背后斜插长剑，通体朱红。
 * 只在濒死救场、过关嘱咐里出现，所以画得大、画得简单，一眼认得出。
 * 坐标以脚底中点为原点，scale = 1 时身高约 190。
 */
export function drawRedBear(g: Phaser.GameObjects.Graphics, x: number, feetY: number, scale = 1, alpha = 1, sway = 0) {
  const P = (px: number, py: number) => ({ x: x + px * scale + sway * (-py / 190) * scale, y: feetY + py * scale });
  const pts = (list: [number, number][]) => list.map(([px, py]) => P(px, py));

  g.fillStyle(COLORS.red, alpha);
  // 披风：从肩膀一路垂到脚边，下摆被风吹向一侧
  g.fillPoints(
    pts([
      [-30, -150],
      [30, -150],
      [44, -60],
      [52, -4],
      [18, 0],
      [-14, 0],
      [-58, -6],
      [-46, -70],
    ]),
    true,
  );
  // 兜帽和熊耳
  const head = P(0, -164);
  g.fillCircle(head.x, head.y, 22 * scale);
  const earL = P(-17, -184);
  const earR = P(17, -184);
  g.fillCircle(earL.x, earL.y, 9 * scale);
  g.fillCircle(earR.x, earR.y, 9 * scale);
  // 背后斜插的长剑，露出剑柄和一截剑穗
  g.lineStyle(5 * scale, COLORS.red, alpha);
  const hilt = P(-34, -196);
  const guard = P(-22, -168);
  g.lineBetween(hilt.x, hilt.y, guard.x, guard.y);
  g.lineStyle(3 * scale, COLORS.red, alpha * 0.8);
  const tassel = P(-46, -176 + Math.sin(sway) * 2);
  g.lineBetween(hilt.x, hilt.y, tassel.x, tassel.y);
  // 兜帽下一道宣纸色的眼缝，看得出是在看着徒弟
  g.lineStyle(2.5 * scale, COLORS.paper, alpha * 0.9);
  const e0 = P(-8, -164);
  const e1 = P(10, -164);
  g.lineBetween(e0.x, e0.y, e1.x, e1.y);
}
