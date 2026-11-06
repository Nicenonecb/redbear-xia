import type { Action } from '../input/Controls';
import { extractFeatures } from './features';
import type { HandPolicy } from './policy';

/**
 * "看 AI 打"的操控方：大地图上每个逻辑帧调用一次 decide，由策略网络决定本帧按住哪些键。
 * 不回退到脚本：特征取不到（不在可操控状态）时什么都不按，并单独计数。
 */
export class HandPilot {
  private frame = 0;
  /** 由模型给出的逻辑帧决策数 */
  decisions = 0;
  /** 不可操控、未按任何键的逻辑帧数 */
  idleFrames = 0;
  /** 最近一次推理耗时（毫秒） */
  lastMs = 0;

  constructor(readonly policy: HandPolicy) {}

  decide(scene: unknown): Action[] {
    const t0 = performance.now();
    const features = extractFeatures(scene, this.frame++);
    if (!features) {
      this.idleFrames++;
      return [];
    }
    const actions = this.policy.decide(features);
    this.decisions++;
    this.lastMs = performance.now() - t0;
    return actions;
  }
}

let active: HandPilot | null = null;

/** 当前是否由 AI 操控大地图上的主角；null 表示玩家自己打 */
export const aiControl = {
  get pilot() {
    return active;
  },
  set(pilot: HandPilot | null) {
    active = pilot;
  },
};
