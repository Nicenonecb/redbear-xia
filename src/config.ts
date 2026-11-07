// 全局常量：画布尺寸与水墨配色

export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

export const COLORS = {
  paper: 0xefe7d6, // 宣纸底色
  ink: 0x1a1714, // 浓墨，用于剪影
  inkLight: 0x5a534b, // 淡墨，用于远景
  red: 0xb3261e, // 朱红点缀
  redBright: 0xe2412f, // 亮朱红，只用于地面上的前摇警示，压在浓墨上也醒目
} as const;

export const CSS_COLORS = {
  paper: '#efe7d6',
  ink: '#1a1714',
  red: '#b3261e',
} as const;

export const FONT_BRUSH = '"Kaiti SC", "STKaiti", "KaiTi", "楷体", serif';
