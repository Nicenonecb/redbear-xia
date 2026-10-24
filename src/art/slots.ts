import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../config';

/**
 * 立绘槽位：图片放进 public/art/，在 public/art/manifest.json 的 images 里登记一行，
 * 启动时就会加载，对应的地方自动换成图片；没登记的槽位继续用代码画的剪影。
 * 每个槽位的尺寸和出图提示词见 docs/art-prompts.md。
 */
export const ART_SLOTS = {
  title: '标题画面背景',
  portrait_zhangHuatian: '彰化天',
  portrait_zhangHuatian_awaken: '彰化天白发觉醒',
  portrait_spearman: '矛手',
  portrait_archer: '弓手',
  portrait_drillmaster: '教头',
  portrait_swordsman: '死士',
  portrait_bannerman: '旗手',
  portrait_captain: '护卫统领',
  portrait_baoJinliang: '鲍金梁立绘',
  ending_final: '红熊山巅通关插画',
  intro_wen: '温少华出师',
  intro_yu: '于无瑕出师',
  intro_wenShaohua: '温少华出师（出图清单命名）',
  intro_yuWuxia: '于无瑕出师（出图清单命名）',
  card_boss_baoJinliang: '鲍金梁名牌',
  card_boss_zhangHuatian: '彰化天名牌',
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

/**
 * 一张图的名字：登记过的槽位，或者第三批按前缀认的图（见下面 MAP_ART）。
 * 第三批的图名就是文件名，比如 map_wenShaohua_strike_se、fx_slash_arc
 */
export type ArtSlot = keyof typeof ART_SLOTS | `${'map' | 'fx' | 'ground' | 'prop' | 'cutin'}_${string}`;

const textureKey = (slot: ArtSlot) => `art:${slot}`;

/**
 * 第三批（斜俯视大地图）的图太多，不一个个登记槽位：按出图清单里的文件名前缀认，
 * 在 manifest 里写上就加载。人物 map_<名字>_<朝向> / map_<名字>_<姿势>_<朝向>、特效 fx_*、
 * 地面 ground_*、地图物件 prop_*、横幅特写 cutin_*
 */
const MAP_ART = /^(map|fx|ground|prop|cutin)_\w+$/;

function manifestImages(scene: Phaser.Scene) {
  const manifest = scene.cache.json.get('artManifest') as { images?: Record<string, string> } | undefined;
  return Object.entries(manifest?.images ?? {}).filter(([, file]) => !!file);
}

/**
 * 在 Boot 场景里调用：把标题、选角、界面、茶摊、信这些登记过槽位的图排进加载队列。
 * 大地图的图（第三批，几百兆）不在这里加载，进地图时再按选的主角加载，见 queueMapArt
 */
export function queueArt(scene: Phaser.Scene) {
  for (const [slot, file] of manifestImages(scene)) {
    if (slot in ART_SLOTS) scene.load.image(textureKey(slot as ArtSlot), `art/${file}`);
  }
}

/**
 * 进大地图前调用：把第三批的图排进加载队列，只加载这一局用得上的——
 * 没选的那位主角的人物图不加载；上一局留下的那位主角的图从显卡里卸掉。已经加载过的不会重复加载。
 * 返回排进队列的张数
 */
export function queueMapArt(scene: Phaser.Scene, hero: string) {
  const other = hero === 'wenShaohua' ? 'yuWuxia' : 'wenShaohua';
  const isOther = (slot: string) => slot.startsWith(`map_${other}_`);
  for (const key of scene.textures.getTextureKeys()) {
    if (key.startsWith('art:') && isOther(key.slice(4))) scene.textures.remove(key);
  }
  let n = 0;
  for (const [slot, file] of manifestImages(scene)) {
    if (slot in ART_SLOTS || !MAP_ART.test(slot) || isOther(slot)) continue;
    if (scene.textures.exists(textureKey(slot as ArtSlot))) continue;
    scene.load.image(textureKey(slot as ArtSlot), `art/${file}`);
    n++;
  }
  return n;
}

/**
 * 把第三批的人物图、地图物件四周的透明边裁掉再送进显卡，省显存（map-anchors.json 的 trim 记了裁到哪儿）。
 * 裁完的图还假装自己是原来那么大（Phaser 的"带裁边的帧"），所以摆放、对齐、缩放的算法全都不用改，
 * 画出来和原图一个像素都不差；原图文件也不动
 */
export function trimArtTextures(scene: Phaser.Scene) {
  const data = scene.cache.json.get('mapAnchors') as
    { images?: Record<string, { trim?: number[] }>; props?: Record<string, { trim?: number[] }> } | undefined;
  const all = { ...data?.images, ...data?.props };
  for (const [slot, info] of Object.entries(all)) {
    const key = textureKey(slot as ArtSlot);
    const box = info.trim;
    if (!box || !scene.textures.exists(key)) continue;
    const old = scene.textures.get(key);
    const src = old.getSourceImage() as HTMLImageElement;
    // 已经裁过了（裁好的是 canvas）
    if (!(src instanceof HTMLImageElement)) continue;
    const [x, y, w, h] = box;
    const fullW = src.naturalWidth || src.width;
    const fullH = src.naturalHeight || src.height;
    if (w >= fullW && h >= fullH) continue;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.getContext('2d')!.drawImage(src, x, y, w, h, 0, 0, w, h);
    scene.textures.remove(key);
    // 用 create 而不是 addCanvas：CanvasTexture 会在内存里再存一整份像素，省下的显存又花回内存里了
    const tex = scene.textures.create(key, canvas as unknown as HTMLImageElement, w, h)!;
    tex.add('__BASE', 0, 0, 0, w, h)!.setTrim(fullW, fullH, x, y, w, h);
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

/**
 * 地图人物图的对齐数据（tools/map-anchors.py 生成）：脚底在画布上的哪个像素、
 * 这个人物站着时"脚底到头顶"多高。没有就返回 null（按画布正中、离底边 6% 算）
 */
export function mapAnchor(scene: Phaser.Scene, slot: ArtSlot, mapName: string) {
  const data = scene.cache.json.get('mapAnchors') as
    { images: Record<string, { footX: number; footY: number }>; bodyHeight: Record<string, number> } | undefined;
  const foot = data?.images[slot];
  return foot ? { ...foot, bodyHeight: data!.bodyHeight[mapName] as number | undefined } : null;
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
  const width = GAME_WIDTH;
  const height = GAME_HEIGHT;
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
  const width = GAME_WIDTH;
  const height = GAME_HEIGHT;
  scene.add
    .tileSprite(0, 0, width, height, textureKey('paper_texture'))
    .setOrigin(0)
    .setDepth(95)
    .setBlendMode(Phaser.BlendModes.MULTIPLY)
    .setAlpha(0.45);
}

/** 把一张图等比缩放塞进 maxW × maxH 的框里；没有这张图就返回 null */
export function placeArt(scene: Phaser.Scene, slot: ArtSlot, x: number, y: number, maxW: number, maxH: number, originX = 0.5, originY = 1) {
  if (!hasArt(scene, slot)) return null;
  const img = scene.add.image(x, y, textureKey(slot)).setOrigin(originX, originY);
  img.setScale(Math.min(maxW / img.width, maxH / img.height));
  return img;
}
