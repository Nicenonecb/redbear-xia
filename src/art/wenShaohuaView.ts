import Phaser from 'phaser';
import { COLORS } from '../config';
import type { Fighter } from '../entities/Fighter';
import { HeroView, type Pt } from './heroView';
import { SWORD_QI_LEVELS, swordQiLevel } from '../characters/wenShaohua';

/**
 * 温少华的剪影画法。只读 Fighter 的状态（当前招式、帧号、朝向、速度）来摆姿势，
 * 不参与任何判定，换美术时整个文件替换即可。
 */

/**
 * 一招里剑的走势。角度以面朝右为准：0 = 正前，90 = 正下，-90 = 正上。
 * 角度不取模，数值从大到小还是从小到大决定了挥剑方向。
 */
interface SwordArc {
  /** 前摇从哪个角度起，默认是待机角度 */
  from?: number;
  wind: number;
  strike: number;
  /** 上身前倾（像素，头顶处的偏移） */
  lean?: number;
  /** 下蹲比例 */
  crouch?: number;
  /** 判定帧画剑光 */
  trail?: boolean;
}

const REST = 135; // 待机：剑斜垂身后
const ARM = 15;
const BLADE = 58;
const SHOULDER = { x: 4, y: -52 };

const ARCS: Record<string, SwordArc> = {
  liuyun1: { wind: 250, strike: 400, lean: 4, trail: true },
  liuyun2: { wind: 70, strike: -80, lean: 2, trail: true },
  liuyun3: { wind: 200, strike: 420, lean: 12, trail: true },
  shaohuaCharge: { wind: 180, strike: 180, lean: -6, crouch: 0.92 },
  shaohuaRelease: { from: 180, wind: 180, strike: 380, lean: 8, trail: true },
  dodge: { wind: 165, strike: 165, lean: 16, crouch: 0.8 },
};

interface Pose {
  sword: number;
  lean: number;
  crouch: number;
  trail?: { from: number; to: number; alpha: number };
}


const lerp = Phaser.Math.Linear;
const local = (deg: number, r: number, base: Pt = SHOULDER): Pt => {
  const a = Phaser.Math.DegToRad(deg);
  return { x: base.x + Math.cos(a) * r, y: base.y + Math.sin(a) * r };
};

export class WenShaohuaView extends HeroView {
  private readonly ribbon: Pt[] = [];
  private readonly tassel: Pt[] = [];
  private chargeTier = 0;
  /** 蓄力升档时放一圈光环，1 → 0 */
  private ring = 0;

  draw(f: Fighter, delta: number) {
    this.begin(f, delta);
    const pose = this.pose(f);
    const P = (p: Pt): Pt => ({
      x: f.x + (p.x + pose.lean * (-p.y / 72)) * f.facing,
      y: f.feetY + p.y * pose.crouch,
    });
    const at = (x: number, y: number) => P({ x, y });
    const g = this.g;
    const ink = this.ink;
    const poly = (pts: Pt[]) => this.poly(pts);

    if (pose.trail) this.drawTrail(pose.trail, P);

    // 发带：脑后一抹朱红，跟着身形飘
    this.follow(this.ribbon, at(-5, -72), 4, 9, f.facing, delta);
    g.lineStyle(3, COLORS.red);
    g.strokePoints(this.ribbon);

    poly([at(-3, -74), at(-8, -62), at(-13, -44), at(-5, -52)]);

    // 腿
    const speed = Math.abs(f.body.velocity.x);
    const running = !f.runner.move && f.grounded && speed > 1;
    const stride = running ? Math.sin(this.time * 0.018) * 7 : 0;
    g.lineStyle(5, ink);
    if (f.grounded) {
      this.line(at(-3, -20), at(-6 + stride, 0));
      this.line(at(3, -20), at(6 - stride, 0));
    } else {
      this.line(at(-3, -20), at(-8, -6));
      this.line(at(3, -20), at(9, -10));
    }

    // 长袍，跑动时下摆张开
    const flare = Math.min(speed / 280, 1) * 4;
    poly([at(-8, -57), at(8, -57), at(15 + flare, -12), at(-17 - flare, -12)]);

    // 头与发冠
    const head = at(1, -65);
    const crown = at(0, -75);
    this.circle(head, 8.5);
    this.circle(crown, 3.5);

    // 腰间玉佩
    const cord = at(5, -34);
    const jade = at(6, -25);
    g.lineStyle(1.5, COLORS.red);
    this.line(cord, jade);
    g.fillStyle(COLORS.red);
    g.fillCircle(jade.x, jade.y, 3);

    // 宽袖与持剑手
    const handL = local(pose.sword, ARM);
    const hand = P(handL);
    poly([at(-2, -57), at(6, -56), hand, at(handL.x - 7, handL.y + 13)]);

    // 剑身、护手
    const tip = P(local(pose.sword, ARM + BLADE));
    const pommel = P(local(pose.sword, ARM - 9));
    g.lineStyle(3, COLORS.ink);
    this.line(pommel, tip);
    g.lineStyle(3, COLORS.ink);
    this.line(P(local(pose.sword + 90, 5, handL)), P(local(pose.sword - 90, 5, handL)));

    // 剑穗
    this.follow(this.tassel, pommel, 3, 6, f.facing, delta);
    g.lineStyle(2.5, COLORS.red);
    g.strokePoints(this.tassel);

    this.drawCharge(f, P(local(pose.sword, ARM + BLADE * 0.6)), at(0, -40), delta);
  }

  private pose(f: Fighter): Pose {
    // 受击后仰；气血打空就跪倒
    if (f.dead) return { sword: 95, lean: -14, crouch: 0.6 };
    if (f.hurtFrames > 0) return { sword: 110, lean: -10, crouch: 0.95 };
    const { move, frame } = f.runner;
    if (!move) {
      if (!f.grounded) return { sword: f.body.velocity.y < 0 ? -50 : 20, lean: 2, crouch: 1 };
      const running = Math.abs(f.body.velocity.x) > 1;
      return { sword: running ? 165 : REST, lean: running ? 7 : 0, crouch: 1 };
    }

    const arc = ARCS[move.id] ?? { wind: REST, strike: REST };
    const lean = arc.lean ?? 0;
    const crouch = arc.crouch ?? 1;
    const { startup, active, recovery } = move;

    if (frame < startup) {
      const t = Phaser.Math.Easing.Cubic.Out((frame + 1) / startup);
      return { sword: lerp(arc.from ?? REST, arc.wind, t), lean: lean * t, crouch: lerp(1, crouch, t) };
    }
    if (frame < startup + active) {
      const sword = lerp(arc.wind, arc.strike, (frame - startup + 1) / active);
      return { sword, lean, crouch, trail: arc.trail ? { from: arc.wind, to: sword, alpha: 1 } : undefined };
    }
    // 收招：顺着出剑方向带回待机角度
    const t = (frame - startup - active + 1) / recovery;
    const rest = REST + 360 * Math.round((arc.strike - REST) / 360);
    const fade = 1 - t * 3;
    return {
      sword: lerp(arc.strike, rest, Phaser.Math.Easing.Quadratic.In(t)),
      lean: lean * (1 - t),
      crouch: lerp(crouch, 1, t),
      trail: arc.trail && fade > 0 ? { from: arc.wind, to: arc.strike, alpha: fade } : undefined,
    };
  }

  /** 剑光：剑尖扫过的扇面，浓墨填充、朱红描边 */
  private drawTrail(trail: NonNullable<Pose['trail']>, P: (p: Pt) => Pt) {
    const outer: Pt[] = [];
    const inner: Pt[] = [];
    for (let i = 0; i <= 10; i++) {
      const deg = lerp(trail.from, trail.to, i / 10);
      outer.push(P(local(deg, ARM + BLADE + 6)));
      inner.push(P(local(deg, ARM + 18)));
    }
    this.fx.fillStyle(COLORS.ink, 0.75 * trail.alpha);
    this.fx.fillPoints([...outer, ...inner.reverse()], true);
    this.fx.lineStyle(3, COLORS.red, trail.alpha);
    this.fx.strokePoints(outer);
  }

  /** 蓄力：剑身聚起朱红光晕，升档时放一圈光环，蓄满后光晕跳动 */
  private drawCharge(f: Fighter, blade: Pt, center: Pt, delta: number) {
    if (f.runner.move?.hold) {
      const charge = f.chargeRatio;
      const tier = SWORD_QI_LEVELS.indexOf(swordQiLevel(charge));
      if (tier > this.chargeTier) this.ring = 1;
      this.chargeTier = tier;
      const pulse = charge >= 1 ? 0.5 + 0.5 * Math.sin(this.time * 0.03) : 0;
      this.g.fillStyle(COLORS.red, 0.18 + 0.3 * charge + 0.2 * pulse);
      this.g.fillCircle(blade.x, blade.y, 8 + 16 * charge + 4 * pulse);
    } else {
      this.chargeTier = 0;
    }
    if (this.ring > 0) {
      this.ring = Math.max(0, this.ring - delta / 220);
      this.fx.lineStyle(3, COLORS.red, this.ring);
      this.fx.strokeCircle(center.x, center.y, 20 + (1 - this.ring) * 50);
    }
  }
}
