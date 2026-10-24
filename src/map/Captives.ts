import type Phaser from 'phaser';
import { placeArt, type ArtSlot } from '../art/slots';
import { MapSprite } from './MapSprite';
export class Captives {
 readonly at = { x: 5900, y: 510 };
 private gate: Phaser.GameObjects.GameObject;
 private women: MapSprite[] = [];
 constructor(private scene: Phaser.Scene) {
  const {x,y}=this.at;
  placeArt(scene, 'prop_embroidery_tower' as ArtSlot, x+130,y-60,220,260);
  const art=placeArt(scene,'prop_cage' as ArtSlot,x,y,230,200);
  const g=scene.add.graphics().setDepth(y+1);
  if(!art){g.lineStyle(6,0x51402d);g.strokeRect(x-115,y-180,230,180);for(let i=0;i<6;i++)g.lineBetween(x-100+i*40,y-180,x-100+i*40,y);}
  this.gate=art??g;
  for(let i=1;i<=4;i++) if(scene.textures.exists(`art:map_maiden${i}_s`)) {const m=new MapSprite(scene,`maiden${i}`,'portrait_yuWuxia',130,45);m.update({x:x-75+i*30,y:y-20,facing:{x:0,y:1},moving:false},0);this.women.push(m);}
 }
 release(done:()=>void) {
  this.scene.cameras.main.pan(this.at.x,this.at.y-80,800);
  this.scene.time.delayedCall(1000,()=>{
   this.gate.destroy();
   this.women.forEach((m,i)=> {const p={x:this.at.x-40+i*35,y:this.at.y};this.scene.tweens.add({targets:p,y:p.y+250,duration:1800,onUpdate:()=>m.update({...p,facing:{x:0,y:1},moving:true},16)});});
   this.scene.add.text(this.at.x-110,this.at.y-200,'多谢少侠！我们能回家了。',{fontSize:'25px',color:'#241a10',backgroundColor:'#efe7d6'}).setDepth(100001);
   this.scene.time.delayedCall(2400,done);
  });
 }
}
