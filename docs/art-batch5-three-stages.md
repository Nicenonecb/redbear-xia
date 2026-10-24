# 第五批出图 · 三关（直接复制给 Codex）

> 2026-10-25 · 配合 [three-stages-plan.md](three-stages-plan.md) 和 [story-three-stages.md](story-three-stages.md)。
> 一共 248 张，分 7 批。写法和第三、四批一样：英文提示词，每条复制整段就行，每条上面的中文是给你看的说明。
> 代码是"图到哪张用哪张"，不用等齐；**先出第 1 批**（立绘、过场、横幅），开发第 2 阶段就用得上。

## 先对 Codex 说这一段（每一批开头说一次）

```text
请按 docs/art-batch5-three-stages.md 里「第 N 批」的提示词逐张出图，要求：
1. 每张图按提示词里写的文件名保存到 public/art/，原尺寸 PNG，不要缩放、不要压缩、不要裁边。
2. 除了地面贴图（ground_*）和过场插画（intro_*、ending_final），其他都要真透明背景，出完检查 alpha。
3. 提示词里写了「attached reference」或说明里写了「附 xxx.png」的，把对应的参考图（都在 public/art/ 里）一起给图像工具。
4. 同一个人物的所有地图图（map_<名字>_*）：画布大小、人物大小、脚底位置必须和他的第一张站姿图（_s）完全一致，不一致就重出。
5. 出好一张就在 public/art/manifest.json 的 images 里加一行 "文件名不带后缀": "文件名.png"。
6. 实际用的提示词记到 docs/art-log/<文件名>.txt。
7. 每批出完运行 python3 tools/map-anchors.py，更新脚底位置和裁边。
8. 每个人物先出立绘和 _s 站姿给我看，确认了再出其余朝向和姿势。
```

## 出图顺序和张数

| 批 | 内容 | 张数 | 什么时候要 |
|---|---|---|---|
| 1 | 鲍金梁、彰化天、民女的立绘；开场过场两张；通关插画；变身横幅；Boss 名牌 | 14 | 开发第 2 阶段起 |
| 2 | 胖虎山寨后院：民女 4 个、木笼（关 / 开）、绣楼 | 7 | 第 2 阶段 |
| 3 | 鲍金梁：地图站姿 5、姿势 25、走路 10 | 40 | 第 3 阶段 |
| 4 | 彰化天：一阶段 30、二阶段 35、变身 2、跪地 1 | 68 | 第 4 阶段 |
| 5 | 新小怪 6 种：登场立绘 + 站姿 + 姿势 | 91 | 第 3、4 阶段 |
| 6 | 山腰、山峰的地面 6 张和物件 16 张 | 22 | 第 3、4 阶段 |
| 7 | 矛刺、金鞭、金环、金光炸开、衣服崩碎、墨雾 | 6 | 第 3～5 阶段 |

**能省的**：第 5 批的小怪最多，走路帧这一批没写（小怪走得少，站姿 + 代码起伏够用）；实在要省，旗手只出站姿。
彰化天的二阶段图名是 `map_zhangHuatianAwake_*`（当成另一个人物来对齐，和胖虎的 `map_tiger_*` 一样）。

## 人物设定要点（出图时对照）

| 人物 | 一定要有 | 不要 |
|---|---|---|
| 鲍金梁 | 健硕武夫、肌肉；旧武官护心镜和一边护肩；长矛带朱红缨；朱红头巾 | 不要像胖虎那样胖；不要满身铠甲（他是落草的武官） |
| 彰化天 · 一阶段 | **黑发束起**（墨玉冠）；褪色的前朝华服、暗纹龙鳞；阴郁冷酷；金光长鞭盘在手里 | 不要白发；不要露肉 |
| 彰化天 · 二阶段 | **白发散开**；上衣崩开挂在腰间、赤膊、精瘦结实有旧伤疤；鞭子金光大盛 | 不要变成怪物，还是那个人 |
| 民女 | 朴素布衣、木簪；害怕或倔强；端庄 | **不要任何性感化**，衣着完整 |
| 金色 | 只用在彰化天的鞭子、金光、名牌的龙纹 | 别处不用金色，整体还是墨 + 宣纸 + 一点朱红 |

## 第 1 批 · 立绘、过场、横幅（先出，第 2 阶段就用得上）

14 张。

### portrait_baoJinliang

鲍金梁立绘（说话时右下角） · 1024x1536，透明背景。不用参考图。

```text
Character portrait illustration named portrait_baoJinliang.png, 1024x1536, vertical full-body standing figure for a wuxia game.
A Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground. Pose: standing feet apart, spear planted beside him, his free hand a clenched fist, chin raised, glaring — a man itching for a duel. Imposing and dangerous, but a real person, not a monster.
Composition: single character, full body, standing on nothing, centered, with a little empty margin on all sides.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### portrait_baoJinliang_angry

鲍金梁 · 怒喝（叫手下一起上） · 1024x1536，透明背景。不用参考图。

```text
Character portrait illustration named portrait_baoJinliang_angry.png, 1024x1536, vertical full-body standing figure for a wuxia game.
A Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground. Pose: roaring with mouth wide open, spear thrust overhead in one hand, veins standing out on his arms, his headband ends whipping.
Composition: single character, full body, standing on nothing, centered, with a little empty margin on all sides.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### portrait_baoJinliang_beaten

鲍金梁 · 被打败（跪地） · 1024x1536，透明背景。不用参考图。

```text
Character portrait illustration named portrait_baoJinliang_beaten.png, 1024x1536, vertical full-body standing figure for a wuxia game.
A Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground. Pose: down on one knee, leaning on his spear, bleeding lip, chest heaving, looking up with a grudging, bitter half-smile.
Composition: single character, full body, standing on nothing, centered, with a little empty margin on all sides.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### portrait_zhangHuatian

彰化天立绘（一阶段，说话时右下角） · 1024x1536，透明背景。不用参考图。

```text
Character portrait illustration named portrait_zhangHuatian.png, 1024x1536, vertical full-body standing figure for a wuxia game.
A Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand. Pose: standing straight and still, one hand behind his back, the glowing whip coiled loosely in the other hand, looking down at the viewer with cold contempt. Gloomy, aristocratic, chilling.
Composition: single character, full body, standing on nothing, centered, with a little empty margin on all sides.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### portrait_zhangHuatian_awaken

彰化天立绘（二阶段：白发散开、赤膊） · 1024x1536，透明背景。不用参考图。

```text
Character portrait illustration named portrait_zhangHuatian_awaken.png, 1024x1536, vertical full-body standing figure for a wuxia game.
A Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand. Pose: standing in a wide stance, white hair blown wildly, the blazing gold whip swirling around him, eyes burning with cold rage.
Composition: single character, full body, standing on nothing, centered, with a little empty margin on all sides.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### portrait_zhangHuatian_beaten

彰化天 · 被打败（跪地，白发遮面） · 1024x1536，透明背景。不用参考图。

```text
Character portrait illustration named portrait_zhangHuatian_beaten.png, 1024x1536, vertical full-body standing figure for a wuxia game.
A Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand. Pose: down on one knee, white hair falling over his face, one hand on the ground, the whip's light fading; a thin cold smile still visible.
Composition: single character, full body, standing on nothing, centered, with a little empty margin on all sides.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### portrait_maiden

被救的民女（道谢时左下角） · 1024x1536，透明背景。不用参考图。

```text
Character portrait illustration named portrait_maiden.png, 1024x1536, vertical full-body standing figure for a wuxia game.
A a young village woman abducted to the bandit camp: simple ivory-and-ink cotton dress, hair in a plain bun with a wooden pin, hands clasped in a respectful thank-you bow, eyes lowered, a little tear-stained but relieved. Gentle, frightened but dignified; NOT sexualized, fully clothed, modest.
Composition: single character, full body, standing on nothing, centered, with a little empty margin on all sides.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### intro_wenShaohua

开场过场 · 温少华拜别师父 · 1920x1080。

```text
Illustration named intro_wenShaohua.png, 1920x1080. Wide cinematic scene: a misty mountain training ground at dawn, bamboo and pines around a flat stone yard. The Red Bear master — a tall hero in a long vermilion hooded cloak with small round bear ears on the hood, face hidden, a long sword across his back — stands on the left with a hand on the shoulder of his kneeling disciple Wen Shaohua (handsome young swordsman, black hair in a silver crown with a vermilion ribbon, black-and-ivory wide-sleeved robe, a jian sword laid across his knees). In the far distance a single mountain rises above the clouds. Large empty misty area across the bottom third (subtitles go there).
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
No text, no letters, no seal stamps.
```

### intro_yuWuxia

开场过场 · 于无瑕拜别师父 · 1920x1080。

```text
Illustration named intro_yuWuxia.png, 1920x1080. Wide cinematic scene: the same misty mountain training ground at dawn. The Red Bear master (tall, long vermilion hooded cloak with bear-ear hood, face hidden, sword across his back) stands on the left; his disciple Yu Wuxia (cool young swordswoman, very long black hair in a high ponytail with a vermilion ribbon, black-and-ivory layered robe, closed black-and-vermilion folding fan in hand) bows with fist-in-palm salute before him. In the far distance a single mountain rises above the clouds. Large empty misty area across the bottom third (subtitles go there).
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
No text, no letters, no seal stamps.
```

### ending_final

通关插画 · 三兄弟逃走后的山峰 · 1920x1080。

```text
Illustration named ending_final.png, 1920x1080. Wide cinematic scene at the summit of a mountain above a sea of clouds, sunset: a small young wuxia hero (ambiguous figure, could be a swordsman or a fan-wielder) stands at the cliff edge seen from behind; beside him, a little taller, the Red Bear master in his long vermilion bear-eared hooded cloak. Far below and away, three tiny dark figures flee along a ridge toward a distant city on a lake (Hangzhou, West Lake, faint pagodas). Upper right: large empty sky (title text goes there).
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
No text, no letters, no seal stamps.
```

### cutin_zhangHuatian_awaken

彰化天变身横幅特写 · 1920x640。

```text
Illustration named cutin_zhangHuatian_awaken.png, 1920x640. Horizontal cut-in close-up, transparent background: Zhang Huatian's face and bare shoulders at the moment of awakening — black hair turning white from the roots and bursting loose, torn robe shreds flying, eyes wide and cold, the glowing gold whip lashing across the frame. Ink splashes and gold sparks burst around him; both left and right ends fade out naturally.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
No text, no letters, no seal stamps.
```

### cutin_baoJinliang_duel

鲍金梁擂台开场横幅特写 · 1920x640。

```text
Illustration named cutin_baoJinliang_duel.png, 1920x640. Horizontal cut-in close-up, transparent background: Bao Jinliang slamming the butt of his spear onto the ground, half his face lit, grinning savagely, his free hand beckoning 'come on'. Ink splashes and dust burst from the spear butt; left and right ends fade out naturally.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
No text, no letters, no seal stamps.
```

### card_boss_baoJinliang

Boss 名牌底图 · 鲍金梁 · 1600x400。

```text
Illustration named card_boss_baoJinliang.png, 1600x400. Boss name banner, transparent background: a horizontal sweep of thick ink brushstroke with flying-white ends, a broken spear-shaft motif in faint ink along it, a small vermilion seal on the right. Leave the middle clear for text (the game writes the name). NO text in the image.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
No text, no letters, no seal stamps.
```

### card_boss_zhangHuatian

Boss 名牌底图 · 彰化天 · 1600x400。

```text
Illustration named card_boss_zhangHuatian.png, 1600x400. Boss name banner, transparent background: a horizontal sweep of thick ink brushstroke with flying-white ends, a faint coiling dragon pattern in pale gold inside the stroke, a small vermilion seal on the right. Leave the middle clear for text. NO text in the image.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
No text, no letters, no seal stamps.
```


## 第 2 批 · 第一关补充：胖虎山寨后院的民女

7 张。

### map_maiden1_s

被抢上山的民女 1 · 朝下。附 `portrait_maiden.png`（先出它）。

```text
Game map character sprite named map_maiden1_s.png for a top-down wuxia game.
Character: a young village woman abducted to the bandit camp: simple ivory-and-ink cotton dress, hair in a plain bun with a wooden pin, standing behind bars with both hands gripping them, frightened. Gentle, frightened but dignified; NOT sexualized, fully clothed, modest.
Use the attached reference portrait_maiden.png ONLY for costume and style; each maiden may have a slightly different face and hair.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Framing: square transparent canvas 1254x1254, full body, character height about 60% of the canvas height (she is smaller than the bandits), the point under her feet at horizontal center, 6% above the bottom edge.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_maiden2_s

被抢上山的民女 2 · 朝下。附 `portrait_maiden.png`（先出它）。

```text
Game map character sprite named map_maiden2_s.png for a top-down wuxia game.
Character: a young village woman abducted to the bandit camp: simple ivory-and-ink cotton dress, hair in a plain bun with a wooden pin, sitting on the ground hugging her knees, looking away. Gentle, frightened but dignified; NOT sexualized, fully clothed, modest.
Use the attached reference portrait_maiden.png ONLY for costume and style; each maiden may have a slightly different face and hair.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Framing: square transparent canvas 1254x1254, full body, character height about 60% of the canvas height (she is smaller than the bandits), the point under her feet at horizontal center, 6% above the bottom edge.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_maiden3_s

被抢上山的民女 3 · 朝下。附 `portrait_maiden.png`（先出它）。

```text
Game map character sprite named map_maiden3_s.png for a top-down wuxia game.
Character: a young village woman abducted to the bandit camp: simple ivory-and-ink cotton dress, hair in a plain bun with a wooden pin, standing with arms crossed, giving a cold defiant stare. Gentle, frightened but dignified; NOT sexualized, fully clothed, modest.
Use the attached reference portrait_maiden.png ONLY for costume and style; each maiden may have a slightly different face and hair.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Framing: square transparent canvas 1254x1254, full body, character height about 60% of the canvas height (she is smaller than the bandits), the point under her feet at horizontal center, 6% above the bottom edge.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_maiden4_s

被抢上山的民女 4 · 朝下。附 `portrait_maiden.png`（先出它）。

```text
Game map character sprite named map_maiden4_s.png for a top-down wuxia game.
Character: a young village woman abducted to the bandit camp: simple ivory-and-ink cotton dress, hair in a plain bun with a wooden pin, standing and comforting another (only she is drawn), one hand reaching out. Gentle, frightened but dignified; NOT sexualized, fully clothed, modest.
Use the attached reference portrait_maiden.png ONLY for costume and style; each maiden may have a slightly different face and hair.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Framing: square transparent canvas 1254x1254, full body, character height about 60% of the canvas height (she is smaller than the bandits), the point under her feet at horizontal center, 6% above the bottom edge.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### prop_cage

关民女的木笼（关着） · 1536x1536。

```text
prop_cage.png, 1536x1536. A large rough wooden cage with thick lashed timber bars and a rope-tied door, empty inside, set on a low plank floor; big enough for four people.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_cage_open

木笼（门打开） · 1536x1536。

```text
prop_cage_open.png, 1536x1536. The SAME large rough wooden cage as prop_cage.png, but its door hangs open and the rope that tied it lies cut on the floor. Match prop_cage.png exactly otherwise (attach it as reference).
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_embroidery_tower

山寨后院的绣楼 · 2048x2048。

```text
prop_embroidery_tower.png, 2048x2048. A small two-storey bandit-camp pavilion hastily decorated as a bridal chamber: red lanterns, a red silk ribbon over the door, shutters closed, rough timber under the decorations.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```


## 第 3 批 · 鲍金梁（地图站姿 5 + 姿势 25 + 走路 10）

40 张。

### map_baoJinliang_s

鲍金梁站姿 · 朝下（面向镜头）。附 `portrait_baoJinliang.png`。

```text
Game map character sprite named map_baoJinliang_s.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: square transparent canvas 1254x1254. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge. At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_se

鲍金梁站姿 · 朝右下。附 `map_baoJinliang_s.png`、`portrait_baoJinliang.png`。

```text
Game map character sprite named map_baoJinliang_se.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_baoJinliang_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_e

鲍金梁站姿 · 朝右。附 `map_baoJinliang_s.png`、`portrait_baoJinliang.png`。

```text
Game map character sprite named map_baoJinliang_e.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_baoJinliang_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_ne

鲍金梁站姿 · 朝右上（背影偏右）。附 `map_baoJinliang_s.png`、`portrait_baoJinliang.png`。

```text
Game map character sprite named map_baoJinliang_ne.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_baoJinliang_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_n

鲍金梁站姿 · 朝上（背影）。附 `map_baoJinliang_s.png`、`portrait_baoJinliang.png`。

```text
Game map character sprite named map_baoJinliang_n.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_baoJinliang_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_ready_s

鲍金梁 · 压矛蓄势 · 朝下（面向镜头）。附 `map_baoJinliang_s.png`。

```text
Game map ACTION FRAME named map_baoJinliang_ready_s.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Ready: spear drawn back at his hip with both hands, point aimed forward, body coiled low, weight on the back leg, about to thrust.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_ready_se

鲍金梁 · 压矛蓄势 · 朝右下。附 `map_baoJinliang_se.png`。

```text
Game map ACTION FRAME named map_baoJinliang_ready_se.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Ready: spear drawn back at his hip with both hands, point aimed forward, body coiled low, weight on the back leg, about to thrust.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_ready_e

鲍金梁 · 压矛蓄势 · 朝右。附 `map_baoJinliang_e.png`。

```text
Game map ACTION FRAME named map_baoJinliang_ready_e.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Ready: spear drawn back at his hip with both hands, point aimed forward, body coiled low, weight on the back leg, about to thrust.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_ready_ne

鲍金梁 · 压矛蓄势 · 朝右上（背影偏右）。附 `map_baoJinliang_ne.png`。

```text
Game map ACTION FRAME named map_baoJinliang_ready_ne.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Ready: spear drawn back at his hip with both hands, point aimed forward, body coiled low, weight on the back leg, about to thrust.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_ready_n

鲍金梁 · 压矛蓄势 · 朝上（背影）。附 `map_baoJinliang_n.png`。

```text
Game map ACTION FRAME named map_baoJinliang_ready_n.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Ready: spear drawn back at his hip with both hands, point aimed forward, body coiled low, weight on the back leg, about to thrust.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_thrust_s

鲍金梁 · 直刺 · 朝下（面向镜头）。附 `map_baoJinliang_s.png`。

```text
Game map ACTION FRAME named map_baoJinliang_thrust_s.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Thrust: the instant of a full-power lunge — front leg bent deep, back leg straight, spear driven straight forward in the facing direction at full arm's length (spear stays inside the canvas).
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_thrust_se

鲍金梁 · 直刺 · 朝右下。附 `map_baoJinliang_se.png`。

```text
Game map ACTION FRAME named map_baoJinliang_thrust_se.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Thrust: the instant of a full-power lunge — front leg bent deep, back leg straight, spear driven straight forward in the facing direction at full arm's length (spear stays inside the canvas).
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_thrust_e

鲍金梁 · 直刺 · 朝右。附 `map_baoJinliang_e.png`。

```text
Game map ACTION FRAME named map_baoJinliang_thrust_e.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Thrust: the instant of a full-power lunge — front leg bent deep, back leg straight, spear driven straight forward in the facing direction at full arm's length (spear stays inside the canvas).
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_thrust_ne

鲍金梁 · 直刺 · 朝右上（背影偏右）。附 `map_baoJinliang_ne.png`。

```text
Game map ACTION FRAME named map_baoJinliang_thrust_ne.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Thrust: the instant of a full-power lunge — front leg bent deep, back leg straight, spear driven straight forward in the facing direction at full arm's length (spear stays inside the canvas).
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_thrust_n

鲍金梁 · 直刺 · 朝上（背影）。附 `map_baoJinliang_n.png`。

```text
Game map ACTION FRAME named map_baoJinliang_thrust_n.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Thrust: the instant of a full-power lunge — front leg bent deep, back leg straight, spear driven straight forward in the facing direction at full arm's length (spear stays inside the canvas).
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_sweep_s

鲍金梁 · 横扫 · 朝下（面向镜头）。附 `map_baoJinliang_s.png`。

```text
Game map ACTION FRAME named map_baoJinliang_sweep_s.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Sweep: spear swung in a wide horizontal arc at waist height, body twisted with the swing, tassel flying, no motion blur.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_sweep_se

鲍金梁 · 横扫 · 朝右下。附 `map_baoJinliang_se.png`。

```text
Game map ACTION FRAME named map_baoJinliang_sweep_se.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Sweep: spear swung in a wide horizontal arc at waist height, body twisted with the swing, tassel flying, no motion blur.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_sweep_e

鲍金梁 · 横扫 · 朝右。附 `map_baoJinliang_e.png`。

```text
Game map ACTION FRAME named map_baoJinliang_sweep_e.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Sweep: spear swung in a wide horizontal arc at waist height, body twisted with the swing, tassel flying, no motion blur.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_sweep_ne

鲍金梁 · 横扫 · 朝右上（背影偏右）。附 `map_baoJinliang_ne.png`。

```text
Game map ACTION FRAME named map_baoJinliang_sweep_ne.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Sweep: spear swung in a wide horizontal arc at waist height, body twisted with the swing, tassel flying, no motion blur.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_sweep_n

鲍金梁 · 横扫 · 朝上（背影）。附 `map_baoJinliang_n.png`。

```text
Game map ACTION FRAME named map_baoJinliang_sweep_n.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Sweep: spear swung in a wide horizontal arc at waist height, body twisted with the swing, tassel flying, no motion blur.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_vault_s

鲍金梁 · 撑矛腾空 · 朝下（面向镜头）。附 `map_baoJinliang_s.png`。

```text
Game map ACTION FRAME named map_baoJinliang_vault_s.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Vault: spear planted in the ground in front of him, his body swung up into the air beside it, both feet off the ground, about to kick.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_vault_se

鲍金梁 · 撑矛腾空 · 朝右下。附 `map_baoJinliang_se.png`。

```text
Game map ACTION FRAME named map_baoJinliang_vault_se.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Vault: spear planted in the ground in front of him, his body swung up into the air beside it, both feet off the ground, about to kick.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_vault_e

鲍金梁 · 撑矛腾空 · 朝右。附 `map_baoJinliang_e.png`。

```text
Game map ACTION FRAME named map_baoJinliang_vault_e.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Vault: spear planted in the ground in front of him, his body swung up into the air beside it, both feet off the ground, about to kick.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_vault_ne

鲍金梁 · 撑矛腾空 · 朝右上（背影偏右）。附 `map_baoJinliang_ne.png`。

```text
Game map ACTION FRAME named map_baoJinliang_vault_ne.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Vault: spear planted in the ground in front of him, his body swung up into the air beside it, both feet off the ground, about to kick.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_vault_n

鲍金梁 · 撑矛腾空 · 朝上（背影）。附 `map_baoJinliang_n.png`。

```text
Game map ACTION FRAME named map_baoJinliang_vault_n.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Vault: spear planted in the ground in front of him, his body swung up into the air beside it, both feet off the ground, about to kick.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_turn_s

鲍金梁 · 回马枪（背身） · 朝下（面向镜头）。附 `map_baoJinliang_s.png`。

```text
Game map ACTION FRAME named map_baoJinliang_turn_s.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Feint: he has turned his back to the facing direction as if retreating, spear dragged behind him, looking back over his shoulder with a sly grin.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_turn_se

鲍金梁 · 回马枪（背身） · 朝右下。附 `map_baoJinliang_se.png`。

```text
Game map ACTION FRAME named map_baoJinliang_turn_se.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Feint: he has turned his back to the facing direction as if retreating, spear dragged behind him, looking back over his shoulder with a sly grin.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_turn_e

鲍金梁 · 回马枪（背身） · 朝右。附 `map_baoJinliang_e.png`。

```text
Game map ACTION FRAME named map_baoJinliang_turn_e.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Feint: he has turned his back to the facing direction as if retreating, spear dragged behind him, looking back over his shoulder with a sly grin.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_turn_ne

鲍金梁 · 回马枪（背身） · 朝右上（背影偏右）。附 `map_baoJinliang_ne.png`。

```text
Game map ACTION FRAME named map_baoJinliang_turn_ne.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Feint: he has turned his back to the facing direction as if retreating, spear dragged behind him, looking back over his shoulder with a sly grin.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_turn_n

鲍金梁 · 回马枪（背身） · 朝上（背影）。附 `map_baoJinliang_n.png`。

```text
Game map ACTION FRAME named map_baoJinliang_turn_n.png for a top-down wuxia game.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Feint: he has turned his back to the facing direction as if retreating, spear dragged behind him, looking back over his shoulder with a sly grin.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_walk1_s

鲍金梁 · 走路 A · 朝下（面向镜头）。附 `map_baoJinliang_s.png`。

```text
Game map WALK-CYCLE FRAME named map_baoJinliang_walk1_s.png for a top-down wuxia game. Frame A of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_s.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Step: his LEFT leg is forward with the heel just planting, his RIGHT leg behind pushing off on the toes; arms swing opposite to the legs. A confident soldier's stride: chest out, shoulders squared, the spear carried upright and swinging only slightly with the step.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_walk2_s

鲍金梁 · 走路 B · 朝下（面向镜头）。附 `map_baoJinliang_s.png`、`map_baoJinliang_walk1_s.png`。

```text
Game map WALK-CYCLE FRAME named map_baoJinliang_walk2_s.png for a top-down wuxia game. Frame B of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_s.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
A second attached reference map_baoJinliang_walk1_s.png is step A of this walk: make step B its MIRROR STEP (opposite leg forward, opposite arm swing), same size and detail.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Step: his RIGHT leg is forward with the heel just planting, his LEFT leg behind pushing off on the toes; arms swing opposite to the legs. A confident soldier's stride: chest out, shoulders squared, the spear carried upright and swinging only slightly with the step.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_walk1_se

鲍金梁 · 走路 A · 朝右下。附 `map_baoJinliang_se.png`。

```text
Game map WALK-CYCLE FRAME named map_baoJinliang_walk1_se.png for a top-down wuxia game. Frame A of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_se.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Step: his LEFT leg is forward with the heel just planting, his RIGHT leg behind pushing off on the toes; arms swing opposite to the legs. A confident soldier's stride: chest out, shoulders squared, the spear carried upright and swinging only slightly with the step.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_walk2_se

鲍金梁 · 走路 B · 朝右下。附 `map_baoJinliang_se.png`、`map_baoJinliang_walk1_se.png`。

```text
Game map WALK-CYCLE FRAME named map_baoJinliang_walk2_se.png for a top-down wuxia game. Frame B of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_se.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
A second attached reference map_baoJinliang_walk1_se.png is step A of this walk: make step B its MIRROR STEP (opposite leg forward, opposite arm swing), same size and detail.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Step: his RIGHT leg is forward with the heel just planting, his LEFT leg behind pushing off on the toes; arms swing opposite to the legs. A confident soldier's stride: chest out, shoulders squared, the spear carried upright and swinging only slightly with the step.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_walk1_e

鲍金梁 · 走路 A · 朝右。附 `map_baoJinliang_e.png`。

```text
Game map WALK-CYCLE FRAME named map_baoJinliang_walk1_e.png for a top-down wuxia game. Frame A of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_e.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Step: his LEFT leg is forward with the heel just planting, his RIGHT leg behind pushing off on the toes; arms swing opposite to the legs. A confident soldier's stride: chest out, shoulders squared, the spear carried upright and swinging only slightly with the step.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_walk2_e

鲍金梁 · 走路 B · 朝右。附 `map_baoJinliang_e.png`、`map_baoJinliang_walk1_e.png`。

```text
Game map WALK-CYCLE FRAME named map_baoJinliang_walk2_e.png for a top-down wuxia game. Frame B of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_e.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
A second attached reference map_baoJinliang_walk1_e.png is step A of this walk: make step B its MIRROR STEP (opposite leg forward, opposite arm swing), same size and detail.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Step: his RIGHT leg is forward with the heel just planting, his LEFT leg behind pushing off on the toes; arms swing opposite to the legs. A confident soldier's stride: chest out, shoulders squared, the spear carried upright and swinging only slightly with the step.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_walk1_ne

鲍金梁 · 走路 A · 朝右上（背影偏右）。附 `map_baoJinliang_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_baoJinliang_walk1_ne.png for a top-down wuxia game. Frame A of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_ne.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Step: his LEFT leg is forward with the heel just planting, his RIGHT leg behind pushing off on the toes; arms swing opposite to the legs. A confident soldier's stride: chest out, shoulders squared, the spear carried upright and swinging only slightly with the step.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_walk2_ne

鲍金梁 · 走路 B · 朝右上（背影偏右）。附 `map_baoJinliang_ne.png`、`map_baoJinliang_walk1_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_baoJinliang_walk2_ne.png for a top-down wuxia game. Frame B of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_ne.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
A second attached reference map_baoJinliang_walk1_ne.png is step A of this walk: make step B its MIRROR STEP (opposite leg forward, opposite arm swing), same size and detail.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Step: his RIGHT leg is forward with the heel just planting, his LEFT leg behind pushing off on the toes; arms swing opposite to the legs. A confident soldier's stride: chest out, shoulders squared, the spear carried upright and swinging only slightly with the step.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_walk1_n

鲍金梁 · 走路 A · 朝上（背影）。附 `map_baoJinliang_n.png`。

```text
Game map WALK-CYCLE FRAME named map_baoJinliang_walk1_n.png for a top-down wuxia game. Frame A of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_n.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Step: his LEFT leg is forward with the heel just planting, his RIGHT leg behind pushing off on the toes; arms swing opposite to the legs. A confident soldier's stride: chest out, shoulders squared, the spear carried upright and swinging only slightly with the step.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_baoJinliang_walk2_n

鲍金梁 · 走路 B · 朝上（背影）。附 `map_baoJinliang_n.png`、`map_baoJinliang_walk1_n.png`。

```text
Game map WALK-CYCLE FRAME named map_baoJinliang_walk2_n.png for a top-down wuxia game. Frame B of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Bao Jinliang (courtesy name Wangyou), a former imperial military officer turned mountain bandit: a tall, powerfully built warrior in his thirties, heavily muscled arms and thick neck, square jaw, short thick beard, fierce brows and a hot-tempered glare, hair tied in a rough topknot with a frayed vermilion headband. He wears the battered remains of an officer's armor — a round dented bronze heart-protector mirror on his chest, one lacquered shoulder guard, leather bracers — over coarse black-and-ivory bandit clothes, a wide vermilion sash, wrapped trousers and heavy boots. Weapon: a long Chinese spear (qiang) taller than himself, with a leaf-shaped steel head and a vermilion horsehair tassel below the blade; held in his RIGHT hand, shaft upright beside his body, butt resting on the ground.
The attached reference map_baoJinliang_n.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
A second attached reference map_baoJinliang_walk1_n.png is step A of this walk: make step B its MIRROR STEP (opposite leg forward, opposite arm swing), same size and detail.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Step: his RIGHT leg is forward with the heel just planting, his LEFT leg behind pushing off on the toes; arms swing opposite to the legs. A confident soldier's stride: chest out, shoulders squared, the spear carried upright and swinging only slightly with the step.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```


## 第 4 批 · 彰化天（一阶段 5 + 15 + 10，二阶段 5 + 20 + 10，变身 2，跪地 1）

68 张。

### map_zhangHuatian_s

彰化天（一阶段）站姿 · 朝下（面向镜头）。附 `portrait_zhangHuatian.png`。

```text
Game map character sprite named map_zhangHuatian_s.png for a top-down wuxia game.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: square transparent canvas 1254x1254. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge. At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_se

彰化天（一阶段）站姿 · 朝右下。附 `map_zhangHuatian_s.png`、`portrait_zhangHuatian.png`。

```text
Game map character sprite named map_zhangHuatian_se.png for a top-down wuxia game.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_zhangHuatian_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_e

彰化天（一阶段）站姿 · 朝右。附 `map_zhangHuatian_s.png`、`portrait_zhangHuatian.png`。

```text
Game map character sprite named map_zhangHuatian_e.png for a top-down wuxia game.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_zhangHuatian_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_ne

彰化天（一阶段）站姿 · 朝右上（背影偏右）。附 `map_zhangHuatian_s.png`、`portrait_zhangHuatian.png`。

```text
Game map character sprite named map_zhangHuatian_ne.png for a top-down wuxia game.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_zhangHuatian_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_n

彰化天（一阶段）站姿 · 朝上（背影）。附 `map_zhangHuatian_s.png`、`portrait_zhangHuatian.png`。

```text
Game map character sprite named map_zhangHuatian_n.png for a top-down wuxia game.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_zhangHuatian_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_ready_s

彰化天（一阶段） · 扬鞭 · 朝下（面向镜头）。附 `map_zhangHuatian_s.png`。

```text
Game map ACTION FRAME named map_zhangHuatian_ready_s.png for a top-down wuxia game.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Ready: whip arm raised high behind his head, the glowing whip uncoiling in a loose S-curve above him, cold eyes on the target.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_ready_se

彰化天（一阶段） · 扬鞭 · 朝右下。附 `map_zhangHuatian_se.png`。

```text
Game map ACTION FRAME named map_zhangHuatian_ready_se.png for a top-down wuxia game.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Ready: whip arm raised high behind his head, the glowing whip uncoiling in a loose S-curve above him, cold eyes on the target.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_ready_e

彰化天（一阶段） · 扬鞭 · 朝右。附 `map_zhangHuatian_e.png`。

```text
Game map ACTION FRAME named map_zhangHuatian_ready_e.png for a top-down wuxia game.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Ready: whip arm raised high behind his head, the glowing whip uncoiling in a loose S-curve above him, cold eyes on the target.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_ready_ne

彰化天（一阶段） · 扬鞭 · 朝右上（背影偏右）。附 `map_zhangHuatian_ne.png`。

```text
Game map ACTION FRAME named map_zhangHuatian_ready_ne.png for a top-down wuxia game.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Ready: whip arm raised high behind his head, the glowing whip uncoiling in a loose S-curve above him, cold eyes on the target.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_ready_n

彰化天（一阶段） · 扬鞭 · 朝上（背影）。附 `map_zhangHuatian_n.png`。

```text
Game map ACTION FRAME named map_zhangHuatian_ready_n.png for a top-down wuxia game.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Ready: whip arm raised high behind his head, the glowing whip uncoiling in a loose S-curve above him, cold eyes on the target.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_lash_s

彰化天（一阶段） · 直抽 · 朝下（面向镜头）。附 `map_zhangHuatian_s.png`。

```text
Game map ACTION FRAME named map_zhangHuatian_lash_s.png for a top-down wuxia game.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Lash: whip arm snapped forward and down, the glowing whip stretched out in a long straight line in the facing direction (keep it inside the canvas; it can run toward the canvas edge).
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_lash_se

彰化天（一阶段） · 直抽 · 朝右下。附 `map_zhangHuatian_se.png`。

```text
Game map ACTION FRAME named map_zhangHuatian_lash_se.png for a top-down wuxia game.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Lash: whip arm snapped forward and down, the glowing whip stretched out in a long straight line in the facing direction (keep it inside the canvas; it can run toward the canvas edge).
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_lash_e

彰化天（一阶段） · 直抽 · 朝右。附 `map_zhangHuatian_e.png`。

```text
Game map ACTION FRAME named map_zhangHuatian_lash_e.png for a top-down wuxia game.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Lash: whip arm snapped forward and down, the glowing whip stretched out in a long straight line in the facing direction (keep it inside the canvas; it can run toward the canvas edge).
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_lash_ne

彰化天（一阶段） · 直抽 · 朝右上（背影偏右）。附 `map_zhangHuatian_ne.png`。

```text
Game map ACTION FRAME named map_zhangHuatian_lash_ne.png for a top-down wuxia game.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Lash: whip arm snapped forward and down, the glowing whip stretched out in a long straight line in the facing direction (keep it inside the canvas; it can run toward the canvas edge).
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_lash_n

彰化天（一阶段） · 直抽 · 朝上（背影）。附 `map_zhangHuatian_n.png`。

```text
Game map ACTION FRAME named map_zhangHuatian_lash_n.png for a top-down wuxia game.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Lash: whip arm snapped forward and down, the glowing whip stretched out in a long straight line in the facing direction (keep it inside the canvas; it can run toward the canvas edge).
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_arc_s

彰化天（一阶段） · 回旋鞭 · 朝下（面向镜头）。附 `map_zhangHuatian_s.png`。

```text
Game map ACTION FRAME named map_zhangHuatian_arc_s.png for a top-down wuxia game.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Spin: whip whirling in a horizontal circle around him at shoulder height, his robes swirling, one hand raised.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_arc_se

彰化天（一阶段） · 回旋鞭 · 朝右下。附 `map_zhangHuatian_se.png`。

```text
Game map ACTION FRAME named map_zhangHuatian_arc_se.png for a top-down wuxia game.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Spin: whip whirling in a horizontal circle around him at shoulder height, his robes swirling, one hand raised.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_arc_e

彰化天（一阶段） · 回旋鞭 · 朝右。附 `map_zhangHuatian_e.png`。

```text
Game map ACTION FRAME named map_zhangHuatian_arc_e.png for a top-down wuxia game.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Spin: whip whirling in a horizontal circle around him at shoulder height, his robes swirling, one hand raised.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_arc_ne

彰化天（一阶段） · 回旋鞭 · 朝右上（背影偏右）。附 `map_zhangHuatian_ne.png`。

```text
Game map ACTION FRAME named map_zhangHuatian_arc_ne.png for a top-down wuxia game.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Spin: whip whirling in a horizontal circle around him at shoulder height, his robes swirling, one hand raised.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_arc_n

彰化天（一阶段） · 回旋鞭 · 朝上（背影）。附 `map_zhangHuatian_n.png`。

```text
Game map ACTION FRAME named map_zhangHuatian_arc_n.png for a top-down wuxia game.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Spin: whip whirling in a horizontal circle around him at shoulder height, his robes swirling, one hand raised.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_walk1_s

彰化天（一阶段） · 走路 A · 朝下（面向镜头）。附 `map_zhangHuatian_s.png`。

```text
Game map WALK-CYCLE FRAME named map_zhangHuatian_walk1_s.png for a top-down wuxia game. Frame A of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_s.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Step: his LEFT leg is forward with the heel just planting, his RIGHT leg behind pushing off on the toes; arms swing opposite to the legs. A slow, cold, princely walk: upright, unhurried, almost gliding, sleeves barely moving, the coiled whip held still.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_walk2_s

彰化天（一阶段） · 走路 B · 朝下（面向镜头）。附 `map_zhangHuatian_s.png`、`map_zhangHuatian_walk1_s.png`。

```text
Game map WALK-CYCLE FRAME named map_zhangHuatian_walk2_s.png for a top-down wuxia game. Frame B of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_s.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
A second attached reference map_zhangHuatian_walk1_s.png is step A of this walk: make step B its MIRROR STEP (opposite leg forward, opposite arm swing), same size and detail.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Step: his RIGHT leg is forward with the heel just planting, his LEFT leg behind pushing off on the toes; arms swing opposite to the legs. A slow, cold, princely walk: upright, unhurried, almost gliding, sleeves barely moving, the coiled whip held still.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_walk1_se

彰化天（一阶段） · 走路 A · 朝右下。附 `map_zhangHuatian_se.png`。

```text
Game map WALK-CYCLE FRAME named map_zhangHuatian_walk1_se.png for a top-down wuxia game. Frame A of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_se.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Step: his LEFT leg is forward with the heel just planting, his RIGHT leg behind pushing off on the toes; arms swing opposite to the legs. A slow, cold, princely walk: upright, unhurried, almost gliding, sleeves barely moving, the coiled whip held still.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_walk2_se

彰化天（一阶段） · 走路 B · 朝右下。附 `map_zhangHuatian_se.png`、`map_zhangHuatian_walk1_se.png`。

```text
Game map WALK-CYCLE FRAME named map_zhangHuatian_walk2_se.png for a top-down wuxia game. Frame B of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_se.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
A second attached reference map_zhangHuatian_walk1_se.png is step A of this walk: make step B its MIRROR STEP (opposite leg forward, opposite arm swing), same size and detail.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Step: his RIGHT leg is forward with the heel just planting, his LEFT leg behind pushing off on the toes; arms swing opposite to the legs. A slow, cold, princely walk: upright, unhurried, almost gliding, sleeves barely moving, the coiled whip held still.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_walk1_e

彰化天（一阶段） · 走路 A · 朝右。附 `map_zhangHuatian_e.png`。

```text
Game map WALK-CYCLE FRAME named map_zhangHuatian_walk1_e.png for a top-down wuxia game. Frame A of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_e.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Step: his LEFT leg is forward with the heel just planting, his RIGHT leg behind pushing off on the toes; arms swing opposite to the legs. A slow, cold, princely walk: upright, unhurried, almost gliding, sleeves barely moving, the coiled whip held still.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_walk2_e

彰化天（一阶段） · 走路 B · 朝右。附 `map_zhangHuatian_e.png`、`map_zhangHuatian_walk1_e.png`。

```text
Game map WALK-CYCLE FRAME named map_zhangHuatian_walk2_e.png for a top-down wuxia game. Frame B of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_e.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
A second attached reference map_zhangHuatian_walk1_e.png is step A of this walk: make step B its MIRROR STEP (opposite leg forward, opposite arm swing), same size and detail.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Step: his RIGHT leg is forward with the heel just planting, his LEFT leg behind pushing off on the toes; arms swing opposite to the legs. A slow, cold, princely walk: upright, unhurried, almost gliding, sleeves barely moving, the coiled whip held still.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_walk1_ne

彰化天（一阶段） · 走路 A · 朝右上（背影偏右）。附 `map_zhangHuatian_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_zhangHuatian_walk1_ne.png for a top-down wuxia game. Frame A of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_ne.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Step: his LEFT leg is forward with the heel just planting, his RIGHT leg behind pushing off on the toes; arms swing opposite to the legs. A slow, cold, princely walk: upright, unhurried, almost gliding, sleeves barely moving, the coiled whip held still.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_walk2_ne

彰化天（一阶段） · 走路 B · 朝右上（背影偏右）。附 `map_zhangHuatian_ne.png`、`map_zhangHuatian_walk1_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_zhangHuatian_walk2_ne.png for a top-down wuxia game. Frame B of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_ne.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
A second attached reference map_zhangHuatian_walk1_ne.png is step A of this walk: make step B its MIRROR STEP (opposite leg forward, opposite arm swing), same size and detail.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Step: his RIGHT leg is forward with the heel just planting, his LEFT leg behind pushing off on the toes; arms swing opposite to the legs. A slow, cold, princely walk: upright, unhurried, almost gliding, sleeves barely moving, the coiled whip held still.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_walk1_n

彰化天（一阶段） · 走路 A · 朝上（背影）。附 `map_zhangHuatian_n.png`。

```text
Game map WALK-CYCLE FRAME named map_zhangHuatian_walk1_n.png for a top-down wuxia game. Frame A of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_n.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Step: his LEFT leg is forward with the heel just planting, his RIGHT leg behind pushing off on the toes; arms swing opposite to the legs. A slow, cold, princely walk: upright, unhurried, almost gliding, sleeves barely moving, the coiled whip held still.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_walk2_n

彰化天（一阶段） · 走路 B · 朝上（背影）。附 `map_zhangHuatian_n.png`、`map_zhangHuatian_walk1_n.png`。

```text
Game map WALK-CYCLE FRAME named map_zhangHuatian_walk2_n.png for a top-down wuxia game. Frame B of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_n.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
A second attached reference map_zhangHuatian_walk1_n.png is step A of this walk: make step B its MIRROR STEP (opposite leg forward, opposite arm swing), same size and detail.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Step: his RIGHT leg is forward with the heel just planting, his LEFT leg behind pushing off on the toes; arms swing opposite to the legs. A slow, cold, princely walk: upright, unhurried, almost gliding, sleeves barely moving, the coiled whip held still.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_s

彰化天（二阶段）站姿 · 朝下（面向镜头）。附 `portrait_zhangHuatian_awaken.png`。

```text
Game map character sprite named map_zhangHuatianAwake_s.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: square transparent canvas 1254x1254. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge. At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_se

彰化天（二阶段）站姿 · 朝右下。附 `map_zhangHuatianAwake_s.png`、`portrait_zhangHuatian_awaken.png`。

```text
Game map character sprite named map_zhangHuatianAwake_se.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_zhangHuatianAwake_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_e

彰化天（二阶段）站姿 · 朝右。附 `map_zhangHuatianAwake_s.png`、`portrait_zhangHuatian_awaken.png`。

```text
Game map character sprite named map_zhangHuatianAwake_e.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_zhangHuatianAwake_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_ne

彰化天（二阶段）站姿 · 朝右上（背影偏右）。附 `map_zhangHuatianAwake_s.png`、`portrait_zhangHuatian_awaken.png`。

```text
Game map character sprite named map_zhangHuatianAwake_ne.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_zhangHuatianAwake_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_n

彰化天（二阶段）站姿 · 朝上（背影）。附 `map_zhangHuatianAwake_s.png`、`portrait_zhangHuatian_awaken.png`。

```text
Game map character sprite named map_zhangHuatianAwake_n.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_zhangHuatianAwake_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_ready_s

彰化天（二阶段） · 蓄势 · 朝下（面向镜头）。附 `map_zhangHuatianAwake_s.png`。

```text
Game map ACTION FRAME named map_zhangHuatianAwake_ready_s.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Ready: crouched low and forward like a predator, blazing whip trailing on the ground behind him, white hair streaming.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_ready_se

彰化天（二阶段） · 蓄势 · 朝右下。附 `map_zhangHuatianAwake_se.png`。

```text
Game map ACTION FRAME named map_zhangHuatianAwake_ready_se.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Ready: crouched low and forward like a predator, blazing whip trailing on the ground behind him, white hair streaming.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_ready_e

彰化天（二阶段） · 蓄势 · 朝右。附 `map_zhangHuatianAwake_e.png`。

```text
Game map ACTION FRAME named map_zhangHuatianAwake_ready_e.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Ready: crouched low and forward like a predator, blazing whip trailing on the ground behind him, white hair streaming.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_ready_ne

彰化天（二阶段） · 蓄势 · 朝右上（背影偏右）。附 `map_zhangHuatianAwake_ne.png`。

```text
Game map ACTION FRAME named map_zhangHuatianAwake_ready_ne.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Ready: crouched low and forward like a predator, blazing whip trailing on the ground behind him, white hair streaming.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_ready_n

彰化天（二阶段） · 蓄势 · 朝上（背影）。附 `map_zhangHuatianAwake_n.png`。

```text
Game map ACTION FRAME named map_zhangHuatianAwake_ready_n.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Ready: crouched low and forward like a predator, blazing whip trailing on the ground behind him, white hair streaming.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_lash_s

彰化天（二阶段） · 双鞭连抽 · 朝下（面向镜头）。附 `map_zhangHuatianAwake_s.png`。

```text
Game map ACTION FRAME named map_zhangHuatianAwake_lash_s.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Lash: whip snapped forward in a long straight line in the facing direction, body leaning hard into it, white hair whipping.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_lash_se

彰化天（二阶段） · 双鞭连抽 · 朝右下。附 `map_zhangHuatianAwake_se.png`。

```text
Game map ACTION FRAME named map_zhangHuatianAwake_lash_se.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Lash: whip snapped forward in a long straight line in the facing direction, body leaning hard into it, white hair whipping.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_lash_e

彰化天（二阶段） · 双鞭连抽 · 朝右。附 `map_zhangHuatianAwake_e.png`。

```text
Game map ACTION FRAME named map_zhangHuatianAwake_lash_e.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Lash: whip snapped forward in a long straight line in the facing direction, body leaning hard into it, white hair whipping.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_lash_ne

彰化天（二阶段） · 双鞭连抽 · 朝右上（背影偏右）。附 `map_zhangHuatianAwake_ne.png`。

```text
Game map ACTION FRAME named map_zhangHuatianAwake_lash_ne.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Lash: whip snapped forward in a long straight line in the facing direction, body leaning hard into it, white hair whipping.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_lash_n

彰化天（二阶段） · 双鞭连抽 · 朝上（背影）。附 `map_zhangHuatianAwake_n.png`。

```text
Game map ACTION FRAME named map_zhangHuatianAwake_lash_n.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Lash: whip snapped forward in a long straight line in the facing direction, body leaning hard into it, white hair whipping.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_whirl_s

彰化天（二阶段） · 金龙卷 · 朝下（面向镜头）。附 `map_zhangHuatianAwake_s.png`。

```text
Game map ACTION FRAME named map_zhangHuatianAwake_whirl_s.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Whirl: spinning on one foot, the blazing whip swirled all the way around him in a full circle, white hair flaring outward.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_whirl_se

彰化天（二阶段） · 金龙卷 · 朝右下。附 `map_zhangHuatianAwake_se.png`。

```text
Game map ACTION FRAME named map_zhangHuatianAwake_whirl_se.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Whirl: spinning on one foot, the blazing whip swirled all the way around him in a full circle, white hair flaring outward.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_whirl_e

彰化天（二阶段） · 金龙卷 · 朝右。附 `map_zhangHuatianAwake_e.png`。

```text
Game map ACTION FRAME named map_zhangHuatianAwake_whirl_e.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Whirl: spinning on one foot, the blazing whip swirled all the way around him in a full circle, white hair flaring outward.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_whirl_ne

彰化天（二阶段） · 金龙卷 · 朝右上（背影偏右）。附 `map_zhangHuatianAwake_ne.png`。

```text
Game map ACTION FRAME named map_zhangHuatianAwake_whirl_ne.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Whirl: spinning on one foot, the blazing whip swirled all the way around him in a full circle, white hair flaring outward.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_whirl_n

彰化天（二阶段） · 金龙卷 · 朝上（背影）。附 `map_zhangHuatianAwake_n.png`。

```text
Game map ACTION FRAME named map_zhangHuatianAwake_whirl_n.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Whirl: spinning on one foot, the blazing whip swirled all the way around him in a full circle, white hair flaring outward.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_palm_s

彰化天（二阶段） · 碎心掌 · 朝下（面向镜头）。附 `map_zhangHuatianAwake_s.png`。

```text
Game map ACTION FRAME named map_zhangHuatianAwake_palm_s.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Palm strike: lunging forward with an open-palm strike at full extension, whip hand drawn back, face fierce.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_palm_se

彰化天（二阶段） · 碎心掌 · 朝右下。附 `map_zhangHuatianAwake_se.png`。

```text
Game map ACTION FRAME named map_zhangHuatianAwake_palm_se.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Palm strike: lunging forward with an open-palm strike at full extension, whip hand drawn back, face fierce.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_palm_e

彰化天（二阶段） · 碎心掌 · 朝右。附 `map_zhangHuatianAwake_e.png`。

```text
Game map ACTION FRAME named map_zhangHuatianAwake_palm_e.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Palm strike: lunging forward with an open-palm strike at full extension, whip hand drawn back, face fierce.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_palm_ne

彰化天（二阶段） · 碎心掌 · 朝右上（背影偏右）。附 `map_zhangHuatianAwake_ne.png`。

```text
Game map ACTION FRAME named map_zhangHuatianAwake_palm_ne.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Palm strike: lunging forward with an open-palm strike at full extension, whip hand drawn back, face fierce.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_palm_n

彰化天（二阶段） · 碎心掌 · 朝上（背影）。附 `map_zhangHuatianAwake_n.png`。

```text
Game map ACTION FRAME named map_zhangHuatianAwake_palm_n.png for a top-down wuxia game.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Palm strike: lunging forward with an open-palm strike at full extension, whip hand drawn back, face fierce.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_walk1_s

彰化天（二阶段） · 走路 A · 朝下（面向镜头）。附 `map_zhangHuatianAwake_s.png`。

```text
Game map WALK-CYCLE FRAME named map_zhangHuatianAwake_walk1_s.png for a top-down wuxia game. Frame A of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_s.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Step: his LEFT leg is forward with the heel just planting, his RIGHT leg behind pushing off on the toes; arms swing opposite to the legs. A fast, aggressive stalking walk: body low and forward, bare shoulders rolling, the blazing whip dragging behind.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_walk2_s

彰化天（二阶段） · 走路 B · 朝下（面向镜头）。附 `map_zhangHuatianAwake_s.png`、`map_zhangHuatianAwake_walk1_s.png`。

```text
Game map WALK-CYCLE FRAME named map_zhangHuatianAwake_walk2_s.png for a top-down wuxia game. Frame B of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_s.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
A second attached reference map_zhangHuatianAwake_walk1_s.png is step A of this walk: make step B its MIRROR STEP (opposite leg forward, opposite arm swing), same size and detail.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Step: his RIGHT leg is forward with the heel just planting, his LEFT leg behind pushing off on the toes; arms swing opposite to the legs. A fast, aggressive stalking walk: body low and forward, bare shoulders rolling, the blazing whip dragging behind.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_walk1_se

彰化天（二阶段） · 走路 A · 朝右下。附 `map_zhangHuatianAwake_se.png`。

```text
Game map WALK-CYCLE FRAME named map_zhangHuatianAwake_walk1_se.png for a top-down wuxia game. Frame A of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_se.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Step: his LEFT leg is forward with the heel just planting, his RIGHT leg behind pushing off on the toes; arms swing opposite to the legs. A fast, aggressive stalking walk: body low and forward, bare shoulders rolling, the blazing whip dragging behind.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_walk2_se

彰化天（二阶段） · 走路 B · 朝右下。附 `map_zhangHuatianAwake_se.png`、`map_zhangHuatianAwake_walk1_se.png`。

```text
Game map WALK-CYCLE FRAME named map_zhangHuatianAwake_walk2_se.png for a top-down wuxia game. Frame B of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_se.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
A second attached reference map_zhangHuatianAwake_walk1_se.png is step A of this walk: make step B its MIRROR STEP (opposite leg forward, opposite arm swing), same size and detail.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Step: his RIGHT leg is forward with the heel just planting, his LEFT leg behind pushing off on the toes; arms swing opposite to the legs. A fast, aggressive stalking walk: body low and forward, bare shoulders rolling, the blazing whip dragging behind.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_walk1_e

彰化天（二阶段） · 走路 A · 朝右。附 `map_zhangHuatianAwake_e.png`。

```text
Game map WALK-CYCLE FRAME named map_zhangHuatianAwake_walk1_e.png for a top-down wuxia game. Frame A of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_e.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Step: his LEFT leg is forward with the heel just planting, his RIGHT leg behind pushing off on the toes; arms swing opposite to the legs. A fast, aggressive stalking walk: body low and forward, bare shoulders rolling, the blazing whip dragging behind.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_walk2_e

彰化天（二阶段） · 走路 B · 朝右。附 `map_zhangHuatianAwake_e.png`、`map_zhangHuatianAwake_walk1_e.png`。

```text
Game map WALK-CYCLE FRAME named map_zhangHuatianAwake_walk2_e.png for a top-down wuxia game. Frame B of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_e.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
A second attached reference map_zhangHuatianAwake_walk1_e.png is step A of this walk: make step B its MIRROR STEP (opposite leg forward, opposite arm swing), same size and detail.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Step: his RIGHT leg is forward with the heel just planting, his LEFT leg behind pushing off on the toes; arms swing opposite to the legs. A fast, aggressive stalking walk: body low and forward, bare shoulders rolling, the blazing whip dragging behind.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_walk1_ne

彰化天（二阶段） · 走路 A · 朝右上（背影偏右）。附 `map_zhangHuatianAwake_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_zhangHuatianAwake_walk1_ne.png for a top-down wuxia game. Frame A of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_ne.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Step: his LEFT leg is forward with the heel just planting, his RIGHT leg behind pushing off on the toes; arms swing opposite to the legs. A fast, aggressive stalking walk: body low and forward, bare shoulders rolling, the blazing whip dragging behind.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_walk2_ne

彰化天（二阶段） · 走路 B · 朝右上（背影偏右）。附 `map_zhangHuatianAwake_ne.png`、`map_zhangHuatianAwake_walk1_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_zhangHuatianAwake_walk2_ne.png for a top-down wuxia game. Frame B of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_ne.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
A second attached reference map_zhangHuatianAwake_walk1_ne.png is step A of this walk: make step B its MIRROR STEP (opposite leg forward, opposite arm swing), same size and detail.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Step: his RIGHT leg is forward with the heel just planting, his LEFT leg behind pushing off on the toes; arms swing opposite to the legs. A fast, aggressive stalking walk: body low and forward, bare shoulders rolling, the blazing whip dragging behind.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_walk1_n

彰化天（二阶段） · 走路 A · 朝上（背影）。附 `map_zhangHuatianAwake_n.png`。

```text
Game map WALK-CYCLE FRAME named map_zhangHuatianAwake_walk1_n.png for a top-down wuxia game. Frame A of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_n.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Step: his LEFT leg is forward with the heel just planting, his RIGHT leg behind pushing off on the toes; arms swing opposite to the legs. A fast, aggressive stalking walk: body low and forward, bare shoulders rolling, the blazing whip dragging behind.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatianAwake_walk2_n

彰化天（二阶段） · 走路 B · 朝上（背影）。附 `map_zhangHuatianAwake_n.png`、`map_zhangHuatianAwake_walk1_n.png`。

```text
Game map WALK-CYCLE FRAME named map_zhangHuatianAwake_walk2_n.png for a top-down wuxia game. Frame B of a 4-frame loop: step A → standing reference → step B → standing reference.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_n.png is the SAME character standing in the SAME direction — the master image. Keep IDENTICAL: canvas size, head size and position, total height, foot anchor point (midpoint between the feet at horizontal center, 6% above the bottom), face, hair, costume, weapon, colours and line weight. ONLY the legs, arm swing and the sway of cloth change — this frame alternates with the reference several times per second, so any other difference will flicker. Overlay-check against the reference before saving.
A second attached reference map_zhangHuatianAwake_walk1_n.png is step A of this walk: make step B its MIRROR STEP (opposite leg forward, opposite arm swing), same size and detail.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Step: his RIGHT leg is forward with the heel just planting, his LEFT leg behind pushing off on the toes; arms swing opposite to the legs. A fast, aggressive stalking walk: body low and forward, bare shoulders rolling, the blazing whip dragging behind.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_transform_1

彰化天变身 1：扯开束发、金光从脚下涌起 · 朝下。附 `map_zhangHuatian_s.png`。

```text
Game map character sprite named map_zhangHuatian_transform_1.png.
Character: Zhang Huatian, an exiled prince of the fallen former dynasty: tall and lean, pale, handsome, with a cold, brooding, melancholy expression and narrow dark eyes. Long BLACK hair neatly bound up in a high topknot with a small dark-jade crown, a few strands loose at the temples. He wears elegant but faded old-dynasty court robes: deep ink-black outer robe with subtle dragon-scale patterns, ivory inner collar, wide sleeves, a dull vermilion inner lining, a jade pendant. Weapon: a long, thin braided WHIP that faintly glows warm pale gold, coiled in his RIGHT hand.
The attached reference map_zhangHuatian_s.png is the same character standing facing the camera; keep EXACTLY the same canvas size, body size and foot anchor point.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: the moment his awakening begins — head thrown back, one hand tearing the jade crown from his topknot so his black hair starts to fall loose, pale-gold light welling up from the ground around his feet, his robe's sleeves billowing upward.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_transform_2

彰化天变身 2：白发炸开、上衣崩碎 · 朝下。附 `map_zhangHuatianAwake_s.png`。

```text
Game map character sprite named map_zhangHuatian_transform_2.png.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_s.png is the same character (second form) standing facing the camera; keep EXACTLY the same canvas size, body size and foot anchor point.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: the instant of the burst — arms flung wide, hair turning WHITE and exploding outward, the upper robe shredding into flying cloth strips, bright gold light bursting from his body (the light stays close around him).
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_zhangHuatian_kneel

彰化天被打败：单膝跪地 · 朝下。附 `map_zhangHuatianAwake_s.png`。

```text
Game map character sprite named map_zhangHuatian_kneel.png.
Character: Zhang Huatian in his awakened second form: the same tall, lean exiled prince, now with his hair turned WHITE and loose, long white hair flowing wildly past his shoulders; his upper robe torn away and hanging in shreds from his waist sash, bare upper body that is lean, wiry and hard with defined muscles and old scars; cold furious eyes. Lower body: the same dark court trousers and boots as his first form. Weapon: the long braided whip, now blazing with bright pale-gold light, uncoiled and trailing on the ground from his RIGHT hand.
The attached reference map_zhangHuatianAwake_s.png is the same character standing facing the camera; keep EXACTLY the same canvas size, body scale and foot anchor point.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: defeated, down on one knee, one hand on the ground, white hair falling over his face, the whip lying slack and its light fading.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```


## 第 5 批 · 新小怪（每种：登场立绘 1 + 站姿 5 + 姿势 5～10）

91 张。

### portrait_spearman

老兵矛手立绘（登场卡） · 1024x1536，透明背景。不用参考图。

```text
Character portrait illustration named portrait_spearman.png, 1024x1536, vertical full-body standing figure for a wuxia game.
A a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, battered conical helmet, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a plain long spear held in both hands, point forward and slightly down. Pose: standing ready for a fight, weapon in hand.
Composition: single character, full body, standing on nothing, centered, with a little empty margin on all sides.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_spearman_s

老兵矛手站姿 · 朝下（面向镜头）。附 `portrait_spearman.png`。

```text
Game map character sprite named map_spearman_s.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, battered conical helmet, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a plain long spear held in both hands, point forward and slightly down.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: square transparent canvas 1254x1254. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge. At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_spearman_se

老兵矛手站姿 · 朝右下。附 `map_spearman_s.png`、`portrait_spearman.png`。

```text
Game map character sprite named map_spearman_se.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, battered conical helmet, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a plain long spear held in both hands, point forward and slightly down.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_spearman_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_spearman_e

老兵矛手站姿 · 朝右。附 `map_spearman_s.png`、`portrait_spearman.png`。

```text
Game map character sprite named map_spearman_e.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, battered conical helmet, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a plain long spear held in both hands, point forward and slightly down.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_spearman_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_spearman_ne

老兵矛手站姿 · 朝右上（背影偏右）。附 `map_spearman_s.png`、`portrait_spearman.png`。

```text
Game map character sprite named map_spearman_ne.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, battered conical helmet, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a plain long spear held in both hands, point forward and slightly down.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_spearman_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_spearman_n

老兵矛手站姿 · 朝上（背影）。附 `map_spearman_s.png`、`portrait_spearman.png`。

```text
Game map character sprite named map_spearman_n.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, battered conical helmet, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a plain long spear held in both hands, point forward and slightly down.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_spearman_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_spearman_ready_s

老兵矛手 · 压矛 · 朝下（面向镜头）。附 `map_spearman_s.png`。

```text
Game map ACTION FRAME named map_spearman_ready_s.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, battered conical helmet, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a plain long spear held in both hands, point forward and slightly down.
The attached reference map_spearman_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Ready: spear drawn back, point low, body coiled.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_spearman_ready_se

老兵矛手 · 压矛 · 朝右下。附 `map_spearman_se.png`。

```text
Game map ACTION FRAME named map_spearman_ready_se.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, battered conical helmet, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a plain long spear held in both hands, point forward and slightly down.
The attached reference map_spearman_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Ready: spear drawn back, point low, body coiled.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_spearman_ready_e

老兵矛手 · 压矛 · 朝右。附 `map_spearman_e.png`。

```text
Game map ACTION FRAME named map_spearman_ready_e.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, battered conical helmet, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a plain long spear held in both hands, point forward and slightly down.
The attached reference map_spearman_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Ready: spear drawn back, point low, body coiled.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_spearman_ready_ne

老兵矛手 · 压矛 · 朝右上（背影偏右）。附 `map_spearman_ne.png`。

```text
Game map ACTION FRAME named map_spearman_ready_ne.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, battered conical helmet, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a plain long spear held in both hands, point forward and slightly down.
The attached reference map_spearman_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Ready: spear drawn back, point low, body coiled.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_spearman_ready_n

老兵矛手 · 压矛 · 朝上（背影）。附 `map_spearman_n.png`。

```text
Game map ACTION FRAME named map_spearman_ready_n.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, battered conical helmet, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a plain long spear held in both hands, point forward and slightly down.
The attached reference map_spearman_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Ready: spear drawn back, point low, body coiled.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_spearman_strike_s

老兵矛手 · 突刺 · 朝下（面向镜头）。附 `map_spearman_s.png`。

```text
Game map ACTION FRAME named map_spearman_strike_s.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, battered conical helmet, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a plain long spear held in both hands, point forward and slightly down.
The attached reference map_spearman_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Strike: lunging spear thrust straight forward at full extension.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_spearman_strike_se

老兵矛手 · 突刺 · 朝右下。附 `map_spearman_se.png`。

```text
Game map ACTION FRAME named map_spearman_strike_se.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, battered conical helmet, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a plain long spear held in both hands, point forward and slightly down.
The attached reference map_spearman_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Strike: lunging spear thrust straight forward at full extension.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_spearman_strike_e

老兵矛手 · 突刺 · 朝右。附 `map_spearman_e.png`。

```text
Game map ACTION FRAME named map_spearman_strike_e.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, battered conical helmet, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a plain long spear held in both hands, point forward and slightly down.
The attached reference map_spearman_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Strike: lunging spear thrust straight forward at full extension.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_spearman_strike_ne

老兵矛手 · 突刺 · 朝右上（背影偏右）。附 `map_spearman_ne.png`。

```text
Game map ACTION FRAME named map_spearman_strike_ne.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, battered conical helmet, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a plain long spear held in both hands, point forward and slightly down.
The attached reference map_spearman_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Strike: lunging spear thrust straight forward at full extension.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_spearman_strike_n

老兵矛手 · 突刺 · 朝上（背影）。附 `map_spearman_n.png`。

```text
Game map ACTION FRAME named map_spearman_strike_n.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, battered conical helmet, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a plain long spear held in both hands, point forward and slightly down.
The attached reference map_spearman_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Strike: lunging spear thrust straight forward at full extension.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### portrait_archer

弓手立绘（登场卡） · 1024x1536，透明背景。不用参考图。

```text
Character portrait illustration named portrait_archer.png, 1024x1536, vertical full-body standing figure for a wuxia game.
A a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, vermilion headcloth, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a recurve bow in his left hand, a quiver of arrows on his back. Pose: standing ready for a fight, weapon in hand.
Composition: single character, full body, standing on nothing, centered, with a little empty margin on all sides.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_archer_s

弓手站姿 · 朝下（面向镜头）。附 `portrait_archer.png`。

```text
Game map character sprite named map_archer_s.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, vermilion headcloth, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a recurve bow in his left hand, a quiver of arrows on his back.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: square transparent canvas 1254x1254. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge. At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_archer_se

弓手站姿 · 朝右下。附 `map_archer_s.png`、`portrait_archer.png`。

```text
Game map character sprite named map_archer_se.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, vermilion headcloth, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a recurve bow in his left hand, a quiver of arrows on his back.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_archer_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_archer_e

弓手站姿 · 朝右。附 `map_archer_s.png`、`portrait_archer.png`。

```text
Game map character sprite named map_archer_e.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, vermilion headcloth, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a recurve bow in his left hand, a quiver of arrows on his back.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_archer_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_archer_ne

弓手站姿 · 朝右上（背影偏右）。附 `map_archer_s.png`、`portrait_archer.png`。

```text
Game map character sprite named map_archer_ne.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, vermilion headcloth, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a recurve bow in his left hand, a quiver of arrows on his back.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_archer_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_archer_n

弓手站姿 · 朝上（背影）。附 `map_archer_s.png`、`portrait_archer.png`。

```text
Game map character sprite named map_archer_n.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, vermilion headcloth, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a recurve bow in his left hand, a quiver of arrows on his back.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_archer_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_archer_ready_s

弓手 · 拉弓 · 朝下（面向镜头）。附 `map_archer_s.png`。

```text
Game map ACTION FRAME named map_archer_ready_s.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, vermilion headcloth, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a recurve bow in his left hand, a quiver of arrows on his back.
The attached reference map_archer_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Ready: bow fully drawn, arrow nocked, aiming in the facing direction.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_archer_ready_se

弓手 · 拉弓 · 朝右下。附 `map_archer_se.png`。

```text
Game map ACTION FRAME named map_archer_ready_se.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, vermilion headcloth, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a recurve bow in his left hand, a quiver of arrows on his back.
The attached reference map_archer_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Ready: bow fully drawn, arrow nocked, aiming in the facing direction.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_archer_ready_e

弓手 · 拉弓 · 朝右。附 `map_archer_e.png`。

```text
Game map ACTION FRAME named map_archer_ready_e.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, vermilion headcloth, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a recurve bow in his left hand, a quiver of arrows on his back.
The attached reference map_archer_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Ready: bow fully drawn, arrow nocked, aiming in the facing direction.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_archer_ready_ne

弓手 · 拉弓 · 朝右上（背影偏右）。附 `map_archer_ne.png`。

```text
Game map ACTION FRAME named map_archer_ready_ne.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, vermilion headcloth, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a recurve bow in his left hand, a quiver of arrows on his back.
The attached reference map_archer_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Ready: bow fully drawn, arrow nocked, aiming in the facing direction.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_archer_ready_n

弓手 · 拉弓 · 朝上（背影）。附 `map_archer_n.png`。

```text
Game map ACTION FRAME named map_archer_ready_n.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, vermilion headcloth, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a recurve bow in his left hand, a quiver of arrows on his back.
The attached reference map_archer_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Ready: bow fully drawn, arrow nocked, aiming in the facing direction.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_archer_throw_s

弓手 · 放箭 · 朝下（面向镜头）。附 `map_archer_s.png`。

```text
Game map ACTION FRAME named map_archer_throw_s.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, vermilion headcloth, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a recurve bow in his left hand, a quiver of arrows on his back.
The attached reference map_archer_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Release: the string just released, bow arm still extended, drawing hand flung back.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_archer_throw_se

弓手 · 放箭 · 朝右下。附 `map_archer_se.png`。

```text
Game map ACTION FRAME named map_archer_throw_se.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, vermilion headcloth, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a recurve bow in his left hand, a quiver of arrows on his back.
The attached reference map_archer_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Release: the string just released, bow arm still extended, drawing hand flung back.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_archer_throw_e

弓手 · 放箭 · 朝右。附 `map_archer_e.png`。

```text
Game map ACTION FRAME named map_archer_throw_e.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, vermilion headcloth, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a recurve bow in his left hand, a quiver of arrows on his back.
The attached reference map_archer_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Release: the string just released, bow arm still extended, drawing hand flung back.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_archer_throw_ne

弓手 · 放箭 · 朝右上（背影偏右）。附 `map_archer_ne.png`。

```text
Game map ACTION FRAME named map_archer_throw_ne.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, vermilion headcloth, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a recurve bow in his left hand, a quiver of arrows on his back.
The attached reference map_archer_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Release: the string just released, bow arm still extended, drawing hand flung back.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_archer_throw_n

弓手 · 放箭 · 朝上（背影）。附 `map_archer_n.png`。

```text
Game map ACTION FRAME named map_archer_throw_n.png for a top-down wuxia game.
Character: a grizzled veteran soldier turned mountain bandit: lean and weathered, short beard, vermilion headcloth, a patched padded armor vest over black-and-ivory clothes, vermilion armband, wrapped legs. Weapon: a recurve bow in his left hand, a quiver of arrows on his back.
The attached reference map_archer_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Release: the string just released, bow arm still extended, drawing hand flung back.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### portrait_drillmaster

教头立绘（登场卡） · 1024x1536，透明背景。不用参考图。

```text
Character portrait illustration named portrait_drillmaster.png, 1024x1536, vertical full-body standing figure for a wuxia game.
A a huge bald drill instructor of the bandit army, broad and heavy, bare muscular arms, a dark leather apron-armor over black-and-ivory clothes, vermilion sash, a heavy broad guandao (polearm blade) held across his body. A head taller than a normal soldier. Pose: standing ready for a fight, weapon in hand.
Composition: single character, full body, standing on nothing, centered, with a little empty margin on all sides.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_drillmaster_s

教头站姿 · 朝下（面向镜头）。附 `portrait_drillmaster.png`。

```text
Game map character sprite named map_drillmaster_s.png for a top-down wuxia game.
Character: a huge bald drill instructor of the bandit army, broad and heavy, bare muscular arms, a dark leather apron-armor over black-and-ivory clothes, vermilion sash, a heavy broad guandao (polearm blade) held across his body. A head taller than a normal soldier.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: square transparent canvas 1254x1254. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge. At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_drillmaster_se

教头站姿 · 朝右下。附 `map_drillmaster_s.png`、`portrait_drillmaster.png`。

```text
Game map character sprite named map_drillmaster_se.png for a top-down wuxia game.
Character: a huge bald drill instructor of the bandit army, broad and heavy, bare muscular arms, a dark leather apron-armor over black-and-ivory clothes, vermilion sash, a heavy broad guandao (polearm blade) held across his body. A head taller than a normal soldier.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_drillmaster_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_drillmaster_e

教头站姿 · 朝右。附 `map_drillmaster_s.png`、`portrait_drillmaster.png`。

```text
Game map character sprite named map_drillmaster_e.png for a top-down wuxia game.
Character: a huge bald drill instructor of the bandit army, broad and heavy, bare muscular arms, a dark leather apron-armor over black-and-ivory clothes, vermilion sash, a heavy broad guandao (polearm blade) held across his body. A head taller than a normal soldier.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_drillmaster_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_drillmaster_ne

教头站姿 · 朝右上（背影偏右）。附 `map_drillmaster_s.png`、`portrait_drillmaster.png`。

```text
Game map character sprite named map_drillmaster_ne.png for a top-down wuxia game.
Character: a huge bald drill instructor of the bandit army, broad and heavy, bare muscular arms, a dark leather apron-armor over black-and-ivory clothes, vermilion sash, a heavy broad guandao (polearm blade) held across his body. A head taller than a normal soldier.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_drillmaster_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_drillmaster_n

教头站姿 · 朝上（背影）。附 `map_drillmaster_s.png`、`portrait_drillmaster.png`。

```text
Game map character sprite named map_drillmaster_n.png for a top-down wuxia game.
Character: a huge bald drill instructor of the bandit army, broad and heavy, bare muscular arms, a dark leather apron-armor over black-and-ivory clothes, vermilion sash, a heavy broad guandao (polearm blade) held across his body. A head taller than a normal soldier.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_drillmaster_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_drillmaster_raise_s

教头 · 举刀 · 朝下（面向镜头）。附 `map_drillmaster_s.png`。

```text
Game map ACTION FRAME named map_drillmaster_raise_s.png for a top-down wuxia game.
Character: a huge bald drill instructor of the bandit army, broad and heavy, bare muscular arms, a dark leather apron-armor over black-and-ivory clothes, vermilion sash, a heavy broad guandao (polearm blade) held across his body. A head taller than a normal soldier.
The attached reference map_drillmaster_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Raise: guandao lifted high overhead in both hands, body leaning back.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_drillmaster_raise_se

教头 · 举刀 · 朝右下。附 `map_drillmaster_se.png`。

```text
Game map ACTION FRAME named map_drillmaster_raise_se.png for a top-down wuxia game.
Character: a huge bald drill instructor of the bandit army, broad and heavy, bare muscular arms, a dark leather apron-armor over black-and-ivory clothes, vermilion sash, a heavy broad guandao (polearm blade) held across his body. A head taller than a normal soldier.
The attached reference map_drillmaster_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Raise: guandao lifted high overhead in both hands, body leaning back.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_drillmaster_raise_e

教头 · 举刀 · 朝右。附 `map_drillmaster_e.png`。

```text
Game map ACTION FRAME named map_drillmaster_raise_e.png for a top-down wuxia game.
Character: a huge bald drill instructor of the bandit army, broad and heavy, bare muscular arms, a dark leather apron-armor over black-and-ivory clothes, vermilion sash, a heavy broad guandao (polearm blade) held across his body. A head taller than a normal soldier.
The attached reference map_drillmaster_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Raise: guandao lifted high overhead in both hands, body leaning back.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_drillmaster_raise_ne

教头 · 举刀 · 朝右上（背影偏右）。附 `map_drillmaster_ne.png`。

```text
Game map ACTION FRAME named map_drillmaster_raise_ne.png for a top-down wuxia game.
Character: a huge bald drill instructor of the bandit army, broad and heavy, bare muscular arms, a dark leather apron-armor over black-and-ivory clothes, vermilion sash, a heavy broad guandao (polearm blade) held across his body. A head taller than a normal soldier.
The attached reference map_drillmaster_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Raise: guandao lifted high overhead in both hands, body leaning back.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_drillmaster_raise_n

教头 · 举刀 · 朝上（背影）。附 `map_drillmaster_n.png`。

```text
Game map ACTION FRAME named map_drillmaster_raise_n.png for a top-down wuxia game.
Character: a huge bald drill instructor of the bandit army, broad and heavy, bare muscular arms, a dark leather apron-armor over black-and-ivory clothes, vermilion sash, a heavy broad guandao (polearm blade) held across his body. A head taller than a normal soldier.
The attached reference map_drillmaster_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Raise: guandao lifted high overhead in both hands, body leaning back.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_drillmaster_smash_s

教头 · 横扫 · 朝下（面向镜头）。附 `map_drillmaster_s.png`。

```text
Game map ACTION FRAME named map_drillmaster_smash_s.png for a top-down wuxia game.
Character: a huge bald drill instructor of the bandit army, broad and heavy, bare muscular arms, a dark leather apron-armor over black-and-ivory clothes, vermilion sash, a heavy broad guandao (polearm blade) held across his body. A head taller than a normal soldier.
The attached reference map_drillmaster_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Sweep: guandao swung in a full horizontal circle at waist height, body twisted.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_drillmaster_smash_se

教头 · 横扫 · 朝右下。附 `map_drillmaster_se.png`。

```text
Game map ACTION FRAME named map_drillmaster_smash_se.png for a top-down wuxia game.
Character: a huge bald drill instructor of the bandit army, broad and heavy, bare muscular arms, a dark leather apron-armor over black-and-ivory clothes, vermilion sash, a heavy broad guandao (polearm blade) held across his body. A head taller than a normal soldier.
The attached reference map_drillmaster_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Sweep: guandao swung in a full horizontal circle at waist height, body twisted.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_drillmaster_smash_e

教头 · 横扫 · 朝右。附 `map_drillmaster_e.png`。

```text
Game map ACTION FRAME named map_drillmaster_smash_e.png for a top-down wuxia game.
Character: a huge bald drill instructor of the bandit army, broad and heavy, bare muscular arms, a dark leather apron-armor over black-and-ivory clothes, vermilion sash, a heavy broad guandao (polearm blade) held across his body. A head taller than a normal soldier.
The attached reference map_drillmaster_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Sweep: guandao swung in a full horizontal circle at waist height, body twisted.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_drillmaster_smash_ne

教头 · 横扫 · 朝右上（背影偏右）。附 `map_drillmaster_ne.png`。

```text
Game map ACTION FRAME named map_drillmaster_smash_ne.png for a top-down wuxia game.
Character: a huge bald drill instructor of the bandit army, broad and heavy, bare muscular arms, a dark leather apron-armor over black-and-ivory clothes, vermilion sash, a heavy broad guandao (polearm blade) held across his body. A head taller than a normal soldier.
The attached reference map_drillmaster_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Sweep: guandao swung in a full horizontal circle at waist height, body twisted.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_drillmaster_smash_n

教头 · 横扫 · 朝上（背影）。附 `map_drillmaster_n.png`。

```text
Game map ACTION FRAME named map_drillmaster_smash_n.png for a top-down wuxia game.
Character: a huge bald drill instructor of the bandit army, broad and heavy, bare muscular arms, a dark leather apron-armor over black-and-ivory clothes, vermilion sash, a heavy broad guandao (polearm blade) held across his body. A head taller than a normal soldier.
The attached reference map_drillmaster_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Sweep: guandao swung in a full horizontal circle at waist height, body twisted.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### portrait_swordsman

前朝死士立绘（登场卡） · 1024x1536，透明背景。不用参考图。

```text
Character portrait illustration named portrait_swordsman.png, 1024x1536, vertical full-body standing figure for a wuxia game.
A a silent loyalist assassin of the former dynasty: slim, masked with a black cloth over the lower face, dark hooded robe with a faded imperial cloud pattern, vermilion cord at the wrist, a thin straight sword held low in the right hand. Pose: standing ready for a fight, weapon in hand.
Composition: single character, full body, standing on nothing, centered, with a little empty margin on all sides.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_swordsman_s

前朝死士站姿 · 朝下（面向镜头）。附 `portrait_swordsman.png`。

```text
Game map character sprite named map_swordsman_s.png for a top-down wuxia game.
Character: a silent loyalist assassin of the former dynasty: slim, masked with a black cloth over the lower face, dark hooded robe with a faded imperial cloud pattern, vermilion cord at the wrist, a thin straight sword held low in the right hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: square transparent canvas 1254x1254. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge. At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_swordsman_se

前朝死士站姿 · 朝右下。附 `map_swordsman_s.png`、`portrait_swordsman.png`。

```text
Game map character sprite named map_swordsman_se.png for a top-down wuxia game.
Character: a silent loyalist assassin of the former dynasty: slim, masked with a black cloth over the lower face, dark hooded robe with a faded imperial cloud pattern, vermilion cord at the wrist, a thin straight sword held low in the right hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_swordsman_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_swordsman_e

前朝死士站姿 · 朝右。附 `map_swordsman_s.png`、`portrait_swordsman.png`。

```text
Game map character sprite named map_swordsman_e.png for a top-down wuxia game.
Character: a silent loyalist assassin of the former dynasty: slim, masked with a black cloth over the lower face, dark hooded robe with a faded imperial cloud pattern, vermilion cord at the wrist, a thin straight sword held low in the right hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_swordsman_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_swordsman_ne

前朝死士站姿 · 朝右上（背影偏右）。附 `map_swordsman_s.png`、`portrait_swordsman.png`。

```text
Game map character sprite named map_swordsman_ne.png for a top-down wuxia game.
Character: a silent loyalist assassin of the former dynasty: slim, masked with a black cloth over the lower face, dark hooded robe with a faded imperial cloud pattern, vermilion cord at the wrist, a thin straight sword held low in the right hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_swordsman_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_swordsman_n

前朝死士站姿 · 朝上（背影）。附 `map_swordsman_s.png`、`portrait_swordsman.png`。

```text
Game map character sprite named map_swordsman_n.png for a top-down wuxia game.
Character: a silent loyalist assassin of the former dynasty: slim, masked with a black cloth over the lower face, dark hooded robe with a faded imperial cloud pattern, vermilion cord at the wrist, a thin straight sword held low in the right hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_swordsman_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_swordsman_ready_s

前朝死士 · 蓄势 · 朝下（面向镜头）。附 `map_swordsman_s.png`。

```text
Game map ACTION FRAME named map_swordsman_ready_s.png for a top-down wuxia game.
Character: a silent loyalist assassin of the former dynasty: slim, masked with a black cloth over the lower face, dark hooded robe with a faded imperial cloud pattern, vermilion cord at the wrist, a thin straight sword held low in the right hand.
The attached reference map_swordsman_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Ready: crouched, sword held back low.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_swordsman_ready_se

前朝死士 · 蓄势 · 朝右下。附 `map_swordsman_se.png`。

```text
Game map ACTION FRAME named map_swordsman_ready_se.png for a top-down wuxia game.
Character: a silent loyalist assassin of the former dynasty: slim, masked with a black cloth over the lower face, dark hooded robe with a faded imperial cloud pattern, vermilion cord at the wrist, a thin straight sword held low in the right hand.
The attached reference map_swordsman_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Ready: crouched, sword held back low.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_swordsman_ready_e

前朝死士 · 蓄势 · 朝右。附 `map_swordsman_e.png`。

```text
Game map ACTION FRAME named map_swordsman_ready_e.png for a top-down wuxia game.
Character: a silent loyalist assassin of the former dynasty: slim, masked with a black cloth over the lower face, dark hooded robe with a faded imperial cloud pattern, vermilion cord at the wrist, a thin straight sword held low in the right hand.
The attached reference map_swordsman_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Ready: crouched, sword held back low.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_swordsman_ready_ne

前朝死士 · 蓄势 · 朝右上（背影偏右）。附 `map_swordsman_ne.png`。

```text
Game map ACTION FRAME named map_swordsman_ready_ne.png for a top-down wuxia game.
Character: a silent loyalist assassin of the former dynasty: slim, masked with a black cloth over the lower face, dark hooded robe with a faded imperial cloud pattern, vermilion cord at the wrist, a thin straight sword held low in the right hand.
The attached reference map_swordsman_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Ready: crouched, sword held back low.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_swordsman_ready_n

前朝死士 · 蓄势 · 朝上（背影）。附 `map_swordsman_n.png`。

```text
Game map ACTION FRAME named map_swordsman_ready_n.png for a top-down wuxia game.
Character: a silent loyalist assassin of the former dynasty: slim, masked with a black cloth over the lower face, dark hooded robe with a faded imperial cloud pattern, vermilion cord at the wrist, a thin straight sword held low in the right hand.
The attached reference map_swordsman_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Ready: crouched, sword held back low.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_swordsman_strike_s

前朝死士 · 连刺 · 朝下（面向镜头）。附 `map_swordsman_s.png`。

```text
Game map ACTION FRAME named map_swordsman_strike_s.png for a top-down wuxia game.
Character: a silent loyalist assassin of the former dynasty: slim, masked with a black cloth over the lower face, dark hooded robe with a faded imperial cloud pattern, vermilion cord at the wrist, a thin straight sword held low in the right hand.
The attached reference map_swordsman_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Strike: a fast lunging thrust at full extension.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_swordsman_strike_se

前朝死士 · 连刺 · 朝右下。附 `map_swordsman_se.png`。

```text
Game map ACTION FRAME named map_swordsman_strike_se.png for a top-down wuxia game.
Character: a silent loyalist assassin of the former dynasty: slim, masked with a black cloth over the lower face, dark hooded robe with a faded imperial cloud pattern, vermilion cord at the wrist, a thin straight sword held low in the right hand.
The attached reference map_swordsman_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Strike: a fast lunging thrust at full extension.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_swordsman_strike_e

前朝死士 · 连刺 · 朝右。附 `map_swordsman_e.png`。

```text
Game map ACTION FRAME named map_swordsman_strike_e.png for a top-down wuxia game.
Character: a silent loyalist assassin of the former dynasty: slim, masked with a black cloth over the lower face, dark hooded robe with a faded imperial cloud pattern, vermilion cord at the wrist, a thin straight sword held low in the right hand.
The attached reference map_swordsman_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Strike: a fast lunging thrust at full extension.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_swordsman_strike_ne

前朝死士 · 连刺 · 朝右上（背影偏右）。附 `map_swordsman_ne.png`。

```text
Game map ACTION FRAME named map_swordsman_strike_ne.png for a top-down wuxia game.
Character: a silent loyalist assassin of the former dynasty: slim, masked with a black cloth over the lower face, dark hooded robe with a faded imperial cloud pattern, vermilion cord at the wrist, a thin straight sword held low in the right hand.
The attached reference map_swordsman_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Strike: a fast lunging thrust at full extension.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_swordsman_strike_n

前朝死士 · 连刺 · 朝上（背影）。附 `map_swordsman_n.png`。

```text
Game map ACTION FRAME named map_swordsman_strike_n.png for a top-down wuxia game.
Character: a silent loyalist assassin of the former dynasty: slim, masked with a black cloth over the lower face, dark hooded robe with a faded imperial cloud pattern, vermilion cord at the wrist, a thin straight sword held low in the right hand.
The attached reference map_swordsman_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Strike: a fast lunging thrust at full extension.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### portrait_bannerman

旗手立绘（登场卡） · 1024x1536，透明背景。不用参考图。

```text
Character portrait illustration named portrait_bannerman.png, 1024x1536, vertical full-body standing figure for a wuxia game.
A a loyalist standard-bearer of the former dynasty: plain dark robe, ivory headband, holding upright in both hands a tall pole with a long faded vermilion banner (no readable writing, only an abstract dragon motif). Pose: standing ready for a fight, weapon in hand.
Composition: single character, full body, standing on nothing, centered, with a little empty margin on all sides.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bannerman_s

旗手站姿 · 朝下（面向镜头）。附 `portrait_bannerman.png`。

```text
Game map character sprite named map_bannerman_s.png for a top-down wuxia game.
Character: a loyalist standard-bearer of the former dynasty: plain dark robe, ivory headband, holding upright in both hands a tall pole with a long faded vermilion banner (no readable writing, only an abstract dragon motif).
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: square transparent canvas 1254x1254. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge. At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bannerman_se

旗手站姿 · 朝右下。附 `map_bannerman_s.png`、`portrait_bannerman.png`。

```text
Game map character sprite named map_bannerman_se.png for a top-down wuxia game.
Character: a loyalist standard-bearer of the former dynasty: plain dark robe, ivory headband, holding upright in both hands a tall pole with a long faded vermilion banner (no readable writing, only an abstract dragon motif).
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_bannerman_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bannerman_e

旗手站姿 · 朝右。附 `map_bannerman_s.png`、`portrait_bannerman.png`。

```text
Game map character sprite named map_bannerman_e.png for a top-down wuxia game.
Character: a loyalist standard-bearer of the former dynasty: plain dark robe, ivory headband, holding upright in both hands a tall pole with a long faded vermilion banner (no readable writing, only an abstract dragon motif).
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_bannerman_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bannerman_ne

旗手站姿 · 朝右上（背影偏右）。附 `map_bannerman_s.png`、`portrait_bannerman.png`。

```text
Game map character sprite named map_bannerman_ne.png for a top-down wuxia game.
Character: a loyalist standard-bearer of the former dynasty: plain dark robe, ivory headband, holding upright in both hands a tall pole with a long faded vermilion banner (no readable writing, only an abstract dragon motif).
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_bannerman_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bannerman_n

旗手站姿 · 朝上（背影）。附 `map_bannerman_s.png`、`portrait_bannerman.png`。

```text
Game map character sprite named map_bannerman_n.png for a top-down wuxia game.
Character: a loyalist standard-bearer of the former dynasty: plain dark robe, ivory headband, holding upright in both hands a tall pole with a long faded vermilion banner (no readable writing, only an abstract dragon motif).
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_bannerman_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bannerman_ready_s

旗手 · 举旗 · 朝下（面向镜头）。附 `map_bannerman_s.png`。

```text
Game map ACTION FRAME named map_bannerman_ready_s.png for a top-down wuxia game.
Character: a loyalist standard-bearer of the former dynasty: plain dark robe, ivory headband, holding upright in both hands a tall pole with a long faded vermilion banner (no readable writing, only an abstract dragon motif).
The attached reference map_bannerman_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Rally: banner pole raised high overhead, banner streaming, mouth open shouting.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bannerman_ready_se

旗手 · 举旗 · 朝右下。附 `map_bannerman_se.png`。

```text
Game map ACTION FRAME named map_bannerman_ready_se.png for a top-down wuxia game.
Character: a loyalist standard-bearer of the former dynasty: plain dark robe, ivory headband, holding upright in both hands a tall pole with a long faded vermilion banner (no readable writing, only an abstract dragon motif).
The attached reference map_bannerman_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Rally: banner pole raised high overhead, banner streaming, mouth open shouting.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bannerman_ready_e

旗手 · 举旗 · 朝右。附 `map_bannerman_e.png`。

```text
Game map ACTION FRAME named map_bannerman_ready_e.png for a top-down wuxia game.
Character: a loyalist standard-bearer of the former dynasty: plain dark robe, ivory headband, holding upright in both hands a tall pole with a long faded vermilion banner (no readable writing, only an abstract dragon motif).
The attached reference map_bannerman_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Rally: banner pole raised high overhead, banner streaming, mouth open shouting.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bannerman_ready_ne

旗手 · 举旗 · 朝右上（背影偏右）。附 `map_bannerman_ne.png`。

```text
Game map ACTION FRAME named map_bannerman_ready_ne.png for a top-down wuxia game.
Character: a loyalist standard-bearer of the former dynasty: plain dark robe, ivory headband, holding upright in both hands a tall pole with a long faded vermilion banner (no readable writing, only an abstract dragon motif).
The attached reference map_bannerman_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Rally: banner pole raised high overhead, banner streaming, mouth open shouting.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bannerman_ready_n

旗手 · 举旗 · 朝上（背影）。附 `map_bannerman_n.png`。

```text
Game map ACTION FRAME named map_bannerman_ready_n.png for a top-down wuxia game.
Character: a loyalist standard-bearer of the former dynasty: plain dark robe, ivory headband, holding upright in both hands a tall pole with a long faded vermilion banner (no readable writing, only an abstract dragon motif).
The attached reference map_bannerman_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Rally: banner pole raised high overhead, banner streaming, mouth open shouting.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### portrait_captain

护卫统领立绘（登场卡） · 1024x1536，透明背景。不用参考图。

```text
Character portrait illustration named portrait_captain.png, 1024x1536, vertical full-body standing figure for a wuxia game.
A the prince's personal guard captain: tall, armored in dark lamellar armor with faded gold trim, a plumed helmet, cold face, a pair of broad sabers, one in each hand, held crossed in front of him. Pose: standing ready for a fight, weapon in hand.
Composition: single character, full body, standing on nothing, centered, with a little empty margin on all sides.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_captain_s

护卫统领站姿 · 朝下（面向镜头）。附 `portrait_captain.png`。

```text
Game map character sprite named map_captain_s.png for a top-down wuxia game.
Character: the prince's personal guard captain: tall, armored in dark lamellar armor with faded gold trim, a plumed helmet, cold face, a pair of broad sabers, one in each hand, held crossed in front of him.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: square transparent canvas 1254x1254. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge. At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_captain_se

护卫统领站姿 · 朝右下。附 `map_captain_s.png`、`portrait_captain.png`。

```text
Game map character sprite named map_captain_se.png for a top-down wuxia game.
Character: the prince's personal guard captain: tall, armored in dark lamellar armor with faded gold trim, a plumed helmet, cold face, a pair of broad sabers, one in each hand, held crossed in front of him.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_captain_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_captain_e

护卫统领站姿 · 朝右。附 `map_captain_s.png`、`portrait_captain.png`。

```text
Game map character sprite named map_captain_e.png for a top-down wuxia game.
Character: the prince's personal guard captain: tall, armored in dark lamellar armor with faded gold trim, a plumed helmet, cold face, a pair of broad sabers, one in each hand, held crossed in front of him.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_captain_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_captain_ne

护卫统领站姿 · 朝右上（背影偏右）。附 `map_captain_s.png`、`portrait_captain.png`。

```text
Game map character sprite named map_captain_ne.png for a top-down wuxia game.
Character: the prince's personal guard captain: tall, armored in dark lamellar armor with faded gold trim, a plumed helmet, cold face, a pair of broad sabers, one in each hand, held crossed in front of him.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_captain_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_captain_n

护卫统领站姿 · 朝上（背影）。附 `map_captain_s.png`、`portrait_captain.png`。

```text
Game map character sprite named map_captain_n.png for a top-down wuxia game.
Character: the prince's personal guard captain: tall, armored in dark lamellar armor with faded gold trim, a plumed helmet, cold face, a pair of broad sabers, one in each hand, held crossed in front of him.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_captain_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position (midpoint between the soles at horizontal center, 6% above the bottom edge). Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_captain_raise_s

护卫统领 · 双刀交叉 · 朝下（面向镜头）。附 `map_captain_s.png`。

```text
Game map ACTION FRAME named map_captain_raise_s.png for a top-down wuxia game.
Character: the prince's personal guard captain: tall, armored in dark lamellar armor with faded gold trim, a plumed helmet, cold face, a pair of broad sabers, one in each hand, held crossed in front of him.
The attached reference map_captain_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Ready: both sabers crossed high above his head.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_captain_raise_se

护卫统领 · 双刀交叉 · 朝右下。附 `map_captain_se.png`。

```text
Game map ACTION FRAME named map_captain_raise_se.png for a top-down wuxia game.
Character: the prince's personal guard captain: tall, armored in dark lamellar armor with faded gold trim, a plumed helmet, cold face, a pair of broad sabers, one in each hand, held crossed in front of him.
The attached reference map_captain_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Ready: both sabers crossed high above his head.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_captain_raise_e

护卫统领 · 双刀交叉 · 朝右。附 `map_captain_e.png`。

```text
Game map ACTION FRAME named map_captain_raise_e.png for a top-down wuxia game.
Character: the prince's personal guard captain: tall, armored in dark lamellar armor with faded gold trim, a plumed helmet, cold face, a pair of broad sabers, one in each hand, held crossed in front of him.
The attached reference map_captain_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Ready: both sabers crossed high above his head.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_captain_raise_ne

护卫统领 · 双刀交叉 · 朝右上（背影偏右）。附 `map_captain_ne.png`。

```text
Game map ACTION FRAME named map_captain_raise_ne.png for a top-down wuxia game.
Character: the prince's personal guard captain: tall, armored in dark lamellar armor with faded gold trim, a plumed helmet, cold face, a pair of broad sabers, one in each hand, held crossed in front of him.
The attached reference map_captain_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Ready: both sabers crossed high above his head.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_captain_raise_n

护卫统领 · 双刀交叉 · 朝上（背影）。附 `map_captain_n.png`。

```text
Game map ACTION FRAME named map_captain_raise_n.png for a top-down wuxia game.
Character: the prince's personal guard captain: tall, armored in dark lamellar armor with faded gold trim, a plumed helmet, cold face, a pair of broad sabers, one in each hand, held crossed in front of him.
The attached reference map_captain_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Ready: both sabers crossed high above his head.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_captain_smash_s

护卫统领 · 旋风斩 · 朝下（面向镜头）。附 `map_captain_s.png`。

```text
Game map ACTION FRAME named map_captain_smash_s.png for a top-down wuxia game.
Character: the prince's personal guard captain: tall, armored in dark lamellar armor with faded gold trim, a plumed helmet, cold face, a pair of broad sabers, one in each hand, held crossed in front of him.
The attached reference map_captain_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Whirlwind: spinning with both sabers extended outward at shoulder height.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_captain_smash_se

护卫统领 · 旋风斩 · 朝右下。附 `map_captain_se.png`。

```text
Game map ACTION FRAME named map_captain_smash_se.png for a top-down wuxia game.
Character: the prince's personal guard captain: tall, armored in dark lamellar armor with faded gold trim, a plumed helmet, cold face, a pair of broad sabers, one in each hand, held crossed in front of him.
The attached reference map_captain_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter front view facing the BOTTOM-RIGHT of the image; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer.
Action: Whirlwind: spinning with both sabers extended outward at shoulder height.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_captain_smash_e

护卫统领 · 旋风斩 · 朝右。附 `map_captain_e.png`。

```text
Game map ACTION FRAME named map_captain_smash_e.png for a top-down wuxia game.
Character: the prince's personal guard captain: tall, armored in dark lamellar armor with faded gold trim, a plumed helmet, cold face, a pair of broad sabers, one in each hand, held crossed in front of him.
The attached reference map_captain_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Whirlwind: spinning with both sabers extended outward at shoulder height.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_captain_smash_ne

护卫统领 · 旋风斩 · 朝右上（背影偏右）。附 `map_captain_ne.png`。

```text
Game map ACTION FRAME named map_captain_smash_ne.png for a top-down wuxia game.
Character: the prince's personal guard captain: tall, armored in dark lamellar armor with faded gold trim, a plumed helmet, cold face, a pair of broad sabers, one in each hand, held crossed in front of him.
The attached reference map_captain_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Whirlwind: spinning with both sabers extended outward at shoulder height.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_captain_smash_n

护卫统领 · 旋风斩 · 朝上（背影）。附 `map_captain_n.png`。

```text
Game map ACTION FRAME named map_captain_smash_n.png for a top-down wuxia game.
Character: the prince's personal guard captain: tall, armored in dark lamellar armor with faded gold trim, a plumed helmet, cold face, a pair of broad sabers, one in each hand, held crossed in front of him.
The attached reference map_captain_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Whirlwind: spinning with both sabers extended outward at shoulder height.
The whole body and weapon must stay inside the canvas. Do NOT draw slash trails, speed lines or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow outside the subject, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```


## 第 6 批 · 山腰、山峰的地面和物件

22 张。

### ground_mountain_path

山腰 · 山石路 · 1024x1024 可平铺，不透明。

```text
ground_mountain_path.png, 1024x1024, seamless tileable ground texture seen from directly above. A rough mountain trail of packed earth and embedded flat rocks, a few pine needles.
Must tile seamlessly on all four edges. Even lighting, no strong shadows, no objects, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### ground_pine_forest

山腰 · 松林地 · 1024x1024 可平铺，不透明。

```text
ground_pine_forest.png, 1024x1024, seamless tileable ground texture seen from directly above. Forest floor of a pine wood: brown pine needles, small stones, patches of moss.
Must tile seamlessly on all four edges. Even lighting, no strong shadows, no objects, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### ground_drill_yard

山腰 · 演武场黄土 · 1024x1024 可平铺，不透明。

```text
ground_drill_yard.png, 1024x1024, seamless tileable ground texture seen from directly above. A trampled packed-earth military drill yard, boot prints, faint scuffs, a few weapon scratches.
Must tile seamlessly on all four edges. Even lighting, no strong shadows, no objects, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### ground_stone_stairs

山峰 · 石阶 · 1024x1024 可平铺，不透明。

```text
ground_stone_stairs.png, 1024x1024, seamless tileable ground texture seen from directly above. Old weathered grey stone slabs of a mountain stairway seen from above, cracks with tiny grass.
Must tile seamlessly on all four edges. Even lighting, no strong shadows, no objects, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### ground_palace

山峰 · 行宫青砖 · 1024x1024 可平铺，不透明。

```text
ground_palace.png, 1024x1024, seamless tileable ground texture seen from directly above. Large square grey palace paving bricks, worn and cracked, faint traces of a faded carved cloud pattern, a little snow in the joints.
Must tile seamlessly on all four edges. Even lighting, no strong shadows, no objects, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### ground_snow_rock

山峰 · 残雪山石 · 1024x1024 可平铺，不透明。

```text
ground_snow_rock.png, 1024x1024, seamless tileable ground texture seen from directly above. Bare mountain rock with thin patches of old snow and frost.
Must tile seamlessly on all four edges. Even lighting, no strong shadows, no objects, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_pine_big

大松树 · 1536x1536。

```text
prop_pine_big.png, 1536x1536. A big gnarled mountain pine tree with wide flat layered branches.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_pine_small

小松树 · 1024x1024。

```text
prop_pine_small.png, 1024x1024. A small young pine tree.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_plank_road

栈道木桥 · 2048x1024。

```text
prop_plank_road.png, 2048x1024. A section of a wooden plank road bolted along a cliff face, plank floor, simple railing, a drop below on one side.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_army_tent

旧军帐 · 1536x1536。

```text
prop_army_tent.png, 1536x1536. A patched old army tent of the bandit army, ropes and stakes, a spear rack beside it.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_command_stage

点将台 · 2048x2048。

```text
prop_command_stage.png, 2048x2048. A raised square wooden command platform with steps, a war drum on it, a tall flagpole with a vermilion banner (abstract, no writing).
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_ring_post

擂台木桩 · 512x1024。

```text
prop_ring_post.png, 512x1024. A single thick wooden post with a rope tied around its top, used to mark out a duelling ring.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_war_banner

"彰"字军旗 · 1024x1536。

```text
prop_war_banner.png, 1024x1536. A tall army war banner on a pole, vermilion cloth with a big black circle on it (leave the circle EMPTY, no characters).
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_hitching_post

拴马桩 · 512x768。

```text
prop_hitching_post.png, 512x768. A wooden hitching post with an iron ring, a pile of hay beside it.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_weapon_rack_spear

长矛架 · 1024x1024。

```text
prop_weapon_rack_spear.png, 1024x1024. A wooden rack full of long spears and halberds.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_cloud

飘动的云雾 · 2048x1024。

```text
prop_cloud.png, 2048x1024. A soft drifting band of mountain mist, mostly transparent, wispy ink-wash edges (it will be layered over the map).
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_stone_lion

残破石狮 · 1024x1024。

```text
prop_stone_lion.png, 1024x1024. A weathered broken stone guardian lion on a plinth, one paw missing.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_broken_stele

断碑 · 1024x1024。

```text
prop_broken_stele.png, 1024x1024. A broken old stone stele lying cracked in two, carvings worn away (no readable text).
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_old_dragon_banner

前朝龙旗 · 1024x1536。

```text
prop_old_dragon_banner.png, 1024x1536. A tattered faded old-dynasty banner on a leaning pole, faded vermilion with a pale-gold abstract dragon (no writing).
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_palace_gate

行宫宫门 · 2048x2048。

```text
prop_palace_gate.png, 2048x2048. The gate of an abandoned old-dynasty mountain palace: tall red-lacquer doors faded and peeling, gold studs dull, a curved tile roof with a missing tile or two, a blank plaque (no writing).
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_incense_burner

大香炉 · 1024x1024。

```text
prop_incense_burner.png, 1024x1024. A large bronze tripod incense burner, green patina, faint smoke.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_temple_ruin

破庙 · 2048x2048。

```text
prop_temple_ruin.png, 2048x2048. A small ruined mountain temple used as a tea stall: half the roof caved in, a tea table and a red lantern out front.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```


## 第 7 批 · 招式和演出特效

6 张。

### fx_spear_thrust

矛刺的寒光 · 1536x512，透明背景。

```text
Game visual effect sprite named fx_spear_thrust.png, 1536x512, transparent background with real alpha. A long, narrow, straight ink-and-steel thrust streak pointing to the RIGHT, sharp bright tip, ink spray behind it. Flat on the ground plane (the game rotates it).
Seen from the 45-degree top-down game camera (flat on the ground unless stated). Centered on the canvas.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine transparent background, no backdrop, no text.
```

### fx_whip_lash

金鞭直抽 · 2048x512，透明背景。

```text
Game visual effect sprite named fx_whip_lash.png, 2048x512, transparent background with real alpha. A long, thin, slightly wavy whip-crack trail of bright pale gold with ink edges, pointing to the RIGHT, sparks at the tip. Flat on the ground plane.
Seen from the 45-degree top-down game camera (flat on the ground unless stated). Centered on the canvas.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine transparent background, no backdrop, no text.
```

### fx_whip_ring

回旋鞭金环 · 1536x1536，透明背景。

```text
Game visual effect sprite named fx_whip_ring.png, 1536x1536, transparent background with real alpha. A circular ring of whirling gold whip light seen on the ground (an ellipse because of the 45-degree view), hollow center, ink spray outward.
Seen from the 45-degree top-down game camera (flat on the ground unless stated). Centered on the canvas.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine transparent background, no backdrop, no text.
```

### fx_gold_burst

金光炸开（变身） · 1536x1536，透明背景。

```text
Game visual effect sprite named fx_gold_burst.png, 1536x1536, transparent background with real alpha. A radial burst of pale-gold light rays and ink splashes exploding outward from the center.
Seen from the 45-degree top-down game camera (flat on the ground unless stated). Centered on the canvas.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e, plus a warm pale-gold #d9b25a ONLY for the glowing whip and its light. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine transparent background, no backdrop, no text.
```

### fx_cloth_burst

衣服崩碎 · 1024x1024，透明背景。

```text
Game visual effect sprite named fx_cloth_burst.png, 1024x1024, transparent background with real alpha. Shreds of dark torn robe cloth flying outward in all directions from the center, a few ink splashes.
Seen from the 45-degree top-down game camera (flat on the ground unless stated). Centered on the canvas.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine transparent background, no backdrop, no text.
```

### fx_ink_smoke

墨雾遁走 · 1536x1536，透明背景。

```text
Game visual effect sprite named fx_ink_smoke.png, 1536x1536, transparent background with real alpha. A big billowing cloud of black ink smoke, dense in the middle, thinning to wisps at the edges.
Seen from the 45-degree top-down game camera (flat on the ground unless stated). Centered on the canvas.
Style: Chinese hand-painted ink wash (shuimo), fine inked linework with dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork, same rendering as the existing game art. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine transparent background, no backdrop, no text.
```
