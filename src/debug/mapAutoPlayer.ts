import Phaser from 'phaser';
import type { Action } from '../input/Controls';
import { areaOf, groundDist, inArea } from '../map/combat/ground';
import { outside } from '../map/walkable';
// Development-only player: normal movement and inputs; never changes combat state.
// expert（AI 训练用的"老师"）：长判定招（金龙卷等，判定 > 20 帧）在前摇一开始就后撤、留出余量，
// 胖虎虎啸前摇时先拉开距离再迎着音波闪避。默认关闭，普通验收用的打法保持原样。
export function mapAutoPlayer(skill = 0.75, seed = 'bot', opts: { expert?: boolean } = {}) {
  const expert = !!opts.expert;
  const rng = new Phaser.Math.RandomDataGenerator([seed]);
  const reactions = new WeakMap<object, { move: object; frame: number; dodge: boolean }>();
  const projectiles = new WeakMap<object, boolean>();
  const reactsTo = (object: object) => {
    if (!projectiles.has(object)) projectiles.set(object, rng.frac() < skill);
    return projectiles.get(object);
  };
  return (s: Phaser.Scene & Record<string, any>, f: number): Action[] => {
    const key = s.scene.key;
    if (key === 'Letter' || key === 'Intro' || key === 'Ending') {
      if (f % 60 === 0) s.input.keyboard?.emit('keydown', { code: 'Space', repeat: false });
      return [];
    }
    if (key === 'Shop') {
      const opts = s.panel?.config.options;
      if (opts && f % 30 === 0) {
        const pick = !opts[1].disabled ? 1 : !opts[2].disabled ? 2 : opts.length === 5 && !opts[3].disabled ? 3 : opts.length - 1;
        s.panel.pick(pick);
      }
      return [];
    }
    const p = s.player;
    if (!p || p.dead || s.leaving) return [];
    const panel = s.ui?.activeChoice;
    if (panel?.isOpen) {
      if (f % 20 === 0) panel.pick(panel.config.title.includes('功力') ? (p.hp < p.maxHp * 0.65 ? 1 : 0) : 0);
      return [];
    }
    if (s.pauses?.size) return [];
    const dirs = (dx: number, dy: number): Action[] =>
      [Math.abs(dx) > 8 ? (dx > 0 ? 'right' : 'left') : null, Math.abs(dy) > 8 ? (dy > 0 ? 'down' : 'up') : null].filter(
        Boolean,
      ) as Action[];
    // expert：躲大范围招时挑一条走得通、离危险中心最远的退路（被竹篱、擂台边挡住就换方向）
    const escape = (from: { x: number; y: number }): Action[] => {
      const walk = s.walk;
      let best: Action[] | null = null,
        bestD = -Infinity;
      for (let k = 0; k < 8; k++) {
        const a = (k / 8) * Math.PI * 2,
          ux = Math.cos(a),
          uy = Math.sin(a);
        if (walk && [60, 120, 180].some((step) => outside(walk, p.pos.x + ux * step, p.pos.y + uy * step) > 0)) continue;
        const d = groundDist(p.pos.x + ux * 180 - from.x, p.pos.y + uy * 180 - from.y);
        if (d > bestD) {
          bestD = d;
          best = dirs(ux * 100, uy * 100);
        }
      }
      return best ?? dirs((p.pos.x - from.x) * 10, (p.pos.y - from.y) * 10);
    };
    const foes = [...s.enemies.map((e: any) => e.enemy), ...(s.controller?.hitTargets() ?? [])].filter(
      (e: any) => !e.dead && !e.invulnerable,
    );
    const near = foes.sort(
      (a: any, b: any) => groundDist(a.pos.x - p.pos.x, a.pos.y - p.pos.y) - groundDist(b.pos.x - p.pos.x, b.pos.y - p.pos.y),
    )[0];
    for (const ring of s.rings ?? []) {
      if (!ring.alive || ring.team !== 'enemy') continue;
      const dx = ring.center.x - p.pos.x,
        dy = ring.center.y - p.pos.y;
      const gap = groundDist(dx, dy) - ring.radius;
      if (gap > 0 && gap < 100 && reactsTo(ring)) return [...dirs(dx, dy), 'dodge'];
    }
    for (const shot of s.projectiles ?? []) {
      if (!shot.alive || shot.team !== 'enemy') continue;
      const dx = p.pos.x - shot.pos.x,
        dy = p.pos.y - shot.pos.y;
      if (groundDist(dx, dy) < 150 && dx * shot.dir.x + dy * shot.dir.y > 0 && reactsTo(shot))
        return [...dirs(-shot.dir.y * 100, shot.dir.x * 100), 'dodge'];
    }
    if (near) {
      for (const e of foes) {
        const m = e.runner.move;
        // expert：Boss 按固定顺序出招。快到下一招、而下一招（或它的连招）是大范围长判定时，
        // 先停手退出范围，免得被自己的连招锁住来不及走（温少华出招中途不能闪避取消）
        if (expert && !m && typeof e.def?.attacks?.[0] === 'string' && (e.cooldown ?? 99) <= 30) {
          let next = e.def.moves[e.def.attacks[(e.sequence ?? 0) % e.def.attacks.length]];
          for (let k = 0; next && k < 4; k++) {
            // 只管范围大的（金龙卷 230）；撑矛飞踢这类小范围的照常靠闪避，提前停手反而多挨零碎伤害
            if (next.hit && next.active > 20 && areaOf(next.hit).reach >= 200) {
              const area = areaOf(next.hit);
              if (area.arc >= 180 && groundDist(p.pos.x - e.pos.x, p.pos.y - e.pos.y) < area.reach + p.radius + 90) return escape(e.pos);
              break;
            }
            next = next.followUp ? e.def.moves[next.followUp] : null;
          }
        }
        if (!m) {
          reactions.delete(e);
          continue;
        }
        let r = reactions.get(e);
        if (!r || r.move !== m || e.runner.frame < r.frame) {
          r = { move: m, frame: e.runner.frame, dodge: rng.frac() < skill };
          reactions.set(e, r);
        }
        r.frame = e.runner.frame;
        const longActive = e.runner.phase === 'active' && m.active > 20;
        // 虎啸没有近身判定，只放音波：贴身时等圈出来再闪已经来不及，前摇里先退开
        if (expert && r.dodge && m.id === 'roar' && e.runner.phase === 'startup') {
          if (groundDist(p.pos.x - e.pos.x, p.pos.y - e.pos.y) < 400) return dirs((p.pos.x - e.pos.x) * 10, (p.pos.y - e.pos.y) * 10);
        }
        if (r.dodge && (e.runner.phase === 'startup' || longActive)) {
          const area = m.hit ? (e.warningArea ?? areaOf(m.hit)) : null;
          const aim = ['snare', 'vault', 'pounce'].includes(m.id) ? e.aim : e.pos;
          const long = expert && m.active > 20;
          const danger = area && inArea(aim, e.facing, m.id === 'snare' ? { reach: 70, arc: 360 } : area, p.pos, p.radius + (long ? 40 : 0));
          if (danger) {
            const away =
              area.arc >= 180
                ? long
                  ? escape(aim)
                  : dirs((p.pos.x - aim.x) * 10, (p.pos.y - aim.y) * 10)
                : dirs(-e.facing.y * 100, e.facing.x * 100);
            if (longActive) return away;
            // 长判定招躲不进无敌帧里，只能走出范围：前摇期间就开始退
            if (long) return m.startup - e.runner.frame < 12 ? [...away, 'dodge'] : away;
            // Recognizing a warning stops fresh attacks, so the dodge is not trapped
            // behind a newly started combo. Still uses ordinary movement/input rules.
            return m.startup - e.runner.frame < 12 ? [...away, 'dodge'] : [];
          }
        }
        // expert：连招后面接着长判定的大范围招（双鞭连抽 → 回抽 → 金龙卷），提前撤出它的范围。
        // 有的主角出招中途不能闪避取消，等到最后一招前摇才走就被锁在招式里了
        if (expert && r.dodge) {
          let next = m.followUp ? e.def?.moves?.[m.followUp] : null;
          for (let k = 0; next && k < 3; k++) {
            if (next.hit && next.active > 20) {
              const area = areaOf(next.hit);
              if (area.arc >= 180 && inArea(e.pos, e.facing, area, p.pos, p.radius + 70)) return escape(e.pos);
              break;
            }
            next = next.followUp ? e.def.moves[next.followUp] : null;
          }
        }
      }
      const dx = near.pos.x - p.pos.x,
        dy = near.pos.y - p.pos.y;
      const d = groundDist(dx, dy);
      const heading = dirs(dx, dy);
      if (d > 95) return [...heading, ...(p.ammo > 0 && d < 450 && f % 12 < 2 ? ['throw' as Action] : [])];
      return [...heading, ...(f % 6 < 2 ? ['attack' as Action] : [])];
    }
    const map = s.stage.map;
    if (s.run.step === 2) {
      const at = map.renXinye;
      const d = Math.hypot(at.x - p.pos.x, at.y - p.pos.y);
      if (d < 140) return f % 8 < 2 ? ['attack'] : [];
    }
    const path = [...map.path, map.boss];
    let best = Infinity,
      segment = 0,
      projected = { x: 0, y: 0 };
    for (let i = 0; i < path.length - 1; i++) {
      const a = path[i],
        b = path[i + 1],
        dx = b.x - a.x,
        dy = b.y - a.y;
      const t = Math.max(0, Math.min(1, ((p.pos.x - a.x) * dx + (p.pos.y - a.y) * dy) / (dx * dx + dy * dy)));
      const q = { x: a.x + t * dx, y: a.y + t * dy },
        d = Math.hypot(p.pos.x - q.x, p.pos.y - q.y);
      if (d < best) {
        best = d;
        segment = i;
        projected = q;
      }
    }
    let at = best > 75 ? projected : path[segment + 1];
    if (Math.hypot(at.x - p.pos.x, at.y - p.pos.y) < 45 && segment + 2 < path.length) at = path[segment + 2];
    const dx = at.x - p.pos.x,
      dy = at.y - p.pos.y,
      max = Math.max(Math.abs(dx), Math.abs(dy), 1);
    return dirs(Math.abs(dx) / max > (f % 10) / 10 ? dx : 0, Math.abs(dy) / max > (f % 10) / 10 ? dy : 0);
  };
}
