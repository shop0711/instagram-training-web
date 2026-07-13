import { useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Film,
  Grid3X3,
  Heart,
  MapPin,
  MessageCircle,
  MousePointer2,
  Play,
  Search,
  Send,
  Sparkles,
  Store,
  X,
} from 'lucide-react';
import type { SlideData } from '../data/training';
import { assetById, wakabadaiPosts } from '../data/assetManifest';

const profile = assetById.img_4812;
const grid = assetById.img_4813;
const food = assetById.img_4824;

type ImageProps = {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
};

function RealImage({ src, alt, className = '', eager = false }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width="1000"
      height="2174"
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
      className={className}
    />
  );
}

export function RealityCover({ slide }: { slide: SlideData }) {
  return (
    <div className="grid h-full gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
      <div className="relative z-20">
        <p className="mb-4 flex items-center gap-2 text-xs font-black text-brand-700">
          <span className="h-px w-10 bg-brand-500" /> 店舗発信の実践研修
        </p>
        <h1 id={`${slide.id}-title`} className="max-w-3xl text-balance text-[clamp(2.6rem,5vw,5.5rem)] font-black leading-[.98] text-slate-950">
          店舗の今が、<br /><span className="text-brand-700">来店理由になる。</span>
        </h1>
        <p className="mt-5 max-w-xl text-[clamp(1rem,1.5vw,1.35rem)] font-bold leading-relaxed text-slate-600">
          実際の若葉台店Instagramから学ぶ、<br className="hidden sm:block" />明日から使える発信のつくり方。
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {['実際のプロフィール', '実際の投稿', '改善ポイント'].map((label) => (
            <span key={label} className="border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">{label}</span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto h-full min-h-[390px] w-full max-w-2xl overflow-hidden bg-brand-50/70">
        <div className="absolute inset-y-5 left-[7%] w-[34%] -rotate-2 overflow-hidden border-[5px] border-slate-950 bg-white shadow-phone">
          <RealImage src={profile.path} alt={profile.alt} eager className="h-full w-full object-cover object-top" />
        </div>
        <div className="absolute inset-y-10 left-[39%] w-[31%] rotate-2 overflow-hidden border-4 border-white bg-white shadow-xl">
          <RealImage src={grid.path} alt={grid.alt} eager className="h-full w-full object-cover object-top" />
        </div>
        <div className="absolute bottom-5 right-[4%] top-[18%] w-[32%] -rotate-1 overflow-hidden border-[5px] border-slate-950 bg-white shadow-phone">
          <RealImage src={food.path} alt={food.alt} eager className="h-full w-full object-cover object-top" />
        </div>
        <div className="absolute bottom-6 left-[32%] z-20 max-w-[210px] border-l-4 border-amber-400 bg-slate-950 px-4 py-3 text-white shadow-xl">
          <p className="text-[9px] font-black text-amber-300">REAL STORE / REAL POSTS</p>
          <p className="mt-1 text-sm font-black">売場の事実を、伝わる形へ。</p>
        </div>
      </div>
    </div>
  );
}

export function RealPostGrid() {
  const [selected, setSelected] = useState(0);
  const active = wakabadaiPosts[selected];

  return (
    <div className="grid h-full gap-4 lg:grid-cols-[1.25fr_.75fr]">
      <div className="grid min-h-0 grid-cols-3 gap-2" aria-label="若葉台店の実投稿例">
        {wakabadaiPosts.map((item, index) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setSelected(index)}
            aria-pressed={selected === index}
            className={`group relative min-h-0 overflow-hidden border-2 text-left transition ${selected === index ? 'border-brand-600 shadow-card' : 'border-white'}`}
          >
            <RealImage src={item.media ?? item.thumbnail} alt={item.alt} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
            <span className="absolute left-2 top-2 bg-white/95 px-2 py-1 text-[9px] font-black text-slate-900 shadow-sm">{item.label}</span>
            <span className="absolute inset-0 bg-brand-950/0 transition group-hover:bg-brand-950/25" />
          </button>
        ))}
      </div>
      <aside className="flex flex-col justify-center border-l-4 border-brand-600 bg-brand-50 p-5" aria-live="polite">
        <p className="text-[10px] font-black text-brand-700">投稿ネタになった業務</p>
        <h3 className="mt-2 text-2xl font-black text-slate-950">{active.label}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{active.description}</p>
        <div className="mt-4 flex items-center gap-2 bg-white p-3 text-xs font-bold text-brand-900">
          <MousePointer2 size={16} /> 画像を選ぶと、ネタの正体が見える
        </div>
      </aside>
    </div>
  );
}

export function RealPhotoCompare() {
  return (
    <div className="grid h-full gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
      <PhotoLesson
        label="演習用・改善前"
        media="/assets/generated/photo-basics-before.webp"
        alt="暗く、主役が遠く、背景や色味が目立ち、水平がずれた売場写真の改善前サンプル"
        bad
      />
      <div className="hidden items-center lg:flex"><ArrowRight className="text-brand-500" size={28} /></div>
      <PhotoLesson
        label="教材用・改善後イメージ"
        media="/assets/generated/photo-basics-after.webp"
        alt="明るく、主役が大きく、背景と色味が自然で水平が整った売場写真の改善後サンプル"
      />
    </div>
  );
}

function PhotoLesson({ label, media, alt, bad = false }: { label: string; media: string; alt: string; bad?: boolean }) {
  const points = bad
    ? ['暗い', '主役が遠い', '背景が目立つ', '画質が荒い', '色味を加工しすぎ', '水平がずれている']
    : ['明るく補正', '主役を大きく見せる', '背景を整理', '画質を保つ', '色味は自然に整える', '水平をまっすぐにする'];
  return (
    <article className={`grid min-h-0 grid-rows-[1fr_auto] border ${bad ? 'border-rose-200 bg-rose-50' : 'border-emerald-200 bg-emerald-50'}`}>
      <div className={`relative min-h-[260px] overflow-hidden ${bad ? 'bg-slate-800' : 'bg-white'}`}>
        <RealImage
          src={media}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {bad && <span className="absolute inset-0 bg-slate-950/15" />}
        <span className={`absolute left-3 top-3 px-3 py-2 text-xs font-black text-white ${bad ? 'bg-rose-600' : 'bg-emerald-600'}`}>{label}</span>
        <span className={`absolute bottom-3 left-3 max-w-[82%] px-3 py-2 text-sm font-black shadow-lg ${bad ? 'bg-slate-950/85 text-white' : 'bg-white text-slate-950'}`}>{bad ? '何を見せたいか迷う' : '見せたいものがすぐ分かる'}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 p-3 lg:grid-cols-3">
        {points.map((point) => <span key={point} className="flex items-center justify-center gap-1 bg-white px-2 py-2 text-[10px] font-black">{bad ? <X size={13} className="text-rose-500" /> : <Check size={13} className="text-emerald-600" />}{point}</span>)}
      </div>
    </article>
  );
}

type Format = 'feed' | 'stories' | 'reels';

export function RealFormatGuide() {
  const [active, setActive] = useState<Format>('feed');
  const formats = {
    feed: {
      label: 'フィード',
      icon: Grid3X3,
      headline: '保存版｜北海道フェアおすすめ5選',
      note: '残す情報',
      role: '複数枚投稿の顔として、後から見返せる情報を残す場所',
      image: '/assets/generated/format-feed.webp',
      alt: '北海道フェアおすすめ5選の複数枚投稿で顔になる1枚目のフィード投稿サンプル',
      examples: ['表紙になる1枚目', '大型フェア', 'イベント詳細', '新商品まとめ', 'おすすめ5選', '予約受付'],
      caseTitle: '保存版｜北海道フェアおすすめ5選',
      caseText: '1枚目でテーマを伝え、2枚目以降で詳しく見せる。',
    },
    stories: {
      label: 'ストーリーズ',
      icon: Clock3,
      headline: '抽選結果発表',
      note: '今だけ',
      role: '今だけ必要な情報を気軽に届ける場所',
      image: '/assets/generated/format-stories.webp',
      alt: '抽選結果発表を知らせるストーリーズ投稿サンプル',
      examples: ['本日入荷', '試食会開催中', '抽選結果', '残りわずか', '今日だけのお知らせ', '売場の変化'],
      caseTitle: '抽選結果発表 / 本日入荷',
      caseText: '24時間で十分な、一時的なお知らせに向いています。',
    },
    reels: {
      label: 'リール',
      icon: Film,
      headline: '北海道フェアを30秒で紹介',
      note: '雰囲気・動き・体験',
      role: '雰囲気や動きが伝わりやすく、目に留まりやすい投稿形式',
      image: '/assets/generated/format-reels.webp',
      alt: '北海道フェアの売場を歩いて紹介するリール投稿サンプル',
      examples: ['売場を歩く', 'フェアの雰囲気', '商品を手に取る', 'イベント準備', '店内の楽しさ'],
      caseTitle: '売場を歩いて北海道フェアを紹介',
      caseText: '写真だけでは伝わらない空気感を見せる。慣れてから挑戦で大丈夫です。',
    },
  } as const;
  const current = formats[active];

  return (
    <div className="grid h-full gap-5 lg:grid-cols-[.82fr_1.18fr]">
      <div className="flex items-center justify-center">
        <FormatPhone mode={active} headline={current.headline} image={current.image} alt={current.alt} />
      </div>
      <div className="flex min-h-0 flex-col justify-center">
        <div className="grid grid-cols-3 border border-slate-200 bg-white p-1" role="tablist" aria-label="投稿形式">
          {(Object.keys(formats) as Format[]).map((key) => {
            const Icon = formats[key].icon;
            return <button key={key} type="button" role="tab" aria-selected={active === key} onClick={() => setActive(key)} className={`flex items-center justify-center gap-2 px-3 py-2 text-xs font-black ${active === key ? 'bg-brand-700 text-white' : 'text-slate-500'}`}><Icon size={15} />{formats[key].label}</button>;
          })}
        </div>
        <div className="mt-4 border-l-4 border-brand-600 bg-brand-50 p-5">
          <p className="text-xs font-black text-brand-700">{current.note}</p>
          <h3 className="mt-1 text-2xl font-black">{current.role}</h3>
          <div className="mt-4 grid grid-cols-3 gap-2">{current.examples.map((item) => <span key={item} className="bg-white p-2 text-center text-[11px] font-bold">{item}</span>)}</div>
        </div>
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
          <div className="border border-slate-200 bg-white p-4">
            <p className="text-[10px] font-black text-brand-700">北海道フェアの場合</p>
            <h4 className="mt-1 text-base font-black text-slate-950">{current.caseTitle}</h4>
            <p className="mt-1 text-xs font-bold leading-relaxed text-slate-600">{current.caseText}</p>
          </div>
          <div className="grid min-w-[165px] gap-1.5 text-[10px] font-black text-slate-700">
            <span className={`border-l-4 bg-white p-2 ${active === 'feed' ? 'border-blue-500 text-brand-800 shadow-sm' : 'border-slate-200'}`}>後から見返す？ → フィード</span>
            <span className={`border-l-4 bg-white p-2 ${active === 'stories' ? 'border-amber-400 text-brand-800 shadow-sm' : 'border-slate-200'}`}>今だけでよい？ → ストーリーズ</span>
            <span className={`border-l-4 bg-white p-2 ${active === 'reels' ? 'border-rose-500 text-brand-800 shadow-sm' : 'border-slate-200'}`}>雰囲気を見せる？ → リール</span>
          </div>
        </div>
        {active === 'stories' && (
          <div className="mt-3 bg-amber-50 p-3 text-xs font-bold leading-relaxed text-amber-950">
            抽選結果は対象のお客様には必要な情報です。ただし後から見た人には関係が薄く、フィードに残るとノイズになりやすいため、24時間で消えるストーリーズが向いています。
            <span className="mt-1 block font-black text-brand-800">残しておきたい情報は、あとからハイライトに整理できます。</span>
          </div>
        )}
        {active === 'reels' && (
          <div className="mt-3 bg-slate-950 p-3 text-xs font-bold leading-relaxed text-white">
            リールは伸びやすい反面、作成には少し手間がかかります。まずはフィードとストーリーズを安定して投稿し、慣れてきたら挑戦する順番で大丈夫です。
          </div>
        )}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-black">
          <span className="border-t-4 border-blue-500 p-2">残す情報</span><span className="border-t-4 border-amber-400 p-2">今だけ</span><span className="border-t-4 border-rose-500 p-2">雰囲気</span>
        </div>
      </div>
    </div>
  );
}

function FormatPhone({ mode, headline, image, alt }: { mode: Format; headline: string; image: string; alt: string }) {
  const portrait = mode !== 'feed';
  return (
    <div className={`relative mx-auto overflow-hidden rounded-[2rem] border-[6px] border-slate-950 bg-white shadow-phone ${portrait ? 'aspect-[9/16] w-[205px]' : 'w-[235px]'}`}>
      <div className="flex h-7 items-center justify-between px-4 text-[8px] font-black"><span>14:21</span><span>● ● ▰</span></div>
      {mode === 'feed' && <div className="flex items-center gap-2 border-y border-slate-100 px-3 py-2"><span className="h-6 w-6 rounded-full bg-brand-700" /><span className="text-[9px] font-bold">coachandfour_wakabadai</span></div>}
      <div className={`relative overflow-hidden ${portrait ? 'h-[calc(100%-1.75rem)]' : 'aspect-square'}`}>
        <RealImage src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
        <span className={`absolute inset-0 ${mode === 'feed' ? 'bg-transparent' : 'bg-gradient-to-t from-slate-950/45 via-transparent to-slate-950/10'}`} />
        {mode === 'stories' && <div className="absolute inset-x-3 top-3 h-1 bg-white/85" />}
        {mode === 'reels' && <Play className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white" fill="white" />}
        {mode !== 'feed' && <p className="absolute inset-x-4 bottom-5 text-lg font-black leading-tight text-white">{headline}</p>}
      </div>
      {mode === 'feed' && <div className="flex justify-between p-3"><span className="flex gap-2"><Heart size={15} /><MessageCircle size={15} /><Send size={15} /></span><span className="text-[9px] font-bold">保存版</span></div>}
    </div>
  );
}

export function RealFirstImageCompare() {
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const carousel = [
    {
      label: '1枚目：止める',
      src: '/assets/generated/first-image-carousel-1.webp',
      alt: '北海道フェアおすすめ5選のスクロールを止める1枚目サンプル',
      detail: '何の投稿か、なぜ見るべきかを一瞬で伝える',
    },
    {
      label: '2枚目：詳しく',
      src: '/assets/generated/first-image-carousel-2.webp',
      alt: '北海道フェアの人気商品カテゴリを詳しく見せる2枚目サンプル',
      detail: 'おすすめ商品のジャンル感を整理して見せる',
    },
    {
      label: '3枚目：納得',
      src: '/assets/generated/first-image-carousel-3.webp',
      alt: '北海道フェアの商品を選ぶ理由と楽しみ方を伝える3枚目サンプル',
      detail: '手土産やおうち時間など、買う理由を伝える',
    },
    {
      label: '4枚目：来店へ',
      src: '/assets/generated/first-image-carousel-4.webp',
      alt: '北海道フェアの売場と期間限定を案内する4枚目サンプル',
      detail: '場所・期間・行動につなげる',
    },
  ];
  const active = carousel[index];
  const move = (next: number) => setIndex((next + carousel.length) % carousel.length);

  return (
    <div className="grid h-full gap-4 lg:grid-cols-[1.15fr_.85fr]">
      <div className="grid min-h-0 grid-rows-[1fr_auto] gap-3">
        <article
          className="relative mx-auto grid min-h-0 w-full max-w-[520px] grid-rows-[auto_1fr_auto] overflow-hidden border-[6px] border-slate-950 bg-white shadow-phone"
          tabIndex={0}
          role="region"
          aria-label="北海道フェアの4枚カルーセル投稿例"
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') { event.stopPropagation(); move(index + 1); }
            if (event.key === 'ArrowLeft') { event.stopPropagation(); move(index - 1); }
          }}
          onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return;
            const delta = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
            if (Math.abs(delta) > 45) move(index + (delta < 0 ? 1 : -1));
            touchStart.current = null;
          }}
        >
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
            <span className="h-7 w-7 rounded-full bg-brand-700" />
            <div className="min-w-0">
              <p className="truncate text-[10px] font-black text-slate-950">coachandfour_wakabadai</p>
              <p className="text-[8px] font-bold text-slate-400">北海道フェア｜カルーセル投稿</p>
            </div>
            <span className="ml-auto text-[10px] font-black text-slate-400">{index + 1} / {carousel.length}</span>
          </div>
          <div className="relative min-h-0 overflow-hidden bg-white">
            <RealImage src={active.src} alt={active.alt} className="h-full w-full object-cover" />
            <button type="button" onClick={() => move(index - 1)} aria-label="前の画像" className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-950 shadow-sm">
              <ChevronLeft size={18} />
            </button>
            <button type="button" onClick={() => move(index + 1)} aria-label="次の画像" className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-950 shadow-sm">
              <ChevronRight size={18} />
            </button>
            <span className="absolute left-3 top-3 bg-amber-300 px-3 py-2 text-[10px] font-black text-slate-950">{active.label}</span>
          </div>
          <div className="border-t border-slate-100 px-3 py-2">
            <div className="flex justify-center gap-1.5" aria-label={`現在 ${index + 1} 枚目`}>
              {carousel.map((slide, dot) => (
                <button
                  type="button"
                  key={slide.label}
                  onClick={() => setIndex(dot)}
                  aria-label={`${dot + 1}枚目へ`}
                  className={`h-2 rounded-full transition-all ${dot === index ? 'w-6 bg-brand-700' : 'w-2 bg-slate-300'}`}
                />
              ))}
            </div>
            <p className="mt-2 text-center text-xs font-black text-slate-700">{active.detail}</p>
          </div>
        </article>
        <div className="grid grid-cols-4 gap-2">
          {carousel.map((slide, slideIndex) => (
            <button key={slide.label} type="button" onClick={() => setIndex(slideIndex)} className={`grid grid-rows-[1fr_auto] overflow-hidden border bg-white text-left transition ${slideIndex === index ? 'border-brand-700 shadow-card' : 'border-slate-200'}`}>
              <div className="min-h-0 overflow-hidden"><RealImage src={slide.src} alt={slide.alt} className="h-full w-full object-cover" /></div>
              <div className="p-2">
                <p className="text-[9px] font-black text-brand-700">{slide.label}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <aside className="flex flex-col justify-center bg-slate-950 p-5 text-white">
        <p className="text-xs font-black text-amber-300">研修上の目安：ひと目で分かる</p>
        {['何の投稿？', 'なぜ今？', '主役はどれ？', '端に重要な文字を置いていない？'].map((item, index) => <div key={item} className="mt-3 flex items-center gap-3 border-b border-white/15 pb-3"><span className="text-xl font-black text-white/25">0{index + 1}</span><b>{item}</b></div>)}
        <div className="mt-5 border-l-4 border-amber-300 bg-white/10 p-3 text-xs font-bold leading-relaxed text-white/80">
          タイトル、商品名、日付、イベント名は中央付近へ。プロフィールグリッドで見切れにくくなり、ホーム画面も整って見えます。
        </div>
        <div className="mt-4 grid grid-cols-[auto_1fr] items-center gap-2 text-xs font-black text-white/75">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-500 text-white">1</span><span>止める</span>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 text-white">2</span><span>詳しく</span>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 text-white">3</span><span>納得</span>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 text-white">4</span><span>来店へ</span>
        </div>
      </aside>
    </div>
  );
}

export function SwipeCarouselLesson() {
  const patternOptions = [
    {
      id: 'new',
      label: '新商品',
      title: '新商品',
      description: '商品を大きく見せて、「入荷しました」「本日入荷」を短く伝える型。',
      structure: '商品を大きく見せる＋「入荷しました」',
      note: '1枚投稿にも使いやすい',
      image: '/assets/generated/pattern-new-item.webp',
      alt: '文具の新商品入荷を伝えるInstagramフィード1枚目のサンプル',
      imageLabel: '文具の新商品',
    },
    {
      id: 'event',
      label: 'イベント',
      title: 'イベント',
      description: '日付を大きく見せて、イベント名をひと目で伝える型。',
      structure: '日付を大きく＋イベント名',
      note: '開催日が埋もれないことが重要',
      image: '/assets/generated/pattern-event-book.webp',
      alt: '書籍イベントの日付を大きく見せるInstagramフィード1枚目のサンプル',
      imageLabel: '書籍イベント',
    },
    {
      id: 'fair',
      label: 'フェア',
      title: 'フェア',
      description: '売場や複数商品を見せながら、フェア名と「開催中」を伝える型。',
      structure: '売場写真＋フェア名＋「開催中」',
      note: '売場の雰囲気が伝わると強い',
      image: '/assets/generated/pattern-fair-hokkaido.webp',
      alt: '北海道フェア開催中を伝えるInstagramフィード1枚目のサンプル',
      imageLabel: '北海道フェア',
    },
    {
      id: 'ranking',
      label: 'ランキング／おすすめ',
      title: 'ランキング・おすすめ',
      description: '「おすすめ5選」などの見出しで、続きが気になる形にする型。',
      structure: '「おすすめ5選」＋複数商品',
      note: 'カルーセルの1枚目と相性が良い',
      image: '/assets/generated/pattern-ranking-books.webp',
      alt: 'スタッフおすすめ書籍5選を伝えるInstagramフィード1枚目のサンプル',
      imageLabel: 'おすすめ5選',
    },
    {
      id: 'bonus',
      label: '特典付き商品',
      title: '特典付き商品',
      description: '特典があることを大きく見せて、購入理由をひと目で伝える型。',
      structure: '「特典あり」を大きく＋商品',
      note: '特典内容は短く、詳しくは2枚目以降やキャプションへ',
      image: '/assets/generated/pattern-benefit-music.webp',
      alt: 'CD音楽商品の特典ありを伝えるInstagramフィード1枚目のサンプル',
      imageLabel: '特典付き商品',
    },
    {
      id: 'reserve',
      label: '予約受付',
      title: '予約受付',
      description: '「予約受付中」を大きく見せて、今行動してほしいことを伝える型。',
      structure: '「予約受付中」を目立たせる＋商品名',
      note: '発売日や締切がある場合は中央付近に短く入れる',
      image: '/assets/generated/pattern-reservation.webp',
      alt: '話題作の予約受付中を伝えるInstagramフィード1枚目のサンプル',
      imageLabel: '予約受付中',
    },
  ] as const;
  const [activePattern, setActivePattern] = useState<(typeof patternOptions)[number]['id']>('ranking');
  const current = patternOptions.find((pattern) => pattern.id === activePattern) ?? patternOptions[3];
  const flow = [
    ['1', '止める', 'ひと目で内容を伝える'],
    ['2', '詳しく', 'ジャンル感を把握する'],
    ['3', '納得', '楽しみ方を見せる'],
    ['4', '来店へ', '場所と行動を伝える'],
  ];

  return (
    <div className="grid h-full gap-4 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
      <div className="mx-auto w-full max-w-[300px]">
        <div className="overflow-hidden rounded-[2rem] border-[6px] border-slate-950 bg-white shadow-phone">
          <div className="flex h-7 items-center justify-between px-4 text-[8px] font-black"><span>14:21</span><span>● ● ▰</span></div>
          <div className="flex items-center gap-2 border-y border-slate-100 px-3 py-2"><span className="h-6 w-6 rounded-full bg-brand-700" /><span className="text-[9px] font-bold">coachandfour_wakabadai</span></div>
          <div className="relative aspect-square overflow-hidden bg-white">
            <RealImage src={current.image} alt={current.alt} className="absolute inset-0 h-full w-full object-cover" />
            <span className="pointer-events-none absolute inset-[13%] border border-dashed border-white/80 shadow-[0_0_0_999px_rgba(15,23,42,.08)]" />
            <span className="absolute left-1/2 top-[13%] -translate-x-1/2 bg-white/90 px-2 py-1 text-[8px] font-black text-brand-800">中央の安全エリア</span>
          </div>
          <div className="flex justify-between p-3"><span className="flex gap-2"><Heart size={15} /><MessageCircle size={15} /><Send size={15} /></span><span className="text-[9px] font-bold">{current.imageLabel}</span></div>
        </div>
        <div className="mt-2 border-l-4 border-amber-400 bg-brand-50 p-3 text-xs font-black leading-relaxed text-brand-950">
          大事な文字は中央へ。タイトル・商品名・日付・イベント名は端に置かない。
        </div>
      </div>
      <div className="grid min-h-0 gap-2.5">
        <div className="relative grid grid-cols-4 gap-2">
          <span className="absolute left-[8%] right-[8%] top-5 h-px bg-brand-200" />
          {flow.map(([number, label, detail]) => (
            <div key={number} className="relative text-center">
              <span className="mx-auto grid h-10 w-10 place-items-center border-2 border-brand-700 bg-brand-700 text-xs font-black text-white">{number}</span>
              <b className="mt-2 block text-xs">{label}</b>
              <span className="mt-1 block text-[9px] leading-snug text-slate-500">{detail}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="border border-brand-200 bg-brand-50 p-3">
            <p className="text-[10px] font-black text-brand-700">複数枚投稿</p>
            <p className="mt-1 text-xs font-black text-slate-950">1枚目で止める → 2〜4枚目で詳しく → 来店へ</p>
          </div>
          <div className="border border-slate-200 bg-white p-3">
            <p className="text-[10px] font-black text-slate-500">1枚投稿</p>
            <p className="mt-1 text-xs font-black text-slate-950">1枚で要点を伝える。詳しい説明はキャプションへ。</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {patternOptions.map((pattern) => (
            <button
              type="button"
              key={pattern.id}
              onClick={() => setActivePattern(pattern.id)}
              className={`px-2 py-1.5 text-xs font-black transition ${pattern.id === activePattern ? 'bg-brand-700 text-white shadow-card' : 'border border-slate-200 bg-white text-slate-600'}`}
            >
              {pattern.label}
            </button>
          ))}
        </div>
        <div className="border-l-4 border-brand-600 bg-brand-50 p-3">
          <p className="text-[10px] font-black text-brand-700">目的ごとの1枚目の型</p>
          <h3 className="mt-1 text-2xl font-black text-slate-950">{current.title}</h3>
          <p className="mt-1.5 text-sm font-bold leading-relaxed text-slate-600">{current.description}</p>
          <div className="mt-2 grid grid-cols-[auto_1fr] gap-2 text-xs font-bold">
            <span className="bg-white px-2 py-2 text-brand-700">推奨構成</span><span className="bg-white px-2 py-2 text-slate-950">{current.structure}</span>
            <span className="bg-white px-2 py-2 text-brand-700">補足</span><span className="bg-white px-2 py-2 text-slate-950">{current.note}</span>
          </div>
        </div>
        <div className="border border-amber-200 bg-amber-50 p-3 text-xs font-bold leading-relaxed text-amber-950">
          端に置いた文字は、プロフィール一覧で見切れることがあります。重要情報は中央付近に置きましょう。
        </div>
      </div>
    </div>
  );
}

export function RealProfileEntrance() {
  const highlightGroups = [
    ['店舗案内', Store],
    ['アクセス', MapPin],
    ['開催中', Sparkles],
    ['新商品', Grid3X3],
    ['イベント', Clock3],
  ] as const;
  const benefits = ['24時間後も、必要な情報を残せる', '知りたい情報へ、すぐ案内できる', '開催中の企画を、ひと目で見せられる'];

  return (
    <div className="grid h-full gap-4 lg:grid-cols-[.82fr_1.18fr]">
      <article className="grid min-h-0 grid-cols-[.78fr_.22fr] gap-3 border border-slate-200 bg-slate-50 p-3">
        <div className="relative min-h-[330px] overflow-hidden border-[5px] border-slate-950 bg-white">
          <RealImage src={profile.path} alt={profile.alt} className="h-full w-full object-cover object-top" />
          <span className="absolute inset-x-0 top-[52%] h-[19%] border-y-4 border-amber-300 bg-amber-300/10" />
          <Callout top="56%" right="2%">ここを案内板に</Callout>
        </div>
        <div className="flex flex-col justify-center gap-3 text-center">
          <span className="bg-slate-900 px-2 py-2 text-[10px] font-black text-white">実際のプロフィール</span>
          <ArrowRight className="mx-auto text-brand-600" size={20} />
          <span className="border-l-2 border-amber-400 bg-white p-2 text-[9px] font-black text-slate-700">ストーリーズを<br />目的別に残す</span>
        </div>
      </article>

      <article className="flex min-h-0 flex-col justify-center border border-brand-200 bg-brand-50 p-4">
        <div>
          <span className="text-[10px] font-black tracking-[.16em] text-brand-700">HIGHLIGHT GUIDE</span>
          <h3 className="mt-1 text-xl font-black text-slate-950">24時間で消える情報を、<br />いつでも見られる店舗案内へ。</h3>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {benefits.map((item) => <span key={item} className="flex items-start gap-1.5 border-l-4 border-emerald-500 bg-white p-2 text-[9px] font-black leading-snug text-slate-700"><Check size={12} className="mt-0.5 shrink-0 text-emerald-600" />{item}</span>)}
        </div>
        <div className="mt-3 border border-brand-200 bg-white p-3">
          <p className="text-[9px] font-black text-brand-700">おすすめの分け方</p>
          <div className="mt-2 grid grid-cols-5 gap-2">
            {highlightGroups.map(([label, Icon]) => <div key={label} className="min-w-0 text-center"><span className="mx-auto grid h-9 w-9 place-items-center rounded-full border-2 border-brand-300 bg-brand-50 text-brand-700"><Icon size={14} /></span><span className="mt-1 block text-[8px] font-bold leading-tight text-slate-700">{label}</span></div>)}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center">
          {['ストーリーズを投稿', 'ハイライトに追加', '名前とカバーを設定'].map((item, index) => (
            <div key={item} className="contents">
              <div className="bg-slate-950 px-2 py-3 text-[9px] font-black leading-snug text-white"><span className="mb-1 block text-amber-300">0{index + 1}</span>{item}</div>
              {index < 2 && <ArrowRight size={15} className="text-brand-500" />}
            </div>
          ))}
        </div>
        <p className="mt-3 bg-amber-50 p-2 text-center text-[10px] font-black text-amber-950">投稿したストーリーズを選んで、名前を付けるだけ。</p>
      </article>
    </div>
  );
}

function Callout({ children, top, left, right }: { children: string; top: string; left?: string; right?: string }) {
  return <span style={{ top, left, right }} className="absolute z-10 flex items-center gap-1 bg-amber-300 px-2 py-1 text-[8px] font-black text-slate-950 shadow"><Search size={9} />{children}</span>;
}

export function RealAlgorithmPost() {
  const post = assetById.img_4828;
  return (
    <div className="border border-slate-200 bg-white p-3">
      <span className="text-[9px] font-black text-slate-400">01 投稿を見る</span>
      <div className="relative mt-2 aspect-[1.25] overflow-hidden text-white"><RealImage src={post.media ?? post.path} alt={post.alt} className="absolute inset-0 h-full w-full object-cover" /><span className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/10 to-transparent" /><span className="absolute left-3 top-3 bg-amber-300 px-2 py-1 text-[8px] font-black text-slate-950">役立つ実例</span><p className="absolute bottom-3 left-3 text-lg font-black leading-tight">次に読みたい本を<br />見つける投稿</p></div>
    </div>
  );
}
