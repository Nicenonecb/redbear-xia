import type Phaser from 'phaser';
import type { Action } from '../input/Controls';
import { autoPlayer } from './autoPlayer';

/**
 * 开发用的逐帧测试工具，只在 npm run dev 时装到 window 上，打包后不存在。
 * 在浏览器控制台里可以停掉游戏循环、按住指定按键逐帧推进，把整局打法写成脚本来测：
 *
 *   __t.go('PangHu')                        // 切到某个场景
 *   __t.run([[60, ['right']], [2, ['attack']], [30, []]], s => s.player.hp)
 *                                           // 每段按住哪些键、推进多少帧，返回每帧的探针结果
 *   __t.drive(3000, (s, f) => [...])         // 每帧现场决定按什么键，写个简单 AI 替玩家打
 *   __t.drive(3000, __t.autoPlayer(0.75))    // 用自带的自动打法（会失手的普通玩家）
 *   __t.fast = true                         // 只跑逻辑不画画面，模拟整章时用
 *   __t.wake()                              // 恢复正常运行
 */
type Script = [frames: number, held: Action[]][];

export function installDevHarness(game: Phaser.Game) {
  let time = performance.now();
  let current = '';

  /** fast 为 true 时只跑逻辑不画画面，跑整章模拟时快很多 */
  const step = () => {
    time += 1000 / 60;
    // Phaser's tweens use wall time; frame driving must advance them by the same fixed delta.
    const managers = game.scene.getScenes(true).map(s => s.tweens as unknown as { getDelta: (tick: boolean) => number });
    const originals = managers.map(m => m.getDelta);
    managers.forEach(m => m.getDelta = () => 1000 / 60);
    try {
      if (harness.fast) game.headlessStep(time, 1000 / 60);
      else game.step(time, 1000 / 60);
    } finally { managers.forEach((m, i) => m.getDelta = originals[i]); }
  };

  const scene = () => (game.scene.getScenes(true).find(s => s.scene.key !== 'UI') ?? game.scene.getScene(current)) as Phaser.Scene & Record<string, any>;

  const harness = {
    fast: false,
    autoPlayer,
    step,
    scene,
    sleep: () => game.loop.sleep(),
    wake: () => game.loop.wake(),
    /** 图片还在加载时别切场景，不然启动场景一停，没加载完的图就都丢了 */
    get ready() {
      return !game.scene.isActive('Boot');
    },
    /** 切到某个场景并停掉自动循环；data 会原样传给场景 */
    go(key: string, data?: object) {
      if (!harness.ready) throw new Error('图片还在加载，等 __t.ready 为 true 再切场景');
      game.loop.sleep();
      const from = game.scene.getScenes(true)[0] ?? game.scene.getScene('Title');
      current = key;
      from.scene.start(key, data);
      for (let i = 0; i < 3; i++) step();
      return scene();
    },
    /** 按脚本逐帧推进；probe 每帧调用一次，结果按帧返回 */
    run<T>(script: Script, probe: (s: ReturnType<typeof scene>) => T = () => undefined as T) {
      const s = scene();
      const keys = s.controls.keys as Record<Action, Phaser.Input.Keyboard.Key[]>;
      const out: T[] = [];
      for (const [frames, held] of script) {
        for (let i = 0; i < frames; i++) {
          // 一个键可能绑在几个动作上（W 既是上又是跳），先全松开再按下要按的，免得互相覆盖
          for (const a of Object.keys(keys) as Action[]) keys[a].forEach((k) => (k.isDown = false));
          for (const a of held) keys[a].forEach((k) => (k.isDown = true));
          step();
          out.push(probe(s));
        }
      }
      for (const a of Object.keys(keys) as Action[]) keys[a].forEach((k) => (k.isDown = false));
      return out;
    },
    /** 每帧由 decide 现场决定按哪些键（写个简单的 AI 替玩家打），直到 until 返回 true 或帧数用完 */
    drive<T>(
      maxFrames: number,
      decide: (s: ReturnType<typeof scene>, frame: number) => Action[],
      until: (s: ReturnType<typeof scene>) => boolean = () => false,
      probe: (s: ReturnType<typeof scene>) => T = () => undefined as T,
    ) {
      const out: T[] = [];
      let keys: Record<string, Phaser.Input.Keyboard.Key[]> = {};
      for (let f = 0; f < maxFrames; f++) {
        const s = scene();
        if (until(s)) break;
        Object.values(keys).flat().forEach(k => k.isDown = false);
        keys = s.controls?.keys ?? {};
        const held = decide(s, f);
        Object.values(keys).flat().forEach(k => k.isDown = false);
        for (const a of held) keys[a]?.forEach(k => k.isDown = true);
        step();
        out.push(probe(scene()));
      }
      Object.values(keys).flat().forEach(k => k.isDown = false);
      return out;
    },
    /** 把逐帧结果压缩成"有变化的那几帧" */
    changes<T extends object>(out: T[], keys: (keyof T)[]) {
      return out
        .map((o, i) => ({ i, o }))
        .filter(({ o, i }) => i === 0 || keys.some((k) => o[k] !== out[i - 1][k]))
        .map(({ i, o }) => `#${i} ` + Object.entries(o).map(([k, v]) => `${k}:${v}`).join(' '));
    },
  };

  Object.assign(window, { __t: harness });
}
