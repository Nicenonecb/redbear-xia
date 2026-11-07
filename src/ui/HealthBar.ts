import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH } from '../config';

const HEIGHT = 12;

/** 血条：浓墨框、朱红气血；掉血时先留一截淡墨，再慢慢缩回去，看得出这一下打了多少。 */
export class HealthBar {
  private readonly g: Phaser.GameObjects.Graphics;
  private readonly label: Phaser.GameObjects.Text;
  private trail = 1;
  private visible = true;

  constructor(
    scene: Phaser.Scene,
    private readonly x: number,
    private readonly y: number,
    private readonly width: number,
    name: string,
  ) {
    this.g = scene.add.graphics().setDepth(50);
    this.label = scene.add
      .text(x, y - 6, name, { fontFamily: FONT_BRUSH, fontSize: '22px', color: CSS_COLORS.ink })
      .setOrigin(0, 1)
      .setDepth(50);
  }

  setName(name: string) { this.label.setText(name); }

  setVisible(visible: boolean) {
    this.visible = visible;
    this.label.setVisible(visible);
    if (!visible) this.g.clear();
  }

  draw(ratio: number, delta: number) {
    if (!this.visible) return;
    ratio = Phaser.Math.Clamp(ratio, 0, 1);
    this.trail = ratio >= this.trail ? ratio : Math.max(ratio, this.trail - delta / 1500);

    const g = this.g;
    g.clear();
    g.fillStyle(COLORS.ink, 0.25);
    g.fillRect(this.x, this.y, this.width, HEIGHT);
    g.fillStyle(COLORS.inkLight, 0.9);
    g.fillRect(this.x, this.y, this.width * this.trail, HEIGHT);
    g.fillStyle(COLORS.red);
    g.fillRect(this.x, this.y, this.width * ratio, HEIGHT);
    g.lineStyle(2, COLORS.ink);
    g.strokeRect(this.x, this.y, this.width, HEIGHT);
  }
}
