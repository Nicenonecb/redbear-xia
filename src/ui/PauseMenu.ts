import Phaser from 'phaser';
import { sfx } from '../audio/sfx';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_HEIGHT, GAME_WIDTH } from '../config';
import { viewRect } from '../render/sharp';

/** 菜单上的两个选项 */
const OPTIONS = ['继续', '返回标题'] as const;
const PANEL = { w: 640, rowH: 40, pad: 36 };
const BUTTON = { w: 220, h: 58, gap: 40 };

/**
 * 暂停菜单：压暗画面，正中一张宣纸，上面写着操作说明，下面两个选项（继续 / 返回标题）。
 * A/D、W/S 或方向键选，J / 空格 / 回车确定，Esc / P 直接继续；鼠标点也行。
 * 菜单开着时大地图整个停住（场景暂停），菜单本身画在界面层上
 */
export class PauseMenu {
  private readonly container: Phaser.GameObjects.Container;
  private readonly buttons: { bg: Phaser.GameObjects.Graphics; label: Phaser.GameObjects.Text; rect: Phaser.Geom.Rectangle }[] = [];
  private index = 0;
  private closed = false;
  /**
   * 打开菜单的那一下 Esc / P 同一帧里还会传到界面层的键盘上，
   * 不认它，否则菜单刚开就被当成"继续"关掉了
   */
  private readonly openedAt = performance.now();
  private readonly onKey = (e: KeyboardEvent) => this.handleKey(e);
  private readonly onPointer = (p: Phaser.Input.Pointer) => this.handlePointer(p);

  /**
   * hint 是这位主角的操作说明（"WASD 走 · J 扇子横扫 · ……"），拆成一行一条；
   * onResume 继续，onQuit 回标题
   */
  constructor(
    private readonly scene: Phaser.Scene,
    hint: string,
    private readonly onResume: () => void,
    private readonly onQuit: () => void,
  ) {
    this.container = scene.add.container(0, 0).setDepth(90);
    const rows = controlRows(hint);
    const cx = GAME_WIDTH / 2;
    const h = PANEL.pad * 2 + 70 + rows.length * PANEL.rowH + 30 + BUTTON.h;
    const top = GAME_HEIGHT / 2 - h / 2;

    const v = viewRect();
    const g = scene.add.graphics();
    g.fillStyle(COLORS.ink, 0.6);
    g.fillRect(v.x, v.y, v.width, v.height);
    g.fillStyle(COLORS.paper, 0.97);
    g.fillRoundedRect(cx - PANEL.w / 2, top, PANEL.w, h, 14);
    g.lineStyle(3, COLORS.ink, 0.9);
    g.strokeRoundedRect(cx - PANEL.w / 2, top, PANEL.w, h, 14);
    this.container.add(g);

    this.container.add(
      scene.add.text(cx, top + PANEL.pad + 6, '暂　停', { fontFamily: FONT_BRUSH, fontSize: '46px', color: CSS_COLORS.ink }).setOrigin(0.5, 0.5),
    );
    // 一条一行：左边朱红的键，右边浓墨的招
    rows.forEach(([key, what], i) => {
      const y = top + PANEL.pad + 70 + i * PANEL.rowH;
      this.container.add([
        scene.add.text(cx - 16, y, key, { fontFamily: FONT_BRUSH, fontSize: '26px', color: CSS_COLORS.red }).setOrigin(1, 0.5),
        scene.add.text(cx + 16, y, what, { fontFamily: FONT_BRUSH, fontSize: '26px', color: CSS_COLORS.ink }).setOrigin(0, 0.5),
      ]);
    });

    const by = top + h - PANEL.pad - BUTTON.h / 2;
    OPTIONS.forEach((name, i) => {
      const x = cx + (i - 0.5) * (BUTTON.w + BUTTON.gap);
      const rect = new Phaser.Geom.Rectangle(x - BUTTON.w / 2, by - BUTTON.h / 2, BUTTON.w, BUTTON.h);
      const bg = scene.add.graphics();
      const label = scene.add.text(x, by, name, { fontFamily: FONT_BRUSH, fontSize: '30px', color: CSS_COLORS.ink }).setOrigin(0.5);
      this.container.add([bg, label]);
      this.buttons.push({ bg, label, rect });
    });
    this.container.add(
      scene.add
        .text(cx, top + h + 26, 'A / D 选择 · J 确定 · Esc / P 继续', { fontFamily: FONT_BRUSH, fontSize: '20px', color: CSS_COLORS.paper })
        .setOrigin(0.5)
        .setAlpha(0.8),
    );
    this.redraw();
    scene.input.keyboard!.on('keydown', this.onKey);
    scene.input.on('pointerdown', this.onPointer);
    scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.close());
  }

  get isOpen() {
    return !this.closed;
  }

  close() {
    if (this.closed) return;
    this.closed = true;
    this.scene.input.keyboard!.off('keydown', this.onKey);
    this.scene.input.off('pointerdown', this.onPointer);
    this.container.destroy();
  }

  private redraw() {
    this.buttons.forEach(({ bg, rect }, i) => {
      const on = i === this.index;
      bg.clear();
      bg.fillStyle(COLORS.paper, 1);
      bg.fillRect(rect.x, rect.y, rect.width, rect.height);
      bg.lineStyle(on ? 4 : 2, on ? COLORS.red : COLORS.ink);
      bg.strokeRect(rect.x, rect.y, rect.width, rect.height);
    });
  }

  private pick(i: number) {
    if (this.closed) return;
    sfx.play('ui-confirm');
    this.close();
    if (OPTIONS[i] === '继续') this.onResume();
    else this.onQuit();
  }

  private handleKey(e: KeyboardEvent) {
    if (this.closed || e.repeat || e.timeStamp <= this.openedAt) return;
    if (['KeyA', 'KeyW', 'ArrowLeft', 'ArrowUp', 'KeyD', 'KeyS', 'ArrowRight', 'ArrowDown'].includes(e.code)) {
      this.index = 1 - this.index;
      sfx.play('ui-move');
      this.redraw();
    } else if (['KeyJ', 'Space', 'Enter'].includes(e.code)) this.pick(this.index);
    else if (e.code === 'Escape' || e.code === 'KeyP') this.pick(0);
  }

  private handlePointer(p: Phaser.Input.Pointer) {
    const i = this.buttons.findIndex((b) => b.rect.contains(p.worldX, p.worldY));
    if (i >= 0) this.pick(i);
  }
}

/**
 * 把一行操作说明拆成 [键, 招] 一条条的：每条按第一个空格分开。
 * 调试用的判定框、暂停键本身不列（菜单就是按它打开的），末尾补上声音的键
 */
export function controlRows(hint: string): [string, string][] {
  const rows = hint
    .split(' · ')
    .map((s) => s.trim())
    .filter((s) => s && !s.startsWith('`') && !s.startsWith('Esc'))
    .map((s): [string, string] => {
      const at = s.indexOf(' ');
      return at < 0 ? [s, ''] : [s.slice(0, at), s.slice(at + 1)];
    });
  rows.push(['M', '静音　- / = 音量']);
  return rows;
}
