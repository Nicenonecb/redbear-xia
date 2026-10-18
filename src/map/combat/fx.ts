import Phaser from 'phaser';
import { COLORS } from '../../config';
import { hasArt, type ArtSlot } from '../../art/slots';
import { GROUND_SQUASH, groundAngle, type Vec } from './ground';

/**
 * 地图上的招式特效：刀光、蓄力聚墨、冲刺扬起的墨尘。
 * 第三批的特效图（fx_slash_arc 等）到了就用图：图只画朝右一个方向，转到出招方向、再压扁贴地；
 * 没有图就用代码画的墨迹顶着。都按画面帧推进，交给场景的 overlays 列表，播完自己消失。
 */


export interface Overlay {
  update(delta: number): void;
  readonly done: boolean;
}

/** 有特效图就摆一张：放在一个压扁的容器里，图在容器里转到 angle，看起来就是贴着地面转 */
function groundImage(scene: Phaser.Scene, slot: ArtSlot, x: number, y: number, angle: number, width: number) {
  if (!hasArt(scene, slot)) return null;
  const img = scene.add.image(0, 0, `art:${slot}`).setRotation(angle);
  img.setScale(width / img.width);
  const box = scene.add.container(x, y, [img]).setScale(1, GROUND_SQUASH);
  return { box, img };
}

export interface SlashOptions {
  /** 刀光半径（设计像素），和判定扇形的 reach 差不多 */
  reach: number;
  /** 扫过的角度（度） */
  arc: number;
  /** 重击：刀光更宽，边上一道朱红，甩出墨点 */
  heavy?: boolean;
  /** 反手：从另一边扫过来 */
  reverse?: boolean;
}

/** 扫一下要多久、扫完淡掉要多久（毫秒） */
const SWEEP_MS = 90;
const FADE_MS = 200;

/**
 * 一道弧形刀光：以出招者为中心、朝面向扫过去的月牙形墨痕，前沿浓、尾巴淡；
 * 画在腰的高度（离地 lift），贴着地面压扁
 */
export class SlashFx implements Overlay {
  private readonly g: Phaser.GameObjects.Graphics | null;
  private readonly art: ReturnType<typeof groundImage>;
  private t = 0;
  private readonly base: number;
  private readonly dots: { a: number; r: number; s: number }[] = [];

  constructor(
    scene: Phaser.Scene,
    private readonly at: Vec,
    facing: Vec,
    private readonly opt: SlashOptions,
    private readonly lift = 56,
  ) {
    this.base = groundAngle(facing);
    // 朝上砍时刀光在人身后（先画），朝下砍时在人身前
    const depth = at.y + (facing.y < -0.3 ? -2 : 2);
    const slot: ArtSlot = opt.heavy ? 'fx_slash_heavy' : 'fx_slash_arc';
    this.art = groundImage(scene, slot, at.x, at.y - lift, this.base, opt.reach * 2.2);
    if (this.art) {
      this.art.box.setDepth(depth).setAlpha(0);
      if (opt.reverse) this.art.img.setFlipY(true);
      this.g = null;
    } else {
      this.g = scene.add.graphics().setDepth(depth);
    }
    if (opt.heavy) {
      for (let i = 0; i < 7; i++) {
        this.dots.push({ a: Phaser.Math.FloatBetween(-0.5, 0.5), r: Phaser.Math.FloatBetween(1.0, 1.35), s: Phaser.Math.FloatBetween(2, 5) });
      }
    }
  }

  get done() {
    return this.t >= SWEEP_MS + FADE_MS;
  }

  update(delta: number) {
    this.t += delta;
    const sweep = Math.min(1, this.t / SWEEP_MS);
    const fade = Phaser.Math.Clamp(1 - (this.t - SWEEP_MS) / FADE_MS, 0, 1);
    if (this.art) {
      this.art.box.setAlpha(fade * Math.min(1, this.t / 40));
      this.art.img.setScale((this.opt.reach * 2.2) / this.art.img.width * (0.85 + sweep * 0.15));
      if (this.done) this.art.box.destroy();
      return;
    }
    const g = this.g!;
    g.clear();
    if (this.done) {
      g.destroy();
      return;
    }
    const { reach, arc, heavy, reverse } = this.opt;
    const span = Phaser.Math.DegToRad(arc);
    const from = this.base - span / 2;
    // 扫到哪儿了：头走在前面，尾巴跟着收
    const head = sweep;
    const tail = Math.max(0, (this.t - SWEEP_MS * 0.5) / (SWEEP_MS + FADE_MS * 0.6));
    const width = reach * (heavy ? 0.46 : 0.34);
    const P = (a: number, r: number) => ({
      x: this.at.x + Math.cos(a) * r,
      y: this.at.y - this.lift + Math.sin(a) * r * GROUND_SQUASH,
    });
    const steps = 16;
    const outer: Vec[] = [];
    const inner: Vec[] = [];
    for (let i = 0; i <= steps; i++) {
      const u = Phaser.Math.Linear(tail, head, i / steps);
      const a = reverse ? from + span * (1 - u) : from + span * u;
      // 越靠刀头越厚
      const thick = width * Math.sin(Math.PI * Math.min(1, (i / steps) * 0.9 + 0.1)) * (0.4 + 0.6 * (i / steps));
      outer.push(P(a, reach));
      inner.push(P(a, reach - thick));
    }
    g.fillStyle(COLORS.ink, 0.82 * fade);
    g.fillPoints([...outer, ...inner.reverse()], true);
    g.lineStyle(heavy ? 3 : 2, heavy ? COLORS.red : COLORS.inkLight, (heavy ? 0.9 : 0.5) * fade);
    g.strokePoints(outer);
    for (const d of this.dots) {
      const a = this.base + d.a * span;
      const p = P(a, reach * d.r * (0.9 + sweep * 0.2));
      g.fillStyle(COLORS.ink, 0.8 * fade);
      g.fillCircle(p.x, p.y, d.s);
    }
  }
}

/**
 * 蓄力聚墨：一缕缕墨气从四周往人身上卷进来，蓄得越满越浓、越快；蓄满了脚下一圈朱红闪一下。
 * 跟着人走，每帧由场景调 follow 更新位置和蓄力比例
 */
export class ChargeAura implements Overlay {
  private readonly g: Phaser.GameObjects.Graphics;
  /** 身后那层：墨气笼罩、脚下的圈 */
  private readonly back: Phaser.GameObjects.Graphics;
  private readonly art: ReturnType<typeof groundImage>;
  private motes: { a: number; r: number; w: number }[] = [];
  private spawnTimer = 0;
  private t = 0;
  private at: Vec = { x: 0, y: 0 };
  private ratio = 0;
  private wasFull = false;
  private flashT = 0;
  private finished = false;

  constructor(scene: Phaser.Scene) {
    this.back = scene.add.graphics();
    this.g = scene.add.graphics();
    this.art = groundImage(scene, 'fx_charge', 0, 0, 0, 260);
    this.art?.box.setAlpha(0);
  }

  get done() {
    return this.finished;
  }

  /** 蓄满了没有（场景用来让人微微发抖） */
  get full() {
    return this.ratio >= 1;
  }

  /** 蓄完了（松手、被打断）：收起来 */
  stop() {
    this.finished = true;
    this.g.destroy();
    this.back.destroy();
    this.art?.box.destroy();
  }

  follow(at: Vec, ratio: number) {
    this.at = at;
    this.ratio = ratio;
  }

  update(delta: number) {
    if (this.finished) return;
    this.t += delta;
    const k = this.ratio;
    const full = k >= 1;
    if (full && !this.wasFull) this.flashT = 1;
    this.wasFull = full;
    this.flashT = Math.max(0, this.flashT - delta / 350);

    if (this.art) {
      this.art.box.setPosition(this.at.x, this.at.y).setDepth(this.at.y - 1).setAlpha(0.3 + k * 0.6);
      this.art.img.setRotation(-this.t * (0.004 + k * 0.008));
    }

    // 墨气：一缕缕从外圈生出来，转着往里卷，越蓄越密、越快
    this.spawnTimer -= delta;
    while (this.spawnTimer <= 0) {
      this.spawnTimer += 34 - k * 22;
      this.motes.push({ a: Math.random() * Math.PI * 2, r: Phaser.Math.FloatBetween(110, 160), w: Phaser.Math.FloatBetween(2.5, 5.5) });
    }
    for (const m of this.motes) {
      m.a -= (delta / 1000) * (2.2 + k * 4.5);
      m.r -= (delta / 1000) * (150 + k * 200);
    }
    this.motes = this.motes.filter((m) => m.r > 10);

    const cx = this.at.x;
    const cy = this.at.y - 70;
    // 身后：一团越来越浓的墨气笼住全身，蓄满了脚下一圈朱红跳动
    const back = this.back;
    back.clear().setDepth(this.at.y - 0.5);
    for (let i = 0; i < 3; i++) {
      back.fillStyle(COLORS.ink, (0.05 + k * 0.09) * (1 - i * 0.25));
      back.fillEllipse(cx, cy + 6, 70 + i * 34 + k * 20, 150 + i * 30 + k * 20);
    }
    if (full) {
      const pulse = 0.6 + Math.sin(this.t * 0.025) * 0.4;
      back.lineStyle(3, COLORS.red, 0.75 * pulse);
      back.strokeEllipse(this.at.x, this.at.y, 110, 110 * GROUND_SQUASH * 0.7);
      back.lineStyle(1.5, COLORS.red, 0.4 * pulse);
      back.strokeEllipse(this.at.x, this.at.y, 150, 150 * GROUND_SQUASH * 0.7);
    }

    // 身前：卷进来的墨气，一缕是一小段弧线，越往里越浓越粗
    const g = this.g;
    g.clear().setDepth(this.at.y + 1);
    for (const m of this.motes) {
      const near = 1 - m.r / 160;
      const pts: Vec[] = [];
      for (let j = 0; j < 6; j++) {
        const a = m.a + j * 0.09;
        const r = m.r + j * 7;
        pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * 0.85 });
      }
      g.lineStyle(m.w * (0.5 + near), COLORS.ink, (0.25 + near * 0.6) * (0.5 + k * 0.5));
      g.strokePoints(pts);
    }
    // 刚蓄满：一圈朱红往外炸开
    if (this.flashT > 0) {
      const r = 50 + (1 - this.flashT) * 110;
      g.lineStyle(5, COLORS.red, this.flashT);
      g.strokeEllipse(this.at.x, this.at.y, r * 2, r * 2 * GROUND_SQUASH * 0.7);
    }
  }
}

/** 冲刺、落地时脚下扬起的一小团墨尘：几块淡墨往后散开 */
export class DustPuff implements Overlay {
  private readonly g: Phaser.GameObjects.Graphics;
  private t = 0;
  private readonly bits: { dx: number; dy: number; r: number }[] = [];

  constructor(
    scene: Phaser.Scene,
    private readonly at: Vec,
    back: Vec,
    private readonly life = 380,
  ) {
    this.g = scene.add.graphics().setDepth(at.y - 1);
    for (let i = 0; i < 6; i++) {
      const spread = Phaser.Math.FloatBetween(-0.9, 0.9);
      const a = Math.atan2(back.y, back.x) + spread;
      const sp = Phaser.Math.FloatBetween(30, 70);
      this.bits.push({ dx: Math.cos(a) * sp, dy: Math.sin(a) * sp * GROUND_SQUASH, r: Phaser.Math.FloatBetween(6, 14) });
    }
  }

  get done() {
    return this.t >= this.life;
  }

  update(delta: number) {
    this.t += delta;
    const k = Math.min(1, this.t / this.life);
    const g = this.g;
    g.clear();
    if (this.done) {
      g.destroy();
      return;
    }
    for (const b of this.bits) {
      g.fillStyle(COLORS.inkLight, 0.3 * (1 - k));
      g.fillEllipse(this.at.x + b.dx * k, this.at.y + b.dy * k - 4, b.r * (1 + k) * 2, b.r * (1 + k) * GROUND_SQUASH * 2);
    }
  }
}

/**
 * 变身时的墨气旋涡：一缕缕墨从地上卷起来，像一股墨色龙卷把人裹在里面，越转越快、越来越浓。
 * 转到人身后的那半圈画在人后面，转到身前的画在人前面，看起来是真的裹住了。
 * 每帧由场景设 power（0~1）；有 fx_ink_vortex 图就在脚下再铺一张转着的图
 */
export class InkVortex implements Overlay {
  power = 0;
  private readonly back: Phaser.GameObjects.Graphics;
  private readonly front: Phaser.GameObjects.Graphics;
  private readonly art: ReturnType<typeof groundImage>;
  private spin = 0;
  private finished = false;

  constructor(
    scene: Phaser.Scene,
    private readonly at: Vec,
    private readonly height = 260,
  ) {
    this.back = scene.add.graphics().setDepth(at.y - 1);
    this.front = scene.add.graphics().setDepth(at.y + 1);
    this.art = groundImage(scene, 'fx_ink_vortex', at.x, at.y, 0, 360);
    this.art?.box.setDepth(at.y - 2).setAlpha(0);
  }

  get done() {
    return this.finished;
  }

  stop() {
    this.finished = true;
    this.back.destroy();
    this.front.destroy();
    this.art?.box.destroy();
  }

  update(delta: number) {
    if (this.finished) return;
    const p = this.power;
    this.spin += (delta / 1000) * (2 + p * 12);
    if (this.art) {
      this.art.box.setAlpha(p);
      this.art.img.setRotation(-this.spin);
    }
    this.back.clear();
    this.front.clear();
    // 脚下：一团越转越浓的墨
    for (let i = 0; i < 3; i++) {
      const r = (70 + i * 40) * (0.6 + p * 0.6);
      this.back.fillStyle(COLORS.ink, (0.12 + p * 0.2) * (1 - i * 0.28));
      this.back.fillEllipse(this.at.x, this.at.y, r * 2, r * 2 * GROUND_SQUASH);
    }
    const arms = 12;
    const steps = 16;
    const baseR = 55 + p * 75;
    const top = this.height * (0.45 + p * 0.55);
    for (let i = 0; i < arms; i++) {
      const phase = (i / arms) * Math.PI * 2;
      const pts = (k: number) => {
        const u = k / steps;
        const a = this.spin * (1 + (i % 3) * 0.15) + phase + u * 2.6;
        const r = baseR * (1 - u * 0.45) + Math.sin(this.spin * 3 + i) * 8;
        return { a, x: this.at.x + Math.cos(a) * r, y: this.at.y - u * top + Math.sin(a) * r * GROUND_SQUASH };
      };
      for (let j = 0; j < steps; j++) {
        const s0 = pts(j);
        const s1 = pts(j + 1);
        const g = Math.sin((s0.a + s1.a) / 2) >= 0 ? this.front : this.back;
        const fade = 1 - j / steps;
        g.lineStyle(4 + fade * 14 * p, COLORS.ink, (0.3 + p * 0.6) * (0.25 + fade * 0.75));
        g.lineBetween(s0.x, s0.y, s1.x, s1.y);
        if (i % 4 === 0 && j % 3 === 0) {
          g.lineStyle(2.5, COLORS.red, 0.6 * p * fade);
          g.lineBetween(s0.x, s0.y, s1.x, s1.y);
        }
      }
      // 甩出去的墨点
      const fly = pts(steps * (0.3 + ((this.spin * 0.7 + i) % 1) * 0.7));
      const g = Math.sin(fly.a) >= 0 ? this.front : this.back;
      g.fillStyle(COLORS.ink, 0.6 * p);
      g.fillCircle(fly.x + Math.cos(fly.a) * 24, fly.y, 3 + p * 4);
    }
  }
}
