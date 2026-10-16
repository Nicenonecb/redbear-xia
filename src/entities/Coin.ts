import Phaser from 'phaser';
import { COLORS } from '../config';
import type { Fighter } from './Fighter';

/** 落地后多久开始往玩家身上飞 */
const MAGNET_DELAY = 24;

/**
 * 掉落的铜钱：从敌人身上蹦出来，落地弹两下，然后自己飞到玩家身上。
 * 朱红圆钱、浓墨方孔。
 */
export class Coin {
  collected = false;
  private readonly g: Phaser.GameObjects.Graphics;
  private vx: number;
  private vy: number;
  private age = 0;

  constructor(
    scene: Phaser.Scene,
    private x: number,
    private y: number,
    readonly value: number,
    private readonly groundY: number,
  ) {
    this.vx = Phaser.Math.FloatBetween(-3.5, 3.5);
    this.vy = Phaser.Math.FloatBetween(-7, -4);
    this.g = scene.add.graphics().setDepth(7);
    const r = value >= 5 ? 8 : 6;
    this.g.fillStyle(COLORS.red);
    this.g.fillCircle(0, 0, r);
    this.g.lineStyle(1.5, COLORS.ink);
    this.g.strokeCircle(0, 0, r);
    this.g.fillStyle(COLORS.ink);
    this.g.fillRect(-r * 0.3, -r * 0.3, r * 0.6, r * 0.6);
    this.g.setPosition(x, y);
  }

  /** 返回 true 表示这一帧被捡到了 */
  tick(player: Fighter) {
    if (this.collected) return false;
    this.age++;
    const tx = player.x;
    const ty = player.feetY - 36;
    if (this.age > MAGNET_DELAY) {
      // 越飞越快地被吸过去
      const pull = Math.min(1, (this.age - MAGNET_DELAY) / 30) * 0.22;
      this.x += (tx - this.x) * pull;
      this.y += (ty - this.y) * pull;
    } else {
      this.vy += 0.45;
      this.x += this.vx;
      this.y += this.vy;
      if (this.y > this.groundY - 6) {
        this.y = this.groundY - 6;
        this.vy *= -0.45;
        this.vx *= 0.7;
      }
    }
    this.g.setPosition(this.x, this.y);
    this.g.scaleX = Math.cos(this.age * 0.25);
    if (Math.hypot(tx - this.x, ty - this.y) < 24) {
      this.collected = true;
      this.g.destroy();
      return true;
    }
    return false;
  }

  destroy() {
    if (!this.collected) this.g.destroy();
    this.collected = true;
  }
}
