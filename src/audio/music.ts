import { sfx } from './sfx';

/**
 * 背景音乐：和音效一样用 WebAudio 现场合成，不需要音频文件。
 * 乐器：古筝（拨弦，起音带一点往下滑的按音）、笛子（带颤音和气声）、大鼓、木鱼、锣。
 * 曲子用简谱写：一个记号是一拍的一半（八分音符），"-" 延长上一个音，"0" 休止，
 * 高八度加 '，低八度加 ,；小节线 | 只为好读，解析时忽略。全部用五声音阶，听起来就是中国味。
 *
 * 用法：music.play('map') 切到某首（同一首不会重头放），music.stop() 淡出。
 * 以后有了正式配乐的音频文件，可以在这里换成播文件，场景里的调用不用改。
 */

export type TrackId = 'title' | 'map' | 'boss' | 'ending';

type Drum = 'B' | 'b' | 'k' | 'G';
interface Track {
  bpm: number;
  /** 简谱 1 的频率 */
  root: number;
  melody: string;
  /** 古筝伴奏：每小节一个根音（简谱），按 arp 的五声音阶级数往上琶音 */
  bass: string;
  arp: number[];
  /** 鼓：一个字符一个八分音符。B 大鼓重、b 大鼓轻、k 木鱼、G 锣、. 空 */
  drums?: string;
  melodyGain: number;
  pluckGain: number;
  /** 旋律用笛子还是古筝 */
  lead: 'flute' | 'zheng';
}

const D4 = 293.66;

const TRACKS: Record<TrackId, Track> = {
  // 标题、开场：悠远，笛子慢慢吹，古筝分解和弦
  title: {
    bpm: 66,
    root: D4,
    lead: 'flute',
    melodyGain: 0.16,
    pluckGain: 0.14,
    melody: `
      3 5 6 - 1' - 6 5 | 6 - - - - - 0 0 | 5 6 1' 2' 3' - 2' 1' | 2' - - - - - 0 0 |
      3' - 2' 1' 6 - 5 6 | 1' - 6 5 3 - 5 - | 6 5 3 2 1 - 2 3 | 5 - - - - - 0 0 |
      6 - 1' 6 5 - 3 5 | 6 - - - 0 0 0 0 | 1' - 2' 3' 5' - 3' 2' | 3' - - - - - 0 0 |
      2' - 1' 6 5 - 6 1' | 6 - 5 3 2 - 3 5 | 3 2 1 2 3 - 5 6 | 1' - - - - - 0 0`,
    bass: `1, 6,, 5,, 2, 1, 6,, 2, 5,, 6,, 1, 1, 6,, 5,, 2, 2, 1,`,
    arp: [0, 2, 4, 5, 7, 5, 4, 2],
  },
  // 地图探索：中速、轻快，木鱼打拍子，有点行走江湖的劲
  map: {
    bpm: 92,
    root: D4,
    lead: 'flute',
    melodyGain: 0.13,
    pluckGain: 0.12,
    melody: `
      5 6 1' - 6 5 3 5 | 6 - 5 - 3 - 0 0 | 2 3 5 - 6 5 3 2 | 1 - 2 - 3 - 0 0 |
      5 6 1' - 2' 1' 6 5 | 6 1' 2' - 3' - 0 0 | 2' 1' 6 - 5 6 3 5 | 2 - 3 - 1 - 0 0 |
      6, 1 2 - 3 5 3 2 | 1 - 6, - 5, - 0 0 | 6, 1 2 3 5 - 6 5 | 3 - - - 0 0 0 0 |
      5 - 6 1' 6 5 3 2 | 3 - 5 - 6 - 0 0 | 1' 6 5 3 2 3 5 6 | 1' - - - 0 0 0 0`,
    bass: `1, 6,, 5,, 1, 1, 2, 5,, 1, 6,, 1, 6,, 3, 1, 3, 2, 1,`,
    arp: [0, 2, 4, 2, 5, 4, 2, 4],
    drums: 'B.k.b.k.',
  },
  // Boss 战：快、紧，羽调式（以 6 为主音），战鼓密，每四小节一声锣
  boss: {
    bpm: 136,
    root: D4,
    lead: 'flute',
    melodyGain: 0.13,
    pluckGain: 0.13,
    melody: `
      6 - - 1' 7 6 5 6 | 3 - - - 6 - 0 0 | 6 - 1' 2' 3' - 2' 1' | 2' - 1' 7 6 - 0 0 |
      3' - - 2' 1' - 7 6 | 5 6 1' - 7 6 5 3 | 6 - 5 3 2 3 5 6 | 6 - - - 0 0 0 0 |
      6' - 5' 3' 2' - 3' 5' | 3' - - - 0 0 6 1' | 2' - 3' 2' 1' 7 6 5 | 6 - - - 0 0 6 7 |
      1' - 7 6 5 - 3 5 | 6 - 1' - 2' - 3' - | 2' 1' 7 6 5 6 7 5 | 6 - - - 0 0 0 0`,
    bass: `6,, 6,, 4,, 5,, 6,, 3,, 4,, 6,, 6,, 6,, 2, 6,, 4,, 5,, 5,, 6,,`,
    arp: [0, 0, 2, 0, 3, 0, 2, 4],
    drums: 'BkbBkbBk',
  },
  // 过关的信、结局：温暖、慢，古筝独奏
  ending: {
    bpm: 60,
    root: D4,
    lead: 'zheng',
    melodyGain: 0.2,
    pluckGain: 0.11,
    melody: `
      1' - 6 5 6 - 1' - | 2' - - - 3' 2' 1' 6 | 5 - 6 - 1' - 6 5 | 3 - - - - - 0 0 |
      5 - 6 1' 2' - 1' 2' | 3' - 2' 1' 6 - 5 - | 6 5 3 5 6 - 1' 6 | 1' - - - - - 0 0`,
    bass: `1, 2, 5,, 3, 1, 6,, 5,, 1,`,
    arp: [0, 2, 4, 7, 4, 2, 4, 5],
  },
};

/** 简谱级数 → 半音：1 2 3 4 5 6 7 */
const DEGREE = [0, 2, 4, 5, 7, 9, 11];
/** 五声音阶（1 2 3 5 6）里的半音位置，琶音按这个往上数 */
const PENTA = [0, 2, 4, 7, 9];

/** 一个简谱记号 → 相对于 1 的半音数 */
function semitone(token: string) {
  const deg = Number(token[0]);
  const octave = (token.match(/'/g)?.length ?? 0) - (token.match(/,/g)?.length ?? 0);
  return DEGREE[deg - 1] + 12 * octave;
}

interface Note {
  step: number;
  len: number;
  semi: number;
}

/** 把简谱解析成音符：每个记号一个八分音符，"-" 延长、"0" 休止 */
function parse(src: string): { notes: Note[]; steps: number } {
  const tokens = src.split(/\s+/).filter((t) => t && t !== '|');
  const notes: Note[] = [];
  tokens.forEach((t, i) => {
    if (t === '-') {
      if (notes.length) notes[notes.length - 1].len++;
    } else if (t === '0') {
      notes.push({ step: i, len: 0, semi: NaN });
    } else notes.push({ step: i, len: 1, semi: semitone(t) });
  });
  return { notes: notes.filter((n) => n.len > 0), steps: tokens.length };
}

/** 五声音阶里从 base 往上数 n 级 */
function pentaUp(baseSemi: number, n: number) {
  // 先把根音落到最近的五声音阶位置上
  const oct = Math.floor(baseSemi / 12);
  const within = ((baseSemi % 12) + 12) % 12;
  let idx = PENTA.findIndex((p) => p >= within);
  if (idx < 0) idx = 0;
  const total = idx + n;
  return 12 * (oct + Math.floor(total / 5)) + PENTA[((total % 5) + 5) % 5];
}

const freq = (root: number, semi: number) => root * Math.pow(2, semi / 12);

interface Playing {
  id: TrackId;
  out: GainNode;
  timer: number;
  stop(): void;
}

class Music {
  private current: Playing | null = null;
  private wanted: TrackId | null = null;
  private retry = 0;

  play(id: TrackId) {
    this.wanted = id;
    if (this.current?.id === id) return;
    this.current?.stop();
    this.current = null;
    this.start();
  }

  stop() {
    this.wanted = null;
    window.clearTimeout(this.retry);
    this.current?.stop();
    this.current = null;
  }

  /** 声音要等玩家第一次按键才能解锁，没解锁就隔一会儿再试 */
  private start() {
    window.clearTimeout(this.retry);
    const id = this.wanted;
    if (!id) return;
    const bus = sfx.bus();
    if (!bus || bus.ctx.state !== 'running') {
      this.retry = window.setTimeout(() => this.start(), 300);
      return;
    }
    this.current = this.begin(id, bus.ctx, bus.master, bus.noise);
  }

  private begin(id: TrackId, ctx: AudioContext, master: GainNode, noise: AudioBuffer): Playing {
    const track = TRACKS[id];
    const melody = parse(track.melody);
    const bass = track.bass.split(/\s+/).filter(Boolean).map(semitone);
    const stepDur = 60 / track.bpm / 2;
    const loopSteps = melody.steps;

    const out = ctx.createGain();
    out.gain.value = 0;
    out.gain.setTargetAtTime(1, ctx.currentTime, 0.4);
    // 一点点延迟回声，像在山谷里
    const delay = ctx.createDelay(1);
    delay.delayTime.value = stepDur * 3;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.22;
    const wet = ctx.createGain();
    wet.gain.value = 0.3;
    const send = ctx.createGain();
    send.connect(delay).connect(feedback).connect(delay);
    delay.connect(wet).connect(out);
    out.connect(master);
    const dest = { dry: out, send };

    let step = 0;
    let next = ctx.currentTime + 0.1;
    const byStep = new Map<number, Note>();
    melody.notes.forEach((n) => byStep.set(n.step, n));

    const schedule = () => {
      // 标签页切走后定时器会变慢，落后太多就从现在接着放，不补放
      if (next < ctx.currentTime - 0.2) next = ctx.currentTime + 0.05;
      while (next < ctx.currentTime + 0.4) {
        const s = step % loopSteps;
        const bar = Math.floor(s / 8);
        const beat = s % 8;
        const t = next;
        const note = byStep.get(s);
        if (note) {
          const f = freq(track.root, note.semi);
          if (track.lead === 'flute') flute(ctx, noise, dest, t, f, note.len * stepDur, track.melodyGain);
          else zheng(ctx, dest, t, f, Math.max(1.2, note.len * stepDur * 1.5), track.melodyGain);
        }
        const root = bass[bar % bass.length];
        // 古筝伴奏：低一个八度的琶音，小节第一拍加一个低音
        const arpSemi = pentaUp(root, track.arp[beat]);
        zheng(ctx, dest, t, freq(track.root, arpSemi), 1.4, track.pluckGain * (beat === 0 ? 1 : 0.7));
        if (beat === 0) zheng(ctx, dest, t, freq(track.root, root - 12), 2.4, track.pluckGain * 1.2);
        if (track.drums) {
          let hit = track.drums[beat] as Drum | '.';
          if (id === 'boss' && beat === 0 && bar % 4 === 0) hit = 'G';
          if (hit !== '.') drum(ctx, noise, dest, t, hit);
          if (hit === 'G') drum(ctx, noise, dest, t, 'B');
        }
        step++;
        next += stepDur;
      }
    };
    schedule();
    const timer = window.setInterval(schedule, 100);
    return {
      id,
      out,
      timer,
      stop: () => {
        window.clearInterval(timer);
        const t = ctx.currentTime;
        out.gain.cancelScheduledValues(t);
        out.gain.setTargetAtTime(0, t, 0.35);
        window.setTimeout(() => out.disconnect(), 2500);
      },
    };
  }
}

interface Dest {
  dry: AudioNode;
  send: AudioNode;
}

/** 古筝：三角波 + 锯齿波，滤波器从亮到暗收，起音往下滑一点（按音的味道） */
function zheng(ctx: AudioContext, dest: Dest, t: number, f: number, dur: number, peak: number) {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + 0.004);
  g.gain.exponentialRampToValueAtTime(peak * 0.35, t + 0.18);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.Q.value = 2;
  lp.frequency.setValueAtTime(Math.min(9000, f * 9), t);
  lp.frequency.exponentialRampToValueAtTime(Math.max(300, f * 1.8), t + 0.5);
  const a = ctx.createOscillator();
  a.type = 'triangle';
  const b = ctx.createOscillator();
  b.type = 'sawtooth';
  const bg = ctx.createGain();
  bg.gain.value = 0.25;
  for (const o of [a, b]) {
    o.frequency.setValueAtTime(f * 1.012, t);
    o.frequency.exponentialRampToValueAtTime(f, t + 0.06);
  }
  a.connect(lp);
  b.connect(bg).connect(lp);
  lp.connect(g);
  g.connect(dest.dry);
  g.connect(dest.send);
  a.start(t);
  b.start(t);
  a.stop(t + dur + 0.05);
  b.stop(t + dur + 0.05);
}

/** 笛子：正弦为主，叠一点三角波，长音慢慢起颤音，起音有一口气声 */
function flute(ctx: AudioContext, noise: AudioBuffer, dest: Dest, t: number, f: number, dur: number, peak: number) {
  const end = t + dur;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + 0.06);
  g.gain.setValueAtTime(peak, Math.max(t + 0.06, end - 0.08));
  g.gain.exponentialRampToValueAtTime(0.0001, end + 0.12);
  const o = ctx.createOscillator();
  o.type = 'sine';
  // 起音从下面滑上来一点
  o.frequency.setValueAtTime(f * 0.97, t);
  o.frequency.exponentialRampToValueAtTime(f, t + 0.05);
  const o2 = ctx.createOscillator();
  o2.type = 'triangle';
  o2.frequency.value = f * 2;
  const o2g = ctx.createGain();
  o2g.gain.value = 0.12;
  // 颤音：长音过了 0.3 秒才慢慢颤起来
  const vib = ctx.createOscillator();
  vib.frequency.value = 5.2;
  const vibDepth = ctx.createGain();
  vibDepth.gain.setValueAtTime(0, t);
  if (dur > 0.4) vibDepth.gain.linearRampToValueAtTime(f * 0.012, t + Math.min(dur, 0.9));
  vib.connect(vibDepth);
  vibDepth.connect(o.frequency);
  vibDepth.connect(o2.frequency);
  o.connect(g);
  o2.connect(o2g).connect(g);
  // 气声
  const breath = ctx.createBufferSource();
  breath.buffer = noise;
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = f * 2;
  bp.Q.value = 1.5;
  const bg = ctx.createGain();
  bg.gain.setValueAtTime(0.0001, t);
  bg.gain.exponentialRampToValueAtTime(peak * 0.35, t + 0.03);
  bg.gain.exponentialRampToValueAtTime(peak * 0.05, t + 0.15);
  bg.gain.exponentialRampToValueAtTime(0.0001, end + 0.1);
  breath.connect(bp).connect(bg).connect(g);
  g.connect(dest.dry);
  g.connect(dest.send);
  for (const n of [o, o2, vib]) {
    n.start(t);
    n.stop(end + 0.2);
  }
  breath.start(t, Math.random() * 0.5);
  breath.stop(end + 0.2);
}

/** 打击乐：大鼓（正弦往下掉音高）、木鱼（短促的带通）、锣（一团噪声加几个不协和泛音，拖得很长） */
function drum(ctx: AudioContext, noise: AudioBuffer, dest: Dest, t: number, kind: Drum) {
  const g = ctx.createGain();
  g.connect(dest.dry);
  if (kind === 'B' || kind === 'b') {
    const peak = kind === 'B' ? 0.5 : 0.28;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(130, t);
    o.frequency.exponentialRampToValueAtTime(48, t + 0.25);
    g.gain.setValueAtTime(peak, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
    o.connect(g);
    o.start(t);
    o.stop(t + 0.65);
    // 鼓皮的“咚”里带一点噪声
    const n = ctx.createBufferSource();
    n.buffer = noise;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 600;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(peak * 0.4, t);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
    n.connect(lp).connect(ng).connect(dest.dry);
    n.start(t, Math.random() * 0.5);
    n.stop(t + 0.1);
  } else if (kind === 'k') {
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = 820;
    g.gain.setValueAtTime(0.12, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
    o.connect(g);
    o.start(t);
    o.stop(t + 0.08);
  } else {
    // 锣
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.2, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 3.2);
    const n = ctx.createBufferSource();
    n.buffer = noise;
    n.loop = true;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(1800, t);
    bp.frequency.exponentialRampToValueAtTime(500, t + 2.5);
    bp.Q.value = 0.8;
    n.connect(bp).connect(g);
    n.start(t);
    n.stop(t + 3.3);
    for (const [f, a] of [
      [220, 0.5],
      [331, 0.35],
      [467, 0.25],
    ]) {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(f * 1.03, t);
      o.frequency.exponentialRampToValueAtTime(f, t + 0.4);
      const og = ctx.createGain();
      og.gain.value = a;
      o.connect(og).connect(g);
      o.start(t);
      o.stop(t + 3.3);
    }
    g.connect(dest.send);
  }
}

export const music = new Music();
