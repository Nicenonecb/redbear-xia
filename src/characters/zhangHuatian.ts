import { byId } from '../combat/moveTable';
import { bossMove, type MountainBossDef } from './baoJinliang';
export const ZHANG: MountainBossDef={id:'zhangHuatian',name:'彰化天 · 前朝皇子',hp:820,speed:90,cooldown:48,
 moves:byId([
 bossMove('lash','金鞭直抽',42,8,38,320,18,28),
 {...bossMove('arc','回旋鞭',48,12,44,300,360,24),hit:{...bossMove('arc','',48,12,44,300,360,24).hit!,area:{from:120,reach:300,arc:360}}},
 {...bossMove('snare','缠身',46,6,12,340,22,10),followUp:'palm'},
 bossMove('palm','碎心掌',30,8,48,100,75,32),
 {...bossMove('lash2','双鞭连抽',34,8,8,320,18,25),followUp:'lashB'},
 {...bossMove('lashB','双鞭回抽',22,8,8,320,18,25),followUp:'whirl'},
 bossMove('whirl','金龙卷',40,60,60,230,360,30)
 ]),attacks:['lash','arc','snare']};
ZHANG.moves.palm.motion=[{from:20,to:29,vx:600}];
