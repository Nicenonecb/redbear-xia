import Phaser from 'phaser';
import { queueArt } from '../art/slots';

/** 预加载场景：读立绘清单，加载登记了的图片（没有就跳过），然后进标题。 */
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
    this.load.once(Phaser.Loader.Events.COMPLETE, () => this.scene.start('Title'));
    this.load.start();
  }
}
