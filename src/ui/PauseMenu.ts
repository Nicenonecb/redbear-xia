import Phaser from 'phaser';
import { sfx } from '../audio/sfx';
import { COLORS, CSS_COLORS, FONT_BRUSH, GAME_HEIGHT, GAME_WIDTH } from '../config';
import { viewRect } from '../render/sharp';
import { CHEAT_ATTACK, CHEAT_SPEED } from '../game/run';

const PANEL = { w: 680, rowH: 40, pad: 36 };
const BUTTON = { w: 190, h: 58, gap: 26 };
/** 金手指的暗号题 */
export const CHEAT_QUESTION = '公司最帅的人是谁？';

/** 金手指开关：现在开没开、怎么开关 */
export interface CheatSwitch {
  on: boolean;
  set: (on: boolean) => void;
}

/**
 * 暂停菜单：压暗画面，正中一张宣纸，上面写着操作说明，下面三个选项（继续 / 金手指 / 返回标题）。
 * A/D、W/S 或方向键选，J / 空格 / 回车确定，Esc / P 直接继续；鼠标点也行。
 * 菜单开着时大地图整个停住（场景暂停），菜单本身画在界面层上。
 *
 * 金手指：先问一句"公司最帅的人是谁？"，填什么名字都算答对，开了以后气血无限、攻击 ×CHEAT_ATTACK、移速 ×CHEAT_SPEED；
 * 开着时这一项变成"关金手指"，点一下就关
 */
export class PauseMenu {
  private readonly container: Phaser.GameObjects.Container;
  private readonly buttons: { bg: Phaser.GameObjects.Graphics; label: Phaser.GameObjects.Text; rect: Phaser.Geom.Rectangle }[] = [];
  private readonly status: Phaser.GameObjects.Text;
  private index = 0;
  private closed = false;
  /** 问暗号的输入框开着时，菜单不接键盘、不接鼠标 */
  private asking: HTMLElement | null = null;
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
    private readonly cheat: CheatSwitch,
    private readonly onResume: () => void,
    private readonly onQuit: () => void,
  ) {
    this.container = scene.add.container(0, 0).setDepth(90);
    const rows = controlRows(hint);
    const cx = GAME_WIDTH / 2;
    const h = PANEL.pad * 2 + 70 + rows.length * PANEL.rowH + 44 + BUTTON.h;
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
    // 金手指开着时在按钮上面写一行
    this.status = scene.add
      .text(cx, top + h - PANEL.pad - BUTTON.h - 22, '', { fontFamily: FONT_BRUSH, fontSize: '22px', color: CSS_COLORS.red })
      .setOrigin(0.5);
    this.container.add(this.status);

    const by = top + h - PANEL.pad - BUTTON.h / 2;
    const labels = this.labels();
    labels.forEach((name, i) => {
      const x = cx + (i - (labels.length - 1) / 2) * (BUTTON.w + BUTTON.gap);
      const rect = new Phaser.Geom.Rectangle(x - BUTTON.w / 2, by - BUTTON.h / 2, BUTTON.w, BUTTON.h);
      const bg = scene.add.graphics();
      const label = scene.add.text(x, by, name, { fontFamily: FONT_BRUSH, fontSize: '28px', color: CSS_COLORS.ink }).setOrigin(0.5);
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
    this.closeAsk();
    this.scene.input.keyboard!.off('keydown', this.onKey);
    this.scene.input.off('pointerdown', this.onPointer);
    this.container.destroy();
  }

  private labels() {
    return ['继续', this.cheat.on ? '关金手指' : '金手指', '返回标题'];
  }

  private redraw() {
    const labels = this.labels();
    this.buttons.forEach(({ bg, label, rect }, i) => {
      const on = i === this.index;
      label.setText(labels[i]);
      bg.clear();
      bg.fillStyle(COLORS.paper, 1);
      bg.fillRect(rect.x, rect.y, rect.width, rect.height);
      bg.lineStyle(on ? 4 : 2, on ? COLORS.red : COLORS.ink);
      bg.strokeRect(rect.x, rect.y, rect.width, rect.height);
    });
    this.status.setText(this.cheat.on ? `金手指已开：气血无限 · 攻击 ×${CHEAT_ATTACK} · 移速 ×${CHEAT_SPEED}` : '');
  }

  private pick(i: number) {
    if (this.closed) return;
    sfx.play('ui-confirm');
    if (i === 1) {
      if (this.cheat.on) {
        this.cheat.set(false);
        this.cheat.on = false;
        this.redraw();
      } else this.ask();
      return;
    }
    this.close();
    if (i === 0) this.onResume();
    else this.onQuit();
  }

  /**
   * 弹一个网页输入框问暗号（要能打中文，只能用网页的输入框）。
   * 输入框里按的键不往下传，免得 WASD、J 被游戏当成操作
   */
  private ask() {
    if (this.asking) return;
    const box = document.createElement('div');
    box.dataset.cheatPrompt = '';
    Object.assign(box.style, {
      position: 'fixed',
      inset: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(26, 23, 20, 0.35)',
      zIndex: '10',
      fontFamily: FONT_BRUSH,
    });
    box.innerHTML = `
      <form style="background:${CSS_COLORS.paper};border:3px solid ${CSS_COLORS.ink};border-radius:12px;padding:28px 32px 24px;width:400px;max-width:calc(100vw - 32px);box-sizing:border-box;text-align:center;color:${CSS_COLORS.ink};box-shadow:0 8px 30px rgba(0,0,0,.35)">
        <div style="font-size:30px;margin-bottom:18px">${CHEAT_QUESTION}</div>
        <input name="who" autocomplete="off" maxlength="20" placeholder="写下名字"
          style="font:inherit;font-size:24px;width:100%;box-sizing:border-box;padding:8px 12px;border:2px solid ${CSS_COLORS.ink};border-radius:6px;background:#fbf7ee;color:${CSS_COLORS.ink};outline-color:${CSS_COLORS.red}">
        <div data-msg style="font-size:18px;color:${CSS_COLORS.red};height:24px;margin-top:8px"></div>
        <div style="display:flex;gap:16px;justify-content:center;margin-top:8px">
          <button type="submit" style="font:inherit;font-size:22px;padding:6px 26px;background:${CSS_COLORS.paper};border:3px solid ${CSS_COLORS.red};border-radius:4px;color:${CSS_COLORS.ink};cursor:pointer">确定</button>
          <button type="button" data-cancel style="font:inherit;font-size:22px;padding:6px 26px;background:${CSS_COLORS.paper};border:2px solid ${CSS_COLORS.ink};border-radius:4px;color:${CSS_COLORS.ink};cursor:pointer">取消</button>
        </div>
      </form>`;
    const form = box.querySelector('form')!;
    const input = box.querySelector('input')!;
    const msg = box.querySelector<HTMLElement>('[data-msg]')!;
    // 键盘只给输入框用（Phaser 听的是整个窗口的按键，这里拦下）；Esc 取消
    box.addEventListener('keydown', (e) => {
      e.stopPropagation();
      if (e.key === 'Escape') this.closeAsk();
    });
    box.addEventListener('keyup', (e) => e.stopPropagation());
    box.querySelector('[data-cancel]')!.addEventListener('click', () => this.closeAsk());
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // 写谁都算对，空着不行
      if (!input.value.trim()) {
        msg.textContent = '总得写个名字吧';
        input.focus();
        return;
      }
      this.closeAsk();
      sfx.play('ui-confirm');
      this.cheat.set(true);
      this.cheat.on = true;
      this.redraw();
    });
    document.body.appendChild(box);
    this.asking = box;
    input.focus();
  }

  private closeAsk() {
    this.asking?.remove();
    this.asking = null;
  }

  private handleKey(e: KeyboardEvent) {
    if (this.closed || this.asking || e.repeat || e.timeStamp <= this.openedAt) return;
    const n = this.buttons.length;
    if (['KeyA', 'KeyW', 'ArrowLeft', 'ArrowUp'].includes(e.code)) this.move(n - 1);
    else if (['KeyD', 'KeyS', 'ArrowRight', 'ArrowDown'].includes(e.code)) this.move(1);
    else if (['KeyJ', 'Space', 'Enter'].includes(e.code)) this.pick(this.index);
    else if (e.code === 'Escape' || e.code === 'KeyP') this.pick(0);
  }

  private move(step: number) {
    this.index = (this.index + step) % this.buttons.length;
    sfx.play('ui-move');
    this.redraw();
  }

  private handlePointer(p: Phaser.Input.Pointer) {
    if (this.asking) return;
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
