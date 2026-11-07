import type Phaser from 'phaser';

/** 不能出现在行首的标点：折行时挂到上一行行尾 */
const NO_LINE_START = /^[，。、；：！？）》」』”’…—,.;:!?)]+/;

/**
 * 中文按字折行：Phaser 自带的折行只认空格，中文要用 advanced wrap 才会按字断；
 * 再按中文排版习惯把落到行首的标点挂到上一行末尾（会比宽度多出一个标点，看着比标点打头舒服）。
 * 返回写好换行的字符串，并把这个文字对象的自动折行关掉，免得挂上去的标点又被折下来。
 */
export function cjkWrap(text: Phaser.GameObjects.Text, content: string, width: number): string {
  text.setWordWrapWidth(width, true);
  const lines = text.getWrappedText(content);
  text.setWordWrapWidth(null);
  for (let i = 1; i < lines.length; i++) {
    const head = lines[i].match(NO_LINE_START)?.[0];
    if (!head) continue;
    lines[i - 1] += head;
    lines[i] = lines[i].slice(head.length);
  }
  return lines.filter((l, i) => l || i === 0).join('\n');
}
