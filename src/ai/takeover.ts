import type Phaser from 'phaser';
import { startRun } from '../game/run';
import { clearSave, loadRun } from '../game/save';
import { MenuPilot, MenuPolicy, type MenuPolicyFile } from './menu';
import { aiControl, HandPilot } from './pilot';
import { HandPolicy, type PolicyFile } from './policy';

/**
 * "胖虎决策模型"代打：在画面右上角连点三下弹出询问，选"是"后由 AI 接管——
 * 大地图上是"手"（策略网络按键），弹窗和剧情翻页是"菜单头"。代打期间画面四周亮一圈淡紫色。
 * 再连点三下可以收回操控；主角倒下或打完结局回到标题时，代打自动结束。
 *
 * 权重随游戏一起发布在 public/ai/ 下，文件名带版本号；换版本时改这里的两个常量。
 */
const HAND_WEIGHTS = 'ai/xia-hand-v6.json';
const MENU_WEIGHTS = 'ai/xia-menu-v1.json';
const MODEL_NAME = '胖虎决策模型1.0';
/** 右上角热区边长（CSS 像素），三下要在 TRIPLE_MS 内点完 */
const HOT_SIZE = 84;
const TRIPLE_MS = 700;

const CSS = `
.xia-ai-glow{position:fixed;inset:0;pointer-events:none;z-index:20;opacity:0;transition:opacity .6s;
  box-shadow:inset 0 0 28px 6px rgba(196,160,255,.85),inset 0 0 90px 30px rgba(178,140,250,.38);
  animation:xia-ai-breathe 3.2s ease-in-out infinite}
.xia-ai-glow.on{opacity:1}
@keyframes xia-ai-breathe{50%{box-shadow:inset 0 0 36px 9px rgba(206,172,255,.95),inset 0 0 120px 40px rgba(178,140,250,.5)}}
.xia-ai-badge{position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:21;pointer-events:none;
  font:16px "Kaiti SC","STKaiti","KaiTi","楷体",serif;color:#4a2f7a;background:rgba(240,232,255,.88);
  border:1px solid rgba(160,120,230,.7);border-radius:999px;padding:3px 14px;letter-spacing:2px;opacity:0;transition:opacity .6s}
.xia-ai-badge.on{opacity:1}
.xia-ai-mask{position:fixed;inset:0;z-index:30;display:flex;align-items:center;justify-content:center;background:rgba(27,23,18,.45)}
.xia-ai-card{width:min(440px,calc(100vw - 32px));box-sizing:border-box;background:#efe7d6;color:#1b1712;border:2px solid #1b1712;
  border-radius:6px;box-shadow:0 0 0 4px #efe7d6,0 0 0 6px rgba(160,120,230,.8),0 12px 40px rgba(0,0,0,.35);
  padding:26px 26px 20px;font-family:"Kaiti SC","STKaiti","KaiTi","楷体",serif;text-align:center}
.xia-ai-card p{margin:0 0 22px;font-size:22px;line-height:1.6}
.xia-ai-card .row{display:flex;gap:14px;justify-content:center}
.xia-ai-card button{font:inherit;font-size:20px;min-width:110px;padding:8px 18px;border-radius:4px;cursor:pointer;
  border:2px solid #1b1712;background:#efe7d6;color:#1b1712}
.xia-ai-card button.yes{background:#6b4aa8;border-color:#4a2f7a;color:#fff}
.xia-ai-card button:focus-visible{outline:3px solid #b3261e;outline-offset:2px}
.xia-ai-card .err{color:#b3261e;font-size:16px;margin:-10px 0 14px}
`;

let policies: Promise<[HandPolicy, MenuPolicy]> | null = null;
function loadPolicies() {
  const get = (path: string) =>
    fetch(`${import.meta.env.BASE_URL}${path}`).then((r) => {
      if (!r.ok) throw new Error(`${path}: ${r.status}`);
      return r.json();
    });
  policies ??= Promise.all([get(HAND_WEIGHTS), get(MENU_WEIGHTS)]).then(
    ([h, m]) => [new HandPolicy(h as PolicyFile), new MenuPolicy(m as MenuPolicyFile)] as [HandPolicy, MenuPolicy],
  );
  policies.catch(() => (policies = null));
  return policies;
}

export function installTakeover(game: Phaser.Game) {
  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.append(style);
  const glow = Object.assign(document.createElement('div'), { className: 'xia-ai-glow' });
  const badge = Object.assign(document.createElement('div'), { className: 'xia-ai-badge', textContent: `${MODEL_NAME} · 代打中` });
  document.body.append(glow, badge);

  let dialog: HTMLElement | null = null;
  /** 这次代打是否已经离开过标题画面（离开过再回到标题 = 本局结束） */
  let leftTitle = false;

  const activeKeys = () => game.scene.getScenes(true).map((s) => s.scene.key);
  const setGlow = (on: boolean) => {
    glow.classList.toggle('on', on);
    badge.classList.toggle('on', on);
  };

  const stop = () => {
    aiControl.set(null, null);
    setGlow(false);
  };

  const begin = async (): Promise<void> => {
    const [hand, menu] = await loadPolicies();
    aiControl.set(new HandPilot(hand), new MenuPilot(menu));
    setGlow(true);
    const keys = activeKeys();
    leftTitle = !keys.includes('Title') && !keys.includes('Select');
    // 还在标题或选人：有存档就接着打存档，没有就选温少华开新局
    const title = game.scene.getScene('Title') as any;
    const from = keys.includes('Select') ? game.scene.getScene('Select') : keys.includes('Title') ? title : null;
    if (!from) return;
    const saved = keys.includes('Title') ? loadRun() : null;
    if (saved) return title.continueRun(saved);
    const run = startRun('wenShaohua', false);
    run.temporary = false;
    clearSave();
    from.scene.start('Intro');
  };

  // 本局结束（倒下或打完结局都会回到标题）就自动收回
  window.setInterval(() => {
    if (!aiControl.pilot) return;
    const keys = activeKeys();
    const atTitle = keys.includes('Title');
    if (!atTitle && keys.length) leftTitle = true;
    else if (atTitle && leftTitle) stop();
  }, 300);

  const close = () => {
    dialog?.remove();
    dialog = null;
  };

  const ask = () => {
    if (dialog) return;
    const on = !!aiControl.pilot;
    dialog = document.createElement('div');
    dialog.className = 'xia-ai-mask';
    dialog.innerHTML = `<div class="xia-ai-card" role="dialog" aria-modal="true">
      <p></p><div class="err" hidden></div>
      <div class="row"><button class="yes"></button><button class="no"></button></div></div>`;
    dialog.querySelector('p')!.textContent = on
      ? `${MODEL_NAME}正在代打。要收回操控，自己来吗？`
      : `你好，我是${MODEL_NAME}，您是否决定放弃思考，让我来代打？！`;
    const yes = dialog.querySelector<HTMLButtonElement>('.yes')!;
    const no = dialog.querySelector<HTMLButtonElement>('.no')!;
    const err = dialog.querySelector<HTMLElement>('.err')!;
    yes.textContent = on ? '收回操控' : '是';
    no.textContent = on ? '继续代打' : '否';
    yes.onclick = async () => {
      if (on) return stop(), close();
      yes.disabled = true;
      yes.textContent = '读取中…';
      try {
        await begin();
        close();
      } catch (e) {
        stop();
        err.hidden = false;
        err.textContent = `模型没读出来：${(e as Error).message}`;
        yes.disabled = false;
        yes.textContent = '再试一次';
      }
    };
    no.onclick = close;
    dialog.addEventListener('click', (e) => e.target === dialog && close());
    document.body.append(dialog);
    yes.focus();
  };

  // 弹窗开着时键盘只给弹窗（Esc 关、Enter 选当前按钮、左右切换），不让游戏收到按下；松开照常放行，免得卡键
  window.addEventListener(
    'keydown',
    (e) => {
      if (!dialog) return;
      e.stopImmediatePropagation();
      if (e.code === 'Escape') close();
      else if (['ArrowLeft', 'ArrowRight', 'KeyA', 'KeyD', 'Tab'].includes(e.code)) {
        e.preventDefault();
        const b = [...dialog.querySelectorAll('button')];
        b[(b.indexOf(document.activeElement as HTMLButtonElement) + 1) % b.length].focus();
      } else if (['Enter', 'Space', 'KeyJ'].includes(e.code)) {
        e.preventDefault();
        (document.activeElement as HTMLButtonElement | null)?.click?.();
      }
    },
    true,
  );

  // 右上角热区：在捕获阶段截住，游戏收不到这几下点击（标题画面"点一下开始"不会被误触）
  const parent = game.canvas.parentElement ?? document.body;
  let taps: number[] = [];
  const inHot = (e: MouseEvent | Touch) => {
    // 用画布露在窗口里的那部分的右上角（画布比窗口大、两边被裁掉时也点得到）
    const r = game.canvas.getBoundingClientRect();
    const right = Math.min(r.right, window.innerWidth),
      top = Math.max(r.top, 0);
    return e.clientX >= right - HOT_SIZE && e.clientX <= right && e.clientY >= top && e.clientY <= top + HOT_SIZE;
  };
  const swallow = (e: Event) => {
    const p = 'touches' in e ? (e as TouchEvent).changedTouches[0] : (e as MouseEvent);
    if (p && inHot(p)) {
      e.stopPropagation();
      e.preventDefault();
    }
  };
  for (const t of ['mousedown', 'mouseup', 'click', 'touchstart', 'touchend']) parent.addEventListener(t, swallow, { capture: true, passive: false });
  parent.addEventListener(
    'pointerdown',
    (e) => {
      if (!inHot(e)) return;
      e.stopPropagation();
      const now = performance.now();
      taps = [...taps.filter((t) => now - t < TRIPLE_MS), now];
      if (taps.length >= 3) {
        taps = [];
        ask();
      }
    },
    true,
  );
}
