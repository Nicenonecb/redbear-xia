import { runStats, type RunState } from '../game/run';
import type { ChoicePanel } from '../ui/ChoicePanel';

/**
 * AI 的"菜单头"：游戏暂停弹出选项面板（升级三选一、拔剑还是给钱、任新野的商店）时，
 * 由一个小网络在面板的选项里挑一个。和"手"一样跑在浏览器里，不需要 2B。
 *
 * 特征只看面板上玩家也能看到的东西：是哪种面板、每个选项是什么、能不能点、价钱，
 * 以及这一局的气血、铜钱、等级、属性、兵器。训练（导出老师的选择）和上线都只调用 menuFeatures。
 * 改动任何一项都必须升级 MENU_FEATURE_VERSION。
 */
export const MENU_FEATURE_VERSION = 'xia-menu-features-v1';
export const MENU_SLOTS = 5;

export const MENU_KINDS = ['levelUp', 'bribe', 'bribeAmount', 'shop', 'other'] as const;
export type MenuKind = (typeof MENU_KINDS)[number];

/** 选项类型：按标签里的关键词归类（同一类选项在不同面板、不同兵器名下含义相同） */
const OPTION_TYPES: [string, string[]][] = [
  ['attack', ['攻击']],
  ['vitality', ['气血']],
  ['agility', ['身法']],
  ['fight', ['拔剑']],
  ['pay', ['给钱', '给 ', '倾囊']],
  ['refine', ['强化']],
  ['weapon', ['购买']],
  ['potion', ['回复']],
  ['charm', ['护心符']],
  ['leave', ['告辞', '算了']],
];
const SLOT_KEYS = ['on', 'disabled', ...OPTION_TYPES.map(([t]) => `type.${t}`), 'type.other', 'price'];

const names: string[] = [];
const add = (prefix: string, keys: readonly string[]) => keys.forEach((k) => names.push(`${prefix}${k}`));
add('kind.', MENU_KINDS);
add('hero.', ['wenShaohua', 'yuWuxia']);
add('stage.', ['0', '1', '2', 'step']);
add('run.', ['hp', 'maxHp', 'coins', 'level', 'attack', 'vitality', 'agility', 'tier', 'refine', 'charmBought', 'heartCharm', 'pending']);
for (let k = 0; k < MENU_SLOTS; k++) add(`opt${k}.`, SLOT_KEYS);
export const MENU_FEATURE_NAMES: readonly string[] = names;
export const MENU_FEATURE_DIM = names.length;

/** 面板标题 → 面板种类（商店由场景决定） */
export function menuKind(title: string, inShop: boolean): MenuKind {
  if (inShop) return 'shop';
  if (title.includes('功力')) return 'levelUp';
  if (title.includes('拔剑')) return 'bribe';
  if (title.includes('给多少')) return 'bribeAmount';
  return 'other';
}

export interface MenuOption {
  label: string;
  detail?: string;
  disabled?: boolean;
}

/**
 * 一次菜单决策的特征。hp / maxHp 由调用方给：大地图上用主角当前气血（run.hp 只在离场时写回），
 * 商店里用 run.hp。
 */
export function menuFeatures(
  kind: MenuKind,
  options: readonly MenuOption[],
  run: RunState,
  hp: number,
  maxHp: number,
): Float32Array {
  const out = new Float32Array(MENU_FEATURE_DIM);
  let i = 0;
  const put = (v: number | boolean) => (out[i++] = typeof v === 'boolean' ? (v ? 1 : 0) : Number.isFinite(v) ? v : 0);
  for (const k of MENU_KINDS) put(kind === k);
  put(run.hero === 'wenShaohua');
  put(run.hero === 'yuWuxia');
  for (let k = 0; k < 3; k++) put(run.stage === k);
  put(run.step / 6);
  put(hp / Math.max(1, maxHp));
  put(maxHp / 300);
  put(Math.min(run.coins, 600) / 300);
  put(run.level / 20);
  put(run.stats.attack / 10);
  put(run.stats.vitality / 10);
  put(run.stats.agility / 10);
  put(run.weapon.tier / 3);
  put(run.weapon.refine / 5);
  put(!!run.charmBought);
  put(!!run.heartCharm);
  put(run.pendingLevelUps / 5);
  for (let k = 0; k < MENU_SLOTS; k++) {
    const o = options[k];
    if (!o) {
      i += SLOT_KEYS.length;
      continue;
    }
    put(1);
    put(!!o.disabled);
    const type = OPTION_TYPES.findIndex(([, words]) => words.some((w) => o.label.includes(w)));
    for (let t = 0; t < OPTION_TYPES.length; t++) put(type === t);
    put(type < 0);
    const price = /(\d+)\s*文/.exec(o.detail ?? '');
    put(price && !(o.detail ?? '').includes('身上') ? Number(price[1]) / 300 : 0);
  }
  if (i !== MENU_FEATURE_DIM) throw new Error(`menu feature size ${i} != ${MENU_FEATURE_DIM}`);
  return out;
}

/** 权重文件格式：与 HandPolicy 相同的层编码，输出是每个选项槽位的分数 */
export interface MenuPolicyFile {
  schema: 'xia-menu-mlp-v1';
  version: string;
  featureVersion: string;
  inputDim: number;
  slots: number;
  mean?: number[];
  std?: number[];
  layers: { in: number; out: number; w: string; b: string }[];
  activation: 'relu';
}

function decodeF32(b64: string): Float32Array {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let k = 0; k < bin.length; k++) bytes[k] = bin.charCodeAt(k);
  return new Float32Array(bytes.buffer);
}

export class MenuPolicy {
  readonly version: string;
  private readonly layers: { in: number; out: number; w: Float32Array; b: Float32Array }[];
  private readonly mean: Float32Array | null;
  private readonly invStd: Float32Array | null;

  constructor(file: MenuPolicyFile) {
    if (file.schema !== 'xia-menu-mlp-v1') throw new Error(`unknown menu policy schema ${file.schema}`);
    if (file.featureVersion !== MENU_FEATURE_VERSION)
      throw new Error(`menu policy expects ${file.featureVersion}, game provides ${MENU_FEATURE_VERSION}`);
    if (file.inputDim !== MENU_FEATURE_DIM) throw new Error(`menu policy inputDim ${file.inputDim} != ${MENU_FEATURE_DIM}`);
    if (file.slots !== MENU_SLOTS) throw new Error(`menu policy slots ${file.slots} != ${MENU_SLOTS}`);
    if (file.activation !== 'relu') throw new Error(`unsupported activation ${file.activation}`);
    this.version = file.version;
    this.layers = file.layers.map((l, k) => {
      const w = decodeF32(l.w),
        b = decodeF32(l.b);
      if (w.length !== l.in * l.out || b.length !== l.out) throw new Error(`menu layer ${k} size mismatch`);
      return { in: l.in, out: l.out, w, b };
    });
    if (this.layers[0]?.in !== MENU_FEATURE_DIM || this.layers.at(-1)?.out !== MENU_SLOTS)
      throw new Error('menu policy layer sizes mismatch');
    this.mean = file.mean ? Float32Array.from(file.mean) : null;
    this.invStd = file.std ? Float32Array.from(file.std, (s) => (s > 1e-6 ? 1 / s : 1)) : null;
  }

  /** 每个槽位的分数（未经 softmax） */
  scores(x: Float32Array): Float32Array {
    let input = Float32Array.from(x, (v, k) => (this.mean ? (v - this.mean[k]) * this.invStd![k] : v));
    for (let k = 0; k < this.layers.length; k++) {
      const { in: n, out: m, w, b } = this.layers[k];
      const y = new Float32Array(m);
      for (let o = 0; o < m; o++) {
        let acc = b[o];
        for (let j = 0; j < n; j++) acc += w[o * n + j] * input[j];
        y[o] = k === this.layers.length - 1 || acc > 0 ? acc : 0;
      }
      input = y;
    }
    return input;
  }

  /** 在存在且可点的选项里取分数最高的；都不可点时返回 -1 */
  decide(x: Float32Array, options: readonly MenuOption[]): number {
    const s = this.scores(x);
    let best = -1;
    for (let k = 0; k < Math.min(MENU_SLOTS, options.length); k++)
      if (!options[k].disabled && (best < 0 || s[k] > s[best])) best = k;
    return best;
  }
}

/** 一次菜单决策的记录（评测报告用） */
export interface MenuDecision {
  kind: MenuKind;
  title: string;
  pick: number;
  label: string;
  stage: number;
  step: number;
}

/**
 * 菜单操控方。面板出现后先停 THINK_FRAMES 帧（看 AI 打时能看清面板），再由网络挑选项。
 * 剧情翻页（书信、片头、结局）没有可选的东西，按固定节奏"按空格"，不经过网络。
 */
export class MenuPilot {
  static readonly THINK_FRAMES = 30;
  static readonly STORY_FRAMES = 60;
  readonly log: MenuDecision[] = [];
  private seen = new WeakMap<object, number>();

  constructor(readonly policy: MenuPolicy) {}

  /** 选项面板打开时每个逻辑帧调用一次；选中时返回 true */
  tickPanel(panel: ChoicePanel, run: RunState, hp: number, inShop: boolean): boolean {
    const n = (this.seen.get(panel) ?? 0) + 1;
    this.seen.set(panel, n);
    if (n < MenuPilot.THINK_FRAMES) return false;
    this.seen.set(panel, 0); // 商店面板选完不关，下一次再等一会儿
    const cfg = (panel as any).config as { title: string; options: MenuOption[] };
    const kind = menuKind(cfg.title, inShop);
    const maxHp = runStats(run).maxHp;
    const pick = this.policy.decide(menuFeatures(kind, cfg.options, run, hp, maxHp), cfg.options);
    if (pick < 0) return false;
    this.log.push({ kind, title: cfg.title, pick, label: cfg.options[pick].label, stage: run.stage, step: run.step });
    (panel as any).pick(pick);
    return true;
  }

  private storyFrames = new WeakMap<object, number>();
  /** 剧情场景每帧调用：到点就按一次空格翻页 */
  tickStory(scene: Phaser.Scene) {
    const n = (this.storyFrames.get(scene) ?? 0) + 1;
    this.storyFrames.set(scene, n % MenuPilot.STORY_FRAMES);
    if (n % MenuPilot.STORY_FRAMES === 0) scene.input.keyboard?.emit('keydown', { code: 'Space', repeat: false });
  }
}
