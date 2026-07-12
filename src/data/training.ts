export type ChapterId = 'chapter-1' | 'chapter-2' | 'chapter-3';

export type CompareExample = {
  label: string;
  before: string;
  after: string;
};

export type FormatItem = {
  id: 'feed' | 'stories' | 'reels';
  label: string;
  purpose: string;
  summary: string;
  items: string[];
  accent: string;
};

export type PatternCard = {
  title: string;
  lead: string;
  items: string[];
};

export type SlideKind =
  | 'cover'
  | 'goals'
  | 'statement'
  | 'account-roles'
  | 'customer-view'
  | 'lifestyle'
  | 'idea-grid'
  | 'five-steps'
  | 'photo-check'
  | 'formats'
  | 'first-image'
  | 'patterns'
  | 'word-shift'
  | 'profile'
  | 'algorithm'
  | 'ai'
  | 'risk-summary';

export type SlideData = {
  id: string;
  number: number;
  chapter: ChapterId;
  chapterLabel: string;
  chapterTitle: string;
  kind: SlideKind;
  eyebrow: string;
  title: string;
  description?: string;
  keyPhrase?: string;
  speakerNote: string;
  bullets?: string[];
  cards?: Array<{ title: string; description: string; icon?: string }>;
  compareExamples?: CompareExample[];
  formats?: FormatItem[];
  patterns?: PatternCard[];
  wordPairs?: Array<{ before: string; after: string }>;
};

export const chapters = [
  {
    id: 'chapter-1' as const,
    label: 'Chapter 1',
    title: 'Instagramは「来店理由」を届ける場所',
    range: '01–06'
  },
  {
    id: 'chapter-2' as const,
    label: 'Chapter 2',
    title: '毎日の売場を「投稿」に変える',
    range: '07–15'
  },
  {
    id: 'chapter-3' as const,
    label: 'Chapter 3',
    title: '続けやすく、安全に運用する',
    range: '16–17'
  }
];

export const trainingSlides: SlideData[] = [
  {
    id: 'cover',
    number: 1,
    chapter: 'chapter-1',
    chapterLabel: 'Chapter 1',
    chapterTitle: 'Instagramは「来店理由」を届ける場所',
    kind: 'cover',
    eyebrow: 'STORE INSTAGRAM TRAINING',
    title: '店舗から届けるInstagram研修',
    description: '「今日、このお店に行く理由」をつくるSNS発信',
    keyPhrase: 'PowerPointではなく、Webで学ぶSNS研修資料',
    speakerNote:
      '店舗Instagramの役割は、売場の今をお客様の来店理由へ変えることです。投稿ネタの見つけ方、伝え方、安全な運用を順番に確認できます。'
  },
  {
    id: 'goals',
    number: 2,
    chapter: 'chapter-1',
    chapterLabel: 'Chapter 1',
    chapterTitle: 'Instagramは「来店理由」を届ける場所',
    kind: 'goals',
    eyebrow: 'TODAY’S GOAL',
    title: '今日のゴール',
    description:
      'Instagramを「なんとなく投稿するもの」から、お客様に来店理由を届けるための道具へ。',
    cards: [
      { title: '役割を理解する', description: '店舗アカウントだから届けられる情報を知る。' },
      { title: '売場をネタに変える', description: '日々の業務から投稿テーマを見つける。' },
      { title: '続け方を知る', description: 'AIと確認ルールで、無理なく安全に運用する。' }
    ],
    speakerNote:
      '研修後は、店舗アカウントの役割を理解し、売場からネタを見つけ、安全に1本の投稿案を作れる状態を目指します。スマートフォンではQRコードから同じ資料と体験ページを開けます。'
  },
  {
    id: 'communication',
    number: 3,
    chapter: 'chapter-1',
    chapterLabel: 'Chapter 1',
    chapterTitle: 'Instagramは「来店理由」を届ける場所',
    kind: 'statement',
    eyebrow: 'MINDSET',
    title: 'Instagramは、単なる宣伝ツールではありません',
    description:
      'お客様に「今日、このお店へ行ってみよう」と思っていただく、店舗とお客様の接点です。',
    bullets: [
      '一方的な広告ではなく、日々の情報を届ける',
      '商品だけでなく、実際のお店の雰囲気を見せる',
      '小さな接点を積み重ね、安心感と期待をつくる'
    ],
    keyPhrase: '商品を売る場所ではなく、信頼関係を築く場所。',
    speakerNote:
      '売り込みだけでなく、売場の様子やスタッフの視点を見せると、店頭に行く前の不安を減らせます。日々の小さな情報が、お客様との継続的な接点になります。'
  },
  {
    id: 'account-roles',
    number: 4,
    chapter: 'chapter-1',
    chapterLabel: 'Chapter 1',
    chapterTitle: 'Instagramは「来店理由」を届ける場所',
    kind: 'account-roles',
    eyebrow: 'ROLE DESIGN',
    title: '本体アカウントと店舗アカウントは、役割が違う',
    description: '同じ情報を繰り返すのではなく、見る人と時間軸を分けます。',
    keyPhrase: '本体が「旅行ガイド」なら、店舗は「地域の掲示板」。',
    speakerNote:
      '本体アカウントは企業全体の魅力や大型施策を広く長く伝えます。店舗アカウントは「今日ここで何が起きているか」を近隣のお客様へ具体的に伝えます。'
  },
  {
    id: 'customer-view',
    number: 5,
    chapter: 'chapter-1',
    chapterLabel: 'Chapter 1',
    chapterTitle: 'Instagramは「来店理由」を届ける場所',
    kind: 'customer-view',
    eyebrow: 'CUSTOMER VIEW',
    title: '「伝えたいこと」と「知りたいこと」は違う',
    description: '商品を紹介するだけでなく、お客様がそれを買ったあとに楽しめる時間まで言葉にします。',
    compareExamples: [
      { label: '文具', before: '新しいボールペンです。', after: '勉強や仕事が少し楽しくなる限定カラーです。' },
      { label: '本', before: 'おすすめ本です。', after: '休日にゆっくり読みたい一冊です。' },
      { label: '食品', before: '北海道限定のお菓子が入荷しました。', after: 'おうちで北海道旅行気分を楽しめるお菓子が入荷しました。' },
      { label: '音楽', before: 'CD発売です。', after: '特典付きは数量限定です。' }
    ],
    keyPhrase: '商品を紹介するだけでなく、買ったあとに楽しめる時間を伝える。',
    speakerNote:
      '商品名だけでなく、使う場面や得られる体験まで言葉にします。「自分にどんな良いことがあるか」が分かると、投稿を自分ごととして受け取りやすくなります。'
  },
  {
    id: 'lifestyle',
    number: 6,
    chapter: 'chapter-1',
    chapterLabel: 'Chapter 1',
    chapterTitle: 'Instagramは「来店理由」を届ける場所',
    kind: 'lifestyle',
    eyebrow: 'SUCCESS PATTERN',
    title: 'コーチャンフォーは、一日楽しめる場所として発信できる',
    description: '商品そのものではなく、お客様が店内で過ごす時間・楽しみ方として見せます。',
    cards: [
      { title: '読む', description: '休日に出会う一冊' },
      { title: '書く', description: '仕事や学びが楽しくなる文具' },
      { title: '聴く', description: 'お気に入りの音楽との出会い' },
      { title: '味わう', description: '北海道を感じる食品' },
      { title: '休む', description: 'カフェで過ごす時間' }
    ],
    keyPhrase: 'コーチャンフォーは、“商品を紹介する場所”ではなく、お客様が一日を楽しめる場所として発信できる。',
    speakerNote:
      '書籍、文具、音楽、食品、カフェが一つの場所にあること自体が強みです。商品を一つずつ紹介するだけでなく、お客様が店内でどんな時間を過ごせるかを見せることで、来店後のイメージが伝わりやすくなります。'
  },
  {
    id: 'content-ideas',
    number: 7,
    chapter: 'chapter-2',
    chapterLabel: 'Chapter 2',
    chapterTitle: '毎日の売場を「投稿」に変える',
    kind: 'idea-grid',
    eyebrow: 'CONTENT FINDER',
    title: '「何を投稿すればいいか」は、売場を見れば解決できる',
    description: '特別な企画がなくても、日々の変化そのものがコンテンツになります。',
    cards: [
      { title: '新商品の入荷', description: '今日だから価値がある' },
      { title: '売場変更', description: '見つけやすくなった変化' },
      { title: '季節コーナー', description: '今の気分に合う提案' },
      { title: 'ランキング', description: '迷った人の選ぶ理由' },
      { title: 'スタッフおすすめ', description: '現場ならではの視点' },
      { title: 'フェア', description: 'まとめて選べる楽しさ' },
      { title: 'イベント準備', description: '開催前の期待感' },
      { title: '試食会', description: '今まさに起きていること' },
      { title: 'POP制作', description: '売場の裏側' },
      { title: '限定特典', description: '今来る理由' },
      { title: '予約受付', description: '買い逃しを防ぐ情報' },
      { title: '再入荷', description: '待っていた人に届く情報' }
    ],
    keyPhrase: '日々の業務そのものがコンテンツになる。',
    speakerNote:
      '朝の入荷、売場変更、POP設置など、今日の業務を振り返れば投稿ネタが見つかります。「変わったこと」「今だけのこと」「スタッフが薦めたいこと」が探す目印です。'
  },
  {
    id: 'one-theme',
    number: 8,
    chapter: 'chapter-2',
    chapterLabel: 'Chapter 2',
    chapterTitle: '毎日の売場を「投稿」に変える',
    kind: 'five-steps',
    eyebrow: 'MESSAGE DESIGN',
    title: '1投稿1テーマで伝える',
    description: '一度にたくさん伝えるより、一つの来店理由を明確にします。',
    cards: [
      { title: '何がある？', description: '商品・フェア・イベント' },
      { title: '誰におすすめ？', description: '家族、学生、ファンなど' },
      { title: 'どこにある？', description: '入口、売場名、平台' },
      { title: 'いつまで？', description: '期間・数量・開催日時' },
      { title: 'なぜ今？', description: '限定、週末、再入荷' }
    ],
    keyPhrase: '一つの投稿に、一つの「行く理由」。',
    speakerNote:
      '投稿文がまとまらないときは、この5項目を順番に確認します。すべてを1枚目に入れず、詳細は2枚目以降やキャプションへ分けます。'
  },
  {
    id: 'photo-basics',
    number: 9,
    chapter: 'chapter-2',
    chapterLabel: 'Chapter 2',
    chapterTitle: '毎日の売場を「投稿」に変える',
    kind: 'photo-check',
    eyebrow: 'VISUAL BASICS',
    title: 'きれいさより、伝わりやすさ',
    description: '高価なカメラよりも、商品と売場が一目で分かることを優先します。',
    bullets: [
      '明るい場所で撮れている',
      '背景に余計な物がない',
      '商品名や特徴が読める',
      '寄りと引きの両方がある',
      '売場の場所や規模が伝わる'
    ],
    keyPhrase: '「映える写真」より、「迷わず伝わる写真」。',
    speakerNote:
      '撮影前に一歩だけ整理することが大切です。段ボールや作業用品を避け、正面から1枚、全体が分かる引きで1枚撮るだけでも十分伝わります。'
  },
  {
    id: 'formats',
    number: 10,
    chapter: 'chapter-2',
    chapterLabel: 'Chapter 2',
    chapterTitle: '毎日の売場を「投稿」に変える',
    kind: 'formats',
    eyebrow: 'FORMAT GUIDE',
    title: '投稿形式ごとに役割を分ける',
    description: '情報の寿命と、伝えたい温度感で使い分けます。',
    formats: [
      {
        id: 'feed',
        label: 'フィード',
        purpose: '残す情報',
        summary: '後から見返しても価値がある、店舗の基本情報や特集。',
        items: ['イベント', '大型フェア', '新商品', 'ランキング', '複数商品紹介'],
        accent: '保存・検索'
      },
      {
        id: 'stories',
        label: 'ストーリーズ',
        purpose: '今伝える情報',
        summary: '今日の動きや、時間が限られた情報を素早く届ける。',
        items: ['本日入荷', '試食会開催中', '急ぎのお知らせ', '日々の売場変化'],
        accent: '即時性'
      },
      {
        id: 'reels',
        label: 'リール',
        purpose: '雰囲気を伝える',
        summary: '動きと音で、店内の広さや楽しさを直感的に見せる。',
        items: ['店内の雰囲気', '展開風景', '短い紹介動画', 'スタッフ目線'],
        accent: '発見・体験'
      }
    ],
    keyPhrase: '残すならフィード、今ならストーリーズ、雰囲気ならリール。',
    speakerNote:
      'すべてをフィードに残す必要はありません。今日だけの情報はストーリーズ、売場の動きはリール、後から探してほしい情報はフィードにします。'
  },
  {
    id: 'first-image',
    number: 11,
    chapter: 'chapter-2',
    chapterLabel: 'Chapter 2',
    chapterTitle: '毎日の売場を「投稿」に変える',
    kind: 'first-image',
    eyebrow: 'FIRST IMPRESSION',
    title: '1枚目は、ただの表紙ではありません',
    description: '研修上の目安として、ひと目で「何の投稿か」と「見る理由」が分かる状態を目指します。',
    bullets: [
      '商品・イベントの主役が大きく見える',
      '短い見出しで内容が分かる',
      '続きを見たくなる具体性がある',
      '小さなスマホ画面でも読める'
    ],
    keyPhrase: 'フィード1枚目は、スクロールを止める店頭POP。',
    speakerNote:
      '1枚目は店頭のPOPと同じ役割です。「0.5秒」は公式仕様ではなく、研修上の目安としてひと目で意味が分かる状態を表します。本日入荷、期間限定、5選など、内容がすぐ分かる言葉を置きます。'
  },
  {
    id: 'first-image-patterns',
    number: 12,
    chapter: 'chapter-2',
    chapterLabel: 'Chapter 2',
    chapterTitle: '毎日の売場を「投稿」に変える',
    kind: 'patterns',
    eyebrow: 'DESIGN PATTERN',
    title: '1枚目には型がある',
    description: '毎回ゼロから考えず、目的ごとの型を使い分けます。',
    patterns: [
      {
        title: '新商品紹介',
        lead: '主役を大きく',
        items: ['商品写真を大きく', '「入荷しました」', '魅力を一言']
      },
      {
        title: 'イベント告知',
        lead: '日時を先に',
        items: ['イベント名', '開催日', '楽しそうな写真']
      },
      {
        title: 'フェア・売場展開',
        lead: '規模感を見せる',
        items: ['売場写真', 'フェア名', '開催中／期間限定']
      },
      {
        title: 'ランキング・おすすめ',
        lead: '選ぶ理由を作る',
        items: ['今売れています', 'スタッフおすすめ', '複数商品を見せる']
      }
    ],
    keyPhrase: '型があると、速く・迷わず・伝わる。',
    speakerNote:
      'テンプレート化すると、見る側が理解しやすく、作る側も継続しやすくなります。店舗で2〜4種類の型を共有し、詳細は2枚目以降へ分けます。'
  },
  {
    id: 'strong-words',
    number: 13,
    chapter: 'chapter-2',
    chapterLabel: 'Chapter 2',
    chapterTitle: '毎日の売場を「投稿」に変える',
    kind: 'word-shift',
    eyebrow: 'COPYWRITING',
    title: '30秒で投稿案を作ってみよう',
    description: '店舗にある事実を少し整理するだけで、“お知らせ”が来店理由のある投稿に変わります。',
    wordPairs: [
      { before: 'お知らせ', after: '今週末開催' },
      { before: '商品紹介', after: '本日入荷' },
      { before: 'フェア情報', after: '期間限定フェア開催中' },
      { before: 'おすすめ', after: 'スタッフおすすめ5選' },
      { before: '入荷情報', after: '話題の商品が入りました' },
      { before: 'イベント情報', after: '親子で楽しめるイベント開催' }
    ],
    keyPhrase: '完璧な広告より、店舗にある事実を整理する。',
    speakerNote:
      '「お知らせ」は発信者側の分類です。何が、いつ、どこで、誰向けにあるのかを整理すると、店舗スタッフがそのまま使える自然な投稿案になります。入力内容はブラウザ内だけで処理されます。'
  },
  {
    id: 'profile',
    number: 14,
    chapter: 'chapter-2',
    chapterLabel: 'Chapter 2',
    chapterTitle: '毎日の売場を「投稿」に変える',
    kind: 'profile',
    eyebrow: 'PROFILE DESIGN',
    title: 'プロフィールは、お店の入口です',
    description: '投稿で興味を持った人が、次に「行く・フォローする」を判断する場所です。',
    bullets: ['プロフィール画像', '名前欄', '自己紹介文', '固定投稿', 'ハイライト'],
    keyPhrase: 'ホーム画面は、SNS上の「店頭入口」。',
    speakerNote:
      '店舗名、場所、何が分かるアカウントかが数秒で伝わる状態にします。固定投稿には店舗案内、ハイライトにはアクセスや開催中の情報を整理し、初めての人を迷わせないようにします。'
  },
  {
    id: 'algorithm',
    number: 15,
    chapter: 'chapter-2',
    chapterLabel: 'Chapter 2',
    chapterTitle: '毎日の売場を「投稿」に変える',
    kind: 'algorithm',
    eyebrow: 'ALGORITHM',
    title: 'Instagramは、どんな投稿を届けようとするのか？',
    description: 'Instagramは、視聴時間、いいね、保存、シェア、コメント、投稿者との関係性など、複数の反応を参考に、見る人ごとに表示する投稿を変えています。',
    cards: [
      { title: '最後まで見る', description: '内容に興味が続いた' },
      { title: '保存する', description: '後で見返したい' },
      { title: '送る', description: '誰かと共有したい' },
      { title: 'コメントする', description: '反応や会話が生まれた' },
      { title: 'プロフィールを見る', description: '店舗をもっと知りたい' }
    ],
    keyPhrase: 'アルゴリズム対策より、お客様に役立つ投稿を考える。',
    speakerNote:
      '保存やシェアだけで表示が必ず広がるわけではありません。Instagramは複数の情報と見る人との関係性を参考にします。店舗投稿では、全国への拡散よりも地域のお客様に役立ち、来店や店頭の反応につながったかを振り返ります。'
  },
  {
    id: 'ai',
    number: 16,
    chapter: 'chapter-3',
    chapterLabel: 'Chapter 3',
    chapterTitle: '続けやすく、安全に運用する',
    kind: 'ai',
    eyebrow: 'AI ASSIST',
    title: 'SNS担当者は、文章を書く人ではありません',
    description: '現場の情報を見つけ、AIに「伝わる形」へ整えてもらいます。',
    keyPhrase: 'AIは、情報を伝わる形に整えるパートナー。',
    speakerNote:
      'AIに渡すのは、何が、いつ、どこに、誰向けにあるのかという店舗の事実です。AIが作った文章も、価格、日付、在庫、固有名詞は必ず人が確認します。'
  },
  {
    id: 'risk-summary',
    number: 17,
    chapter: 'chapter-3',
    chapterLabel: 'Chapter 3',
    chapterTitle: '続けやすく、安全に運用する',
    kind: 'risk-summary',
    eyebrow: 'FINAL CHECK',
    title: '迷ったら投稿しない。',
    description: '店舗アカウントは会社の公式発信。速さより、正確さと安心を優先します。',
    bullets: [
      'お客様の顔・個人情報が映っていない',
      '売場が整い、誤解を招く表現がない',
      '著作権・肖像権に問題がない',
      '価格・日付・期間が正しい',
      '終了済みの情報ではない',
      '判断に迷う場合は相談する'
    ],
    keyPhrase:
      'Instagramは、完璧な広告を作る場所ではなく、「今日、このお店に行ってみよう」と思っていただく場所です。',
    speakerNote:
      '最後に最も大切なルールです。迷う内容は一人で判断せず、投稿を止めて相談します。今日の4点、来店理由、売場のネタ、AI活用、安全確認を持ち帰ってください。'
  }
];

export const riskChecklist = [
  'お客様の顔が写っていないか',
  '個人情報が映り込んでいないか',
  '売場が乱れていないか',
  '誤解を招く表現になっていないか',
  '著作権や肖像権に問題がないか',
  '終了済みイベントを告知していないか',
  '価格や日付に間違いがないか',
  '判断に迷う内容ではないか'
];

export const aiCanDo = [
  '投稿文',
  'タイトル',
  'キャッチコピー',
  'ハッシュタグ案',
  'リール台本',
  'ストーリーズ文章',
  'イベント告知文'
];

export const aiNeedsFromStore = [
  '今日入荷した商品',
  '売場の変化',
  'お客様との会話',
  '地域性',
  '店舗の雰囲気',
  'スタッフのおすすめ'
];
