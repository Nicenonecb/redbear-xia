import type Phaser from 'phaser';

/**
 * 程序合成的音效：用 WebAudio 现场合成，不需要音频文件。
 * 招式表里的 sfx 事件名、命中、捡铜钱、界面操作都到这里来要声音；没定义的名字直接忽略。
 * 总音量和静音存在浏览器本地，M 静音，- / = 调音量。
 */

type Synth = (s: Sfx, t: number) => void;

const SETTINGS_KEY = 'redbear.audio';
/** 同一个音效在这么短的时间里只响一次（一刀打中好几个人时不会叠成一声巨响） */
const MIN_GAP = 0.03;

export class Sfx {
  ctx: AudioContext | null = null;
  private game: Phaser.Game | null = null;
  private master: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private last = new Map<string, number>();
  private ambient: { stop(): void } | null = null;
  volume = 0.7;
  muted = false;

  constructor() {
    try {
      const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? '{}');
      if (typeof saved.volume === 'number') this.volume = saved.volume;
      if (typeof saved.muted === 'boolean') this.muted = saved.muted;
    } catch {
      // 本地存储不可用就用默认值
    }
  }

  /**
   * 借用 Phaser 的 AudioContext：它会在玩家第一次按键或点击时自动解锁。
   * Phaser 的声音管理器要等游戏启动后才有，所以这里只记下 game，第一次要出声时再接上
   */
  bind(game: Phaser.Game) {
    this.game = game;
  }

  private attach() {
    if (this.ctx || !this.game) return;
    const ctx = (this.game.sound as Phaser.Sound.WebAudioSoundManager | undefined)?.context as AudioContext | undefined;
    if (!ctx) return;
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.connect(ctx.destination);
    this.applyVolume();
    // 一秒白噪声，挥砍、风声都从这里滤出来
    this.noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = this.noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }

  play(name: string) {
    this.attach();
    const synth = SOUNDS[name];
    const ctx = this.ctx;
    if (!synth || !ctx || ctx.state !== 'running' || this.muted) return;
    const now = ctx.currentTime;
    if (now - (this.last.get(name) ?? -1) < MIN_GAP) return;
    this.last.set(name, now);
    synth(this, now);
  }

  setVolume(v: number) {
    this.volume = Math.min(1, Math.max(0, Math.round(v * 10) / 10));
    this.save();
  }

  toggleMute() {
    this.muted = !this.muted;
    this.save();
  }

  /** 竹林里的风声：一直响的滤波噪声，风势慢慢起伏，偶尔竹竿相碰"笃"一声 */
  startAmbient() {
    this.attach();
    const ctx = this.ctx;
    if (!ctx || !this.master || !this.noise || this.ambient) return;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 500;
    filter.Q.value = 0.6;
    const gain = ctx.createGain();
    gain.gain.value = 0.05;
    // 风势：两个很慢的低频振荡分别推着音色和音量
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoDepth = ctx.createGain();
    lfoDepth.gain.value = 260;
    lfo.connect(lfoDepth).connect(filter.frequency);
    const lfo2 = ctx.createOscillator();
    lfo2.frequency.value = 0.11;
    const lfo2Depth = ctx.createGain();
    lfo2Depth.gain.value = 0.025;
    lfo2.connect(lfo2Depth).connect(gain.gain);
    src.connect(filter).connect(gain).connect(this.master);
    src.start();
    lfo.start();
    lfo2.start();
    let knock = 0;
    const scheduleKnock = () => {
      knock = window.setTimeout(() => {
        this.play('bamboo-knock');
        scheduleKnock();
      }, 4000 + Math.random() * 6000);
    };
    scheduleKnock();
    this.ambient = {
      stop: () => {
        window.clearTimeout(knock);
        const t = ctx.currentTime;
        gain.gain.cancelScheduledValues(t);
        gain.gain.setTargetAtTime(0, t, 0.3);
        src.stop(t + 1.5);
        lfo.stop(t + 1.5);
        lfo2.stop(t + 1.5);
      },
    };
  }

  stopAmbient() {
    this.ambient?.stop();
    this.ambient = null;
  }

  // ---- 合成用的小积木 ----

  /** 一段滤过的噪声：挥砍、风、撞击的"沙"声 */
  noiseBurst(t: number, dur: number, opts: { type: BiquadFilterType; from: number; to?: number; q?: number; gain: number; attack?: number }) {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const filter = ctx.createBiquadFilter();
    filter.type = opts.type;
    filter.Q.value = opts.q ?? 1;
    filter.frequency.setValueAtTime(opts.from, t);
    if (opts.to) filter.frequency.exponentialRampToValueAtTime(opts.to, t + dur);
    const g = this.envelope(t, dur, opts.gain, opts.attack ?? 0.005);
    src.connect(filter).connect(g);
    src.start(t, Math.random() * 0.5, dur + 0.05);
  }

  /** 一个滑音：打击的"咚"、剑气的"铮"、钱币的"叮" */
  tone(t: number, dur: number, opts: { type: OscillatorType; from: number; to?: number; gain: number; attack?: number }) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = opts.type;
    osc.frequency.setValueAtTime(opts.from, t);
    if (opts.to) osc.frequency.exponentialRampToValueAtTime(opts.to, t + dur);
    const g = this.envelope(t, dur, opts.gain, opts.attack ?? 0.004);
    osc.connect(g);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }

  /** 快起慢落的音量包络，接到总音量上 */
  private envelope(t: number, dur: number, peak: number, attack: number) {
    const g = this.ctx!.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    g.connect(this.master!);
    return g;
  }

  private applyVolume() {
    if (this.master) this.master.gain.value = this.muted ? 0 : this.volume;
  }

  private save() {
    this.applyVolume();
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({ volume: this.volume, muted: this.muted }));
    } catch {
      // 存不了就算了，下次用默认值
    }
  }
}

/** 五声音阶（宫商角徵羽），升级、救场这类"好事"都用它，听着像古琴 */
const PENTATONIC = [523.25, 587.33, 659.25, 783.99, 880];

const SOUNDS: Record<string, Synth> = {
  // 挥砍：一道由低到高的风声
  swing: (s, t) => s.noiseBurst(t, 0.12, { type: 'bandpass', from: 1400, to: 3600, q: 1.4, gain: 0.35 }),
  'swing-light': (s, t) => s.noiseBurst(t, 0.1, { type: 'bandpass', from: 1600, to: 3200, q: 1.4, gain: 0.25 }),
  'swing-heavy': (s, t) => s.noiseBurst(t, 0.22, { type: 'bandpass', from: 500, to: 1600, q: 1, gain: 0.5 }),
  fan: (s, t) => s.noiseBurst(t, 0.1, { type: 'bandpass', from: 2400, to: 4200, q: 1.8, gain: 0.22 }),
  'fan-heavy': (s, t) => s.noiseBurst(t, 0.2, { type: 'bandpass', from: 1500, to: 4000, q: 1.2, gain: 0.35 }),
  claw: (s, t) => s.noiseBurst(t, 0.12, { type: 'bandpass', from: 900, to: 2600, q: 1, gain: 0.45 }),

  // 命中：一声闷"咚"加一点碎响；重击更低更长
  hit: (s, t) => {
    s.tone(t, 0.09, { type: 'sine', from: 180, to: 70, gain: 0.6 });
    s.noiseBurst(t, 0.06, { type: 'lowpass', from: 2600, gain: 0.35 });
  },
  'hit-heavy': (s, t) => {
    s.tone(t, 0.22, { type: 'sine', from: 120, to: 40, gain: 0.9 });
    s.noiseBurst(t, 0.15, { type: 'lowpass', from: 1800, to: 400, gain: 0.5 });
  },
  hurt: (s, t) => {
    s.tone(t, 0.12, { type: 'sawtooth', from: 320, to: 120, gain: 0.25 });
    s.tone(t, 0.14, { type: 'sine', from: 140, to: 60, gain: 0.6 });
  },

  dodge: (s, t) => s.noiseBurst(t, 0.16, { type: 'highpass', from: 2500, to: 6000, gain: 0.25 }),
  charge: (s, t) => s.tone(t, 0.45, { type: 'sine', from: 280, to: 840, gain: 0.12, attack: 0.08 }),
  // 剑气、掷扇：一声"铮"往下滑，带一道风
  'sword-qi': (s, t) => {
    s.tone(t, 0.3, { type: 'triangle', from: 1400, to: 300, gain: 0.25 });
    s.noiseBurst(t, 0.25, { type: 'bandpass', from: 3000, to: 900, q: 1.2, gain: 0.3 });
  },
  'fan-throw': (s, t) => {
    s.noiseBurst(t, 0.3, { type: 'bandpass', from: 1800, to: 2800, q: 3, gain: 0.25 });
    s.tone(t, 0.2, { type: 'triangle', from: 900, to: 600, gain: 0.1 });
  },
  dart: (s, t) => s.noiseBurst(t, 0.05, { type: 'highpass', from: 4000, gain: 0.25 }),
  knife: (s, t) => s.noiseBurst(t, 0.09, { type: 'bandpass', from: 3500, to: 2000, q: 2, gain: 0.25 }),

  // 胖虎和山贼头目
  growl: (s, t) => s.tone(t, 0.35, { type: 'sawtooth', from: 90, to: 70, gain: 0.18, attack: 0.05 }),
  heave: (s, t) => s.tone(t, 0.25, { type: 'sawtooth', from: 130, to: 95, gain: 0.15, attack: 0.03 }),
  dash: (s, t) => s.noiseBurst(t, 0.3, { type: 'lowpass', from: 900, to: 300, gain: 0.4 }),
  pounce: (s, t) => s.noiseBurst(t, 0.35, { type: 'bandpass', from: 600, to: 1500, q: 0.8, gain: 0.4 }),
  chop: (s, t) => SOUNDS['hit-heavy'](s, t),
  slam: (s, t) => {
    s.tone(t, 0.5, { type: 'sine', from: 70, to: 28, gain: 1 });
    s.noiseBurst(t, 0.4, { type: 'lowpass', from: 700, to: 120, gain: 0.6 });
  },
  'roar-charge': (s, t) => s.tone(t, 0.9, { type: 'sawtooth', from: 60, to: 110, gain: 0.12, attack: 0.4 }),
  roar: (s, t) => {
    s.tone(t, 0.9, { type: 'sawtooth', from: 150, to: 80, gain: 0.3, attack: 0.03 });
    s.tone(t, 0.9, { type: 'square', from: 152, to: 79, gain: 0.08, attack: 0.03 });
    s.noiseBurst(t, 0.8, { type: 'lowpass', from: 1200, to: 300, gain: 0.4 });
  },
  // 变身时水墨炸开
  burst: (s, t) => {
    s.tone(t, 0.8, { type: 'sine', from: 90, to: 25, gain: 1 });
    s.noiseBurst(t, 0.6, { type: 'lowpass', from: 3000, to: 200, gain: 0.7 });
  },
  // 小怪化墨散开
  ink: (s, t) => s.noiseBurst(t, 0.3, { type: 'lowpass', from: 1500, to: 300, gain: 0.2, attack: 0.02 }),

  coin: (s, t) => {
    s.tone(t, 0.12, { type: 'sine', from: 1568, gain: 0.12 });
    s.tone(t + 0.05, 0.16, { type: 'sine', from: 2093, gain: 0.1 });
  },
  levelup: (s, t) => PENTATONIC.forEach((f, i) => s.tone(t + i * 0.07, 0.5, { type: 'triangle', from: f, gain: 0.14 })),
  // 红熊救场：一声低沉的钟，再一串往上走的五声音
  rescue: (s, t) => {
    s.tone(t, 2.2, { type: 'sine', from: 110, gain: 0.5, attack: 0.01 });
    s.tone(t, 1.6, { type: 'sine', from: 277, gain: 0.15, attack: 0.01 });
    PENTATONIC.forEach((f, i) => s.tone(t + 0.4 + i * 0.12, 0.8, { type: 'triangle', from: f / 2, gain: 0.1 }));
  },
  death: (s, t) => s.tone(t, 1.2, { type: 'triangle', from: 330, to: 110, gain: 0.25 }),
  'bamboo-knock': (s, t) => {
    s.tone(t, 0.12, { type: 'sine', from: 620 + Math.random() * 200, to: 500, gain: 0.08 });
    s.tone(t + 0.09, 0.1, { type: 'sine', from: 700 + Math.random() * 200, to: 560, gain: 0.05 });
  },

  'ui-move': (s, t) => s.tone(t, 0.05, { type: 'triangle', from: 880, gain: 0.08 }),
  'ui-confirm': (s, t) => {
    s.tone(t, 0.08, { type: 'triangle', from: 659, gain: 0.12 });
    s.tone(t + 0.06, 0.14, { type: 'triangle', from: 988, gain: 0.12 });
  },
};

export const sfx = new Sfx();

/** 所有定义了的音效名，测试时用来核对招式表里写的名字都有声音 */
export const SOUND_NAMES = Object.keys(SOUNDS);
