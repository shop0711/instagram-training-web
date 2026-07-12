export const postTypes = [
  '新商品',
  '再入荷',
  'イベント',
  'フェア',
  'スタッフおすすめ',
  '予約受付',
  '限定特典',
] as const;

export const timingReasons = [
  '本日入荷',
  '数量限定',
  '期間限定',
  '今週末開催',
  '特典あり',
  '残りわずか',
  '予約受付中',
] as const;

export type PostType = (typeof postTypes)[number];
export type TimingReason = (typeof timingReasons)[number];

export const timingReasonsByType: Record<PostType, readonly TimingReason[]> = {
  新商品: ['本日入荷', '数量限定', '期間限定', '特典あり'],
  再入荷: ['本日入荷', '数量限定', '残りわずか'],
  イベント: ['今週末開催', '期間限定', '予約受付中'],
  フェア: ['期間限定', '今週末開催', '特典あり'],
  スタッフおすすめ: ['本日入荷', '数量限定', '期間限定', '残りわずか'],
  予約受付: ['予約受付中', '期間限定', '特典あり'],
  限定特典: ['特典あり', '数量限定', '期間限定', '残りわずか'],
};

export type PostIdeaInput = {
  type: PostType;
  name: string;
  reason: TimingReason;
  location: string;
  audience: string;
  feature: string;
};

export const samplePostIdea: PostIdeaInput = {
  type: '新商品',
  name: '北海道限定ヨーグルッペ',
  reason: '本日入荷',
  location: 'マルシェ売場入口',
  audience: '北海道商品が好きな方',
  feature: '爽やかな味わいで、休憩時間にもおすすめ',
};
