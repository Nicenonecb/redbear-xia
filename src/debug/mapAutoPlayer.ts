import Phaser from 'phaser';
import type { Action } from '../input/Controls';
import { groundDist, inArea } from '../map/combat/ground';
// Development-only player: normal movement and inputs; never changes combat state.
export function mapAutoPlayer(skill: number, seed: string) {
  const rng = new Phaser.Math.RandomDataGenerator([seed]);
  const reactions = new WeakMap<object, { move: object; dodge: boolean }>();
  return (s: Phaser.Scene & Record<string, any>, f: number): Action[] => {
    const key = s.scene.key;
    if (key === 'Letter' || key === 'Intro' || key === 'Ending') {
      if (f % 60 === 0) s.input.keyboard?.emit('keydown', { code: 'Space', repeat: false });
      return [];
    }
    if (key === 'Shop') {
      const opts = s.panel?.config.options;
      if (opts && f % 30 === 0) {
        const pick = !opts[1].disabled ? 1 : !opts[2].disabled ? 2 : opts.length - 1;
        s.panel.pick(pick);
      }
      return [];
    }
    const p = s.player;
    if (!p || p.dead || s.leaving) return [];
    const panel = s.ui?.activeChoice;
    if (panel?.isOpen) {
      if (f % 20 === 0) panel.pick(panel.config.title.includes('功力') ? (p.hp < p.maxHp * .65 ? 1 : 0) : 0);
      return [];
    }
    if (s.pauses?.size) return [];
    const dirs = (dx: number, dy: number): Action[] => [Math.abs(dx) > 8 ? (dx > 0 ? 'right' : 'left') : null, Math.abs(dy) > 8 ? (dy > 0 ? 'down' : 'up') : null].filter(Boolean) as Action[];
    const foes = [...s.enemies.map((e: any) => e.enemy), ...(s.controller?.hitTargets() ?? [])].filter((e: any) => !e.dead && !e.invulnerable);
    const near = foes.sort((a: any, b: any) => groundDist(a.pos.x - p.pos.x, a.pos.y - p.pos.y) - groundDist(b.pos.x - p.pos.x, b.pos.y - p.pos.y))[0];
    if (near) {
      for (const e of foes) {
        const m = e.runner.move;
        if (!m || e.runner.phase !== 'startup') continue;
        let r = reactions.get(e);
        if (!r || r.move !== m || e.runner.frame < 2) { r = { move: m, dodge: rng.frac() < skill }; reactions.set(e, r); }
        if (r.dodge && m.startup - e.runner.frame < 12) {
          const area = m.hit?.area;
          if (!area || inArea(e.pos, e.facing, { reach: 400, arc: 360 }, p.pos, p.radius)) {
            return [...dirs(-e.facing.y * 100, e.facing.x * 100), 'dodge'];
          }
        }
      }
      const dx = near.pos.x - p.pos.x, dy = near.pos.y - p.pos.y;
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
    let best=Infinity, segment=0, projected={x:0,y:0};
    for(let i=0;i<path.length-1;i++){
      const a=path[i],b=path[i+1],dx=b.x-a.x,dy=b.y-a.y;
      const t=Math.max(0,Math.min(1,((p.pos.x-a.x)*dx+(p.pos.y-a.y)*dy)/(dx*dx+dy*dy)));
      const q={x:a.x+t*dx,y:a.y+t*dy},d=Math.hypot(p.pos.x-q.x,p.pos.y-q.y);
      if(d<best){best=d;segment=i;projected=q;}
    }
    let at=best>75?projected:path[segment+1];
    if(Math.hypot(at.x-p.pos.x,at.y-p.pos.y)<45 && segment+2<path.length)at=path[segment+2];
    const dx=at.x-p.pos.x,dy=at.y-p.pos.y,max=Math.max(Math.abs(dx),Math.abs(dy),1);
    return dirs(Math.abs(dx)/max>(f%10)/10?dx:0,Math.abs(dy)/max>(f%10)/10?dy:0);
  };
}
