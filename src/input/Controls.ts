import Phaser from 'phaser';

/**
 * 游戏动作。逻辑层只认动作，不认具体按键，
 * 以后接手柄只需要在这里加一组绑定。
 */
export type Action = 'left' | 'right' | 'jump' | 'attack' | 'special' | 'dodge' | 'throw';

const KEYBOARD_BINDINGS: Record<Action, string[]> = {
  left: ['A', 'LEFT'],
  right: ['D', 'RIGHT'],
  jump: ['W', 'SPACE', 'UP'],
  attack: ['J'],
  special: ['K'],
  dodge: ['L', 'SHIFT'],
  throw: ['I'],
};

const ACTIONS = Object.keys(KEYBOARD_BINDINGS) as Action[];

export class Controls {
  private readonly keys: Record<Action, Phaser.Input.Keyboard.Key[]>;
  private down = new Set<Action>();
  private pressed = new Set<Action>();
  private released = new Set<Action>();

  constructor(scene: Phaser.Scene) {
    const keyboard = scene.input.keyboard!;
    this.keys = {} as Record<Action, Phaser.Input.Keyboard.Key[]>;
    for (const action of ACTIONS) {
      this.keys[action] = KEYBOARD_BINDINGS[action].map((code) => keyboard.addKey(code));
    }
  }

  /** 每帧在场景 update 开头调用一次，刷新本帧的按下 / 松开状态。 */
  update() {
    const prev = this.down;
    this.down = new Set(ACTIONS.filter((a) => this.keys[a].some((k) => k.isDown)));
    this.pressed = new Set([...this.down].filter((a) => !prev.has(a)));
    this.released = new Set([...prev].filter((a) => !this.down.has(a)));
  }

  isDown(action: Action) {
    return this.down.has(action);
  }

  /** 本帧刚按下 */
  justPressed(action: Action) {
    return this.pressed.has(action);
  }

  /** 本帧刚按下的全部动作，用来喂输入缓冲 */
  get justPressedActions(): ReadonlySet<Action> {
    return this.pressed;
  }

  /** 本帧刚松开（用于蓄力招式） */
  justReleased(action: Action) {
    return this.released.has(action);
  }

  /** 水平方向：-1 左，0 不动，1 右 */
  get moveX() {
    return (this.isDown('right') ? 1 : 0) - (this.isDown('left') ? 1 : 0);
  }
}
