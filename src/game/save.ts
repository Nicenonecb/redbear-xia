import { CHAPTER1_ROOMS, CHAPTER1_STEPS } from './chapter1';
import type { RunState } from './run';

/**
 * 存档：只存"这一局走到了哪"。每走进一步自动存，死了或者通关就清掉（roguelike 的规矩）。
 * 存储走一层适配：网页版存浏览器本地；以后 Electron 桌面版换成写本地文件，只要换掉 store。
 */
export interface SaveStore {
  read(key: string): string | null;
  write(key: string, value: string): void;
  remove(key: string): void;
}

/** 网页版：浏览器本地存储；存不了（隐私模式等）就当没有存档 */
const browserStore: SaveStore = {
  read: (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  write: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // 存不了就算了
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // 同上
    }
  },
};

const KEY = 'redbear.run';
/** 存档格式变了就加一，旧存档会被忽略，不会读出错乱的数据 */
const VERSION = 1;

let store: SaveStore = browserStore;

export function useSaveStore(s: SaveStore) {
  store = s;
}

export function saveRun(run: RunState) {
  if (run.temporary) return;
  store.write(KEY, JSON.stringify({ version: VERSION, run }));
}

export function loadRun(): RunState | null {
  const raw = store.read(KEY);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    if (data?.version !== VERSION || !CHAPTER1_STEPS[data.run?.step]) return null;
    return data.run as RunState;
  } catch {
    return null;
  }
}

export function clearSave() {
  store.remove(KEY);
}

/** 标题画面上【继续】后面那一小行：走到哪了、用的谁 */
export function describeSave(run: RunState) {
  const step = CHAPTER1_STEPS[run.step];
  const where =
    step.kind === 'room' ? CHAPTER1_ROOMS[step.room].name : step.kind === 'shop' ? '任新野的茶摊' : step.kind === 'boss' ? '胖虎山寨' : '红熊的信';
  const who = run.hero === 'wenShaohua' ? '温少华' : '于无瑕';
  return `${who} · ${where} · 第 ${run.level} 重 · ${run.coins} 文`;
}
