import Phaser from 'phaser';
import { COLORS } from '../config';
import type { Enemy } from '../entities/Enemy';

/**
 * 山贼们的剪影画法。姿势只读招式帧号，前摇提示按招式表的 telegraph 画：
 * glint 是武器上闪一下光，ground 是把判定的横向范围画成地上的红色区域。
 *
 * - 喽啰：瘦高，扎朱红头巾，提一把弯刀
 * - 飞刀手：矮一点，朱红蒙面巾，手里扣着飞刀
 * - 头目（大怪）：膀大腰圆，光头，朱红腰带，扛狼牙大锤
 */

type Pt = { x: number; y: number };

const lerp = Phaser.Math.Linear;
const clamp01 = (t: number) => Phaser.Math.Clamp(t, 0, 1);
const easeOut = Phaser.Math.Easing.Cubic.Out;

/** 武器角度，面朝右为准：0 = 正前，90 = 正下，-90 = 正上；不取模 */
interface Arc {
  wind: number;
  strike: number;
  lean?: number;
}

interface Look {
  height: number;
  shoulder: Pt;
  arm: number;
  rest: number;
  arcs: Record<string, Arc>;
}

const LOOKS: Record<Enemy['def']['look'], Look> = {
  bandit: {
    height: 70,
    shoulder: { x: 3, y: -48 },
    arm: 13,
    rest: 115,
    arcs: { slash: { wind: -110, strike: 60, lean: 8 } },
  },
  thrower: {
    height: 66,
    shoulder: { x: 2, y: -45 },
    arm: 14,
    rest: 100,
    arcs: { throw: { wind: 200, strike: 345, lean: 6 } },
  },
  chief: {
    height: 100,
    shoulder: { x: 8, y: -74 },
    arm: 20,
    rest: -115,
    arcs: {
      hammer: { wind: -100, strike: 70, lean: 12 },
      sweep: { wind: 190, strike: 540, lean: 4 },
    },
  },
};

const local = (deg: number, r: number, base: Pt): Pt => {
  const a = Phaser.Math.DegToRad(deg);
  return { x: base.x + Math.cos(a) * r, y: base.y + Math.sin(a) * r };
};

export class EnemyView {
  private readonly telegraph: Phaser.GameObjects.Graphics;
  private readonly fx: Phaser.GameObjects.Graphics;
  private readonly g: Phaser.GameObjects.Graphics;
  private readonly look: Look;
  private blots: { x: number; y: number; vx: number; vy: number; r: number; life: number }[] = [];
  private time = Math.random() * 1000;
  private burst = false;

  constructor(
    scene: Phaser.Scene,
    private readonly e: Enemy,
  ) {
    this.look = LOOKS[e.def.look];
    this.telegraph = scene.add.graphics().setDepth(4);
    this.fx = scene.add.graphics().setDepth(5);
    this.g = scene.add.graphics().setDepth(6);
    // 出场时一团墨散开，人从墨里现身
    this.splash(e.x, e.feetY - this.look.height / 2, 12);
  }

  destroy() {
    this.telegraph.destroy();
    this.fx.destroy();
    this.g.destroy();
  }

  draw(delta: number) {
    const e = this.e;
    this.time += delta;
    this.telegraph.clear();
    this.fx.clear();
    this.g.clear();

    // 倒下时化成墨点散开
    if (e.dead && !this.burst) {
      this.burst = true;
      this.splash(e.x, e.feetY - this.look.height / 2, 14);
    }
    this.drawBlots(delta);
    const fade = e.dead ? 1 - e.deathFrames / 40 : 1;
    this.g.setAlpha(fade);
    if (fade <= 0) return;

    this.drawTelegraph();
    const pose = this.pose();
    if (e.def.look === 'chief') this.drawChief(pose);
    else this.drawSlim(pose, e.def.look === 'thrower');
  }

  private pose() {
    const e = this.e;
    const L = this.look;
    const base = { weapon: L.rest, lean: 0, glint: 0, trail: undefined as { from: number; to: number; alpha: number } | undefined };
    if (e.dead) return { ...base, lean: -14 };
    if (e.hurtFrames > 0) return { ...base, lean: -10, weapon: L.rest + 20 };

    const { move, frame } = e.runner;
    if (!move) return base;
    const arc = L.arcs[move.id];
    if (!arc) return base;
    const { startup, active, recovery } = move;
    const lean = arc.lean ?? 0;
    if (frame < startup) {
      const t = (frame + 1) / startup;
      const glint = move.telegraph === 'glint' && frame >= startup - 10 ? (frame - startup + 10) / 10 : 0;
      return { ...base, weapon: lerp(L.rest, arc.wind, easeOut(clamp01(t * 1.6))), lean: -lean * 0.5 * t, glint };
    }
    if (frame < startup + active) {
      const weapon = lerp(arc.wind, arc.strike, (frame - startup + 1) / active);
      return { ...base, weapon, lean, trail: { from: arc.wind, to: weapon, alpha: 1 } };
    }
    const t = (frame - startup - active + 1) / recovery;
    const rest = L.rest + 360 * Math.round((arc.strike - L.rest) / 360);
    return {
      ...base,
      weapon: lerp(arc.strike, rest, Phaser.Math.Easing.Quadratic.In(t)),
      lean: lean * (1 - t),
      trail: t < 0.3 ? { from: arc.wind, to: arc.strike, alpha: 1 - t / 0.3 } : undefined,
    };
  }

  /** ground：判定框的横向范围画在地上；临出手前闪烁 */
  private drawTelegraph() {
    const e = this.e;
    const { move, frame, phase } = e.runner;
    if (!move?.hit || move.telegraph !== 'ground' || phase !== 'startup') return;
    const t = (frame + 1) / move.startup;
    const blink = frame > move.startup - 12 && Math.floor(frame / 3) % 2 === 0 ? 0.35 : 1;
    const { x, w } = move.hit.box;
    const cx = e.x + x * e.facing;
    const half = (w / 2) * easeOut(clamp01(t * 1.5));
    const y = e.feetY + 2;
    const tg = this.telegraph;
    tg.lineStyle(10, COLORS.paper, 0.3 * blink);
    tg.strokeEllipse(cx, y, half * 2, 20);
    tg.fillStyle(COLORS.redBright, (0.22 + 0.3 * t) * blink);
    tg.fillEllipse(cx, y, half * 2, 20);
    tg.lineStyle(3, COLORS.redBright, (0.5 + 0.5 * t) * blink);
    tg.strokeEllipse(cx, y, half * 2, 20);
  }

  /** 喽啰和飞刀手：瘦长身形 */
  private drawSlim(pose: ReturnType<EnemyView['pose']>, thrower: boolean) {
    const e = this.e;
    const g = this.g;
    const L = this.look;
    const flashing = e.flash > 0;
    const fill = flashing ? 0xffffff : COLORS.ink;
    const P = (p: Pt): Pt => ({ x: e.x + (p.x + pose.lean * (-p.y / L.height)) * e.facing, y: e.feetY + p.y });
    const at = (x: number, y: number) => P({ x, y });
    const line = (a: Pt, b: Pt) => g.lineBetween(a.x, a.y, b.x, b.y);
    const poly = (pts: Pt[]) => {
      g.fillStyle(fill);
      g.fillPoints(pts, true);
      if (flashing) {
        g.lineStyle(1.5, COLORS.ink);
        g.strokePoints(pts, true);
      }
    };

    if (pose.trail && !thrower) this.drawTrail(pose.trail, P, L.arm + 46, L.arm + 12);

    const walking = !e.runner.move && e.hurtFrames <= 0 && Math.abs(e.body.velocity.x) > 1;
    const stride = walking ? Math.sin(this.time * 0.02) * 6 : 0;
    g.lineStyle(5, fill);
    line(at(-3, -22), at(-5 + stride, 0));
    line(at(3, -22), at(5 - stride, 0));
    const h = L.height;
    poly([at(-7, -h + 18), at(7, -h + 18), at(11, -18), at(-11, -18)]);

    const head = at(1, -h + 9);
    g.fillStyle(fill);
    g.fillCircle(head.x, head.y, 7.5);

    // 朱红点缀：喽啰是头巾和飘带，飞刀手是蒙面巾
    g.lineStyle(3, COLORS.red);
    if (thrower) {
      line(at(-5, -h + 11), at(8, -h + 11));
      line(at(-5, -h + 11), at(-12, -h + 15 + Math.sin(this.time * 0.01) * 2));
    } else {
      line(at(-6, -h + 5), at(7, -h + 5));
      line(at(-6, -h + 5), at(-14, -h + 9 + Math.sin(this.time * 0.012) * 3));
      line(at(-6, -h + 6), at(-13, -h + 13 + Math.sin(this.time * 0.012 + 1) * 3));
    }

    // 胳膊和兵器
    const handL = local(pose.weapon, L.arm, L.shoulder);
    const hand = P(handL);
    g.lineStyle(5, fill);
    line(P(L.shoulder), hand);
    const holding = !thrower || !e.runner.move || e.runner.frame < e.runner.move.startup;
    if (holding) {
      const len = thrower ? 14 : 44;
      const tip = P(local(pose.weapon, L.arm + len, L.shoulder));
      g.lineStyle(thrower ? 3 : 4, COLORS.ink);
      line(hand, tip);
      if (pose.glint > 0) this.drawGlint(tip, pose.glint);
    }
  }

  /** 头目：大块头、光头、朱红腰带、狼牙大锤 */
  private drawChief(pose: ReturnType<EnemyView['pose']>) {
    const e = this.e;
    const g = this.g;
    const L = this.look;
    const flashing = e.flash > 0;
    const fill = flashing ? 0xffffff : COLORS.ink;
    const P = (p: Pt): Pt => ({ x: e.x + (p.x + pose.lean * (-p.y / L.height)) * e.facing, y: e.feetY + p.y });
    const at = (x: number, y: number) => P({ x, y });
    const line = (a: Pt, b: Pt) => g.lineBetween(a.x, a.y, b.x, b.y);

    if (pose.trail) this.drawTrail(pose.trail, P, L.arm + 66, L.arm + 30);

    const walking = !e.runner.move && Math.abs(e.body.velocity.x) > 1;
    const stride = walking ? Math.sin(this.time * 0.014) * 5 : 0;
    g.lineStyle(11, fill);
    line(at(-10, -30), at(-13 + stride, 0));
    line(at(10, -30), at(13 - stride, 0));

    g.fillStyle(fill);
    const belly = at(2, -50);
    g.fillEllipse(belly.x, belly.y, 56, 52);
    const chest = [at(-22, -84), at(20, -86), at(26, -62), at(-24, -58)];
    g.fillPoints(chest, true);
    if (flashing) {
      g.lineStyle(2, COLORS.ink);
      g.strokeEllipse(belly.x, belly.y, 56, 52);
      g.strokePoints(chest, true);
    }
    // 朱红腰带
    g.lineStyle(5, COLORS.red);
    line(at(-24, -40), at(26, -42));
    line(at(-20, -40), at(-28, -26));

    const head = at(6, -94);
    g.fillStyle(fill);
    g.fillCircle(head.x, head.y, 12);

    // 胳膊和狼牙锤：长柄、方锤头带刺
    const handL = local(pose.weapon, L.arm, L.shoulder);
    const hand = P(handL);
    g.lineStyle(10, fill);
    line(P(L.shoulder), hand);
    const butt = P(local(pose.weapon, -14, handL));
    const neck = P(local(pose.weapon, 52, handL));
    g.lineStyle(5, COLORS.ink);
    line(butt, neck);
    const headPts = [-9, 9].flatMap((side) => [
      P(local(pose.weapon + 90, side, local(pose.weapon, 50, handL))),
      P(local(pose.weapon + 90, side, local(pose.weapon, 76, handL))),
    ]);
    g.fillStyle(COLORS.ink);
    g.fillPoints([headPts[0], headPts[1], headPts[3], headPts[2]], true);
    g.lineStyle(3, COLORS.ink);
    for (const r of [56, 64, 72]) {
      for (const side of [-1, 1]) {
        const a = local(pose.weapon + 90, side * 9, local(pose.weapon, r, handL));
        const b = local(pose.weapon + 90, side * 15, local(pose.weapon, r, handL));
        line(P(a), P(b));
      }
    }
  }

  private drawTrail(trail: { from: number; to: number; alpha: number }, P: (p: Pt) => Pt, outerR: number, innerR: number) {
    const L = this.look;
    const outer: Pt[] = [];
    const inner: Pt[] = [];
    for (let i = 0; i <= 12; i++) {
      const deg = lerp(trail.from, trail.to, i / 12);
      outer.push(P(local(deg, outerR, L.shoulder)));
      inner.push(P(local(deg, innerR, L.shoulder)));
    }
    this.fx.fillStyle(COLORS.ink, 0.6 * trail.alpha);
    this.fx.fillPoints([...outer, ...inner.reverse()], true);
    this.fx.lineStyle(3, COLORS.red, trail.alpha);
    this.fx.strokePoints(outer);
  }

  private drawGlint(p: Pt, t: number) {
    this.g.fillStyle(0xffffff, 0.5 + 0.5 * t);
    this.g.fillCircle(p.x, p.y, 3 + 6 * t);
    this.g.lineStyle(2, COLORS.red, t);
    this.g.strokeCircle(p.x, p.y, 7 + 6 * t);
  }

  private splash(x: number, y: number, count: number) {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const v = Phaser.Math.FloatBetween(1.5, 5);
      this.blots.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1.5, r: Phaser.Math.FloatBetween(3, 9), life: 1 });
    }
  }

  private drawBlots(delta: number) {
    const dt = delta / (1000 / 60);
    for (const p of this.blots) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 0.15 * dt;
      p.r += 0.15 * dt;
      p.life -= delta / 600;
    }
    this.blots = this.blots.filter((p) => p.life > 0);
    for (const p of this.blots) {
      this.fx.fillStyle(COLORS.ink, p.life * 0.7);
      this.fx.fillCircle(p.x, p.y, p.r);
    }
  }
}
