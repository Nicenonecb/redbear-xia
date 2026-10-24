import { hasArt, placeArt } from '../../art/slots';
import Phaser from 'phaser';
import { stepOf } from '../../game/stages';
import { BAO } from '../../characters/baoJinliang';
import { MountainBoss } from '../combat/MountainBoss';
import type { BossController } from './BossController';
import { MapSprite, poseOf } from '../MapSprite';
import { LOOKS } from '../looks';
import { fillSector, type MapScene } from '../../scenes/MapScene';
import { areaOf, GROUND_SQUASH } from '../combat/ground';
export class BaoBoss implements BossController {
  readonly events = new Phaser.Events.EventEmitter();
  actor!: MountainBoss;
  private sprite!: MapSprite;
  private introduced = false;
  private ring!: Phaser.GameObjects.Graphics;
  private spectators: MapSprite[] = [];
  constructor(private host: MapScene) {}
  spawn() {
    const at = this.host.stage.map.boss;
    this.actor = new MountainBoss(at.x, at.y, BAO, this.host.player, this.host.walk);
    const l = LOOKS.baoJinliang;
    this.sprite = new MapSprite(
      this.host,
      l.mapName,
      hasArt(this.host, 'portrait_baoJinliang') ? 'portrait_baoJinliang' : l.fallback,
      l.height,
      l.shadow,
    );
    this.ring = this.host.add.graphics().setDepth(-2900);
    for (let i = 0; i < 4; i++) {
      const s = new MapSprite(this.host, 'spearman', 'portrait_bandit', 160, 60);
      const angle = Math.PI + (i * Math.PI) / 3;
      s.update({ x: at.x + Math.cos(angle) * 540, y: at.y + Math.sin(angle) * 540, facing: { x: 0, y: 1 }, moving: false }, 0);
      this.spectators.push(s);
    }
    this.actor.events.once('half', () => {
      this.host.talk(
        ['规矩？老子的矛就是规矩！都给我上！'],
        () => {
          this.host.spawnEnemy({ enemy: 'spearman', side: 'right' }, { x: at.x - 150, y: at.y + 100 });
          this.host.spawnEnemy({ enemy: 'spearman', side: 'right' }, { x: at.x + 150, y: at.y + 100 });
          this.host.spawnEnemy({ enemy: 'archer', side: 'right' }, { x: at.x, y: at.y - 150 });
        },
        () => this.host.headOf(this.actor.pos, 230),
      );
    });
    this.actor.events.once('defeated', () => {
      this.host.clearBossAdds();
      this.spectators.forEach((s) => s.destroy());
      this.spectators = [];
      this.host.talk(
        ['……痛快。可惜，大哥明年就要拿下杭州，到时候……你们都得死。'],
        () => {
          this.host.walk.lock = null;
          this.events.emit('defeated');
        },
        () => this.host.headOf(this.actor.pos, 230),
      );
    });
  }
  checkIntro() {
    if (
      this.introduced ||
      this.host.run.step < stepOf(this.host.stage, 'boss') ||
      Phaser.Math.Distance.BetweenPoints(this.actor.pos, this.host.player.pos) > 560
    )
      return;
    this.introduced = true;
    this.events.emit('intro');
    this.host.talk(
      [
        '就是你打了我三弟？好！好久没碰到敢上山的了——来，跟我单挑！',
        '大哥说了，见着红熊的徒弟，往死里打。',
        '都给我退下！谁插手，我先捅了谁！',
      ],
      () => {
        const at = this.host.stage.map.boss;
        this.host.walk.lock = { center: at, radius: 470 };
        this.ring.lineStyle(5, 0x806747);
        this.ring.strokeCircle(at.x, at.y, 470);
        for (let i = 0; i < 20; i++) {
          const a = (i * Math.PI) / 10;
          const x = at.x + Math.cos(a) * 470,
            y = at.y + Math.sin(a) * 470;
          const post = placeArt(this.host, 'prop_ring_post', x, y, 24, 55);
          if (post) post.setDepth(y);
          else {
            this.ring.fillStyle(0x594126);
            this.ring.fillRect(x - 5, y - 25, 10, 25);
          }
        }
        this.host.ui.bossCard('鲍金梁', '长矛 · 旺友', 'card_boss_baoJinliang');
        this.host.ui.cutIn('cutin_baoJinliang_duel');
        this.actor.startFight();
      },
      () => this.host.headOf(this.actor.pos, 230),
    );
  }
  tick() {
    this.actor.tick();
  }
  render(delta: number) {
    const a = this.actor;
    this.sprite.update(
      {
        ...a.pos,
        z: a.z,
        facing: a.facing,
        moving: Math.hypot(a.vel.x, a.vel.y) > 10,
        pose: poseOf(a.runner, LOOKS.baoJinliang.poses),
        flash: a.flash > 0,
        shaking: a.frozen,
      },
      delta,
    );
    this.host.ui.setBoss(a.stage === 'intro' ? null : a.hp / a.maxHp, BAO.name);
  }
  hitTargets() {
    return this.actor && !this.actor.dead ? [this.actor] : [];
  }
  drawWarnings(g: Phaser.GameObjects.Graphics, _gl: Phaser.GameObjects.Graphics) {
    const a = this.actor,
      m = a.runner.move;
    if (!m?.hit || a.runner.phase !== 'startup') return;
    g.fillStyle(0xa42d26, 0.18 + (0.25 * a.runner.frame) / m.startup);
    if (m.id === 'vault') g.fillEllipse(a.aim.x, a.aim.y, 200, 200 * GROUND_SQUASH);
    else fillSector(g, a.pos, a.facing, areaOf(m.hit));
  }
  afterRescue() {}
  dispose() {
    this.actor.events.removeAllListeners();
    this.events.removeAllListeners();
    this.sprite.destroy();
    this.ring.destroy();
    this.spectators.forEach((s) => s.destroy());
  }
}
