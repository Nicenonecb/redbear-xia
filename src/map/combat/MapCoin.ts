import Phaser from 'phaser';
import { COLORS } from '../../config';
import type { Vec } from './ground';

/** 落地后多久开始往主角身上飞（逻辑帧） */
const MAGNET_DELAY = 24;
const GRAVITY = 0.55;

/**
 * 地图上掉落的铜钱：从倒下的山贼身上往四周蹦出来，落地弹两下，然后自己飞到主角身上。
 * 朱红圆钱、浓墨方孔，和横版一样；地上有个小影子。
 */
export class MapCoin {
  collected = false;
  private readonly g: Phaser.GameObjects.Graphics;
  private readonly shadow: Phaser.GameObjects.Ellipse;
  private readonly pos: Vec;
  private vel: Vec;
  private z = 0;
  private vz: number;
  private age = 0;
  private landed = 0;

  constructor(
    scene: Phaser.Scene,
    at: Vec,
    readonly value: number,
  ) {
    this.pos = { ...at };
    const a = Math.random() * Math.PI * 2;
    const sp = Phaser.Math.FloatBetween(1.2, 3.2);
    this.vel = { x: Math.cos(a) * sp, y: Math.sin(a) * sp * 0.7 };
    this.vz = Phaser.Math.FloatBetween(5, 8);
    const r = value >= 5 ? 8 : 6;
    this.shadow = scene.add.ellipse(at.x, at.y, r * 2, r * 0.7, COLORS.ink, 0.2);
    this.g = scene.add.graphics();
    this.g.fillStyle(COLORS.red);
    this.g.fillCircle(0, 0, r);
    this.g.lineStyle(1.5, COLORS.ink);
    this.g.strokeCircle(0, 0, r);
    this.g.fillStyle(COLORS.ink);
    this.g.fillRect(-r * 0.3, -r * 0.3, r * 0.6, r * 0.6);
  }

  /** 每个逻辑帧调用；碰到主角就返回 true（只返回一次） */
  tick(target: Vec): boolean {
    if (this.collected) return false;
    this.age++;
    if (this.landed < 2 || this.age < MAGNET_DELAY) {
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
      this.vz -= GRAVITY;
      this.z += this.vz;
      if (this.z <= 0) {
        this.z = 0;
        this.vz = -this.vz * 0.45;
        this.vel = { x: this.vel.x * 0.6, y: this.vel.y * 0.6 };
        this.landed++;
      }
    } else {
      // 越飞越快地被吸到主角身上
      const dx = target.x - this.pos.x;
      const dy = target.y - this.pos.y;
      const d = Math.hypot(dx, dy);
      const sp = Math.min(d, 4 + (this.age - MAGNET_DELAY) * 0.6);
      if (d < 16) {
        this.collected = true;
        this.g.destroy();
        this.shadow.destroy();
        return true;
      }
      this.pos.x += (dx / d) * sp;
      this.pos.y += (dy / d) * sp;
      this.z = Math.max(this.z * 0.9, 10);
    }
    this.g.setPosition(this.pos.x, this.pos.y - 8 - this.z).setDepth(this.pos.y + 1);
    this.shadow.setPosition(this.pos.x, this.pos.y).setDepth(this.pos.y);
    return false;
  }
}
