import Phaser from 'phaser';
import { COLORS } from '../config';
import type { RoomDef, SpawnDef } from '../game/chapter1';
import type { MapArea, Pt } from './chapter1Map';
import { placeMapArt } from './mapArt';
import { AREA_INSET, WALK_MARGIN, type WalkableMap } from './walkable';

/** 上一波清完后隔多少帧刷下一波 */
const WAVE_GAP = 50;
/** 竹篱升起、落下要多久（毫秒） */
const FENCE_MS = 320;
/** 刷出来的山贼离篱笆多远（往空地里面） */
const SPAWN_INSET = 80;

/** 石板路穿过空地边界的地方：篱笆就扎在这里，横着拦住路 */
interface Gate {
  at: Pt;
  /** 路在这里的走向（单位向量，朝空地里面） */
  inward: Pt;
}

/**
 * 一场遭遇战：走进空地，两头路口的竹篱一齐升起把路拦住，山贼一波一波从路口杀进来，
 * 清完最后一波篱笆落下，路又通了。哪一波从哪个路口来，照横版战斗房的安排：
 * side 为 right 的从前面（往山寨去的路口）来，left 的从身后（来时的路口）来。
 */
export class Encounter {
  state: 'idle' | 'fighting' | 'cleared';
  wave = 0;
  private timer = 0;
  private readonly gates: Gate[];
  private readonly g: Phaser.GameObjects.Graphics[];
  /** 篱笆升起的程度 0~1 */
  private raise = 0;
  private raiseTarget = 0;
  private readonly stakes: { off: number; h: number; lean: number }[] = [];
  /** 有竹篱笆的图（prop_fence_h）就用图，每个路口一段，升起时从地里长出来 */
  private readonly fenceArt: { img: Phaser.GameObjects.Image; scaleY: number }[] = [];

  constructor(
    scene: Phaser.Scene,
    readonly area: MapArea,
    readonly room: RoomDef,
    private readonly walk: WalkableMap,
    path: Pt[],
    cleared: boolean,
  ) {
    this.state = cleared ? 'cleared' : 'idle';
    this.gates = findGates(path, area);
    this.g = this.gates.map((gt) => scene.add.graphics().setDepth(gt.at.y));
    const rng = new Phaser.Math.RandomDataGenerator([area.id]);
    const half = walk.pathWidth / 2 + WALK_MARGIN + 30;
    for (let off = -half; off <= half; off += 17) {
      this.stakes.push({ off: off + rng.realInRange(-3, 3), h: rng.realInRange(80, 112), lean: rng.realInRange(-0.06, 0.06) });
    }
    for (const gate of this.gates) {
      // 篱笆要和路垂直地拦着：路差不多竖着走时用横着的那段（prop_fence_h），
      // 斜着走时用斜着往画面里延伸的那段（prop_fence_v），方向不对就左右翻过来。图不旋转，旋转了透视就不对了
      const side = { x: -gate.inward.y, y: gate.inward.x };
      const flat = Math.abs(side.y) < Math.abs(side.x) * 0.45;
      const art = flat
        ? placeMapArt(scene, 'prop_fence_h', gate.at.x, gate.at.y, half * 2 + 40)
        : placeMapArt(scene, 'prop_fence_v', gate.at.x, gate.at.y + half * 0.35, half * 1.3);
      if (!art) break;
      if (!flat && side.x * side.y > 0) art.img.setFlipX(true);
      art.img.setVisible(false);
      this.fenceArt.push({ img: art.img, scaleY: art.img.scaleY });
    }

  }

  /** 主角是不是已经走进空地够深了（该开打了） */
  shouldStart(p: Pt) {
    if (this.state !== 'idle') return false;
    const { center, radius } = this.area;
    return Phaser.Math.Distance.Between(p.x, p.y, center.x, center.y) < radius - 90;
  }

  start() {
    this.state = 'fighting';
    this.wave = 0;
    this.timer = 20;
    this.raiseTarget = 1;
    this.walk.lock = { center: this.area.center, radius: this.area.radius - AREA_INSET };
  }

  /** 篱笆落下，路通了 */
  open() {
    this.state = 'cleared';
    this.raiseTarget = 0;
    this.walk.lock = null;
  }

  get waves() {
    return this.room.waves.length;
  }

  /**
   * 每个逻辑帧调用：场上没活着的山贼了就倒数，倒数完刷下一波；
   * 返回 'done' 表示最后一波也清完了（由场景决定先选升级还是直接开篱笆）
   */
  tick(alive: number, spawn: (s: SpawnDef, at: Pt) => void): 'fighting' | 'done' {
    if (this.state !== 'fighting' || alive > 0) return 'fighting';
    if (this.wave >= this.room.waves.length) return 'done';
    if (--this.timer > 0) return 'fighting';
    const perSide = { left: 0, right: 0 };
    for (const s of this.room.waves[this.wave]) {
      const gate = s.side === 'right' ? this.gates[this.gates.length - 1] : this.gates[0];
      const i = perSide[s.side]++;
      const side = { x: -gate.inward.y, y: gate.inward.x };
      const lateral = (i % 2 === 0 ? 1 : -1) * Math.ceil(i / 2) * 60;
      const inset = s.side === 'right' ? -SPAWN_INSET : SPAWN_INSET;
      // 前面路口的 inward 指向空地外（路往前走），所以往里要反过来
      spawn(s, { x: gate.at.x + gate.inward.x * inset + side.x * lateral, y: gate.at.y + gate.inward.y * inset + side.y * lateral });
    }
    this.wave++;
    this.timer = WAVE_GAP;
    return 'fighting';
  }

  /** 每个画面帧：篱笆升起 / 落下的动画 */
  draw(delta: number) {
    const step = delta / FENCE_MS;
    this.raise = this.raise < this.raiseTarget ? Math.min(this.raiseTarget, this.raise + step) : Math.max(this.raiseTarget, this.raise - step);
    const k = Phaser.Math.Easing.Back.Out(this.raise);
    if (this.fenceArt.length) {
      for (const f of this.fenceArt) f.img.setVisible(this.raise > 0).setScale(f.img.scaleX, f.scaleY * k);
      return;
    }
    this.gates.forEach((gate, gi) => {
      const g = this.g[gi];
      g.clear();
      if (this.raise <= 0) return;
      const side = { x: -gate.inward.y, y: gate.inward.x };
      const at = (off: number) => ({ x: gate.at.x + side.x * off, y: gate.at.y + side.y * off });
      // 先画两道横着的竹竿，再画竹桩（脚靠下的后画，挡住靠上的）
      const sorted = [...this.stakes].sort((a, b) => at(a.off).y - at(b.off).y);
      const first = at(this.stakes[0].off);
      const last = at(this.stakes[this.stakes.length - 1].off);
      for (const y of [0.35, 0.7]) {
        g.lineStyle(5, COLORS.ink, 0.9);
        g.lineBetween(first.x, first.y - 90 * y * k, last.x, last.y - 90 * y * k);
      }
      for (const s of sorted) {
        const p = at(s.off);
        const h = s.h * k;
        g.fillStyle(COLORS.ink, 0.95);
        g.fillPoints(
          [
            { x: p.x - 4, y: p.y },
            { x: p.x + 4, y: p.y },
            { x: p.x + 3 + s.lean * h, y: p.y - h },
            { x: p.x - 3 + s.lean * h, y: p.y - h - 6 },
          ],
          true,
        );
        // 竹节
        g.fillStyle(COLORS.paper, 0.5);
        g.fillRect(p.x - 4 + s.lean * h * 0.5, p.y - h * 0.5, 8, 2);
      }
    });
  }
}

/** 沿着石板路走一遍，找出路进出这片空地的两个地方 */
function findGates(path: Pt[], area: MapArea): Gate[] {
  const r = area.radius - AREA_INSET;
  const inside = (p: Pt) => Phaser.Math.Distance.Between(p.x, p.y, area.center.x, area.center.y) < r;
  const pts: Pt[] = [];
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i];
    const b = path[i + 1];
    const n = Math.ceil(Phaser.Math.Distance.Between(a.x, a.y, b.x, b.y) / 6);
    for (let j = 0; j < n; j++) pts.push({ x: Phaser.Math.Linear(a.x, b.x, j / n), y: Phaser.Math.Linear(a.y, b.y, j / n) });
  }
  pts.push(path[path.length - 1]);
  const gates: Gate[] = [];
  for (let i = 1; i < pts.length; i++) {
    const was = inside(pts[i - 1]);
    const is = inside(pts[i]);
    if (was === is) continue;
    const dx = pts[i].x - pts[i - 1].x;
    const dy = pts[i].y - pts[i - 1].y;
    const len = Math.hypot(dx, dy) || 1;
    gates.push({ at: pts[i], inward: { x: dx / len, y: dy / len } });
  }
  // 路的尽头就在空地里（山寨）时只有一个进口
  return gates.length >= 2 ? [gates[0], gates[gates.length - 1]] : gates;
}
