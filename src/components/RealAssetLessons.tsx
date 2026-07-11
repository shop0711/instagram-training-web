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
  Pin,
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
        <div className="mt-5 border-t border-brand-200 pt-4">
          <p className="text-lg font-black text-slate-950">日々の業務そのものが<br /><span className="text-brand-700">コンテンツになる。</span></p>
        </div>
      </aside>
    </div>
  );
}

export function RealPhotoCompare() {
  const source = assetById.img_4823;
  const media = source.media ?? source.path;
  return (
    <div className="grid h-full gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
      <PhotoLesson label="演習用・改善前" media={media} bad />
      <div className="hidden items-center lg:flex"><ArrowRight className="text-brand-500" size={28} /></div>
      <PhotoLesson label="おすすめの見せ方" media={media} />
    </div>
  );
}

function PhotoLesson({ label, media, bad = false }: { label: string; media: string; bad?: boolean }) {
  const points = bad ? ['暗くする', '主役が遠い', '背景が目立つ'] : ['明るく補正', '主役を大きく', '背景を整理'];
  return (
    <article className={`grid min-h-0 grid-rows-[1fr_auto] border ${bad ? 'border-rose-200 bg-rose-50' : 'border-emerald-200 bg-emerald-50'}`}>
      <div className={`relative min-h-[260px] overflow-hidden ${bad ? 'bg-slate-800' : 'bg-white'}`}>
        <RealImage
          src={media}
          alt={`${label}として加工した同一の北海道商品売場写真`}
          className={`absolute inset-0 h-full w-full object-cover ${bad ? 'scale-75 rotate-2 brightness-[.38] saturate-50' : 'scale-110 brightness-105'}`}
        />
        {bad && <span className="absolute inset-0 bg-slate-950/15" />}
        <span className={`absolute left-3 top-3 px-3 py-2 text-xs font-black text-white ${bad ? 'bg-rose-600' : 'bg-emerald-600'}`}>{label}</span>
        <span className={`absolute bottom-3 left-3 px-3 py-2 text-sm font-black shadow-lg ${bad ? 'bg-slate-950/85 text-white' : 'bg-white text-slate-950'}`}>{bad ? '何を見せたい？' : '短い見出しで伝える'}</span>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {points.map((point) => <span key={point} className="flex items-center justify-center gap-1 bg-white px-2 py-2 text-[10px] font-black">{bad ? <X size={13} className="text-rose-500" /> : <Check size={13} className="text-emerald-600" />}{point}</span>)}
      </div>
    </article>
  );
}

type Format = 'feed' | 'stories' | 'reels';

export function RealFormatGuide() {
  const [active, setActive] = useState<Format>('feed');
  const formats = {
    feed: { label: 'フィード', icon: Grid3X3, headline: '保存版｜北海道フェア', note: '残す情報', examples: ['複数商品', 'イベント詳細', 'おすすめ5選'] },
    stories: { label: 'ストーリーズ', icon: Clock3, headline: '本日開催中', note: '今伝える情報', examples: ['本日入荷', '残りわずか', '今日の売場'] },
    reels: { label: 'リール', icon: Film, headline: '売場を15秒で紹介', note: '雰囲気を伝える', examples: ['展開風景', 'スタッフ目線', '店内の空気'] },
  } as const;
  const current = formats[active];

  return (
    <div className="grid h-full gap-5 lg:grid-cols-[.82fr_1.18fr]">
      <div className="flex items-center justify-center">
        <FormatPhone mode={active} headline={current.headline} />
      </div>
      <div className="flex flex-col justify-center">
        <div className="grid grid-cols-3 border border-slate-200 bg-white p-1" role="tablist" aria-label="投稿形式">
          {(Object.keys(formats) as Format[]).map((key) => {
            const Icon = formats[key].icon;
            return <button key={key} type="button" role="tab" aria-selected={active === key} onClick={() => setActive(key)} className={`flex items-center justify-center gap-2 px-3 py-2 text-xs font-black ${active === key ? 'bg-brand-700 text-white' : 'text-slate-500'}`}><Icon size={15} />{formats[key].label}</button>;
          })}
        </div>
        <div className="mt-4 border-l-4 border-brand-600 bg-brand-50 p-5">
          <p className="text-xs font-black text-brand-700">{current.note}</p>
          <h3 className="mt-1 text-2xl font-black">同じ売場でも、役割で切り取る。</h3>
          <div className="mt-4 grid grid-cols-3 gap-2">{current.examples.map((item) => <span key={item} className="bg-white p-2 text-center text-xs font-bold">{item}</span>)}</div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-black">
          <span className="border-t-4 border-blue-500 p-2">残す</span><span className="border-t-4 border-amber-400 p-2">今</span><span className="border-t-4 border-rose-500 p-2">体験</span>
        </div>
      </div>
    </div>
  );
}

function FormatPhone({ mode, headline }: { mode: Format; headline: string }) {
  const media = food.media ?? food.path;
  const portrait = mode !== 'feed';
  return (
    <div className={`relative mx-auto overflow-hidden rounded-[2rem] border-[6px] border-slate-950 bg-white shadow-phone ${portrait ? 'aspect-[9/16] w-[205px]' : 'w-[235px]'}`}>
      <div className="flex h-7 items-center justify-between px-4 text-[8px] font-black"><span>14:21</span><span>● ● ▰</span></div>
      {mode === 'feed' && <div className="flex items-center gap-2 border-y border-slate-100 px-3 py-2"><span className="h-6 w-6 rounded-full bg-brand-700" /><span className="text-[9px] font-bold">coachandfour_wakabadai</span></div>}
      <div className={`relative overflow-hidden ${portrait ? 'h-[calc(100%-1.75rem)]' : 'aspect-square'}`}>
        <RealImage src={media} alt={`実在写真を使った${mode}の表示例`} className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/15" />
        {mode === 'stories' && <div className="absolute inset-x-3 top-3 h-1 bg-white/85" />}
        {mode === 'reels' && <Play className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white" fill="white" />}
        <p className="absolute inset-x-4 bottom-5 text-lg font-black leading-tight text-white">{headline}</p>
      </div>
      {mode === 'feed' && <div className="flex justify-between p-3"><span className="flex gap-2"><Heart size={15} /><MessageCircle size={15} /><Send size={15} /></span><span className="text-[9px] font-bold">保存版</span></div>}
    </div>
  );
}

export function RealFirstImageCompare() {
  const media = food.media ?? food.path;
  return (
    <div className="grid h-full gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_.75fr]">
      <FirstImageCard bad media={media} />
      <div className="hidden items-center lg:flex"><ArrowRight className="text-brand-500" /></div>
      <FirstImageCard media={media} />
      <aside className="col-span-2 flex flex-col justify-center bg-slate-950 p-5 text-white sm:col-span-2 lg:col-span-1">
        <p className="text-xs font-black text-amber-300">0.5秒で意味が分かる</p>
        {['何の投稿？', 'なぜ今？', '主役はどれ？'].map((item, index) => <div key={item} className="mt-3 flex items-center gap-3 border-b border-white/15 pb-3"><span className="text-xl font-black text-white/25">0{index + 1}</span><b>{item}</b></div>)}
      </aside>
    </div>
  );
}

function FirstImageCard({ media, bad = false }: { media: string; bad?: boolean }) {
  return (
    <article className={`relative min-h-[290px] overflow-hidden border-4 ${bad ? 'border-slate-300 bg-slate-100' : 'border-brand-700 bg-brand-700'}`}>
      <RealImage src={media} alt={bad ? '教材用に情報を弱く加工した実投稿写真' : '具体的な見出しを加えた実投稿写真'} className={`absolute inset-0 h-full w-full object-cover ${bad ? 'scale-75 opacity-45 grayscale' : 'scale-105'}`} />
      <span className={`absolute inset-0 ${bad ? 'bg-slate-100/35' : 'bg-gradient-to-t from-brand-950/90 via-transparent to-transparent'}`} />
      <span className={`absolute left-3 top-3 px-2 py-1 text-[9px] font-black ${bad ? 'bg-white text-slate-500' : 'bg-amber-300 text-slate-950'}`}>{bad ? '演習用・改善前' : 'おすすめの見せ方'}</span>
      <p className={`absolute inset-x-4 ${bad ? 'top-1/2 text-center text-sm text-slate-400' : 'bottom-4 text-2xl text-white'} font-black leading-tight`}>{bad ? 'お知らせ' : '本日入荷｜北海道限定'}</p>
      {bad && <div className="absolute bottom-3 left-3 right-3 grid grid-cols-2 gap-2 text-center text-[9px] font-black text-rose-700"><span className="bg-white/90 px-2 py-1">文字が弱い</span><span className="bg-white/90 px-2 py-1">主役が小さい</span></div>}
      {!bad && <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white text-brand-700"><Check size={20} /></span>}
    </article>
  );
}

export function SwipeCarouselLesson() {
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const slides = [
    { label: '止める', headline: '本日入荷｜北海道限定', detail: '0.5秒で内容を伝える' },
    { label: '詳しく', headline: '爽やかな味わい', detail: '特徴を短く整理する' },
    { label: '納得', headline: '休憩時間のおともに', detail: '使う場面を見せる' },
    { label: '来店へ', headline: 'マルシェ売場で展開中', detail: '場所と行動を伝える' },
  ];
  const move = (next: number) => setIndex((next + slides.length) % slides.length);

  return (
    <div className="grid h-full gap-5 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
      <div
        className="mx-auto w-full max-w-[300px]"
        tabIndex={0}
        role="region"
        aria-label="4枚のカルーセル教材"
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
        <div className="relative aspect-[4/5] overflow-hidden border-[6px] border-slate-950 bg-white shadow-phone">
          <RealImage src={food.media ?? food.path} alt="ヨーグルッペの実在写真を使ったカルーセル教材" className={`absolute inset-0 h-full w-full object-cover transition-transform duration-300 ${index === 0 ? 'scale-105' : index === 1 ? 'scale-125' : index === 2 ? 'scale-110' : 'scale-100'}`} />
          <span className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 bg-white px-2 py-1 text-[9px] font-black text-brand-800">{index + 1} / 4</span>
          <div className="absolute inset-x-5 bottom-5 text-white"><p className="text-[10px] font-black text-amber-300">{slides[index].label}</p><h3 className="mt-1 text-2xl font-black leading-tight">{slides[index].headline}</h3><p className="mt-2 text-xs text-white/80">{slides[index].detail}</p></div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <button type="button" onClick={() => move(index - 1)} aria-label="前の画像" className="grid h-9 w-9 place-items-center border border-slate-200 bg-white"><ChevronLeft size={18} /></button>
          <div className="flex gap-1.5" aria-label={`現在 ${index + 1} 枚目`}>{slides.map((slide, dot) => <button type="button" key={slide.label} onClick={() => setIndex(dot)} aria-label={`${dot + 1}枚目へ`} className={`h-2 ${dot === index ? 'w-6 bg-brand-700' : 'w-2 bg-slate-300'} transition-all`} />)}</div>
          <button type="button" onClick={() => move(index + 1)} aria-label="次の画像" className="grid h-9 w-9 place-items-center border border-slate-200 bg-white"><ChevronRight size={18} /></button>
        </div>
      </div>
      <div className="relative grid grid-cols-4 gap-2">
        <span className="absolute left-[8%] right-[8%] top-5 h-px bg-brand-200" />
        {slides.map((slide, step) => <button type="button" key={slide.label} onClick={() => setIndex(step)} className="relative text-center"><span className={`mx-auto grid h-10 w-10 place-items-center border-2 text-xs font-black ${step === index ? 'border-brand-700 bg-brand-700 text-white' : 'border-brand-200 bg-white text-brand-700'}`}>{step + 1}</span><b className="mt-2 block text-xs">{slide.label}</b><span className="mt-1 block text-[9px] leading-snug text-slate-500">{slide.detail}</span></button>)}
        <div className="col-span-4 mt-5 border-l-4 border-amber-400 bg-slate-950 p-4 text-white">
          <p className="text-lg font-black">1枚目で止め、2〜4枚目で来店へ。</p>
          <p className="mt-1 text-xs text-white/65">矢印キー・ボタン・スマホのスワイプで操作できます。</p>
        </div>
      </div>
    </div>
  );
}

export function RealProfileEntrance() {
  const miniPosts = [assetById.img_4822, assetById.img_4824, assetById.img_4826, assetById.img_4827, assetById.img_4828, assetById.img_4820];
  return (
    <div className="grid h-full gap-4 lg:grid-cols-[1fr_1fr]">
      <article className="grid min-h-0 grid-cols-[.72fr_.28fr] gap-3 border border-slate-200 bg-slate-50 p-3">
        <div className="relative min-h-[330px] overflow-hidden border-[5px] border-slate-950 bg-white">
          <RealImage src={profile.path} alt={profile.alt} className="h-full w-full object-cover object-top" />
          <Callout top="14%" right="2%">名前欄</Callout>
          <Callout top="28%" left="2%">自己紹介</Callout>
          <Callout top="43%" right="2%">リンク</Callout>
          <Callout top="61%" left="2%">ハイライト</Callout>
          <Callout top="78%" right="2%">投稿グリッド</Callout>
        </div>
        <div className="flex flex-col justify-center gap-3">
          <span className="bg-slate-900 px-2 py-2 text-center text-[10px] font-black text-white">現在の見え方</span>
          {['何の店？', 'どこ？', '何を発信？', '次は何をする？'].map((item) => <span key={item} className="border-l-2 border-slate-300 bg-white p-2 text-[9px] font-bold text-slate-600">{item}</span>)}
        </div>
      </article>

      <article className="grid min-h-0 grid-cols-[.72fr_.28fr] gap-3 border border-brand-200 bg-brand-50 p-3">
        <div className="overflow-hidden border-[5px] border-slate-950 bg-white p-3">
          <div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-full bg-brand-700 text-xs font-black text-white">C4</span><div><h3 className="text-sm font-black">コーチャンフォー若葉台店</h3><p className="flex items-center gap-1 text-[9px] text-slate-500"><MapPin size={10} />稲城市若葉台｜書籍・文具・食品</p></div></div>
          <p className="mt-3 bg-brand-50 p-2 text-[10px] font-bold leading-relaxed text-slate-700">今の売場・新商品・イベントを毎日発信。<br /><span className="text-brand-700">今週は北海道フェア開催中 →</span></p>
          <div className="mt-3 grid grid-cols-3 gap-2">{[['店舗案内', Store], ['開催中', Sparkles], ['アクセス', MapPin]].map(([label, Icon]) => { const IconComponent = Icon; return <div key={String(label)} className="text-center"><span className="mx-auto grid h-9 w-9 place-items-center rounded-full border-2 border-brand-300 bg-white text-brand-700"><IconComponent size={15} /></span><span className="text-[8px] font-bold">{String(label)}</span></div>; })}</div>
          <div className="mt-3 grid grid-cols-3 gap-1">{miniPosts.map((item, index) => <div key={item.id} className="relative aspect-square overflow-hidden"><RealImage src={item.media ?? item.thumbnail} alt="" className="h-full w-full object-cover" />{index < 3 && <Pin size={12} className="absolute right-1 top-1 text-white drop-shadow" fill="currentColor" />}</div>)}</div>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <span className="bg-brand-700 px-2 py-2 text-center text-[10px] font-black text-white">改善後イメージ</span>
          {['名前欄で検索される言葉を伝える', '自己紹介でフォローする理由を伝える', 'ハイライトで迷わせない', '投稿グリッドで今の売場を見せる'].map((item) => <span key={item} className="flex items-start gap-1 border-l-2 border-emerald-500 bg-white p-2 text-[8px] font-black leading-snug text-slate-700"><Check size={11} className="mt-0.5 shrink-0 text-emerald-600" />{item}</span>)}
        </div>
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
      <span className="text-[9px] font-black text-slate-400">01 実際の役立つ投稿</span>
      <div className="relative mt-2 aspect-[1.25] overflow-hidden text-white"><RealImage src={post.media ?? post.path} alt={post.alt} className="absolute inset-0 h-full w-full object-cover" /><span className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/10 to-transparent" /><span className="absolute left-3 top-3 bg-amber-300 px-2 py-1 text-[8px] font-black text-slate-950">保存したい</span><p className="absolute bottom-3 left-3 text-xl font-black leading-tight">次に読みたい本を<br />見つける投稿</p></div>
    </div>
  );
}
