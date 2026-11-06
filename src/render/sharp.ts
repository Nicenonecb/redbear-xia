import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../config';

/**
 * 按屏幕实际像素渲染。
 *
 * 游戏里所有坐标仍按 1280×720 来设计，但画布按"1280×720 × 渲染倍数"的真实分辨率来画，
 * 每个场景的主镜头放大同样倍数。这样在 Retina / 2K 屏上图片按原图清晰度显示、线条和字都是锐利的，
 * 不再先画成 1280×720 再拉伸（那样会糊）。
 */

/** 4K 屏上最多放大到 3 倍，再大显卡吃力、也看不出区别 */
const MAX_SCALE = 3;
/**
 * 画面能铺开的宽高比范围。1280×720 是设计画面，窗口比 16:9 宽就往左右多露一些、
 * 比 16:9 高就往上下多露一些，整个浏览器铺满，不留两边的空白；
 * 超出这个范围（极宽的带鱼屏、竖屏）才在两边或上下留纸色
 */
const MIN_ASPECT = 4 / 3;
const MAX_ASPECT = 2.4;

interface View {
  /** 渲染倍数（画布像素 / 设计像素） */
  scale: number;
  /** 画面实际看得见的大小（设计像素），至少 1280×720 */
  width: number;
  height: number;
}

function measure(): View {
  const dpr = window.devicePixelRatio || 1;
  // 窗口还没显示出来时（后台标签页里打开）宽高是 0，先按整块屏幕算，显示出来后会再算一次
  const w = (window.innerWidth || window.screen.width) * dpr;
  const h = (window.innerHeight || window.screen.height) * dpr;
  const aspect = Phaser.Math.Clamp(w / h, MIN_ASPECT, MAX_ASPECT);
  const width = aspect >= GAME_WIDTH / GAME_HEIGHT ? GAME_HEIGHT * aspect : GAME_WIDTH;
  const height = width / aspect;
  const scale = Phaser.Math.Clamp(Math.min(w / width, h / height), 1, MAX_SCALE);
  return { scale, width, height };
}

let view = measure();

/** 当前的渲染倍数（画布像素 / 设计像素） */
export function renderScale() {
  return view.scale;
}

/** 画布的真实尺寸 */
export function canvasSize() {
  return { width: Math.round(view.width * view.scale), height: Math.round(view.height * view.scale) };
}

/**
 * 镜头对准设计画面正中时，屏幕上实际看得见的那块（设计坐标）。
 * 窗口正好 16:9 时就是 (0, 0, 1280, 720)；更宽时 x 是负的，左右多出来一截。
 * 铺满全屏的底图、压暗的遮罩、贴着屏幕边的界面都按它来摆
 */
export function viewRect() {
  const width = canvasSize().width / view.scale;
  const height = canvasSize().height / view.scale;
  return new Phaser.Geom.Rectangle((GAME_WIDTH - width) / 2, (GAME_HEIGHT - height) / 2, width, height);
}

/**
 * 把镜头放大到渲染倍数。没有跟随目标的镜头（标题、选角、界面层）对准 1280×720 的设计画面正中；
 * 跟着人走的地图镜头只改放大倍数，位置由跟随来管
 */
export function fitCamera(cam: Phaser.Cameras.Scene2D.Camera) {
  cam.setZoom(view.scale);
  const following = (cam as unknown as { _follow: unknown })._follow;
  if (!following) cam.centerOn(GAME_WIDTH / 2, GAME_HEIGHT / 2);
}

/**
 * 场景插件：每个场景都会自动装上，场景每次建好（包括重开）时把镜头放大到渲染倍数。
 * 用插件而不是在游戏启动后挨个挂事件，是因为启动有时是同步完成的，晚挂的事件会错过第一批场景
 */
export class SharpCameraPlugin extends Phaser.Plugins.ScenePlugin {
  boot() {
    this.systems!.events.on(Phaser.Scenes.Events.CREATE, () => fitCamera(this.systems!.cameras.main));
  }
}

/** 游戏配置里用：把上面的插件装进每个场景 */
export const sharpCameraPlugin = { key: 'sharpCamera', plugin: SharpCameraPlugin, mapping: 'sharpCamera' };

/**
 * 装到游戏上：新建的文字按渲染倍数生成，免得被放大以后发糊；
 * 窗口大小或者屏幕倍率变了（把窗口拖到另一块屏上）就重新算画布大小和镜头
 */
export function installSharpRendering(game: Phaser.Game) {
  const factory = Phaser.GameObjects.GameObjectFactory.prototype as unknown as {
    text: (...args: unknown[]) => Phaser.GameObjects.Text;
  };
  const makeText = factory.text;
  factory.text = function (this: unknown, ...args: unknown[]) {
    return makeText.apply(this, args).setResolution(view.scale);
  };

  window.addEventListener('resize', () => {
    const next = measure();
    if (Math.abs(next.scale - view.scale) < 0.05 && Math.abs(next.width - view.width) < 2 && Math.abs(next.height - view.height) < 2) return;
    view = next;
    const size = canvasSize();
    game.scale.setGameSize(size.width, size.height);
    for (const s of game.scene.getScenes(true)) fitCamera(s.cameras.main);
  });
}
