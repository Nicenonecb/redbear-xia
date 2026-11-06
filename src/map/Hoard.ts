import type Phaser from 'phaser';
import { COLORS } from '../config';
import { hasArt, type ArtSlot } from '../art/slots';
import { placeMapArt } from './mapArt';
import type { Pt } from './chapter1Map';

/**
 * 胖虎山寨后院的囤粮：几袋粮、几捆兵器，是往山上送的。
 * 有图（prop_grain_sacks、prop_weapon_bundle）就用图，没有就用代码画麻袋和捆好的刀枪。
 * 只是摆着；拔剑打赢放完人以后，主角会走过来翻出账本（见 PangHuBoss.readLedger）
 */
export class Hoard {
  /** 主角走到这儿翻账本 */
  readonly standAt: Pt;
  /** 粮堆脚下挡路的圆 */
  readonly solids: { at: Pt; r: number }[];

  constructor(
    private readonly scene: Phaser.Scene,
    readonly at: Pt,
  ) {
    this.standAt = { x: at.x + 40, y: at.y + 125 };
    this.solids = [
      { at: { x: at.x, y: at.y }, r: 80 },
      { at: { x: at.x + 150, y: at.y + 15 }, r: 45 },
    ];
    this.drawSacks(at.x, at.y);
    this.drawWeapons(at.x + 150, at.y + 15);
  }

  /** 一堆麻袋：下面一排三袋、上面两袋、顶上一袋，扎口朝上，鼓鼓囊囊 */
  private drawSacks(x: number, y: number) {
    if (hasArt(this.scene, 'prop_grain_sacks' as ArtSlot)) {
      placeMapArt(this.scene, 'prop_grain_sacks' as ArtSlot, x, y, 230);
      return;
    }
    const g = this.scene.add.graphics().setDepth(y);
    g.fillStyle(COLORS.ink, 0.2);
    g.fillEllipse(x, y + 4, 260, 56);
    const sack = (sx: number, sy: number, w: number, h: number, flip: number) => {
      const cy = sy - h * 0.42;
      // 袋身：一个鼓鼓的椭圆，背光一侧压一层淡墨
      g.fillStyle(0xc9ab7a, 1);
      g.fillEllipse(sx, cy, w, h * 0.84);
      g.fillStyle(0x7d6444, 0.32);
      g.fillEllipse(sx + w * 0.16 * flip, cy + h * 0.04, w * 0.62, h * 0.72);
      g.fillStyle(0xe2cc9f, 0.5);
      g.fillEllipse(sx - w * 0.18 * flip, cy - h * 0.12, w * 0.32, h * 0.3);
      g.lineStyle(3, COLORS.ink, 0.78);
      g.strokeEllipse(sx, cy, w, h * 0.84);
      // 扎口：一撮麻布翘着，一道麻绳
      const ty = sy - h * 0.82;
      g.fillStyle(0xc9ab7a, 1);
      g.fillEllipse(sx + 3 * flip, ty - 9, w * 0.3, h * 0.22);
      g.lineStyle(2.5, COLORS.ink, 0.75);
      g.strokeEllipse(sx + 3 * flip, ty - 9, w * 0.3, h * 0.22);
      g.lineStyle(5, 0x5b4630, 1);
      g.lineBetween(sx - w * 0.13, ty, sx + w * 0.13, ty + 2);
      // 一方朱印
      g.fillStyle(COLORS.red, 0.75);
      g.fillRect(sx - 8 - w * 0.12 * flip, cy - 6, 16, 16);
    };
    // 先画后排、再画前排、最后摞上去的
    sack(x - 40, y - 34, 74, 92, 1);
    sack(x + 40, y - 30, 74, 90, -1);
    sack(x - 80, y, 80, 98, 1);
    sack(x, y + 6, 82, 100, -1);
    sack(x + 80, y, 80, 96, 1);
    sack(x, y - 72, 70, 86, 1);
  }

  /** 两捆兵器：麻绳捆着的一束长枪、一束刀，斜靠在木架上 */
  private drawWeapons(x: number, y: number) {
    // 有专门的图就用；没有就借山寨里那张兵器架（同一个山寨的东西，不算拿别人顶替）
    for (const [slot, width] of [['prop_weapon_bundle', 150], ['prop_weapon_rack', 150]] as const)
      if (hasArt(this.scene, slot as ArtSlot)) {
        placeMapArt(this.scene, slot as ArtSlot, x, y, width);
        return;
      }
    const g = this.scene.add.graphics().setDepth(y);
    g.fillStyle(COLORS.ink, 0.18);
    g.fillEllipse(x, y + 2, 150, 36);
    // 木架
    g.lineStyle(6, 0x5b4630, 1);
    g.lineBetween(x - 60, y, x - 50, y - 90);
    g.lineBetween(x + 60, y, x + 50, y - 90);
    g.lineBetween(x - 55, y - 70, x + 55, y - 70);
    // 一束长枪：枪杆、枪头
    for (let i = 0; i < 6; i++) {
      const bx = x - 35 + i * 7;
      g.lineStyle(4, 0x6b5235, 1);
      g.lineBetween(bx, y - 4, bx + 26, y - 170);
      g.fillStyle(0x8d939a, 1);
      g.fillTriangle(bx + 22, y - 168, bx + 30, y - 168, bx + 28, y - 192);
    }
    // 一束刀
    for (let i = 0; i < 4; i++) {
      const bx = x + 15 + i * 9;
      g.lineStyle(7, 0x8d939a, 1);
      g.lineBetween(bx, y - 6, bx - 10, y - 110);
      g.lineStyle(5, 0x3b2c1d, 1);
      g.lineBetween(bx, y - 6, bx + 2, y + 6);
    }
    // 麻绳
    g.lineStyle(5, 0xa88c5c, 1);
    g.lineBetween(x - 40, y - 60, x + 50, y - 55);
    g.lineBetween(x - 36, y - 110, x + 30, y - 100);
    g.lineStyle(2, COLORS.ink, 0.6);
    g.strokeRect(x - 62, y - 92, 124, 92);
  }
}
