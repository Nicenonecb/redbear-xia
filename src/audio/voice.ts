import Phaser from 'phaser';
import { sfx } from './sfx';
export function queueVoice(scene: Phaser.Scene, ids: string[]) {
  const manifest = scene.cache.json.get('voiceManifest') ?? {};
  const lines = manifest.lines ?? manifest;
  for (const id of ids) if (lines[id] && !scene.cache.audio.exists(`voice:${id}`)) scene.load.audio(`voice:${id}`, `voice/${lines[id]}`);
}
/** One scene owns its current utterance. Cancellation resolves and always restores ducking. */
export class VoicePlayer {
  private cancel: (() => void) | undefined;
  constructor(private scene: Phaser.Scene) { scene.events.once('shutdown', () => this.stop()); }
  stop() { this.cancel?.(); }
  play(id: string, text: string): Promise<void> {
    this.stop();
    return new Promise(resolve => {
      let sound: Phaser.Sound.BaseSound | undefined;
      let timer: Phaser.Time.TimerEvent | undefined;
      let finished = false;
      const volume = () => { if (sound && 'setVolume' in sound) (sound as Phaser.Sound.WebAudioSound).setVolume(sfx.muted ? 0 : sfx.volume); };
      const finish = () => {
        if (finished) return; finished = true;
        timer?.remove(); sound?.destroy(); sfx.listeners.delete(volume);
        sfx.duck(false); this.cancel = undefined; resolve();
      };
      this.cancel = finish; sfx.duck(true);
      if (this.scene.cache.audio.exists(`voice:${id}`)) {
        sound = this.scene.sound.add(`voice:${id}`, { volume: sfx.muted ? 0 : sfx.volume });
        sound.once('complete', finish); sfx.listeners.add(volume);
        if (sound.play()) return;
      }
      timer = this.scene.time.delayedCall(Math.max(800, text.length * 220), finish);
    });
  }
}
