import type { Action } from '../input/Controls';
import { AI_ACTIONS, FEATURE_DIM, FEATURE_VERSION } from './features';

/**
 * 浏览器内的小型策略网络（MLP）前向推理，纯 TS，不依赖任何推理库。
 *
 * 权重文件格式（JSON，schema = "xia-hand-mlp-v1"），由训练侧导出：
 * {
 *   "schema": "xia-hand-mlp-v1",
 *   "version": "xia-hand-v1",            // 不可覆盖的版本标签
 *   "featureVersion": "xia-features-v1", // 必须与 FEATURE_VERSION 一致
 *   "inputDim": FEATURE_DIM,
 *   "actions": ["left", ...],            // 必须与 AI_ACTIONS 顺序一致
 *   "mean": [...], "std": [...],          // 可选：输入标准化，长度 inputDim
 *   "layers": [{ "in": n, "out": m, "w": "<base64 float32, 行优先 out×in>", "b": "<base64 float32, 长度 m>" }, ...],
 *   "activation": "relu",                 // 隐藏层激活；最后一层输出 logits
 *   "thresholds": [0.5, ...]              // 每个动作的 sigmoid 阈值
 * }
 */
export interface PolicyFile {
  schema: 'xia-hand-mlp-v1';
  version: string;
  featureVersion: string;
  inputDim: number;
  actions: string[];
  mean?: number[];
  std?: number[];
  layers: { in: number; out: number; w: string; b: string }[];
  activation: 'relu';
  thresholds: number[];
}

function decodeF32(b64: string): Float32Array {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Float32Array(bytes.buffer);
}

export class HandPolicy {
  readonly version: string;
  private readonly layers: { in: number; out: number; w: Float32Array; b: Float32Array }[];
  private readonly mean: Float32Array | null;
  private readonly invStd: Float32Array | null;
  private readonly thresholds: Float32Array;
  private readonly buffers: Float32Array[];

  constructor(file: PolicyFile) {
    if (file.schema !== 'xia-hand-mlp-v1') throw new Error(`unknown policy schema ${file.schema}`);
    if (file.featureVersion !== FEATURE_VERSION)
      throw new Error(`policy expects ${file.featureVersion}, game provides ${FEATURE_VERSION}`);
    if (file.inputDim !== FEATURE_DIM) throw new Error(`policy inputDim ${file.inputDim} != ${FEATURE_DIM}`);
    if (file.actions.join() !== AI_ACTIONS.join()) throw new Error('policy action order mismatch');
    if (file.activation !== 'relu') throw new Error(`unsupported activation ${file.activation}`);
    this.version = file.version;
    this.layers = file.layers.map((l, k) => {
      const w = decodeF32(l.w),
        b = decodeF32(l.b);
      if (w.length !== l.in * l.out || b.length !== l.out) throw new Error(`layer ${k} size mismatch`);
      return { in: l.in, out: l.out, w, b };
    });
    if (this.layers[0]?.in !== FEATURE_DIM) throw new Error('first layer input size mismatch');
    if (this.layers.at(-1)?.out !== AI_ACTIONS.length) throw new Error('last layer output size mismatch');
    for (let k = 1; k < this.layers.length; k++)
      if (this.layers[k].in !== this.layers[k - 1].out) throw new Error(`layer ${k} chain mismatch`);
    this.mean = file.mean ? Float32Array.from(file.mean) : null;
    this.invStd = file.std ? Float32Array.from(file.std, (s) => (s > 1e-6 ? 1 / s : 1)) : null;
    if (file.thresholds.length !== AI_ACTIONS.length) throw new Error('thresholds size mismatch');
    this.thresholds = Float32Array.from(file.thresholds);
    this.buffers = [new Float32Array(FEATURE_DIM), ...this.layers.map((l) => new Float32Array(l.out))];
  }

  static async load(url: string) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`policy fetch ${url}: ${res.status}`);
    return new HandPolicy((await res.json()) as PolicyFile);
  }

  /** 每个动作的 sigmoid 概率（顺序同 AI_ACTIONS） */
  probabilities(features: Float32Array): Float32Array {
    const x = this.buffers[0];
    for (let i = 0; i < FEATURE_DIM; i++) {
      const v = this.mean ? (features[i] - this.mean[i]) * this.invStd![i] : features[i];
      x[i] = v;
    }
    let input = x;
    for (let k = 0; k < this.layers.length; k++) {
      const { in: n, out: m, w, b } = this.layers[k];
      const y = this.buffers[k + 1];
      const last = k === this.layers.length - 1;
      for (let o = 0; o < m; o++) {
        let acc = b[o];
        const row = o * n;
        for (let j = 0; j < n; j++) acc += w[row + j] * input[j];
        y[o] = last ? 1 / (1 + Math.exp(-acc)) : acc > 0 ? acc : 0;
      }
      input = y;
    }
    return input;
  }

  /** 概率 → 本帧按住的键；左右、上下各最多一个（取概率高的那个） */
  decide(features: Float32Array): Action[] {
    const prob = this.probabilities(features);
    const on = AI_ACTIONS.map((_, k) => prob[k] >= this.thresholds[k]);
    if (on[0] && on[1]) on[prob[0] >= prob[1] ? 1 : 0] = false;
    if (on[2] && on[3]) on[prob[2] >= prob[3] ? 3 : 2] = false;
    return AI_ACTIONS.filter((_, k) => on[k]);
  }
}
