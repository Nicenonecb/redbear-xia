import Phaser from 'phaser';
import { coverArt, placeArt, type ArtSlot } from '../art/slots';
import { FONT_BRUSH, CSS_COLORS, GAME_WIDTH, GAME_HEIGHT } from '../config';
import { getRun } from '../game/run';
import { saveRun } from '../game/save';
import { introLines } from '../game/story';
import { queueVoice, VoicePlayer } from '../audio/voice';
export class IntroScene extends Phaser.Scene {
 private voice!: VoicePlayer; private index = 0; private token = 0; private done = false;
 private caption!: Phaser.GameObjects.Text;
 constructor() { super('Intro'); }
 preload() { queueVoice(this, introLines(getRun()!.hero).flatMap(l => l.voice ? [l.voice] : [])); }
 create() {
  this.index = 0; this.token = 0; this.done = false; this.voice = new VoicePlayer(this);
  const run = getRun()!;
  if (!coverArt(this, (run.hero === 'wenShaohua' ? 'intro_wen' : 'intro_yu') as ArtSlot)) {
   coverArt(this, 'bg_training');
   placeArt(this, 'portrait_redBear', 320, 600, 400, 540);
   placeArt(this, `portrait_${run.hero}` as ArtSlot, 940, 600, 400, 540);
  }
  this.add.rectangle(GAME_WIDTH/2, GAME_HEIGHT-105, GAME_WIDTH, 210, 0x17120d, .85);
  this.caption = this.add.text(80, 545, '', { fontFamily: FONT_BRUSH, fontSize: '30px', color: CSS_COLORS.paper, wordWrap: { width: 1120 }, lineSpacing: 12 });
  this.add.text(80, 680, 'J / 空格 下一句　Esc 跳过', { fontFamily: FONT_BRUSH, fontSize: '20px' });
  this.input.keyboard!.on('keydown', (e: KeyboardEvent) => { if(e.repeat) return; if(e.code==='Escape') this.finish(); else if(['KeyJ','Space'].includes(e.code)) this.next(); });
  this.events.once('shutdown', () => { this.done = true; this.token++; });
  this.show();
 }
 private show() {
  const line = introLines(getRun()!.hero)[this.index]; if (!line) return this.finish();
  const token = ++this.token;
  this.caption.setText(`${line.voice ? '红熊' : getRun()!.hero === 'wenShaohua' ? '温少华' : '于无瑕'}：${line.text}`);
  this.voice.play(line.voice ?? '', line.text).then(() => { if (!this.done && token === this.token) this.next(); });
 }
 private next() { if (this.done) return; this.token++; this.voice.stop(); this.index++; this.show(); }
 private finish() { if(this.done) return; this.done=true; this.token++; this.voice.stop(); saveRun(getRun()!); this.scene.start('Map'); }
}
