# 二关、三关剩下的图 · 给 Codex 的清单

> 2026-10-25 · 用户看了 4 张二关、三关的概念图，**定了这个画风**。剩下的图都照它出。
> 每张图的英文提示词还是用 [art-batch5-three-stages.md](art-batch5-three-stages.md) 里的，这份清单只管三件事：
> 出哪些图、按什么顺序出、每张附哪张参考图。
> 一共 **248 张**。2026-10-26 已全部到位并完成接入，验收见 [美术接入记录](verification/stage23-art/acceptance.md)。以下保留原始出图顺序和要求。

## 定下来的画风（参考图）

都在 `docs/art/style-ref/`，原图 1672×941。实际用的提示词在同一个文件夹的 `prompts.md`。

| 文件 | 画的是什么 | 以后拿它当什么的参考 |
|---|---|---|
| `stage2_mountainside_duel.png` | 山腰演武场：鲍金梁拄矛站在擂台上，温少华走上来 | **鲍金梁长什么样**；山腰的松林、军帐、矛架、擂台、黑军旗 |
| `stage2_plank_road.png` | 悬崖栈道：于无瑕在云海上走，前面是驿站茶摊，再远是兵营 | 栈道、云海、驿站；**山腰风景的整体画风** |
| `stage3_peak_palace.png` | 山峰行宫：彰化天（黑发束冠、金鞭）站在宫门台阶顶上 | **彰化天一阶段长什么样**；宫门、石狮、香炉、断碑、残雪石阶 |
| `stage3_awakened_duel.png` | 山峰决战：彰化天二阶段（白发、赤膊、金鞭狂舞）对于无瑕 | **彰化天二阶段长什么样**；金光的画法；龙旗 |

## 先对 Codex 说这一段（每一轮开头说一次）

```text
请按 docs/art-batch6-stage23-list.md 里「第 N 轮」的清单逐张出图。
每张图的英文提示词在 docs/art-batch5-three-stages.md 里，用 ### 后面的图名找到那一段，整段照用。要求：
1. 每张图按图名保存到 public/art/，PNG，保持图像工具出来的原图，不要缩放、不要放大、不要压缩、不要裁边。
   提示词里写的尺寸（比如 1920x1080）尽量出到；工具出不到就保留原尺寸，不要自己拉大。
2. 画风以 docs/art/style-ref/ 里的 4 张图为准（用户已经确认过）。清单里「附」那一列写的参考图，
   style-ref 的去 docs/art/style-ref/ 找，其余的去 public/art/ 找，都一起给图像工具。
3. 附了 style-ref 的图，在提示词最后加一句（把 <文件名> 换成附的那张）：
   风景、插画、物件、地面加：
   Match the look of the attached style reference <文件名>: the same dense, detailed ink-wash rendering, crisp inked linework on near objects fading into soft misty wash in the distance, warm rice-paper tone, sparse vermilion. Use it for style only, not composition.
   人物立绘加：
   The attached <文件名> is the game's key art showing this character; match his face, build, hairstyle, costume and weapon exactly. Use it for the character's look only, not the pose or background.
4. 除了地面贴图（ground_*）和过场插画（intro_*、ending_final），其他都要真透明背景，出完检查 alpha。
5. 同一个人物的所有地图图（map_<名字>_*）：画布大小、人物大小、脚底位置必须和他的站姿图 _s 完全一致，不一致就重出。
6. 出好一张就在 public/art/manifest.json 的 images 里加一行 "图名": "图名.png"；实际用的提示词记到 docs/art-log/<图名>.txt。
7. 每一轮出完运行 python3 tools/map-anchors.py，更新脚底位置和裁边。
8. 每一轮出完先停下来给我看，我确认了再出下一轮。
```

## 出图顺序

| 轮 | 内容 | 张数 | 为什么先出它 |
|---|---|---|---|
| 1 | 人物立绘、过场插画、横幅、名牌 | 20 | 人长什么样、画风对不对，先在这一轮定下来 |
| 2 | 风景：山腰、山峰的地面和物件，胖虎山寨后院 | 25 | 地图一换上，二三关就不再是第一关换个名字 |
| 3 | 每个人物的地图站姿（朝下 _s） | 13 | 后面所有朝向、姿势都照它对齐，必须先定 |
| 4 | 其余朝向、出招姿势、走路 | 184 | 最多，最机械，放最后 |
| 5 | 招式特效 | 6 | 代码画的特效能先顶着 |

## 第 1 轮 · 人物立绘、过场插画（20 张）

| 图名 | 是什么 | 附 |
|---|---|---|
| `portrait_baoJinliang` | 鲍金梁立绘 | style-ref `stage2_mountainside_duel.png` |
| `portrait_baoJinliang_angry` | 鲍金梁 · 怒喝 | `portrait_baoJinliang.png` |
| `portrait_baoJinliang_beaten` | 鲍金梁 · 跪地认输 | `portrait_baoJinliang.png` |
| `portrait_zhangHuatian` | 彰化天一阶段立绘（黑发） | style-ref `stage3_peak_palace.png` |
| `portrait_zhangHuatian_awaken` | 彰化天二阶段立绘（白发赤膊） | style-ref `stage3_awakened_duel.png`、`portrait_zhangHuatian.png` |
| `portrait_zhangHuatian_beaten` | 彰化天 · 跪地，白发遮面 | `portrait_zhangHuatian_awaken.png` |
| `portrait_maiden` | 被救的民女 | 不用 |
| `portrait_spearman` | 老兵矛手（山腰） | 不用 |
| `portrait_archer` | 弓手（山腰） | 不用 |
| `portrait_drillmaster` | 教头（山腰） | 不用 |
| `portrait_swordsman` | 前朝死士（山峰） | 不用 |
| `portrait_bannerman` | 旗手（山峰） | 不用 |
| `portrait_captain` | 护卫统领（山峰） | 不用 |
| `intro_wenShaohua` | 开场 · 温少华拜别红熊 | style-ref `stage2_plank_road.png`、`portrait_redBear.png`、`portrait_wenShaohua.png` |
| `intro_yuWuxia` | 开场 · 于无瑕拜别红熊 | style-ref `stage2_plank_road.png`、`portrait_redBear.png`、`portrait_yuWuxia.png` |
| `ending_final` | 通关 · 师徒在山巅看三兄弟逃往杭州 | style-ref `stage3_peak_palace.png`、`portrait_redBear.png` |
| `cutin_baoJinliang_duel` | 鲍金梁擂台开场横幅 | `portrait_baoJinliang.png` |
| `cutin_zhangHuatian_awaken` | 彰化天变身横幅 | `portrait_zhangHuatian_awaken.png` |
| `card_boss_baoJinliang` | Boss 名牌底 · 鲍金梁 | `card_boss_pangHu.png` |
| `card_boss_zhangHuatian` | Boss 名牌底 · 彰化天 | `card_boss_pangHu.png` |

立绘是透明背景的单人图。概念图里那种浓密的风景画法**只用在插画上**，立绘照第一章立绘（`portrait_pangHu.png`）那样干净。
附 style-ref 只是为了让人长得和概念图里一样。

## 第 2 轮 · 风景：地面和物件（25 张）

地面贴图要和第一章的 `ground_camp.png` 接得上（同样的俯视、同样的亮度）。物件要和第一章的 `prop_camp_hall.png` 同一个斜俯视角度。

| 图名 | 是什么 | 附 |
|---|---|---|
| `ground_mountain_path` | 山腰 · 山石路 | `ground_camp.png` |
| `ground_pine_forest` | 山腰 · 松林地 | `ground_camp.png` |
| `ground_drill_yard` | 山腰 · 演武场黄土 | `ground_camp.png` |
| `ground_stone_stairs` | 山峰 · 石阶 | `ground_camp.png` |
| `ground_palace` | 山峰 · 行宫青砖 | `ground_camp.png` |
| `ground_snow_rock` | 山峰 · 残雪山石 | `ground_camp.png` |
| `prop_pine_big` | 大松树 | style-ref `stage2_plank_road.png`、`prop_camp_hall.png` |
| `prop_pine_small` | 小松树 | style-ref `stage2_plank_road.png`、`prop_camp_hall.png` |
| `prop_plank_road` | 栈道木桥 | style-ref `stage2_plank_road.png`、`prop_camp_hall.png` |
| `prop_army_tent` | 旧军帐 | style-ref `stage2_mountainside_duel.png`、`prop_camp_hall.png` |
| `prop_command_stage` | 点将台 | style-ref `stage2_mountainside_duel.png`、`prop_camp_hall.png` |
| `prop_ring_post` | 擂台木桩 | style-ref `stage2_mountainside_duel.png`、`prop_camp_hall.png` |
| `prop_war_banner` | 军旗（旗上圆圈留空，"彰"字游戏里叠） | style-ref `stage2_mountainside_duel.png`、`prop_camp_hall.png` |
| `prop_hitching_post` | 拴马桩 | style-ref `stage2_mountainside_duel.png`、`prop_camp_hall.png` |
| `prop_weapon_rack_spear` | 长矛架 | style-ref `stage2_mountainside_duel.png`、`prop_camp_hall.png` |
| `prop_cloud` | 飘动的云雾 | style-ref `stage2_plank_road.png` |
| `prop_stone_lion` | 残破石狮 | style-ref `stage3_peak_palace.png`、`prop_camp_hall.png` |
| `prop_broken_stele` | 断碑 | style-ref `stage3_peak_palace.png`、`prop_camp_hall.png` |
| `prop_old_dragon_banner` | 前朝龙旗 | style-ref `stage3_awakened_duel.png`、`prop_camp_hall.png` |
| `prop_palace_gate` | 行宫宫门 | style-ref `stage3_peak_palace.png`、`prop_camp_hall.png` |
| `prop_incense_burner` | 大香炉 | style-ref `stage3_peak_palace.png`、`prop_camp_hall.png` |
| `prop_temple_ruin` | 破庙（任新野山峰的茶摊） | style-ref `stage3_peak_palace.png`、`prop_camp_hall.png` |
| `prop_cage` | 胖虎后院关民女的木笼 | `prop_camp_hall.png` |
| `prop_cage_open` | 木笼 · 门开了 | `prop_cage.png` |
| `prop_embroidery_tower` | 胖虎后院的绣楼 | `prop_camp_hall.png` |

## 第 3 轮 · 地图站姿 _s（13 张，出完先给我看）

| 图名 | 附 |
|---|---|
| `map_baoJinliang_s` | `portrait_baoJinliang.png`、`map_pangHu_s.png`（看大小和视角） |
| `map_zhangHuatian_s` | `portrait_zhangHuatian.png`、`map_pangHu_s.png` |
| `map_zhangHuatianAwake_s` | `portrait_zhangHuatian_awaken.png`、`map_zhangHuatian_s.png` |
| `map_spearman_s` | `portrait_spearman.png`、`map_bandit_s.png` |
| `map_archer_s` | `portrait_archer.png`、`map_thrower_s.png` |
| `map_drillmaster_s` | `portrait_drillmaster.png`、`map_chief_s.png` |
| `map_swordsman_s` | `portrait_swordsman.png`、`map_bandit_s.png` |
| `map_bannerman_s` | `portrait_bannerman.png`、`map_bandit_s.png` |
| `map_captain_s` | `portrait_captain.png`、`map_chief_s.png` |
| `map_maiden1_s` ～ `map_maiden4_s` | `portrait_maiden.png` |

## 第 4 轮 · 其余朝向、姿势、走路（184 张）

每张都附这个人物自己的 `map_<名字>_s.png`，再按 batch5 里每条说明写的附图。
朝向都是 `_se`、`_e`、`_ne`、`_n` 四个（朝左那边游戏里镜像），姿势和走路是 5 个朝向。

| 人物 | 要出的 | 张数 |
|---|---|---|
| 鲍金梁 `baoJinliang` | 站姿另 4 个朝向；ready、thrust、sweep、vault、turn；walk1、walk2 | 39 |
| 彰化天一阶段 `zhangHuatian` | 站姿另 4 个朝向；ready、lash、arc；walk1、walk2；变身 transform_1、transform_2；跪地 kneel | 32 |
| 彰化天二阶段 `zhangHuatianAwake` | 站姿另 4 个朝向；ready、lash、whirl、palm；walk1、walk2 | 34 |
| 老兵矛手 `spearman` | 站姿另 4 个朝向；ready、strike | 14 |
| 弓手 `archer` | 站姿另 4 个朝向；ready、throw | 14 |
| 教头 `drillmaster` | 站姿另 4 个朝向；raise、smash | 14 |
| 前朝死士 `swordsman` | 站姿另 4 个朝向；ready、strike | 14 |
| 旗手 `bannerman` | 站姿另 4 个朝向；ready | 9 |
| 护卫统领 `captain` | 站姿另 4 个朝向；raise、smash | 14 |

实在要省：旗手只出站姿（省 5 张）；小怪的姿势只出 `_s` 和 `_e`（省 60 张左右，别的朝向游戏里用站姿顶着）。

## 第 5 轮 · 招式特效（6 张）

`fx_spear_thrust` 矛刺寒光、`fx_whip_lash` 金鞭直抽、`fx_whip_ring` 回旋鞭金环、`fx_gold_burst` 金光炸开、
`fx_cloth_burst` 衣服崩碎、`fx_ink_smoke` 墨雾遁走。金光那几张附 style-ref `stage3_awakened_duel.png`，照它画金色。

## 可选 · 这 4 张概念图本身

画得好可以直接当二关、三关的**过关插画**（像第一章的 `ending_chapter1`）：比如二关打完放栈道那张，三关开打前放宫门那张。
现在代码只给第一章放过关插画，要用得改一点代码，不用再出图。
