import Phaser from 'phaser';
import { sfx } from './audio/sfx';
import { canvasSize, installSharpRendering, sharpCameraPlugin } from './render/sharp';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_HEIGHT, GAME_WIDTH } from './config';
import { EndingScene } from './scenes/EndingScene';
import { IntroScene } from './scenes/IntroScene';
import { BootScene } from './scenes/BootScene';
import { TitleScene } from './scenes/TitleScene';
import { GameScene } from './scenes/GameScene';
import { PangHuScene } from './scenes/PangHuScene';
import { LetterScene } from './scenes/LetterScene';
import { MapScene } from './scenes/MapScene';
import { RoomScene } from './scenes/RoomScene';
import { SelectScene } from './scenes/SelectScene';
import { ShopScene } from './scenes/ShopScene';
import { UIScene } from './scenes/UIScene';

// 画布按屏幕实际像素来开，镜头再放大回 1280×720 的设计画面（见 render/sharp.ts）
const size = canvasSize();
const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: size.width,
  height: size.height,
  backgroundColor: COLORS.paper,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: { gravity: { x: 0, y: 1600 }, debug: false },
  },
  plugins: { scene: [sharpCameraPlugin] },
  // 顺序就是画的顺序：界面层 UI 要排在大地图 Map 后面，才压在地图上面
  scene: [BootScene, TitleScene, SelectScene, IntroScene, EndingScene, MapScene, UIScene, GameScene, RoomScene, ShopScene, PangHuScene, LetterScene],
});

installSharpRendering(game);

// 音效借用 Phaser 的 AudioContext；M 静音，- / = 调音量（随时可按）
sfx.bind(game);
window.addEventListener('keydown', (e) => {
  if (e.repeat) return;
  if (e.code === 'KeyM') sfx.toggleMute();
  else if (e.code === 'Minus') sfx.setVolume(sfx.volume - 0.1);
  else if (e.code === 'Equal') sfx.setVolume(sfx.volume + 0.1);
  else return;
  const scene = game.scene.getScenes(true)[0];
  if (!scene) return;
  const label = sfx.muted ? '静音' : `音量 ${Math.round(sfx.volume * 100)}%`;
  const text = scene.add
    .text(GAME_WIDTH - 24, GAME_HEIGHT - 70, label, { fontFamily: FONT_BRUSH, fontSize: '22px', color: CSS_COLORS.ink, backgroundColor: CSS_COLORS.paper, padding: { x: 10, y: 4 } })
    .setOrigin(1, 1)
    .setDepth(200);
  scene.time.delayedCall(900, () => text.destroy());
});

// 开发时把 game 和逐帧测试工具挂到 window 上，打包后没有这段
if (import.meta.env.DEV) {
  Object.assign(window, { game, sfx });
  import('./debug/devHarness').then((m) => m.installDevHarness(game));
}
