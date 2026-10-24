# 配音清单 · 红熊大侠

> 2026-10-25 · 用户定：红熊说话要有配音。其他人物先只有字幕。
> 代码见 [three-stages-plan.md](three-stages-plan.md) 第 2 阶段：`src/audio/voice.ts`，文件放 `public/voice/`，在 `public/voice/manifest.json` 登记。
> **没录的句子游戏照样能玩**：按字数自动停留，字幕照常显示。

## 声音设定

- **人物**：红熊大侠，高大、沉稳、看不清脸的师父。一路暗中护着徒弟。
- **声线**：中年男声，低沉、温厚、有分量；不凶，像长辈说话。偶尔带一点笑意（救场、夸徒弟时）。
- **语速**：偏慢，句与句之间留气口；"惩恶扬善，保护百姓——莫让百姓受伤"这句是全作主题，要说得最重、最慢。
- **普通话**，不要方言腔、不要戏曲腔、不要旁白腔（是在跟徒弟说话，不是在念稿）。

## 文件格式

- 一句一个文件，**mp3（128kbps 以上）或 ogg**，单声道，44.1kHz；句首句尾留 0.2 秒空白；音量标准化到约 -16 LUFS。
- 文件名就是下表的 id，比如 `redBear_intro_wen_3.mp3`。
- 在 `public/voice/manifest.json` 里登记：`{ "lines": { "redBear_intro_wen_3": "redBear_intro_wen_3.mp3" } }`。

## 台词（草稿，用户定稿后再录）

### 开场过场 · 温少华篇

| id | 台词 | 语气 |
|---|---|---|
| `redBear_intro_wen_1` | 少华，剑练到这一步，可以下山了。 | 欣慰 |
| `redBear_intro_wen_2` | 剑是用来护人的，不是用来逞能的。 | 平静，略严肃 |
| `redBear_intro_wen_3` | 出师之后，惩恶扬善，保护百姓——莫让百姓受伤。 | **主题句，最重最慢** |
| `redBear_intro_wen_4` | 山下有座山，山上有三个人，你会碰到他们的。去吧。 | 意味深长，最后"去吧"轻 |

### 开场过场 · 于无瑕篇

| id | 台词 | 语气 |
|---|---|---|
| `redBear_intro_yu_1` | 无瑕，你的镖比为师当年还准。 | 带笑意 |
| `redBear_intro_yu_2` | 准，不难；知道该打谁，才难。 | 平静，点拨 |
| `redBear_intro_yu_3` | 出师之后，惩恶扬善，保护百姓——莫让百姓受伤。 | **主题句，最重最慢** |
| `redBear_intro_yu_4` | 山下有座山，山上有三个人，你会碰到他们的。去吧。 | 同温少华篇 |

### 濒死救场（每关一次，随机一句；现有台词）

| id | 台词 | 语气 |
|---|---|---|
| `redBear_rescue_1` | 徒儿，撑住。 | 沉稳、有力 |
| `redBear_rescue_2` | 为师还在，倒不了。 | 带一点笑 |
| `redBear_rescue_3` | 起来，这一课还没上完。 | 严厉里带关心 |

### 过关的信（念信，每关每位主角一封）

信是一个字一个字写出来的，配音跟着念。文案见 [story-three-stages.md](story-three-stages.md)「红熊的信」，这里只列 id。

| id | 内容 |
|---|---|
| `redBear_letter_1_wen_sword` / `redBear_letter_1_wen_bribe` | 第一关 · 温少华（拔剑 / 给钱） |
| `redBear_letter_1_yu_sword` / `redBear_letter_1_yu_bribe` | 第一关 · 于无瑕（拔剑 / 给钱） |
| `redBear_letter_2_wen` / `redBear_letter_2_yu` | 第二关 |
| `redBear_ending_wen` / `redBear_ending_yu` | 通关（在山巅说，第三关不单独写信） |

## 一共

开场 8 句 + 救场 3 句 + 信和通关 8 段 = **19 个文件**。

## 以后要加配音的话

Boss（胖虎、鲍金梁、彰化天）和主角的台词现在只有字幕。要配的话照这个格式加 id（比如 `pangHu_intro_1`），`voice.ts` 不用改。
