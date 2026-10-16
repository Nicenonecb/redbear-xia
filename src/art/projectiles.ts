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

/** 虎啸的环形音波：几道竖着的弧，浓墨里夹一道朱红，顶天立地 */
export function drawRoarRing(h: number) {
  return (g: Phaser.GameObjects.Graphics) => {
    const span = Phaser.Math.DegToRad(60);
    const r = h / 2 / Math.sin(span);
    for (let k = 0; k < 3; k++) {
      const pts: Phaser.Math.Vector2[] = [];
      for (let i = 0; i <= 14; i++) {
        const a = Phaser.Math.Linear(-span, span, i / 14);
        pts.push(new Phaser.Math.Vector2(-r * Math.cos(span) + Math.cos(a) * r - k * 10, Math.sin(a) * r));
      }
      g.lineStyle(k === 0 ? 6 : 3, k === 0 ? COLORS.red : COLORS.ink, k === 0 ? 1 : 0.55 - k * 0.15);
      g.strokePoints(pts);
    }
  };
}

/** 山贼的飞刀：细长刀身，刀柄缠一点朱红 */
export function drawThrowingKnife(w: number) {
  return (g: Phaser.GameObjects.Graphics) => {
    g.fillStyle(COLORS.ink, 1);
    g.fillTriangle(-w / 2, -3, -w / 2, 3, w / 2, 0);
    g.fillStyle(COLORS.red, 1);
    g.fillRect(-w / 2 - 6, -2, 6, 4);
    g.lineStyle(2, COLORS.inkLight, 0.6);
    g.lineBetween(-w / 2 - 22, 0, -w / 2 - 8, 0);
  };
}
