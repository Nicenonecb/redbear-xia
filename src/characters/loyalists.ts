import { BANDIT, CHIEF } from './bandits';
const swordsman=structuredClone(BANDIT);swordsman.id='swordsman';swordsman.name='前朝死士';swordsman.moves.slash.startup=16;swordsman.moves.slash.followUp='stab2';swordsman.moves.stab2={...structuredClone(swordsman.moves.slash),id:'stab2',followUp:undefined,startup:12};
const bannerman=structuredClone(BANDIT);bannerman.id='bannerman';bannerman.name='旗手';bannerman.hp=45;bannerman.attacks=[];bannerman.moves={};bannerman.range=[240,360];
const captain=structuredClone(CHIEF);captain.id='captain';captain.name='护卫统领';captain.moves.sweep.active=40;captain.moves.sweep.hit!.area={reach:185,arc:360};captain.moves.hammer.motion=[{from:44,to:48,vx:800}];
export const LOYALISTS={swordsman,bannerman,captain};
