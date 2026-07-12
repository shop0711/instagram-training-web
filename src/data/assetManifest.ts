export type TrainingAsset = {
  id: string;
  source: string;
  path: string;
  thumbnail: string;
  media?: string;
  description: string;
  store: string;
  type: 'profile' | 'grid' | 'post';
  genre: string;
  sections: number[];
  alt: string;
  label: string;
};

const base = '/assets/processed';
const asset = (
  id: string,
  description: string,
  store: string,
  type: TrainingAsset['type'],
  genre: string,
  sections: number[],
  alt: string,
  label: string,
): TrainingAsset => ({
  id,
  source: `${id.toUpperCase()}.PNG`,
  path: `${base}/${id}.webp`,
  thumbnail: `${base}/${id}-thumb.webp`,
  media: type === 'post' ? `${base}/${id}-media.webp` : undefined,
  description,
  store,
  type,
  genre,
  sections,
  alt,
  label,
});

export const trainingAssets = [
  asset('img_4812', '若葉台店のプロフィール上部と投稿グリッド', '若葉台店', 'profile', '店舗プロフィール', [1, 14], 'コーチャンフォー若葉台店のInstagramプロフィール画面', '現在の見え方'),
  asset('img_4813', '若葉台店の投稿グリッド一覧', '若葉台店', 'grid', '投稿グリッド', [1, 7, 14], '若葉台店の多彩な投稿が並ぶInstagramグリッド', '投稿グリッド'),
  asset('img_4814', '新川通り店のプロフィール', '新川通り店', 'profile', '参考プロフィール', [14], 'コーチャンフォー新川通り店のInstagramプロフィール', '見せ方の参考'),
  asset('img_4815', '北見店のプロフィール', '北見店', 'profile', '参考プロフィール', [14], 'コーチャンフォー北見店のInstagramプロフィール', '見せ方の参考'),
  asset('img_4816', '旭川店のプロフィール', '旭川店', 'profile', '参考プロフィール', [14], 'コーチャンフォー旭川店のInstagramプロフィール', '見せ方の参考'),
  asset('img_4817', '釧路店のプロフィール', '釧路店', 'profile', '参考プロフィール', [14], 'コーチャンフォー釧路店のInstagramプロフィール', '見せ方の参考'),
  asset('img_4818', 'ミュンヘン大橋店のプロフィール', 'ミュンヘン大橋店', 'profile', '参考プロフィール', [14], 'コーチャンフォーミュンヘン大橋店のInstagramプロフィール', '見せ方の参考'),
  asset('img_4819', 'コーチャンフォー本体アカウントのプロフィール', '本体アカウント', 'profile', '本体プロフィール', [4, 14], 'コーチャンフォー本体Instagramアカウントのプロフィール', '本体アカウント'),
  asset('img_4820', 'かばん売場の投稿', '若葉台店', 'post', '売場展開', [7, 10], 'かばんが整然と並ぶ若葉台店の売場投稿', '売場展開'),
  asset('img_4821', 'ライフスタイル商品の季節提案投稿', '若葉台店', 'post', '季節提案', [7], 'ライフスタイル商品の季節提案を紹介する若葉台店の投稿', '季節提案'),
  asset('img_4822', '文房具新商品の投稿', '若葉台店', 'post', '文具', [1, 7], '文房具の新商品を紹介する若葉台店の投稿', '新商品'),
  asset('img_4823', '新商品＋売場の広さ、アイテム数を見せる投稿', '若葉台店', 'post', '売場展開', [7, 9], '北海道商品の新商品と売場の広さ、アイテム数が伝わる若葉台店の投稿', '売場変更'),
  asset('img_4824', 'ヨーグルッペの商品投稿', '若葉台店', 'post', '食品', [1, 7, 10, 11, 12, 13], '北海道限定パッケージのヨーグルッペを紹介する投稿', '新商品・本日入荷'),
  asset('img_4825', 'ヨーグルッペの説明付き投稿', '若葉台店', 'post', '食品', [12], 'ヨーグルッペの商品と説明文が見えるInstagram投稿', '商品紹介'),
  asset('img_4826', 'マルシェ売場の投稿', '若葉台店', 'post', '食品・マルシェ', [7, 10], '若葉台店のマルシェ売場を紹介する投稿', '季節の食品'),
  asset('img_4827', '期間限定の売場情報', '若葉台店', 'post', '雑貨', [7], '期間限定の売場情報を紹介する若葉台店の投稿', 'スタッフおすすめ'),
  asset('img_4828', '書籍売場の投稿', '若葉台店', 'post', '書籍', [7, 15], '本を手に取って紹介する若葉台店の書籍投稿', '書籍'),
  asset('img_4838', '音楽商品の投稿', '若葉台店', 'post', '音楽', [5], '音楽商品を紹介する若葉台店のInstagram投稿', '音楽'),
] as const satisfies readonly TrainingAsset[];

export const assetById = Object.fromEntries(
  trainingAssets.map((item) => [item.id, item]),
) as Record<(typeof trainingAssets)[number]['id'], TrainingAsset>;

export const wakabadaiPosts = trainingAssets.filter(
  (item) => item.store === '若葉台店' && item.type === 'post' && item.sections.includes(7),
);
