import type { Action } from '../input/Controls';

/** 缓冲保留多少帧（12 帧 = 200ms） */
const BUFFER_FRAMES = 12;

/**
 * 输入缓冲：按下的键先记在这里，等招式进入可取消窗口或收招结束时再取用。
 * 玩家提前按下一招也不会被吞掉，连招能自动接上。
 */
export class InputBuffer {
  private entries: { action: Action; age: number }[] = [];

  constructor(readonly window = BUFFER_FRAMES) {}

  push(action: Action) {
    this.entries.push({ action, age: 0 });
  }

  /** 从最早按下的开始，取出第一个能用上的输入；accept 返回 undefined 表示这个输入现在用不上 */
  consume<T>(accept: (action: Action) => T | undefined): T | undefined {
    for (let i = 0; i < this.entries.length; i++) {
      const result = accept(this.entries[i].action);
      if (result !== undefined) {
        this.entries.splice(i, 1);
        return result;
      }
    }
    return undefined;
  }

  /** 每个逻辑帧调用一次。顿帧期间不调用，缓冲不会在顿帧里过期 */
  age() {
    for (const e of this.entries) e.age++;
    this.entries = this.entries.filter((e) => e.age <= this.window);
  }

  get pending(): readonly { action: Action; age: number }[] {
    return this.entries;
  }
}
