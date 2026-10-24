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
    { sword: '好徒儿，学成了。他逃了，但杭州的百姓今年能过个好年。', bribe: '好徒儿，学成了。他逃了，但杭州的百姓今年能过个好年。' },
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
    { sword: '好徒儿，学成了。人跑了不要紧，百姓没事就好。', bribe: '好徒儿，学成了。人跑了不要紧，百姓没事就好。' },
  ],
};
export function introLines(hero: HeroId) {
  const wen = hero === 'wenShaohua';
  const prefix = `redBear_intro_${wen ? 'wen' : 'yu'}_`;
  return [
    { text: wen ? '少华，剑练到这一步，可以下山了。' : '无瑕，你的镖比为师当年还准。', voice: prefix + '1' },
    { text: wen ? '师父，弟子下山之后，该做些什么？' : '师父过奖。' },
    { text: wen ? '剑是用来护人的，不是用来逞能的。' : '准，不难；知道该打谁，才难。', voice: prefix + '2' },
    { text: '出师之后，惩恶扬善，保护百姓——莫让百姓受伤。', voice: prefix + '3' },
    { text: wen ? '弟子记下了。' : '……是。' },
    { text: '山下有座山，山上有三个人，你会碰到他们的。去吧。', voice: prefix + '4' },
  ];
}
