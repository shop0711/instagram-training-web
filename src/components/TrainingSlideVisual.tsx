import { useState } from 'react';
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
  Eye,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Music2,
  PenLine,
  Save,
  Send,
  ShieldCheck,
  ShoppingBag,
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
  food: assetById.img_4824.media ?? assetById.img_4824.path
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
    case 'word-shift': return <StrongWords slide={slide} />;
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
    <div className="grid h-full items-center gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
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
  const photos = [trainingPhotos.stationery, trainingPhotos.books, trainingPhotos.food, trainingPhotos.books];
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
  const moments = [
    {icon:BookOpen,time:'10:00',label:'本に出会う'}, {icon:PenLine,time:'11:00',label:'文具を試す'},
    {icon:UtensilsCrossed,time:'12:00',label:'北海道を味わう'}, {icon:Music2,time:'14:00',label:'音楽を探す'}
  ];
  return (
    <div className="grid h-full gap-5 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
      <div className="relative min-h-[280px] overflow-hidden border-l-4 border-brand-600">
        <img src={trainingPhotos.books} alt="整理された書籍フェア売場" className="absolute inset-0 h-full w-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent"/>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white"><p className="text-[10px] font-black text-amber-300">SUCCESS ACCOUNT</p><p className="mt-2 text-2xl font-black leading-tight">商品カタログではなく<br/>過ごす一日を見せる</p><div className="mt-3 flex items-center gap-2 text-xs font-bold"><ShoppingBag size={17} className="text-amber-300"/>「買う」から「楽しむ」へ</div></div>
      </div>
      <div className="relative grid grid-cols-2 gap-3">
        <div className="absolute left-1/2 top-8 h-[calc(100%-4rem)] w-px bg-brand-200" />
        {moments.map(({icon:Icon,time,label},i)=><div key={label} className={`relative bg-white p-4 shadow-card ${i%2 ? 'mt-8' : ''}`}>
          <span className="text-[10px] font-black text-brand-600">{time}</span><Icon className="mt-2 text-slate-800" size={22}/><p className="mt-3 text-sm font-black">{label}</p>
        </div>)}
      </div>
    </div>
  );
}

function StoreIdeaMap() {
  return <RealPostGrid />;
}

function OneTheme() {
  const steps = ['何がある','誰向け','どこ','いつまで','なぜ今'];
  return (
    <div className="grid h-full gap-5 lg:grid-cols-[.82fr_1.18fr]">
      <div className="grid grid-cols-2 gap-3">
        <MiniPost bad title="全部まとめてお知らせ" tags={['新商品','フェア','イベント','予約','ランキング']} />
        <MiniPost title="今週末｜親子イベント" tags={['7/18開催','児童書売場']} />
      </div>
      <div className="flex flex-col justify-center border border-brand-200 bg-brand-50/60 p-5">
        <p className="text-xs font-black text-brand-700">MESSAGE FILTER</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {steps.map((step,i)=><div key={step} className="contents"><span className="bg-white px-3 py-2 text-xs font-black shadow-sm"><b className="mr-1 text-brand-600">{i+1}</b>{step}</span>{i<4&&<ChevronRight size={14} className="text-brand-400"/>}</div>)}
        </div>
        <div className="mt-5 flex items-center gap-3 border-t border-brand-200 pt-4"><Target className="text-brand-700"/><p className="text-lg font-black">一つの投稿に、一つの「行く理由」</p></div>
      </div>
    </div>
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

function StrongWords({slide}:Props) {
  const pairs = slide.wordPairs ?? [];
  const [selected,setSelected] = useState(0);
  const active = pairs[selected] ?? {before:'お知らせ',after:'今週末開催'};
  return (
    <div className="grid h-full gap-4 lg:grid-cols-[1.15fr_.85fr]">
      <div className="grid grid-cols-2 gap-2">
        {pairs.map((pair,i)=><button type="button" onClick={()=>setSelected(i)} aria-pressed={selected===i} key={pair.before} className={`grid grid-cols-[.75fr_auto_1.25fr] items-center border p-2 text-left transition ${selected===i?'border-brand-400 bg-brand-50 shadow-card':'border-slate-200 bg-white'}`}>
          <span className="text-[10px] font-bold text-slate-400 line-through">{pair.before}</span><ArrowRight size={12} className="text-brand-400"/><span className="text-xs font-black text-brand-900">{pair.after}</span>
        </button>)}
      </div>
      <div className="grid grid-cols-2 items-center gap-2 bg-slate-950 p-3">
        <div className="bg-white/10 p-3 text-white/45"><span className="text-[9px] font-black">WEAK</span><div className="relative mt-3 aspect-square overflow-hidden"><img src={trainingPhotos.food} alt="" className="absolute inset-0 h-full w-full scale-75 object-cover opacity-30 grayscale"/><span className="absolute inset-0 bg-slate-950/35"/><p className="relative p-3 text-sm font-bold">{active.before}</p></div></div>
        <div className="bg-white p-3"><span className="text-[9px] font-black text-brand-600">STRONG</span><div className="relative mt-3 aspect-square overflow-hidden text-white shadow-lg"><img src={trainingPhotos.food} alt="北海道フェアの売場" className="absolute inset-0 h-full w-full object-cover"/><span className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-transparent to-transparent"/><span className="absolute left-3 top-3 bg-amber-300 px-1.5 py-1 text-[8px] font-black text-slate-950">NEW</span><p className="absolute inset-x-3 bottom-3 text-lg font-black leading-tight">{active.after}</p></div></div>
      </div>
    </div>
  );
}

function ProfileEntrance() {
  return <RealProfileEntrance />;
}

function AlgorithmLoop() {
  const actions=[['最後まで見る',Eye],['保存',Save],['シェア',Send],['コメント',MessageCircle],['プロフィールへ',CircleUserRound]] as const;
  return (
    <div className="grid h-full gap-3 lg:grid-cols-[.72fr_1.1fr_.72fr] lg:items-center">
      <RealAlgorithmPost />
      <div className="relative border border-brand-200 bg-brand-50 p-4">
        <span className="text-[9px] font-black text-brand-600">02 価値を行動で判断</span>
        <div className="mt-3 grid grid-cols-5 gap-1.5">{actions.map(([label,Icon])=><div key={label} className="bg-white p-2 text-center shadow-sm"><Icon size={17} className="mx-auto text-brand-700"/><p className="mt-1 text-[8px] font-black leading-tight">{label}</p></div>)}</div>
        <div className="mt-3 flex items-center justify-center gap-2 text-xs font-black text-brand-900"><HeartHandshake size={18}/>「見た人の役に立った」</div>
      </div>
      <div className="border-l-4 border-emerald-500 bg-emerald-50 p-4">
        <span className="text-[9px] font-black text-emerald-700">03 次の表示へ</span><Bookmark className="mt-3 text-emerald-700" size={26}/><p className="mt-2 text-xl font-black text-slate-950">また届く</p><p className="mt-1 text-xs leading-relaxed text-slate-600">似た興味を持つ地域のお客様へ。</p>
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

function MiniPost({bad,title,tags}:{bad?:boolean;title:string;tags:string[]}) { return <div className={`relative overflow-hidden border p-3 ${bad?'border-rose-200 bg-rose-50':'border-emerald-200 bg-emerald-50'}`}><StatusLabel tone={bad?'muted':'good'}>{bad?'NG 情報過多':'OK 1テーマ'}</StatusLabel><div className={`mt-3 aspect-square p-3 ${bad?'bg-slate-200':'bg-brand-700 text-white'}`}><p className={`${bad?'text-sm text-slate-500':'text-xl'} font-black`}>{title}</p><div className="mt-4 flex flex-wrap gap-1">{tags.map(x=><span key={x} className={`px-1.5 py-1 text-[9px] ${bad?'bg-white text-slate-500':'bg-white/15 text-white'}`}>{x}</span>)}</div></div></div>; }

function RoleSplit({title,icon:Icon,tone,items}:{title:string;icon:LucideIcon;tone:'dark'|'brand';items:string[]}) { return <div className={`p-5 ${tone==='dark'?'bg-slate-950 text-white':'bg-brand-50 text-slate-950 border border-brand-200'}`}><Icon size={28} className={tone==='dark'?'text-amber-300':'text-brand-700'}/><h3 className="mt-3 text-xl font-black">{title}</h3><div className="mt-4 grid grid-cols-2 gap-2">{items.map(x=><span key={x} className={`p-2 text-xs font-bold ${tone==='dark'?'bg-white/10':'bg-white'}`}>{x}</span>)}</div></div>; }

function Decision({tone,icon:Icon,label,detail}:{tone:'good'|'warn'|'stop';icon:LucideIcon;label:string;detail:string}) { const cls={good:'border-emerald-300 bg-emerald-50 text-emerald-900',warn:'border-amber-300 bg-amber-50 text-amber-950',stop:'border-rose-300 bg-rose-50 text-rose-900'}[tone]; return <div className={`flex items-center gap-3 border p-3 ${cls}`}><span className="grid h-9 w-9 place-items-center bg-white"><Icon size={18}/></span><div><p className="text-sm font-black">{label}</p><p className="text-xs opacity-70">{detail}</p></div></div>; }
