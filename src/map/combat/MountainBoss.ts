import type { HitSpec, MoveDef } from '../../combat/moveTable';
import type { MountainBossDef } from '../../characters/baoJinliang';
import { MapActor, type MapHurtable } from './MapActor';
import type { MapFighter } from './MapFighter';
import type { WalkableMap } from '../walkable';
import { dirTo, groundDist } from './ground';
/** Boss AI owns timing and ground targeting; controllers own dialogue and spectacle. */
export class MountainBoss extends MapActor {
 stage: 'intro'|'fight'|'transform'|'defeated' = 'intro';
 phase=1; frame=0; aim={x:0,y:0}; private cooldown=40; private sequence=0;
 private half=false; private current:MoveDef|undefined;
 constructor(x:number,y:number,readonly def:MountainBossDef,private target:MapFighter,walk:WalkableMap){super(x,y,35,210,def.hp,walk);}
 override get invulnerable(){return this.stage!=='fight';}
 takeHit(hit:HitSpec){
  if(this.invulnerable)return; this.hp=Math.max(0,this.hp-hit.damage);this.flash=hit.hitstop+3;this.freeze(hit.hitstop);
  if(!this.half && this.hp<=this.maxHp/2){this.half=true;this.events.emit('half');}
  if(this.dead){this.runner.stop();this.stage='defeated';this.events.emit('defeated');}
 }
 startFight(){this.stage='fight';}
 tick(){
  if(!this.beginTick() || this.stage!=='fight')return;
  this.frame++;
  const move=this.runner.move;
  if(move){
   this.advanceMove();this.applyMoveMotion();
   if(move.id==='vault') {
    const t=this.runner.frame-move.startup;
    if(t===0){this.z=100;this.vel={x:(this.aim.x-this.pos.x)*5,y:(this.aim.y-this.pos.y)*5};}
    else if(t>0 && t<12){this.vel={x:(this.aim.x-this.pos.x)*5,y:(this.aim.y-this.pos.y)*5};}
   }
   if(move.id==='whirl'){this.facing=dirTo(this.pos,this.target.pos,this.facing);this.vel={x:this.facing.x*75,y:this.facing.y*75};}
   if(!this.runner.move){this.vel={x:0,y:0};if(move.followUp)this.begin(move.followUp);else this.cooldown=this.def.cooldown;}
  }else{
   this.facing=dirTo(this.pos,this.target.pos,this.facing);
   const d=groundDist(this.target.pos.x-this.pos.x,this.target.pos.y-this.pos.y);
   const speed=d>180?this.def.speed:0;this.vel={x:this.facing.x*speed,y:this.facing.y*speed};
   if(--this.cooldown<=0 && d<520)this.begin(this.def.attacks[this.sequence++%this.def.attacks.length]);
  }
  this.integrate();
 }
 private begin(id:string){this.current=this.def.moves[id];this.aim={...this.target.pos};this.facing=dirTo(this.pos,this.target.pos,this.facing);this.startMove(this.current);}
 override activeArea(){if(this.runner.move?.id==='vault' && this.z>12)return null;return super.activeArea();}
 override resolveHits(targets:MapHurtable[]){
  const hits=super.resolveHits(targets);
  if(this.runner.move?.id==='snare' && hits.length){this.target.pos.x=this.pos.x+this.facing.x*65;this.target.pos.y=this.pos.y+this.facing.y*65;this.target.hurtFrames=28;this.target.mercyFrames=20;}
  return hits;
 }
}
