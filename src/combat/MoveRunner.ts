import type { Action } from '../input/Controls';
import { inRange, totalFrames, type MoveDef, type MoveEvent, type MoveId, type MovePhase } from './moveTable';

/** 按招式表逐帧播放一招：记录当前帧号，到了收招最后一帧就结束。 */
export class MoveRunner {
  move: MoveDef | null = null;
  frame = 0;
  /** 蓄力比例 0~1，由蓄力招松手时传给下一招 */
  charge = 0;
  /** 蓄力招已经按住的帧数 */
  heldFrames = 0;
  /** 本招已经打中过的目标，同一招对同一目标只结算一次 */
  readonly hitTargets = new Set<object>();

  start(move: MoveDef, charge = 0): MoveEvent[] {
    this.move = move;
    this.frame = 0;
    this.charge = charge;
    this.heldFrames = 0;
    this.hitTargets.clear();
    return this.eventsAt(0);
  }

  /** 推进一帧，返回进入新一帧时触发的事件 */
  advance(): MoveEvent[] {
    const move = this.move;
    if (!move) return [];
    // 蓄力招放完起势后停在最后一帧，等松手
    if (move.hold && this.frame >= move.startup - 1) return [];
    this.frame++;
    if (this.frame >= totalFrames(move)) {
      this.move = null;
      return [];
    }
    return this.eventsAt(this.frame);
  }

  get phase(): MovePhase | null {
    if (!this.move) return null;
    const { startup, active } = this.move;
    if (this.frame < startup) return 'startup';
    return this.frame < startup + active ? 'active' : 'recovery';
  }

  /** 当前帧按下 action 能取消成哪一招 */
  cancelInto(action: Action): MoveId | undefined {
    return this.move?.cancels?.find((c) => c.action === action && inRange(this.frame, c))?.into;
  }

  private eventsAt(frame: number) {
    return this.move?.events?.filter((e) => e.frame === frame) ?? [];
  }
}
