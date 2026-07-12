import type { PostIdeaInput, TimingReason } from '../data/postTemplates';

export type GeneratedPostCopy = {
  headline: string;
  caption: string;
  story: string;
};

const reasonSentences: Record<TimingReason, (name: string) => string> = {
  本日入荷: (name) => `${name}が本日入荷しました。`,
  数量限定: (name) => `${name}を数量限定でご用意しています。`,
  期間限定: (name) => `${name}を期間限定で展開しています。`,
  今週末開催: (name) => `${name}を今週末開催します。`,
  特典あり: (name) => `${name}に特典をご用意しています。`,
  残りわずか: (name) => `${name}は残りわずかです。`,
  予約受付中: (name) => `${name}の予約を受け付けています。`,
};

const closingSentences: Record<TimingReason, string> = {
  本日入荷: '気になる方は、ぜひ売場でご覧ください。',
  数量限定: '数量限定のため、気になる方はお早めにご覧ください。',
  期間限定: '期間限定のため、この機会にぜひお楽しみください。',
  今週末開催: '今週末の開催です。ぜひ店内でお楽しみください。',
  特典あり: '特典はなくなり次第終了となります。',
  残りわずか: '残りわずかとなっています。お早めにご覧ください。',
  予約受付中: 'ご予約を受け付けています。詳しくは店頭でご確認ください。',
};

const storyReasons: Record<TimingReason, string> = {
  本日入荷: '本日入荷しました！',
  数量限定: '数量限定でご用意しています！',
  期間限定: '期間限定で展開中です！',
  今週末開催: '今週末開催します！',
  特典あり: '特典をご用意しています！',
  残りわずか: '残りわずかです！',
  予約受付中: '予約受付中です！',
};

function withPeriod(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  return /[。！？!?]$/.test(trimmed) ? trimmed : `${trimmed}。`;
}

export function generatePostCopy(input: PostIdeaInput): GeneratedPostCopy {
  const name = input.name.trim();
  const audience = input.audience.trim();
  const feature = input.feature.trim();
  const location = input.location.trim();
  const locationSentence = location
    ? input.type === 'イベント'
      ? `${location}で開催します。`
      : `${location}で展開しています。`
    : '';

  const captionParagraphs = [
    audience ? `${audience}におすすめ。\n${reasonSentences[input.reason](name)}` : reasonSentences[input.reason](name),
    withPeriod(feature),
    locationSentence,
    closingSentences[input.reason],
  ].filter(Boolean);

  const storyLines = [
    name,
    storyReasons[input.reason],
    location ? `\n${location}${input.type === 'イベント' ? 'で開催します。' : 'で展開中です。'}` : '',
  ].filter(Boolean);

  return {
    headline: `${input.reason}｜${name}`,
    caption: captionParagraphs.join('\n\n'),
    story: storyLines.join('\n'),
  };
}
