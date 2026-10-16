import Phaser from 'phaser';
import { COLORS } from '../config';
import type { Fighter } from '../entities/Fighter';
import { HeroView, type Pt } from './heroView';

/**
 * 于无瑕的剪影画法：长发半披、一根发簪束住，窄袖劲装，身形挺拔。
 * 扇骨边缘一抹红；出招时扇子展开，收招合扇。扇子掷出去以后手里是空的。
 */

/** 扇子的走势，和温少华的剑一样：0 = 正前，90 = 正下，-90 = 正上；不取模 */
interface FanArc {
  wind: number;
  strike: number;
  lean?: number;
  crouch?: number;
  /** 判定帧画扇风 */
  trail?: boolean;
  /** 这一招扇子是展开的 */
  open?: boolean;
}

const REST = 70; // 待机：合扇斜握在身前
const ARM = 14;
const SHOULDER: Pt = { x: 3, y: -50 };
const FAN_R = 28;

const ARCS: Record<string, FanArc> = {
  fan1: { wind: 200, strike: 380, lean: 6, trail: true, open: true },
  fan2: { wind: 40, strike: -130, lean: 4, trail: true, open: true },
  fan3: { wind: 180, strike: 560, lean: 10, crouch: 0.9, trail: true, open: true },
  fanCharge: { wind: 205, strike: 205, lean: -6, crouch: 0.94, open: true },
  fanThrow: { wind: 205, strike: 360, lean: 8 },
  dart: { wind: 160, strike: 350, lean: 4 },
  dodge: { wind: 150, strike: 150, lean: 18, crouch: 0.78 },
};

const lerp = Phaser.Math.Linear;
const local = (deg: number, r: number, base: Pt = SHOULDER): Pt => {
  const a = Phaser.Math.DegToRad(deg);
  return { x: base.x + Math.cos(a) * r, y: base.y + Math.sin(a) * r };
};

interface Pose {
  fan: number;
  lean: number;
  crouch: number;
  open: boolean;
  trail?: { from: number; to: number; alpha: number };
}

export class YuWuxiaView extends HeroView {
  private readonly hair: Pt[] = [];

  draw(f: Fighter, delta: number) {
    this.begin(f, delta);
    const pose = this.pose(f);
    const P = (p: Pt): Pt => ({
      x: f.x + (p.x + pose.lean * (-p.y / 72)) * f.facing,
      y: f.feetY + p.y * pose.crouch,
    });
    const at = (x: number, y: number) => P({ x, y });
    const g = this.g;
    const holdingFan = !f.isLocked('attack');

    if (pose.trail) this.drawTrail(pose.trail, P);

    // 半披的长发：从发簪下面垂到背后，跟着身形飘
    this.follow(this.hair, at(-4, -70), 4, 10, f.facing, delta);
    g.lineStyle(6, this.ink);
    g.strokePoints(this.hair);

    // 腿：劲装窄裤
    const speed = Math.abs(f.body.velocity.x);
    const running = !f.runner.move && f.grounded && speed > 1;
    const stride = running ? Math.sin(this.time * 0.022) * 8 : 0;
    g.lineStyle(5, this.ink);
    if (f.grounded) {
      this.line(at(-3, -26), at(-6 + stride, 0));
      this.line(at(3, -26), at(6 - stride, 0));
    } else {
      this.line(at(-3, -26), at(-9, -8));
      this.line(at(3, -26), at(10, -12));
    }

    // 窄袖上衣，下摆短而利落
    this.poly([at(-7, -58), at(7, -58), at(9, -24), at(-10, -24)]);

    // 头和发髻、发簪
    this.circle(at(1, -66), 8);
    this.circle(at(-2, -75), 4);
    g.lineStyle(2, this.ink);
    this.line(at(-9, -78), at(6, -72));

    // 持扇的手
    const handL = local(pose.fan, ARM);
    const hand = P(handL);
    g.lineStyle(4, this.ink);
    this.line(P(SHOULDER), hand);

    if (holdingFan) {
      if (pose.open) this.drawOpenFan(hand, pose.fan, P, handL);
      else {
        // 合扇：一截短棍，扇头一点红
        const tip = P(local(pose.fan, ARM + 18));
        g.lineStyle(4, COLORS.ink);
        this.line(hand, tip);
        g.fillStyle(COLORS.red);
        g.fillCircle(tip.x, tip.y, 2.5);
      }
    }

    // 蓄力掷扇：扇面上聚起红光
    if (f.runner.move?.hold && holdingFan) {
      const c = f.chargeRatio;
      const mid = P(local(pose.fan, ARM + FAN_R * 0.6));
      const pulse = c >= 1 ? 0.5 + 0.5 * Math.sin(this.time * 0.03) : 0;
      g.fillStyle(COLORS.red, 0.15 + 0.3 * c + 0.2 * pulse);
      g.fillCircle(mid.x, mid.y, 8 + 14 * c + 4 * pulse);
    }

    // 腰后别着的飞镖，只露出一截红穗：剩几支画几支
    g.lineStyle(1.2, COLORS.red);
    for (let i = 0; i < Math.min(f.ammo, 6); i++) {
      const x = -9 - i * 1.6;
      this.line(at(x, -31), at(x - 1.5, -26));
    }
  }

  /** 展开的扇面：以握柄为圆心的一片扇形，浓墨扇面、宣纸色扇骨、朱红扇边 */
  private drawOpenFan(hand: Pt, angle: number, P: (p: Pt) => Pt, handL: Pt) {
    const g = this.g;
    const spread = 55;
    const edge: Pt[] = [];
    for (let i = 0; i <= 8; i++) edge.push(P(local(angle - spread + (i / 8) * spread * 2, FAN_R, handL)));
    g.fillStyle(this.ink);
    g.fillPoints([hand, ...edge], true);
    g.lineStyle(1, COLORS.paper, 0.7);
    for (const p of edge.filter((_, i) => i % 2 === 0)) this.line(hand, p);
    g.lineStyle(3, COLORS.red);
    g.strokePoints(edge);
  }

  private pose(f: Fighter): Pose {
    const base = { fan: REST, lean: 0, crouch: 1, open: false };
    if (f.dead) return { ...base, fan: 100, lean: -14, crouch: 0.6 };
    if (f.hurtFrames > 0) return { ...base, fan: 110, lean: -10, crouch: 0.95 };
    const { move, frame } = f.runner;
    if (!move) {
      if (!f.grounded) return { ...base, fan: f.body.velocity.y < 0 ? -40 : 30, lean: 3 };
      const running = Math.abs(f.body.velocity.x) > 1;
      return { ...base, fan: running ? 150 : REST, lean: running ? 9 : 0 };
    }
    const arc = ARCS[move.id];
    if (!arc) return base;
    const lean = arc.lean ?? 0;
    const crouch = arc.crouch ?? 1;
    const open = !!arc.open;
    const { startup, active, recovery } = move;
    if (frame < startup) {
      const t = Phaser.Math.Easing.Cubic.Out((frame + 1) / startup);
      return { fan: lerp(REST, arc.wind, t), lean: lean * t, crouch: lerp(1, crouch, t), open };
    }
    if (frame < startup + active) {
      const fan = lerp(arc.wind, arc.strike, (frame - startup + 1) / active);
      return { fan, lean, crouch, open, trail: arc.trail ? { from: arc.wind, to: fan, alpha: 1 } : undefined };
    }
    // 收招合扇
    const t = (frame - startup - active + 1) / recovery;
    const rest = REST + 360 * Math.round((arc.strike - REST) / 360);
    const fade = 1 - t * 3;
    return {
      fan: lerp(arc.strike, rest, Phaser.Math.Easing.Quadratic.In(t)),
      lean: lean * (1 - t),
      crouch: lerp(crouch, 1, t),
      open: open && t < 0.4,
      trail: arc.trail && fade > 0 ? { from: arc.wind, to: arc.strike, alpha: fade } : undefined,
    };
  }

  /** 扇风：一道宽而淡的扇形墨痕，外缘朱红 */
  private drawTrail(trail: NonNullable<Pose['trail']>, P: (p: Pt) => Pt) {
    const outer: Pt[] = [];
    const inner: Pt[] = [];
    for (let i = 0; i <= 12; i++) {
      const deg = lerp(trail.from, trail.to, i / 12);
      outer.push(P(local(deg, ARM + FAN_R + 26)));
      inner.push(P(local(deg, ARM + 10)));
    }
    this.fx.fillStyle(COLORS.ink, 0.45 * trail.alpha);
    this.fx.fillPoints([...outer, ...inner.reverse()], true);
    this.fx.lineStyle(2, COLORS.red, trail.alpha);
    this.fx.strokePoints(outer);
  }
}
