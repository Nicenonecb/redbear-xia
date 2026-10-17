import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_HEIGHT, GAME_WIDTH } from '../config';
import { queueArt, registerArtFrames } from '../art/slots';

const BAR_W = 420;

/**
 * 预加载场景：读立绘清单，加载登记了的图片（没有就跳过），然后进标题。
 * 图有好几兆，网慢时要等一会儿，所以画一道慢慢写满的墨条，旁边写"研墨中"。
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.json('artManifest', 'art/manifest.json');
  }

  create() {
    queueArt(this);
    if (!this.load.list.size) {
      this.scene.start('Title');
      return;
    }

    const cx = GAME_WIDTH / 2;
    const cy = GAME_HEIGHT / 2;
    this.add.text(cx, cy - 40, '研墨中……', { fontFamily: FONT_BRUSH, fontSize: '30px', color: CSS_COLORS.ink }).setOrigin(0.5);
    const bar = this.add.graphics();
    const draw = (p: number) => {
      bar.clear();
      bar.fillStyle(COLORS.ink, 0.15);
      bar.fillRect(cx - BAR_W / 2, cy, BAR_W, 6);
      bar.fillStyle(COLORS.ink, 0.9);
      bar.fillRect(cx - BAR_W / 2, cy, BAR_W * p, 6);
      // 墨条写到哪，笔尖就点一点朱红
      bar.fillStyle(COLORS.red);
      bar.fillCircle(cx - BAR_W / 2 + BAR_W * p, cy + 3, 4);
    };
    draw(0);
    this.load.on(Phaser.Loader.Events.PROGRESS, draw);
    this.load.once(Phaser.Loader.Events.COMPLETE, () => {
      registerArtFrames(this);
      this.scene.start('Title');
    });
    this.load.start();
  }
}
