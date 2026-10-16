import Phaser from 'phaser';

/** 预加载场景。目前没有外部资源，之后接入立绘、音效时在这里加载。 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create() {
    this.scene.start('Title');
  }
}
