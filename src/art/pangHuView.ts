import Phaser from 'phaser';
import { COLORS } from '../config';
import { PANGHU } from '../characters/pangHu';
import type { MoveDef } from '../combat/moveTable';
import type { PangHu } from '../entities/PangHu';

/**
 * 胖虎的剪影画法：膀大腰圆、身披虎皮、扛一把大刀；变身后是一头比普通老虎更壮的猛虎。
 * 地上的红线、红圈前摇提示也在这里画，长度和范围直接读招式表，和判定始终一致。
 */

type Pt = { x: number; y: number };

const lerp = Phaser.Math.Linear;
const clamp01 = (t: number) => Phaser.Math.Clamp(t, 0, 1);
const easeOut = Phaser.Math.Easing.Cubic.Out;

/** 刀的角度，面朝右为准：0 = 正前，90 = 正下，-90 = 正上；不取模，大小决定挥刀方向 */
const REST = -120; // 待机：刀扛在肩上
const SHOULDER = { x: 14, y: -80 };
const ARM = 22;
const BLADE = 78;

const local = (deg: number, r: number, base: Pt = SHOULDER): Pt => {
  const a = Phaser.Math.DegToRad(deg);
  return { x: base.x + Math.cos(a) * r, y: base.y + Math.sin(a) * r };
};

/** 收招时顺着刀势回到待机角度 */
const restNear = (deg: number) => REST + 360 * Math.round((deg - REST) / 360);

/** 招式里向前冲的总距离（像素） */
const dashDistance = (move: MoveDef) =>
  (move.motion ?? []).filter((s) => s.vx > 0).reduce((d, s) => d + (s.vx * (s.to - s.from + 1)) / 60, 0);

interface Pose {
  blade: number;
  lean: number;
  bob: number;
  /** 刀身闪光 0~1 */
  glint: number;
  /** 仰天长啸 0~1 */
  roar: number;
  /** 虎皮裹身 0~1 */
  wrap: number;
  trail?: { from: number; to: number; alpha: number };
}

export class PangHuView {
  private readonly telegraph: Phaser.GameObjects.Graphics;
  private readonly fx: Phaser.GameObjects.Graphics;
  private readonly g: Phaser.GameObjects.Graphics;
  private blots: { x: number; y: number; vx: number; vy: number; r: number; life: number }[] = [];
  private time = 0;

  constructor(scene: Phaser.Scene) {
    this.telegraph = scene.add.graphics().setDepth(4);
    this.fx = scene.add.graphics().setDepth(5);
    this.g = scene.add.graphics().setDepth(6);
  }

  /** 变身时水墨炸开 */
  burst(x: number, y: number) {
    for (let i = 0; i < 36; i++) {
      const a = Math.random() * Math.PI * 2;
      const speed = Phaser.Math.FloatBetween(3, 13);
      this.blots.push({
        x,
        y,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed * 0.7 - 2,
        r: Phaser.Math.FloatBetween(6, 20),
        life: 1,
      });
    }
  }

  draw(b: PangHu, delta: number) {
    this.time += delta;
    this.telegraph.clear();
    this.fx.clear();
    this.g.clear();
    this.g.setAlpha(b.stage === 'defeated' ? 0.55 : 1);

    this.drawTelegraph(b);
    this.drawBlots(delta);
    if (b.form === 'tiger') this.drawTiger(b);
    else this.drawHuman(b, this.humanPose(b));
  }

  /** 前摇提示：冲锋劈砍画出冲锋路线的红线，震地画脚下红圈；临出手前闪烁 */
  private drawTelegraph(b: PangHu) {
    const { move, frame, phase } = b.runner;
    if (!move?.hit || phase !== 'startup') return;
    const blink = frame > move.startup - 12 && Math.floor(frame / 3) % 2 === 0 ? 0.35 : 1;
    // 画在地面上沿，下面垫一层宣纸色的光，压在浓墨地面上也看得清
    const y = b.feetY + 2;
    const tg = this.telegraph;

    if (move.id === 'chargeChop') {
      // 后撤那一步走完才亮线，线从胖虎身前一直画到刀能砍到的最远处
      const backstep = move.motion?.[0]?.to ?? 0;
      if (frame <= backstep) return;
      const t = (frame - backstep) / (move.startup - backstep);
      const x0 = b.x + 30 * b.facing;
      const x1 = b.x + (dashDistance(move) + move.hit.box.x + move.hit.box.w / 2) * b.facing;
      const end = lerp(x0, x1, easeOut(clamp01(t * 3)));
      tg.lineStyle(14, COLORS.paper, 0.35 * blink);
      tg.lineBetween(x0, y, end, y);
      tg.lineStyle(6, COLORS.redBright, (0.5 + 0.5 * t) * blink);
      tg.lineBetween(x0, y, end, y);
      tg.fillStyle(COLORS.redBright, blink);
      tg.fillTriangle(end, y - 10, end, y + 10, end + 18 * b.facing, y);
    }

    if (move.id === 'slam') {
      const t = (frame + 1) / move.startup;
      const r = (move.hit.box.w / 2) * easeOut(clamp01(t * 1.4));
      tg.lineStyle(10, COLORS.paper, 0.3 * blink);
      tg.strokeEllipse(b.x, y, r * 2, r * 0.36);
      tg.fillStyle(COLORS.redBright, (0.25 + 0.3 * t) * blink);
      tg.fillEllipse(b.x, y, r * 2, r * 0.36);
      tg.lineStyle(4, COLORS.redBright, (0.5 + 0.5 * t) * blink);
      tg.strokeEllipse(b.x, y, r * 2, r * 0.36);
    }
  }

  private humanPose(b: PangHu): Pose {
    const breathe = Math.sin(this.time * 0.004) * 1.5;
    const pose: Pose = { blade: REST, lean: 0, bob: breathe, glint: 0, roar: 0, wrap: 0 };

    if (b.stage === 'transform') {
      const f = b.stageFrame;
      const t = PANGHU.transform;
      if (f < t.roarAt) return { ...pose, blade: lerp(REST, 70, easeOut(f / t.roarAt)), lean: -8 * (f / t.roarAt) };
      const shake = Phaser.Math.FloatBetween(-1.5, 1.5);
      return { ...pose, blade: 70, lean: -12, bob: shake, roar: 1, wrap: clamp01((f - t.wrapAt) / (t.burstAt - t.wrapAt)) };
    }

    const { move, frame } = b.runner;
    if (!move) {
      const walking = Math.abs(b.body.velocity.x) > 1;
      return walking ? { ...pose, bob: -Math.abs(Math.sin(this.time * 0.012)) * 4, lean: 3 } : pose;
    }
    const { startup, active, recovery } = move;
    const at = frame - startup;
    const back = (frame - startup - active + 1) / recovery;

    if (move.id === 'chargeChop') {
      const dash = move.motion?.[1] ? move.motion[1].to - move.motion[1].from + 1 : active;
      if (frame < startup) {
        // 拖刀后撤，刀尖贴地拖在身后
        return { ...pose, blade: lerp(REST, -200, easeOut(clamp01((frame + 1) / 12))), lean: frame < 12 ? -6 : 8 };
      }
      if (at < dash) return { ...pose, blade: lerp(-200, -100, easeOut(clamp01(at / 6))), lean: 14, bob: 0 };
      if (at < active) {
        const blade = lerp(-100, 50, (at - dash + 1) / (active - dash));
        return { ...pose, blade, lean: 10, trail: { from: -100, to: blade, alpha: 1 } };
      }
      return {
        ...pose,
        blade: back < 0.6 ? 50 : lerp(50, restNear(50), (back - 0.6) / 0.4),
        lean: lerp(10, 0, back),
        trail: back < 0.25 ? { from: -100, to: 50, alpha: 1 - back * 4 } : undefined,
      };
    }

    if (move.id === 'slam') {
      if (frame < startup) {
        const t = (frame + 1) / startup;
        const tremble = t > 0.7 ? Phaser.Math.FloatBetween(-1.5, 1.5) : 0;
        return { ...pose, blade: lerp(REST, -95, easeOut(clamp01((frame + 1) / 14))), lean: -8, bob: tremble, glint: t };
      }
      if (at < active) {
        const blade = lerp(-95, 75, (at + 1) / active);
        return { ...pose, blade, lean: 12, trail: { from: -95, to: blade, alpha: 1 } };
      }
      return {
        ...pose,
        blade: back < 0.6 ? 75 : lerp(75, restNear(75), (back - 0.6) / 0.4),
        lean: lerp(12, 0, back),
        trail: back < 0.25 ? { from: -95, to: 75, alpha: 1 - back * 4 } : undefined,
      };
    }
    return pose;
  }

  private drawHuman(b: PangHu, pose: Pose) {
    const g = this.g;
    const flashing = b.flash > 0;
    const fill = flashing ? 0xffffff : COLORS.ink;
    const P = (p: Pt): Pt => ({
      x: b.x + (p.x + pose.lean * (-p.y / 112)) * b.facing,
      y: b.feetY + p.y + (p.y < -30 ? pose.bob : 0),
    });
    const at = (x: number, y: number) => P({ x, y });
    const poly = (pts: Pt[], color = fill) => {
      g.fillStyle(color);
      g.fillPoints(pts, true);
      if (flashing) {
        g.lineStyle(2, COLORS.ink);
        g.strokePoints(pts, true);
      }
    };
    const line = (a: Pt, c: Pt) => g.lineBetween(a.x, a.y, c.x, c.y);

    if (pose.trail) this.drawTrail(pose.trail, P);

    // 虎皮披风，搭在背后
    poly([at(-6, -106), at(-30, -92), at(-42, -44), at(-22, -36), at(-8, -70)], COLORS.inkLight);
    g.lineStyle(3, COLORS.ink, 0.8);
    line(at(-22, -88), at(-30, -80));
    line(at(-30, -70), at(-38, -62));
    line(at(-28, -54), at(-36, -46));

    // 粗腿
    g.lineStyle(13, fill);
    line(at(-12, -34), at(-16, 0));
    line(at(12, -34), at(16, 0));

    // 大肚子和宽肩
    g.fillStyle(fill);
    const belly = at(4, -56);
    g.fillEllipse(belly.x, belly.y, 68, 64);
    if (flashing) {
      g.lineStyle(2, COLORS.ink);
      g.strokeEllipse(belly.x, belly.y, 68, 64);
    }
    poly([at(-24, -92), at(22, -94), at(30, -70), at(-26, -64)]);

    // 头，长啸时仰起来；头顶顶着虎头帽的两只耳朵
    const head = at(8 - pose.roar * 3, -104 - pose.roar * 4);
    g.fillStyle(fill);
    g.fillCircle(head.x, head.y, 14);
    poly([at(-4, -114), at(0, -124), at(4, -115)], COLORS.inkLight);
    poly([at(10, -116), at(15, -126), at(18, -115)], COLORS.inkLight);
    // 刀疤
    g.lineStyle(2.5, COLORS.red);
    line(at(9 - pose.roar * 3, -112), at(18 - pose.roar * 3, -99));
    if (pose.roar) {
      // 张嘴
      const mouth = at(18, -104);
      g.fillStyle(COLORS.paper);
      g.fillTriangle(head.x + 4 * b.facing, head.y + 2, mouth.x, mouth.y - 5, mouth.x, mouth.y + 5);
    }

    // 胳膊和大刀
    const handL = local(pose.blade, ARM);
    const hand = P(handL);
    g.lineStyle(12, fill);
    line(P(SHOULDER), hand);
    this.drawBlade(pose, handL, P, fill, flashing);

    if (pose.wrap > 0) this.drawWrap(pose.wrap, P);
  }

  /** 大刀：短柄、宽刃、刀背微弯，刀柄缠一圈红缨 */
  private drawBlade(pose: Pose, handL: Pt, P: (p: Pt) => Pt, fill: number, flashing: boolean) {
    const g = this.g;
    /** 沿刀身 r 处、向刃口一侧偏 side 的点 */
    const at = (r: number, side = 0) => {
      const p = local(pose.blade, r, handL);
      const n = local(pose.blade + 90, side, { x: 0, y: 0 });
      return P({ x: p.x + n.x, y: p.y + n.y });
    };
    const pommel = at(-22);
    const guard = at(8);
    g.lineStyle(6, COLORS.ink);
    g.lineBetween(pommel.x, pommel.y, guard.x, guard.y);
    g.fillStyle(COLORS.red);
    const tassel = at(-4);
    g.fillCircle(tassel.x, tassel.y, 4);

    const edge = [at(8, -5), at(BLADE * 0.6, -8), at(BLADE, -15), at(BLADE + 8, -4), at(BLADE, 4), at(8, 4)];
    g.fillStyle(fill);
    g.fillPoints(edge, true);
    if (flashing) {
      g.lineStyle(2, COLORS.ink);
      g.strokePoints(edge, true);
    }

    if (pose.glint > 0) {
      // 蓄力时刀身闪光，越临近出手闪得越快
      const pulse = 0.5 + 0.5 * Math.sin(this.time * (0.01 + pose.glint * 0.04));
      const tip = at(BLADE * 0.8, -4);
      g.fillStyle(0xffffff, 0.35 + 0.6 * pose.glint * pulse);
      g.fillCircle(tip.x, tip.y, 6 + 8 * pose.glint * pulse);
      g.lineStyle(2, COLORS.red, pose.glint * pulse);
      g.strokeCircle(tip.x, tip.y, 10 + 10 * pose.glint);
    }
  }

  private drawTrail(trail: NonNullable<Pose['trail']>, P: (p: Pt) => Pt) {
    const outer: Pt[] = [];
    const inner: Pt[] = [];
    for (let i = 0; i <= 10; i++) {
      const deg = lerp(trail.from, trail.to, i / 10);
      outer.push(P(local(deg, ARM + BLADE + 10)));
      inner.push(P(local(deg, ARM + 24)));
    }
    this.fx.fillStyle(COLORS.ink, 0.7 * trail.alpha);
    this.fx.fillPoints([...outer, ...inner.reverse()], true);
    this.fx.lineStyle(4, COLORS.red, trail.alpha);
    this.fx.strokePoints(outer);
  }

  /** 虎皮裹身：墨气从四周卷进来，虎皮一点点把人包住 */
  private drawWrap(wrap: number, P: (p: Pt) => Pt) {
    const center = P({ x: 0, y: -60 });
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2 + this.time * 0.006;
      const r = lerp(190, 30, wrap) + (i % 3) * 12;
      this.fx.fillStyle(COLORS.ink, 0.25 + 0.5 * wrap);
      this.fx.fillCircle(center.x + Math.cos(a) * r, center.y + Math.sin(a) * r * 0.6, 4 + 8 * wrap);
    }
    this.g.fillStyle(COLORS.inkLight, wrap);
    this.g.fillEllipse(center.x, center.y, 40 + 60 * wrap, 50 + 80 * wrap);
    this.g.lineStyle(4, COLORS.ink, wrap);
    for (let k = -2; k <= 2; k++) {
      const y = center.y + k * 16 * wrap;
      this.g.lineBetween(center.x - 20 * wrap, y - 6, center.x + 20 * wrap, y + 6);
    }
  }

  /** 猛虎：横着的壮硕身躯、大脑袋、翘尾巴，淡墨虎纹，一点朱红眼 */
  private drawTiger(b: PangHu) {
    const g = this.g;
    const flashing = b.flash > 0;
    const fill = flashing ? 0xffffff : COLORS.ink;
    const roaring = b.stage === 'transform';
    const down = b.stage === 'defeated';
    const moving = Math.abs(b.body.velocity.x) > 1;
    const stride = moving ? Math.sin(this.time * 0.016) * 8 : 0;
    const breathe = Math.sin(this.time * 0.005) * 1.5;
    const squash = down ? 0.55 : 1;
    const at = (x: number, y: number): Pt => ({ x: b.x + x * b.facing, y: b.feetY + y * squash });
    const line = (a: Pt, c: Pt) => g.lineBetween(a.x, a.y, c.x, c.y);

    // 尾巴
    g.lineStyle(7, fill);
    const tail = [at(-62, -52), at(-84, -66 + breathe), at(-92, -88 + breathe), at(-84, -100 + breathe)];
    g.strokePoints(tail);

    // 四条腿
    g.lineStyle(14, fill);
    if (!down) {
      line(at(40, -30), at(44 + stride, 0));
      line(at(26, -30), at(26 - stride, 0));
      line(at(-36, -30), at(-40 - stride, 0));
      line(at(-22, -30), at(-20 + stride, 0));
    }

    // 身躯
    const torso = at(0, -46 + breathe);
    g.fillStyle(fill);
    g.fillEllipse(torso.x, torso.y, 140, 58 * squash);
    if (flashing) {
      g.lineStyle(2, COLORS.ink);
      g.strokeEllipse(torso.x, torso.y, 140, 58 * squash);
    }
    // 虎纹
    g.lineStyle(4, COLORS.inkLight, flashing ? 0 : 0.9);
    for (const x of [-40, -20, 0, 20]) line(at(x, -72 + breathe), at(x + 8, -52 + breathe));

    // 脑袋：长啸时仰起
    const lift = roaring ? -10 : 0;
    const head = at(66, -60 + lift + breathe);
    g.fillStyle(fill);
    g.fillCircle(head.x, head.y, 24);
    g.fillTriangle(at(52, -78 + lift).x, at(52, -78 + lift).y, at(58, -92 + lift).x, at(58, -92 + lift).y, at(64, -80 + lift).x, at(64, -80 + lift).y);
    g.fillTriangle(at(68, -80 + lift).x, at(68, -80 + lift).y, at(76, -92 + lift).x, at(76, -92 + lift).y, at(80, -76 + lift).x, at(80, -76 + lift).y);
    // 吻部
    const snout = at(86, -54 + lift + breathe);
    g.fillEllipse(snout.x, snout.y, 26, 20);
    if (roaring) {
      g.fillStyle(COLORS.paper);
      g.fillTriangle(snout.x - 4 * b.facing, snout.y + 2, snout.x + 14 * b.facing, snout.y - 2, snout.x + 14 * b.facing, snout.y + 12);
    }
    // 朱红虎眼
    const eye = at(74, -66 + lift + breathe);
    g.fillStyle(COLORS.red);
    g.fillCircle(eye.x, eye.y, 3.5);
  }

  private drawBlots(delta: number) {
    const dt = delta / (1000 / 60);
    for (const p of this.blots) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 0.25 * dt;
      p.vx *= 0.96;
      p.r += 0.3 * dt;
      p.life -= delta / 800;
    }
    this.blots = this.blots.filter((p) => p.life > 0);
    for (const p of this.blots) {
      this.fx.fillStyle(COLORS.ink, p.life * 0.85);
      this.fx.fillCircle(p.x, p.y, p.r);
    }
  }
}
