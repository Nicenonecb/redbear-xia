import Phaser from 'phaser';
import { ZHANG } from '../../characters/zhangHuatian';
import { MountainBoss } from '../combat/MountainBoss';
import type { BossController } from './BossController';
import { MapSprite,poseOf } from '../MapSprite';
import { fillSector,type MapScene } from '../../scenes/MapScene';
import { areaOf,dirTo } from '../combat/ground';
import { hasArt, type ArtSlot } from '../../art/slots';
import { sfx } from '../../audio/sfx';
import { renderScale } from '../../render/sharp';
export class ZhangBoss implements BossController {
 readonly events=new Phaser.Events.EventEmitter(); actor!:MountainBoss;
 private human!:MapSprite;private awake!:MapSprite;private introduced=false;
 private glow!:Phaser.GameObjects.Graphics; private transforming=false;
 constructor(private host:MapScene){}
 spawn(){const at=this.host.stage.map.boss;this.actor=new MountainBoss(at.x,at.y,structuredClone(ZHANG),this.host.player,this.host.walk);
 this.human=new MapSprite(this.host,'zhangHuatian',hasArt(this.host,'portrait_zhangHuatian')?'portrait_zhangHuatian':'portrait_pangHu',230,100);
 this.awake=new MapSprite(this.host,'zhangHuatianAwake',hasArt(this.host,'portrait_zhangHuatian_awaken')?'portrait_zhangHuatian_awaken':'portrait_chief',245,100);this.awake.img.setTint(0xffe7ad);this.awake.setVisible(false);
 this.glow=this.host.add.graphics().setDepth(at.y+1);
 this.actor.events.once('half',()=>this.transform());
 this.actor.events.once('defeated',()=>{this.host.clearBossAdds();this.host.talk(['今日之败……记下了。'],()=>this.events.emit('defeated'),()=>this.host.headOf(this.actor.pos,245));});
 }
 checkIntro(){if(this.introduced||this.host.run.step<4||Phaser.Math.Distance.BetweenPoints(this.actor.pos,this.host.player.pos)>560)return;this.introduced=true;
 this.host.talk(['老三贪，老二蠢，可都好用。红熊的徒弟……你毁了我两年的心血。'],()=>{this.host.ui.bossCard('彰化天','金鞭 · 前朝皇子');this.actor.startFight();},()=>this.host.headOf(this.actor.pos,230));}
 private transform(){
  const a=this.actor;this.transforming=true;a.stage='transform';a.runner.stop();a.vel={x:0,y:0};this.host.pauses.add('transform');this.host.cinematic=true;
  this.host.cameras.main.zoomTo(renderScale()*1.3,700);this.host.ui.say('本想留你全尸。',1200,()=>this.host.headOf(a.pos,230));
  this.host.time.delayedCall(1400,()=>{this.host.ui.say('前朝的天下……我一寸一寸夺回来！',1600,()=>this.host.headOf(a.pos,230));this.human.img.setTint(0xffcc55);sfx.play('charge');});
  this.host.time.delayedCall(3100,()=>{
   this.human.setVisible(false);this.awake.setVisible(true);this.host.cameras.main.flash(380,255,241,190);this.host.cameras.main.shake(450,.02);sfx.play('slam');
   this.host.ui.cutIn('cutin_zhangHuatian_awaken' as ArtSlot);
   for(let i=0;i<16;i++){const p=this.host.add.rectangle(a.pos.x,a.pos.y-160,12,25,0x443327).setDepth(a.pos.y+5);this.host.tweens.add({targets:p,x:p.x+Math.cos(i)*230,y:p.y+Math.sin(i)*140,angle:i*60,alpha:0,duration:900,onComplete:()=>p.destroy()});}
   this.host.player.shove(dirTo(a.pos,this.host.player.pos,{x:0,y:1}),620);a.phase=2;a.def.speed=200;a.def.cooldown=38;a.def.attacks=['snare','lash2','palm','whirl'];
  });
  this.host.time.delayedCall(4200,()=>{this.transforming=false;this.glow.clear();this.host.cameras.main.zoomTo(renderScale(),600);this.host.cinematic=false;this.host.pauses.delete('transform');a.startFight();});
 }
 tick(){this.actor.tick();}
 render(delta:number){const a=this.actor;const sp=a.phase===1?this.human:this.awake;sp.update({...a.pos,z:a.z,facing:a.facing,moving:Math.hypot(a.vel.x,a.vel.y)>10,pose:poseOf(a.runner),flash:a.flash>0,shaking:a.frozen},delta);this.host.ui.setBoss(a.stage==='intro'?null:a.hp/a.maxHp,ZHANG.name+(a.phase===2?' · 白发觉醒':''));
 if(this.transforming){this.glow.clear();this.glow.lineStyle(10,0xe4b342,.65);const r=90+Math.sin(this.host.time.now/100)*25;this.glow.strokeEllipse(a.pos.x,a.pos.y-90,r*2,280);}}
 hitTargets(){return this.actor&&!this.actor.dead?[this.actor]:[];}
 drawWarnings(g:Phaser.GameObjects.Graphics,_gl:Phaser.GameObjects.Graphics){const a=this.actor,m=a.runner.move;if(!m?.hit||a.runner.phase!=='startup')return;g.fillStyle(0xc75729,.18+.3*a.runner.frame/m.startup);if(m.id==='snare')g.fillEllipse(a.aim.x,a.aim.y,140,90);else {fillSector(g,a.pos,a.facing,areaOf(m.hit));if(m.hit.area?.from){g.lineStyle(4,0xffd36a,.9);g.strokeEllipse(a.pos.x,a.pos.y,m.hit.area.from*2,m.hit.area.from*1.3);}}}
 afterRescue(){}
 dispose(){this.actor.events.removeAllListeners();this.events.removeAllListeners();this.human.destroy();this.awake.destroy();this.glow.destroy();}
}
