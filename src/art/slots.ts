import Phaser from 'phaser';

/**
 * 立绘槽位：图片放进 public/art/，在 public/art/manifest.json 的 images 里登记一行，
 * 启动时就会加载，对应的地方自动换成图片；没登记的槽位继续用代码画的剪影。
 * 每个槽位的尺寸和出图提示词见 docs/art-prompts.md。
 */
export const ART_SLOTS = {
  title: '标题画面背景',
  portrait_wenShaohua: '温少华立绘（选角界面）',
  portrait_yuWuxia: '于无瑕立绘（选角界面）',
  portrait_pangHu: '胖虎立绘（说话时出现在右下角）',
  portrait_pangHuTiger: '胖虎猛虎形态立绘（变身后说话时）',
  portrait_redBear: '红熊立绘（嘱咐的信）',
  portrait_renXinye: '任新野立绘（茶摊）',

  // 第二批
  bg_room1: '第一间战斗房背景（竹林 · 入山）',
  bg_room2: '第二间战斗房背景（竹林 · 深处）',
  bg_room3: '第三间战斗房背景（竹林 · 山寨前）',
  bg_shop: '茶摊背景',
  bg_boss: '胖虎山寨背景',
  bg_training: '练功场背景',
  bg_select: '选角界面背景',
  bg_letter: '嘱咐信背景',
  ending_chapter1: '第一章结尾插画',
  portrait_pangHu_taunt: '胖虎 · 嫌钱少',
  portrait_pangHu_greedy: '胖虎 · 收钱放行',
  portrait_pangHu_angry: '胖虎 · 变身前怒吼',
  portrait_pangHu_beaten: '胖虎 · 被打败',
  portrait_chief: '山贼头目（大怪登场提示）',
  portrait_bandit: '山贼喽啰（登场提示）',
  portrait_thrower: '山贼飞刀手（登场提示）',
  cutin_redBear: '红熊救场特写（横幅）',
  cutin_pangHu_roar: '胖虎变身怒吼特写（横幅）',
  card_boss_pangHu: 'Boss 名牌底图',
  paper_letter: '信纸',
  ui_scroll: '选项面板的卷轴底',
  paper_texture: '全屏宣纸纹理（可平铺）',
  icon_weapon_wen_0: '铁剑图标',
  icon_weapon_wen_1: '青锋图标',
  icon_weapon_wen_2: '龙泉图标',
  icon_weapon_yu_0: '竹扇图标',
  icon_weapon_yu_1: '铁骨扇图标',
  icon_weapon_yu_2: '玄羽扇图标',
  icon_potion: '金疮药图标',
  icon_refine: '强化兵器图标',
  icon_stat_attack: '升级 · 攻击图标',
  icon_stat_vitality: '升级 · 气血图标',
  icon_stat_agility: '升级 · 身法图标',
  seal_redBear: '标题旁"红熊"印章',
  seal_signature: '信末私印',
  fx_ink_splats: '墨点飞溅（一排 6 个）',
  fx_bamboo_leaves: '飘落竹叶（一排 6 片）',
} as const;

export type ArtSlot = keyof typeof ART_SLOTS;

const textureKey = (slot: ArtSlot) => `art:${slot}`;

/** 在 Boot 场景里调用：读清单，把登记了的图片排进加载队列 */
export function queueArt(scene: Phaser.Scene) {
  const manifest = scene.cache.json.get('artManifest') as { images?: Record<string, string> } | undefined;
  for (const [slot, file] of Object.entries(manifest?.images ?? {})) {
    if (slot in ART_SLOTS && file) scene.load.image(textureKey(slot as ArtSlot), `art/${file}`);
  }
}

/** 一排 N 个的素材图（墨点、竹叶）：切成 N 帧，帧号 0～N-1 */
const STRIPS: Partial<Record<ArtSlot, number>> = { fx_ink_splats: 6, fx_bamboo_leaves: 6 };

/** 图片加载完以后调用：把一排一排的素材切成帧 */
export function registerArtFrames(scene: Phaser.Scene) {
  for (const [slot, count] of Object.entries(STRIPS) as [ArtSlot, number][]) {
    if (!hasArt(scene, slot)) continue;
    const tex = scene.textures.get(textureKey(slot));
    const src = tex.getSourceImage();
    const w = src.width / count;
    for (let i = 0; i < count; i++) tex.add(i, 0, i * w, 0, w, src.height);
  }
}

export function stripFrames(slot: ArtSlot) {
  return STRIPS[slot] ?? 0;
}

export function hasArt(scene: Phaser.Scene, slot: ArtSlot) {
  return scene.textures.exists(textureKey(slot));
}

/** 背景图：等比放大铺满整个画面（多出来的边裁掉）；没有这张图就返回 null */
export function coverArt(scene: Phaser.Scene, slot: ArtSlot, depth = 0) {
  if (!hasArt(scene, slot)) return null;
  const { width, height } = scene.scale;
  const img = scene.add.image(width / 2, height / 2, textureKey(slot)).setDepth(depth);
  img.setScale(Math.max(width / img.width, height / img.height));
  return img;
}

/**
 * 整个画面叠一层很淡的宣纸纹理（正片叠底），让代码画的剪影和界面也像画在纸上。
 * 没有纹理图就什么都不做
 */
export function addPaperGrain(scene: Phaser.Scene) {
  if (!hasArt(scene, 'paper_texture')) return;
  const { width, height } = scene.scale;
  scene.add
    .tileSprite(0, 0, width, height, textureKey('paper_texture'))
    .setOrigin(0)
    .setDepth(95)
    .setBlendMode(Phaser.BlendModes.MULTIPLY)
    .setAlpha(0.45);
}

/** 把一张图等比缩放塞进 maxW × maxH 的框里；没有这张图就返回 null */
export function placeArt(
  scene: Phaser.Scene,
  slot: ArtSlot,
  x: number,
  y: number,
  maxW: number,
  maxH: number,
  originX = 0.5,
  originY = 1,
) {
  if (!hasArt(scene, slot)) return null;
  const img = scene.add.image(x, y, textureKey(slot)).setOrigin(originX, originY);
  img.setScale(Math.min(maxW / img.width, maxH / img.height));
  return img;
}
