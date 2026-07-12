import { motion } from 'motion/react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Bot,
  Bookmark,
  Camera,
  Check,
  ChevronRight,
  CircleUserRound,
  Compass,
  Coffee,
  Eye,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Music2,
  PenLine,
  Save,
  Send,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  Users,
  UtensilsCrossed,
  WandSparkles,
  X
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SlideData } from '../data/training';
import { assetById } from '../data/assetManifest';
import { Checklist } from './Checklist';
import { PostIdeaWorkshop } from './PostIdeaWorkshop';
import {
  RealAlgorithmPost,
  RealFirstImageCompare,
  RealFormatGuide,
  RealPhotoCompare,
  RealPostGrid,
  RealProfileEntrance,
  RealityCover,
  SwipeCarouselLesson,
} from './RealAssetLessons';

type Props = { slide: SlideData };

const reveal = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.38 }
};

const trainingPhotos = {
  stationery: assetById.img_4820.media ?? assetById.img_4820.path,
  books: assetById.img_4828.media ?? assetById.img_4828.path,
  food: assetById.img_4824.media ?? assetById.img_4824.path,
  music: assetById.img_4838.media ?? assetById.img_4838.path
};

export function TrainingSlideVisual({ slide }: Props) {
  return (
    <div className="visual-slide">
      {slide.kind !== 'cover' && <SlideHeading slide={slide} />}
      <div className="visual-stage">
        {renderVisual(slide)}
      </div>
      {slide.kind !== 'cover' && slide.keyPhrase && (
        <div className="takeaway"><Sparkles size={15} aria-hidden="true" />{slide.keyPhrase}</div>
      )}
    </div>
  );
}

function SlideHeading({ slide }: Props) {
  return (
    <header className="mb-4 flex items-end justify-between gap-6">
      <div className="min-w-0">
        <h1 id={`${slide.id}-title`} className="visual-title">{slide.title}</h1>
        {slide.description && <p className="visual-lead">{slide.description}</p>}
      </div>
      <span className="hidden shrink-0 items-center gap-2 text-xs font-bold text-slate-400 xl:flex">
        <span className="h-px w-10 bg-slate-300" /> LOOK → UNDERSTAND → ACT
      </span>
    </header>
  );
}

function renderVisual(slide: SlideData) {
  switch (slide.kind) {
    case 'cover': return <CoverVisual slide={slide} />;
    case 'goals': return <GoalRoute slide={slide} />;
    case 'statement': return <CommunicationShift />;
    case 'account-roles': return <AccountRoles />;
    case 'customer-view': return <CustomerLens slide={slide} />;
    case 'lifestyle': return <ExperienceJourney />;
    case 'idea-grid': return <StoreIdeaMap />;
    case 'five-steps': return <OneTheme />;
    case 'photo-check': return <PhotoCompare />;
    case 'formats': return <FormatGuide />;
    case 'first-image': return <FirstImageCompare />;
    case 'patterns': return <CarouselPatterns />;
    case 'word-shift': return <StrongWords />;
    case 'profile': return <ProfileEntrance />;
    case 'algorithm': return <AlgorithmLoop />;
    case 'ai': return <AiPartner />;
    case 'risk-summary': return <RiskDecision slide={slide} />;
  }
}

function CoverVisual({ slide }: Props) {
  return <RealityCover slide={slide} />;
}

function GoalRoute({ slide }: Props) {
  const icons = [Compass, Camera, ShieldCheck];
  return (
    <div className="grid h-full gap-4 lg:grid-rows-[1fr_auto]">
      <div className="grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {slide.cards?.map((card, index) => {
          const Icon = icons[index];
          return <div className="contents" key={card.title}>
            <motion.div {...reveal} transition={{ delay: index * .1 }} className="diagram-panel h-full max-h-64 p-6">
              <span className="text-6xl font-black text-slate-100">0{index + 1}</span>
              <Icon className="-mt-7 text-brand-700" size={32} />
              <h2 className="mt-5 text-xl font-black text-slate-950">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.description}</p>
            </motion.div>
            {index < 2 && <ArrowRight className="hidden text-brand-400 lg:block" />}
          </div>;
        })}
      </div>
      <div className="flex items-center gap-3 border border-brand-200 bg-brand-50 p-3 sm:justify-center">
        <img src="/assets/instagram-training-qr.svg" alt="研修サイトをスマートフォンで開くQRコード" width="78" height="78" className="h-[78px] w-[78px] shrink-0 bg-white p-1" />
        <div className="min-w-0">
          <p className="text-sm font-black text-brand-950">スマートフォンでもご覧いただけます</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-600">QRコードから開いて、体験ページを操作してください</p>
          <p className="mt-1 break-all text-[10px] font-bold text-brand-700">instagram-training-web.vercel.app</p>
        </div>
      </div>
    </div>
  );
}

function CommunicationShift() {
  return (
    <div className="grid h-full gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
      <div className="diagram-panel flex flex-col justify-between bg-slate-50 p-5">
        <StatusLabel tone="muted">昔：一方通行</StatusLabel>
        <div className="my-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <Node icon={Store} label="企業" /><div className="flex gap-1">{[1,2,3].map(i=><ArrowRight key={i} size={16} className="text-slate-300" />)}</div><Node icon={Users} label="受け手" muted />
        </div>
        <p className="text-center text-sm font-bold text-slate-500">商品情報を、大勢へ同じように届ける</p>
      </div>
      <div className="hidden items-center lg:flex"><ChevronRight size={34} className="text-brand-500" /></div>
      <div className="diagram-panel flex flex-col justify-between border-brand-200 bg-brand-50/60 p-5">
        <StatusLabel tone="good">今：小さな対話</StatusLabel>
        <div className="my-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <Node icon={Store} label="店舗" active /><div className="flex flex-col items-center text-brand-600"><Send size={18}/><span className="my-1 h-7 w-px bg-brand-300"/><HeartHandshake size={20}/></div><Node icon={CircleUserRound} label="お客様" active />
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold text-brand-900">
          {['今日の売場','スタッフの視点','現場の空気'].map(x=><span className="bg-white p-2" key={x}>{x}</span>)}
        </div>
      </div>
    </div>
  );
}

function AccountRoles() {
  return (
    <div className="grid h-full gap-3 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
      <RolePanel icon={Compass} label="本体アカウント" metaphor="旅行ガイド" audience="全国のお客様" color="slate" items={['ブランド全体','大型キャンペーン','全店共通情報']} />
      <div className="hidden flex-col items-center justify-center lg:flex">
        <span className="h-12 w-px bg-slate-200" />
        <span className="my-2 border border-slate-200 bg-white px-2 py-3 text-center text-[9px] font-black leading-relaxed text-slate-500">同じ会社<br/>違う役割</span>
        <span className="h-12 w-px bg-slate-200" />
      </div>
      <RolePanel icon={MapPin} label="店舗アカウント" metaphor="地域の掲示板" audience="近隣のお客様" color="brand" items={['今日の入荷','この店だけの催し','スタッフのおすすめ']} />
    </div>
  );
}

function CustomerLens({ slide }: Props) {
  const icons = [PenLine, BookOpen, UtensilsCrossed, Music2];
  const photos = [trainingPhotos.stationery, trainingPhotos.books, trainingPhotos.food, trainingPhotos.music];
  return (
    <div className="grid h-full gap-3 sm:grid-cols-2">
      {slide.compareExamples?.map((item, i) => {
        const Icon = icons[i];
        return <motion.article {...reveal} transition={{delay:i*.07}} key={item.label} className="grid grid-cols-[62px_1fr] overflow-hidden border border-slate-200 bg-white">
          <div className="relative grid place-items-center overflow-hidden py-3 text-white"><img src={photos[i]} alt="" className="absolute inset-0 h-full w-full object-cover"/><span className="absolute inset-0 bg-slate-950/60"/><Icon className="relative" size={23}/><span className="relative text-[10px] font-bold">{item.label}</span></div>
          <div className="grid grid-cols-[.82fr_auto_1.18fr] items-center gap-2 p-3">
            <div><span className="text-[9px] font-black text-slate-400">商品</span><p className="mt-1 text-[11px] leading-snug text-slate-400">{item.before}</p></div>
            <ArrowRight size={14} className="text-brand-400"/>
            <div className="border-l-2 border-emerald-500 bg-emerald-50 px-2 py-1.5"><span className="text-[9px] font-black text-emerald-700">体験</span><p className="mt-1 text-xs font-black leading-snug text-slate-900">{item.after}</p></div>
          </div>
        </motion.article>;
      })}
    </div>
  );
}

function ExperienceJourney() {
  const experiences = [
    { icon: BookOpen, label: '本に出会う', detail: '休日に読みたい一冊を見つける' },
    { icon: PenLine, label: '文具を試す', detail: '仕事や勉強が少し楽しくなる文具を選ぶ' },
    { icon: UtensilsCrossed, label: '北海道を味わう', detail: 'おうちで旅行気分を楽しめる食品を探す' },
    { icon: Music2, label: '音楽を探す', detail: '好きなアーティストや特典付き商品を見つける' },
    { icon: Coffee, label: 'カフェで休む', detail: '買い物の合間に、ゆっくり過ごす' },
  ];
  return (
    <div className="grid h-full gap-5 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
      <div className="relative min-h-[280px] overflow-hidden border-l-4 border-brand-600">
        <img src={trainingPhotos.books} alt="整理された書籍フェア売場" className="absolute inset-0 h-full w-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent"/>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="text-[10px] font-black text-amber-300">POST IDEA</p>
          <p className="mt-2 text-2xl font-black leading-tight">商品 ＋ 過ごし方<br/><span className="text-amber-300">＝ 来店理由</span></p>
          <div className="mt-3 flex items-center gap-2 text-xs font-bold"><Sparkles size={17} className="text-amber-300"/>来店後の場面まで写す</div>
        </div>
      </div>
      <div className="grid gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          {experiences.map(({ icon: Icon, label, detail }) => (
            <div key={label} className="grid grid-cols-[42px_1fr] gap-3 border border-slate-200 bg-white p-3 shadow-card">
              <div className="grid h-10 w-10 place-items-center bg-brand-50 text-brand-700"><Icon size={20} /></div>
              <div>
                <p className="text-sm font-black text-slate-950">{label}</p>
                <p className="mt-1 text-xs font-bold leading-relaxed text-slate-500">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StoreIdeaMap() {
  return <RealPostGrid />;
}

function OneTheme() {
  const checks = [
    ['1', '何がある？', '親子イベント'],
    ['2', '誰におすすめ？', '親子連れのお客様'],
    ['3', '店内のどこにある？', '児童書売場'],
    ['4', 'いつまで？', '7/18開催'],
    ['5', 'なぜ今行くべき？', '今週末限定で参加できる'],
  ];
  return (
    <div className="grid h-full gap-5 lg:grid-cols-[1.18fr_.82fr]">
      <div className="grid min-h-0 grid-cols-2 gap-3">
        <OneThemePostImage
          tone="bad"
          label="NG 情報過多"
          src="/assets/generated/one-theme-ng.webp"
          alt="新商品、イベント、フェア、予約、ランキングが混在した情報過多の投稿サンプル"
          caption="話題が多く、何を見ればいいか迷う"
        />
        <OneThemePostImage
          tone="good"
          label="OK 1テーマ"
          src="/assets/generated/one-theme-ok.webp"
          alt="今週末の親子イベントにテーマを絞った投稿サンプル"
          caption="誰向け・場所・日付が一目で分かる"
        />
      </div>
      <div className="flex min-h-0 flex-col justify-center border border-brand-200 bg-brand-50/60 p-5">
        <p className="text-xs font-black text-brand-700">投稿前の5つの確認</p>
        <div className="mt-4 grid gap-2">
          {checks.map(([number, question]) => (
            <div key={number} className="flex items-center gap-2 bg-white px-3 py-2 text-sm font-black shadow-sm">
              <span className="grid h-7 w-7 shrink-0 place-items-center bg-brand-700 text-xs text-white">{number}</span>
              <span>{question}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 border border-brand-200 bg-white p-4">
          <p className="text-[10px] font-black text-brand-700">5つを使った投稿の考え方例</p>
          <div className="mt-3 grid gap-1.5 text-xs font-bold text-slate-700">
            {checks.map(([, question, answer]) => (
              <p key={question} className="flex gap-2">
                <span className="min-w-[8.5em] text-slate-500">{question}</span>
                <ChevronRight size={14} className="mt-0.5 shrink-0 text-brand-400" />
                <span className="text-slate-950">{answer}</span>
              </p>
            ))}
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3 border-t border-brand-200 pt-4"><Target className="text-brand-700"/><p className="text-lg font-black">1投稿に詰め込むのは、情報ではなく「行く理由」ひとつ。</p></div>
      </div>
    </div>
  );
}

function OneThemePostImage({ tone, label, src, alt, caption }: { tone: 'bad' | 'good'; label: string; src: string; alt: string; caption: string }) {
  const isGood = tone === 'good';
  return (
    <article className={`grid min-h-0 grid-rows-[auto_1fr_auto] overflow-hidden border ${isGood ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'}`}>
      <div className="flex items-center justify-between px-3 py-2">
        <StatusLabel tone={isGood ? 'good' : 'muted'}>{label}</StatusLabel>
        <span className={`text-[10px] font-black ${isGood ? 'text-emerald-700' : 'text-rose-700'}`}>{isGood ? '1つに絞る' : '詰め込みすぎ'}</span>
      </div>
      <div className="min-h-0 overflow-hidden bg-white">
        <img src={src} alt={alt} width="1100" height="1100" loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
      <p className={`px-3 py-2 text-xs font-black ${isGood ? 'text-emerald-900' : 'text-rose-900'}`}>{caption}</p>
    </article>
  );
}

function PhotoCompare() {
  return <RealPhotoCompare />;
}

function FormatGuide() {
  return <RealFormatGuide />;
}

function FirstImageCompare() {
  return <RealFirstImageCompare />;
}

function CarouselPatterns() {
  return <SwipeCarouselLesson />;
}

function StrongWords() {
  return <PostIdeaWorkshop />;
}

function ProfileEntrance() {
  return <RealProfileEntrance />;
}

function AlgorithmLoop() {
  const actions=[['視聴',Eye],['保存',Save],['送信',Send],['コメント',MessageCircle]] as const;
  const metrics=[
    ['保存','後から見返したい情報だったか',Save],
    ['シェア・送信','家族や友人へ教えたい情報だったか',Send],
    ['プロフィールへの移動','店舗へ興味を持ってもらえたか',CircleUserRound],
    ['店頭での反応','「Instagramを見ました」という声や商品の動き',Store],
  ] as const;
  return (
    <div className="grid h-full min-h-0 gap-3 overflow-y-auto pr-1">
      <div className="grid gap-2 lg:grid-cols-4">
        <div className="min-h-0"><RealAlgorithmPost /></div>
        <div className="border border-brand-200 bg-brand-50 p-3">
          <span className="text-[9px] font-black text-brand-600">02 反応が生まれる</span>
          <div className="mt-2 grid grid-cols-4 gap-1">{actions.map(([label,Icon])=><div key={label} className="bg-white p-2 text-center"><Icon size={16} className="mx-auto text-brand-700"/><p className="mt-1 text-[8px] font-black">{label}</p></div>)}</div>
          <p className="mt-2 text-[10px] font-bold leading-relaxed text-slate-600">視聴時間、いいね、保存、送信、コメントなど</p>
        </div>
        <div className="border border-slate-200 bg-white p-3">
          <span className="text-[9px] font-black text-slate-500">03 複数の情報を参考にする</span>
          <HeartHandshake className="mt-3 text-brand-700" size={25}/>
          <p className="mt-2 text-sm font-black text-slate-950">反応だけでなく、投稿者との関係性なども参考に</p>
        </div>
        <div className="border-l-4 border-emerald-500 bg-emerald-50 p-3">
          <span className="text-[9px] font-black text-emerald-700">04 表示されることがある</span>
          <Bookmark className="mt-3 text-emerald-700" size={25}/>
          <p className="mt-2 text-sm font-black text-slate-950">興味を持つ可能性がある人へ</p>
          <p className="mt-1 text-[10px] leading-relaxed text-slate-600">保存やシェアだけで、必ず広がるわけではありません。</p>
        </div>
      </div>
      <div className="border border-slate-200 bg-slate-50 p-3">
        <div className="flex flex-wrap items-end justify-between gap-2"><div><p className="text-[10px] font-black text-brand-700">振り返り</p><h2 className="text-lg font-black text-slate-950">投稿後は、何を見ればいい？</h2></div><p className="text-xs font-black text-brand-900">いいね数だけを成功基準にしない</p></div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{metrics.map(([label,detail,Icon])=><div key={label} className="flex gap-2 bg-white p-2"><Icon size={17} className="mt-0.5 shrink-0 text-brand-700"/><div><p className="text-[10px] font-black text-slate-950">{label}</p><p className="mt-0.5 text-[9px] leading-relaxed text-slate-500">{detail}</p></div></div>)}</div>
        <p className="mt-2 border-l-4 border-amber-400 bg-white px-3 py-2 text-xs font-black text-slate-900">数字を見る目的は、評価ではなく次の投稿を良くすること。</p>
      </div>
    </div>
  );
}

function AiPartner() {
  return (
    <div className="grid h-full gap-4 lg:grid-cols-[.9fr_auto_.9fr]">
      <RoleSplit title="人が持つもの" icon={Store} tone="dark" items={['現場で発見','写真・動画','事実確認','最終判断']} />
      <div className="hidden flex-col items-center justify-center gap-2 text-brand-500 lg:flex"><ArrowRight/><span className="text-[10px] font-black">HAND OFF</span><ArrowRight/></div>
      <RoleSplit title="AIに任せること" icon={Bot} tone="brand" items={['文章を整理','見出し案','ハッシュタグ','動画の台本']} />
      <div className="lg:col-span-3 grid grid-cols-[.8fr_auto_1.2fr] items-center gap-3 border border-slate-200 bg-white p-3">
        <div><p className="text-[10px] font-black text-slate-400">INPUT</p><p className="text-xs font-bold">7/18、児童書売場、親子イベント、予約不要</p></div><WandSparkles className="text-brand-600"/><div className="bg-brand-50 p-3"><p className="text-[10px] font-black text-brand-600">OUTPUT</p><p className="text-sm font-black">7/18開催｜親子で楽しむ読み聞かせイベント</p></div>
      </div>
    </div>
  );
}

function RiskDecision({slide}:Props) {
  return (
    <div className="grid h-full gap-4 lg:grid-cols-[1.15fr_.85fr]">
      <div className="min-h-0"><Checklist items={slide.bullets ?? []}/></div>
      <div className="flex flex-col justify-center gap-3">
        <Decision tone="good" icon={Check} label="投稿してよい" detail="事実・権利・期間を確認済み" />
        <Decision tone="warn" icon={AlertTriangle} label="要確認" detail="担当者・上長へ相談する" />
        <Decision tone="stop" icon={X} label="投稿しない" detail="迷いが残る、許可がない" />
        <div className="mt-1 grid grid-cols-[auto_1fr] items-center bg-slate-950 text-white">
          <span className="bg-rose-600 px-3 py-4 text-xs font-black tracking-[.18em]">STOP</span>
          <span className="px-3 text-center text-xl font-black">迷ったら投稿しない。</span>
        </div>
      </div>
    </div>
  );
}

function StatusLabel({children,tone}:{children:React.ReactNode;tone:'muted'|'good'}) { return <span className={`w-fit px-3 py-1 text-xs font-black ${tone==='good'?'bg-brand-700 text-white':'bg-slate-200 text-slate-600'}`}>{children}</span>; }

function Node({icon:Icon,label,muted,active}:{icon:LucideIcon;label:string;muted?:boolean;active?:boolean}) { return <div className={`grid place-items-center border p-4 text-center ${active?'border-brand-200 bg-white text-brand-800':'border-slate-200 bg-white'} ${muted?'opacity-55':''}`}><Icon size={30}/><b className="mt-2 text-sm">{label}</b></div>; }

function RolePanel({icon:Icon,label,metaphor,audience,color,items}:{icon:LucideIcon;label:string;metaphor:string;audience:string;color:'slate'|'brand';items:string[]}) {
  const active=color==='brand';
  return <div className={`relative overflow-hidden border p-5 ${active?'border-brand-300 bg-brand-50':'border-slate-200 bg-slate-50'}`}>
    <div className="flex items-start justify-between"><div className={`grid h-12 w-12 place-items-center ${active?'bg-brand-700 text-white':'bg-slate-900 text-white'}`}><Icon/></div><span className="text-xs font-black text-slate-400">→ {audience}</span></div>
    <p className="mt-3 text-xs font-bold text-slate-500">{label}</p><h2 className="text-2xl font-black text-slate-950">{metaphor}</h2>
    <div className={`mt-3 flex items-center justify-between border-y py-2 ${active?'border-brand-200':'border-slate-200'}`}><span className="text-[9px] font-black text-slate-400">距離 × 時間</span><strong className={`text-lg ${active?'text-brand-800':'text-slate-700'}`}>{active?'近く × 今':'広く × 長く'}</strong></div>
    <div className="mt-4 grid grid-cols-3 gap-2">{items.map(x=><span key={x} className="bg-white p-3 text-center text-xs font-bold shadow-sm">{x}</span>)}</div>
  </div>;
}

function RoleSplit({title,icon:Icon,tone,items}:{title:string;icon:LucideIcon;tone:'dark'|'brand';items:string[]}) { return <div className={`p-5 ${tone==='dark'?'bg-slate-950 text-white':'bg-brand-50 text-slate-950 border border-brand-200'}`}><Icon size={28} className={tone==='dark'?'text-amber-300':'text-brand-700'}/><h3 className="mt-3 text-xl font-black">{title}</h3><div className="mt-4 grid grid-cols-2 gap-2">{items.map(x=><span key={x} className={`p-2 text-xs font-bold ${tone==='dark'?'bg-white/10':'bg-white'}`}>{x}</span>)}</div></div>; }

function Decision({tone,icon:Icon,label,detail}:{tone:'good'|'warn'|'stop';icon:LucideIcon;label:string;detail:string}) { const cls={good:'border-emerald-300 bg-emerald-50 text-emerald-900',warn:'border-amber-300 bg-amber-50 text-amber-950',stop:'border-rose-300 bg-rose-50 text-rose-900'}[tone]; return <div className={`flex items-center gap-3 border p-3 ${cls}`}><span className="grid h-9 w-9 place-items-center bg-white"><Icon size={18}/></span><div><p className="text-sm font-black">{label}</p><p className="text-xs opacity-70">{detail}</p></div></div>; }
