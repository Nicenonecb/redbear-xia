import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_HEIGHT, GAME_WIDTH } from '../config';
import { drawInkMountains } from '../art/inkMountains';
import { Controls } from '../input/Controls';

const GROUND_Y = 620;
const MOVE_SPEED = 280;
const JUMP_SPEED = 680;

/**
 * 战斗房占位场景：目前只有地面和一个可以移动、跳跃的剪影方块，
 * 用来验证画面、物理和输入层是否连通。主角和招式表接入后替换。
 */
export class GameScene extends Phaser.Scene {
  private controls!: Controls;
  private player!: Phaser.GameObjects.Rectangle;
  private body!: Phaser.Physics.Arcade.Body;
  private tassel!: Phaser.GameObjects.Rectangle;
  private facing: 1 | -1 = 1;

  constructor() {
    super('Game');
  }

  create() {
    this.controls = new Controls(this);

    drawInkMountains(this, { width: GAME_WIDTH, horizon: 300, bottom: GROUND_Y, layers: 3, seed: 'bamboo-1' });

    // 地面：一道浓墨
    const ground = this.add.rectangle(GAME_WIDTH / 2, GROUND_Y + 50, GAME_WIDTH, 100, COLORS.ink);
    this.physics.add.existing(ground, true);

    this.player = this.add.rectangle(200, GROUND_Y - 40, 28, 72, COLORS.ink);
    this.physics.add.existing(this.player);
    this.body = this.player.body as Phaser.Physics.Arcade.Body;
    this.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, ground);

    // 剑穗占位：一点朱红
    this.tassel = this.add.rectangle(0, 0, 6, 14, COLORS.red);

    this.add.text(24, 20, '竹林 · 战斗房 一（占位）', { fontFamily: FONT_BRUSH, fontSize: '28px', color: CSS_COLORS.ink });
    this.add
      .text(24, GAME_HEIGHT - 40, 'A/D 移动 · W/空格 跳跃 · Esc 返回标题', {
        fontFamily: FONT_BRUSH,
        fontSize: '20px',
        color: CSS_COLORS.paper,
      })
      .setAlpha(0.8);

    this.input.keyboard!.on('keydown-ESC', () => this.scene.start('Title'));
    this.cameras.main.fadeIn(400, 239, 231, 214);
  }

  update() {
    this.controls.update();

    const dir = this.controls.moveX;
    this.body.setVelocityX(dir * MOVE_SPEED);
    if (dir !== 0) this.facing = dir > 0 ? 1 : -1;

    if (this.controls.justPressed('jump') && this.body.blocked.down) {
      this.body.setVelocityY(-JUMP_SPEED);
    }

    this.tassel.setPosition(this.player.x - 16 * this.facing, this.player.y + 10);
  }
}
