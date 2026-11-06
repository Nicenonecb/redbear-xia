import type { HeroId } from './progression';
export const LETTERS: Record<HeroId, { sword: string; bribe: string }[]> = {
  wenShaohua: [
    {
      sword: '少华，你救下了那些姑娘，很好。胖虎不坏，只是贪；贪的人，最容易被人利用。山腰那位，可不是贪那么简单。',
      bribe: '少华，钱能买路，买不回百姓。下一次，拔剑。',
    },
    {
      sword: '少华，你赢了一个只会用拳头说话的人。他背后那位，用的是人心。',
      bribe: '少华，你赢了一个只会用拳头说话的人。他背后那位，用的是人心。',
    },
    { sword: '少华，你拯救了杭州百姓。', bribe: '少华，你拯救了杭州百姓。' },
  ],
  yuWuxia: [
    {
      sword: '无瑕，你放走的人比你打倒的人多，这才是本事。山腰那位出手没轻重，别跟他硬拼，跟他拼脑子。',
      bribe: '无瑕，你省了力气，可后院那些姑娘还在等人。下一次，拔剑。',
    },
    {
      sword: '无瑕，鲍金梁是把好刀，可惜握刀的人不是他自己。山顶那位，你要看清楚。',
      bribe: '无瑕，鲍金梁是把好刀，可惜握刀的人不是他自己。山顶那位，你要看清楚。',
    },
    { sword: '无瑕，你拯救了杭州百姓。', bribe: '无瑕，你拯救了杭州百姓。' },
  ],
};
export function introLines(hero: HeroId) {
  const wen = hero === 'wenShaohua';
  const mission = '最近杭州不太平，城外山上聚了一伙人，迟早要祸害百姓——考验你的时候到了。';
  return [
    {
      text: (wen ? '少华，你的剑已经练成，今日出师。' : '无瑕，你这一手暗器，已经可以出师了。') + mission,
      voice: `redBear_intro_${wen ? 'wen' : 'yu'}`,
    },
    { text: wen ? '弟子明白，定不负师父所托！' : '……是。弟子这就下山。' },
  ];
}
