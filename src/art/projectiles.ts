import Phaser from 'phaser';
import { COLORS } from '../config';

/** 飞行道具的画法。坐标以道具中心为原点、面朝右，朝左时由 Projectile 镜像。 */

/** 少华一剑的剑气：水墨月牙，朱红描边；tier 0~2，蓄满时多拖一道残影 */
export function drawSwordQi(tier: number, h: number) {
  return (g: Phaser.GameObjects.Graphics) => {
    const span = Phaser.Math.DegToRad(70);
    const r = h / 2 / Math.sin(span);
    const cx = -r * 0.5;
    const thickness = h * 0.22;
    const outer: Phaser.Math.Vector2[] = [];
    const inner: Phaser.Math.Vector2[] = [];
    for (let i = 0; i <= 12; i++) {
      const a = Phaser.Math.Linear(-span, span, i / 12);
      outer.push(new Phaser.Math.Vector2(cx + Math.cos(a) * r, Math.sin(a) * r));
      inner.push(new Phaser.Math.Vector2(cx - thickness + Math.cos(a) * r, Math.sin(a) * r));
    }
    g.fillStyle(COLORS.ink, 0.9);
    g.fillPoints([...outer, ...inner.reverse()], true);
    g.lineStyle(tier === 2 ? 5 : 3, COLORS.red, 1);
    g.strokePoints(outer);
    if (tier === 2) {
      g.lineStyle(4, COLORS.inkLight, 0.5);
      g.strokePoints(outer.map((p) => new Phaser.Math.Vector2(p.x - thickness * 1.8, p.y * 0.9)));
    }
  };
}

/** 胖虎震地的冲击波：贴地翻起的一道墨浪，浪头朝前，朱红勾边 */
export function drawShockwave(w: number, h: number) {
  return (g: Phaser.GameObjects.Graphics) => {
    const crest = [
      { x: -w * 0.9, y: h / 2 },
      { x: -w * 0.5, y: h * 0.1 },
      { x: -w * 0.1, y: -h * 0.35 },
      { x: w * 0.3, y: -h / 2 },
      { x: w * 0.55, y: -h * 0.2 },
      { x: w * 0.5, y: h / 2 },
    ];
    g.fillStyle(COLORS.ink, 0.92);
    g.fillPoints(crest, true);
    g.lineStyle(3, COLORS.red, 1);
    g.strokePoints(crest.slice(1, 5));
    g.fillStyle(COLORS.inkLight, 0.6);
    g.fillCircle(-w * 1.1, h * 0.3, h * 0.18);
    g.fillCircle(-w * 1.4, h * 0.38, h * 0.12);
  };
}
