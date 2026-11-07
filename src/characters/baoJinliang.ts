import { byId, type MoveDef } from '../combat/moveTable';
export function bossMove(
  id: string,
  name: string,
  startup: number,
  active: number,
  recovery: number,
  reach: number,
  arc: number,
  damage: number,
): MoveDef {
  return {
    id,
    name,
    startup,
    active,
    recovery,
    telegraph: 'ground',
    hit: { box: { x: 0, y: 0, w: reach, h: 100 }, area: { reach, arc }, damage, hitstop: 7, hitstun: 20, knockback: { x: 260, y: 0 } },
    events: [{ frame: startup, type: 'sfx', name: 'chop' }],
  };
}
export const BAO = {
  id: 'baoJinliang',
  name: '鲍金梁 · 字旺友',
  hp: 680,
  speed: 150,
  cooldown: 32,
  moves: byId([
    bossMove('thrust', '直刺', 36, 6, 26, 260, 20, 24),
    { ...bossMove('thrust3', '连环三刺', 36, 5, 5, 260, 20, 18), followUp: 'thrustB' },
    { ...bossMove('thrustB', '连环二刺', 8, 5, 12, 260, 20, 18), followUp: 'thrustC' },
    bossMove('thrustC', '连环末刺', 24, 6, 34, 280, 20, 26),
    bossMove('sweep', '横扫千军', 42, 8, 32, 180, 200, 26),
    bossMove('vault', '撑矛飞踢', 44, 40, 36, 100, 360, 24),
    {
      ...bossMove('charge', '回马枪', 42, 12, 34, 300, 20, 26),
      motion: [
        { from: 0, to: 20, vx: -130 },
        { from: 42, to: 52, vx: 650 },
      ],
    },
  ]),
  attacks: ['thrust', 'thrust3', 'sweep', 'vault', 'charge'],
};
export type MountainBossDef = typeof BAO;
