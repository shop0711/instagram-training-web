import type { PostType } from './postTemplates';

export type WorkshopAsset = {
  src: string;
  alt: string;
};

const asset = (filename: string, alt: string): WorkshopAsset => ({
  src: `/assets/processed/workshop/${filename}`,
  alt,
});

export const workshopAssetsByType: Record<PostType, readonly WorkshopAsset[]> = {
  新商品: [
    asset('workshop-new-stationery.webp', '文具の新商品を大きく見せた教材用写真'),
    asset('workshop-new-food.webp', '北海道食品の新商品を大きく見せた教材用写真'),
  ],
  再入荷: [
    asset('workshop-recommend-books.webp', '書籍がそろった平台を見せる教材用写真'),
    asset('workshop-new-food.webp', '食品がそろった売場を見せる教材用写真'),
  ],
  イベント: [
    asset('workshop-event-books.webp', '書籍イベントコーナーの教材用写真'),
    asset('workshop-event-craft.webp', '店内ワークショップ開催スペースの教材用写真'),
    asset('workshop-event-family-books.webp', '児童書売場の親子イベント準備を見せる教材用写真'),
    asset('workshop-event-limited.webp', '期間限定イベントの店内告知を見せる教材用写真'),
  ],
  フェア: [
    asset('workshop-fair-hokkaido.webp', '北海道食品フェアの売場全景を見せる教材用写真'),
    asset('workshop-fair-stationery.webp', '季節の文具フェア売場を見せる教材用写真'),
  ],
  スタッフおすすめ: [
    asset('workshop-recommend-books.webp', 'スタッフおすすめ書籍の平台を見せる教材用写真'),
    asset('workshop-recommend-stationery.webp', 'スタッフおすすめ文具を見せる教材用写真'),
    asset('workshop-recommend-food.webp', 'スタッフおすすめ食品を見せる教材用写真'),
  ],
  予約受付: [
    asset('workshop-reservation-book.webp', '予約受付中の架空書籍を見せる教材用写真'),
    asset('workshop-reservation-music.webp', '予約受付中の架空音楽商品を見せる教材用写真'),
  ],
  限定特典: [
    asset('workshop-benefit-music-card.webp', '特典カード付きの架空音楽商品を見せる教材用写真'),
    asset('workshop-benefit-music.webp', '限定特典付きの架空音楽商品を見せる教材用写真'),
    asset('workshop-benefit-stationery.webp', '限定ノベルティ付き文具を見せる教材用写真'),
  ],
};

export function pickWorkshopAsset(type: PostType, previousSrc?: string): WorkshopAsset {
  const candidates = workshopAssetsByType[type];
  const alternatives = candidates.length > 1
    ? candidates.filter((candidate) => candidate.src !== previousSrc)
    : candidates;
  return alternatives[Math.floor(Math.random() * alternatives.length)] ?? candidates[0];
}
