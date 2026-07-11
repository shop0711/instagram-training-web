import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  BookOpen,
  Bot,
  Bookmark,
  CalendarDays,
  Camera,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Compass,
  Eye,
  Film,
  Grid3X3,
  Heart,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Music2,
  PackageOpen,
  PenLine,
  Pin,
  Play,
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
import { Checklist } from './Checklist';

type Props = { slide: SlideData };

const reveal = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.38 }
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
  return (
    <div className="grid h-full gap-6 lg:grid-cols-[1.04fr_.96fr] lg:items-center">
      <div className="relative z-10">
        <div className="mb-4 flex gap-2">
          <Tag icon={MapPin}>店舗発信の実践研修</Tag><Tag icon={Clock3}>30 min</Tag>
        </div>
        <h1 id={`${slide.id}-title`} className="max-w-4xl text-balance text-[clamp(2.5rem,5vw,5.4rem)] font-black leading-[.98] text-slate-950">
          店舗から届ける<br /><span className="text-brand-700">Instagram研修</span>
        </h1>
        <p className="mt-5 max-w-2xl text-[clamp(1.05rem,2vw,1.7rem)] font-semibold leading-snug text-slate-600">
          商品を並べるSNSから、<span className="text-slate-950">「今日、行く理由」</span>を届けるSNSへ。
        </p>
        <div className="mt-6 flex items-center gap-3 text-sm font-bold text-brand-800">
          <span className="grid h-9 w-9 place-items-center bg-brand-700 text-white"><Play size={16} fill="currentColor" /></span>
          見ればわかる、明日から動ける
        </div>
      </div>
      <div className="relative mx-auto h-full min-h-[360px] w-full max-w-xl">
        <div className="absolute inset-x-6 bottom-3 top-8 border border-slate-200 bg-[#edf4ff]" />
        <div className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white p-4 shadow-card">
          <p className="text-[10px] font-black text-brand-700">TODAY</p><p className="mt-1 text-lg font-black">本日入荷</p>
          <p className="text-xs text-slate-500">店舗の「今」が来店理由になる</p>
        </div>
        <PhoneFrame className="absolute right-2 top-0 w-[270px] rotate-[2deg]">
          <PostArtwork mode="good" headline="北海道フェア開催中" />
        </PhoneFrame>
        <div className="absolute bottom-0 right-44 z-20 border-l-4 border-amber-400 bg-slate-950 px-4 py-3 text-white shadow-card">
          <p className="text-[10px] font-bold text-slate-300">NEXT ACTION</p><p className="text-sm font-black">売場を1枚、撮ってみる</p>
        </div>
      </div>
    </div>
  );
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
    <div className="grid h-full gap-4 lg:grid-cols-2">
      <RolePanel icon={Compass} label="本体アカウント" metaphor="旅行ガイド" audience="全国のお客様" color="slate" items={['ブランド全体','大型キャンペーン','全店共通情報']} />
      <RolePanel icon={MapPin} label="店舗アカウント" metaphor="地域の掲示板" audience="近隣のお客様" color="brand" items={['今日の入荷','この店だけの催し','スタッフのおすすめ']} />
    </div>
  );
}

function CustomerLens({ slide }: Props) {
  const icons = [PenLine, BookOpen, UtensilsCrossed, Music2];
  return (
    <div className="grid h-full gap-3 sm:grid-cols-2">
      {slide.compareExamples?.map((item, i) => {
        const Icon = icons[i];
        return <motion.article {...reveal} transition={{delay:i*.07}} key={item.label} className="grid grid-cols-[64px_1fr] overflow-hidden border border-slate-200 bg-white">
          <div className="grid place-items-center bg-slate-950 text-white"><Icon size={24}/><span className="text-[10px] font-bold">{item.label}</span></div>
          <div className="p-3">
            <p className="flex items-center gap-2 text-xs text-slate-400"><X size={12}/> {item.before}</p>
            <div className="my-2 h-px bg-slate-100" />
            <p className="flex items-start gap-2 text-sm font-bold text-brand-900"><Check size={15} className="mt-0.5 shrink-0 text-emerald-600"/> {item.after}</p>
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
      <div className="border-l-4 border-brand-600 bg-brand-50 p-6">
        <p className="text-xs font-black text-brand-600">SUCCESS ACCOUNT</p>
        <p className="mt-3 text-3xl font-black leading-tight text-slate-950">商品カタログではなく<br/>過ごす一日を見せる</p>
        <div className="mt-5 flex items-center gap-3 text-sm font-bold"><ShoppingBag className="text-brand-600"/>「買う」から「楽しむ」へ</div>
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
  const zones = [
    ['入口','本日入荷','限定特典',PackageOpen],['平台','ランキング','スタッフ推し',Grid3X3],
    ['催事','季節フェア','イベント準備',CalendarDays],['売場','再入荷','POPの裏側',Camera]
  ] as const;
  return (
    <div className="relative h-full min-h-[300px] border border-slate-200 bg-[#f8fafc] p-4">
      <div className="absolute left-1/2 top-1/2 z-20 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center bg-brand-700 text-center text-white shadow-lg">
        <Store size={28}/><span className="text-xs font-black">毎日の売場</span>
      </div>
      <div className="grid h-full grid-cols-2 gap-3">
        {zones.map(([zone,a,b,Icon],i)=><motion.div {...reveal} transition={{delay:i*.08}} key={zone} className="flex items-center gap-4 border border-slate-200 bg-white p-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center bg-brand-50 text-brand-700"><Icon size={20}/></div>
          <div><p className="text-[10px] font-black text-slate-400">{zone}</p><p className="text-sm font-black">{a}</p><p className="text-xs text-slate-500">＋ {b}</p></div>
        </motion.div>)}
      </div>
      <p className="absolute bottom-2 left-1/2 z-30 -translate-x-1/2 bg-amber-300 px-4 py-1 text-xs font-black text-slate-950">業務そのものがコンテンツ</p>
    </div>
  );
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
  return (
    <div className="grid h-full gap-4 lg:grid-cols-2">
      <PhotoPanel bad />
      <PhotoPanel />
    </div>
  );
}

function FormatGuide() {
  const [active,setActive] = useState<'feed'|'stories'|'reels'>('feed');
  const formats = {
    feed:{label:'フィード',life:'残す',desc:'検索・保存される情報',icon:Grid3X3,uses:['大型フェア','ランキング','店舗案内']},
    stories:{label:'ストーリーズ',life:'今',desc:'24時間の鮮度がある情報',icon:Clock3,uses:['本日入荷','開催中','急ぎのお知らせ']},
    reels:{label:'リール',life:'感じる',desc:'動きと音で雰囲気を伝える',icon:Film,uses:['店内ツアー','展開風景','スタッフ目線']}
  };
  const item=formats[active];
  return (
    <div className="grid h-full gap-5 lg:grid-cols-[.8fr_1.2fr]">
      <div className="flex items-center justify-center">
        <AnimatePresence mode="wait"><motion.div key={active} initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-10}}><FormatPhone mode={active}/></motion.div></AnimatePresence>
      </div>
      <div className="flex flex-col justify-center">
        <div className="grid grid-cols-3 border border-slate-200 bg-white p-1" role="tablist" aria-label="投稿形式">
          {(Object.keys(formats) as Array<keyof typeof formats>).map(key=>{const Icon=formats[key].icon;return <button role="tab" aria-selected={active===key} onClick={()=>setActive(key)} key={key} className={`flex items-center justify-center gap-2 px-3 py-2 text-xs font-black ${active===key?'bg-brand-700 text-white':'text-slate-500'}`}><Icon size={15}/>{formats[key].label}</button>})}
        </div>
        <div className="mt-4 border-l-4 border-brand-600 bg-brand-50 p-5">
          <p className="text-xs font-black text-brand-600">{item.life.toUpperCase()} INFORMATION</p><h3 className="mt-1 text-2xl font-black">{item.desc}</h3>
          <div className="mt-4 grid grid-cols-3 gap-2">{item.uses.map(x=><span key={x} className="bg-white p-2 text-center text-xs font-bold">{x}</span>)}</div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-black">
          <span className="border-t-4 border-blue-500 p-2">残す＝Feed</span><span className="border-t-4 border-amber-400 p-2">今＝Stories</span><span className="border-t-4 border-rose-500 p-2">体験＝Reels</span>
        </div>
      </div>
    </div>
  );
}

function FirstImageCompare() {
  return (
    <div className="grid h-full grid-cols-2 gap-4 lg:grid-cols-[1fr_1fr_.8fr]">
      <PhoneFrame compact><PostArtwork mode="bad" headline="お知らせ"/></PhoneFrame>
      <PhoneFrame compact><PostArtwork mode="good" headline="今週末開催"/></PhoneFrame>
      <div className="col-span-2 flex flex-col justify-center bg-slate-950 p-5 text-white lg:col-span-1">
        <p className="text-xs font-black text-amber-300">0.5秒のチェック</p>
        {['何の投稿？','なぜ見る？','主役はどれ？'].map((x,i)=><div key={x} className="mt-3 flex items-center gap-3 border-b border-white/15 pb-3"><span className="text-2xl font-black text-white/25">0{i+1}</span><span className="font-bold">{x}</span></div>)}
        <p className="mt-4 text-sm font-black text-amber-300">全部わかれば、指が止まる。</p>
      </div>
    </div>
  );
}

function CarouselPatterns() {
  const patterns=[['本日入荷','主役を大きく'],['7/18 開催','日時を先に'],['夏の文具フェア','規模感を見せる'],['スタッフ5選','選ぶ理由を作る']];
  return (
    <div className="grid h-full gap-4 lg:grid-cols-[1.15fr_.85fr]">
      <div className="grid grid-cols-4 items-center gap-2">
        {['1枚目','2枚目','3枚目','最後'].map((x,i)=><div key={x} className={`relative aspect-[.78] p-3 ${i===0?'bg-brand-700 text-white shadow-lg':'border border-slate-200 bg-white'}`}><span className="text-[10px] font-black opacity-60">{x}</span><p className="mt-3 text-sm font-black">{['止める','詳しく','使い方','来店へ'][i]}</p><div className={`absolute inset-x-3 bottom-3 h-12 ${i===0?'bg-white/20':'bg-slate-100'}`}/>{i<3&&<ArrowRight className="absolute -right-4 top-1/2 z-10 text-amber-400" size={20}/>}</div>)}
      </div>
      <div className="grid grid-cols-2 gap-2">{patterns.map(([a,b])=><div key={a} className="border border-slate-200 bg-white p-3"><p className="text-base font-black text-brand-800">{a}</p><p className="mt-1 text-xs text-slate-500">{b}</p></div>)}</div>
    </div>
  );
}

function StrongWords({slide}:Props) {
  return (
    <div className="grid h-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {slide.wordPairs?.map((pair,i)=><motion.div {...reveal} transition={{delay:i*.06}} key={pair.before} className="grid grid-cols-[.78fr_auto_1.22fr] items-center border border-slate-200 bg-white">
        <span className="p-3 text-xs font-bold text-slate-400 line-through">{pair.before}</span><ArrowRight size={14} className="text-brand-400"/><span className="border-l border-brand-100 bg-brand-50 p-3 text-sm font-black text-brand-900">{pair.after}</span>
      </motion.div>)}
    </div>
  );
}

function ProfileEntrance() {
  return (
    <div className="grid h-full gap-4 lg:grid-cols-[.72fr_1.28fr]">
      <div className="flex flex-col justify-center bg-slate-950 p-5 text-white">
        <p className="text-xs font-black text-amber-300">FIRST VISIT FLOW</p>
        {['投稿を見る','プロフィールへ','店舗を理解','来店・フォロー'].map((x,i)=><div key={x} className="flex items-center gap-3 py-2"><span className="grid h-7 w-7 place-items-center border border-white/30 text-xs font-black">{i+1}</span><b>{x}</b>{i<3&&<ArrowDown className="ml-auto text-white/30" size={15}/>}</div>)}
      </div>
      <ProfileComparison />
    </div>
  );
}

function AlgorithmLoop() {
  const actions=[['最後まで見る',Eye],['保存',Save],['シェア',Send],['コメント',MessageCircle],['プロフィールへ',CircleUserRound]] as const;
  return (
    <div className="grid h-full gap-5 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
      <div className="relative grid grid-cols-5 gap-2">
        {actions.map(([label,Icon],i)=><div key={label} className="relative border border-slate-200 bg-white p-3 text-center shadow-card"><span className="mx-auto grid h-10 w-10 place-items-center bg-brand-50 text-brand-700"><Icon size={19}/></span><p className="mt-2 text-xs font-black">{label}</p>{i<4&&<ChevronRight className="absolute -right-3 top-1/2 z-10 text-brand-400" size={18}/>}</div>)}
      </div>
      <div className="border-l-4 border-emerald-500 bg-emerald-50 p-5">
        <Bookmark className="text-emerald-700" size={28}/><p className="mt-3 text-2xl font-black text-slate-950">「役立つ」が<br/>次の表示をつくる</p><p className="mt-2 text-sm text-slate-600">保存したくなるランキングや、家族に送りたくなるイベント情報へ。</p>
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
        <div className="mt-1 bg-slate-950 p-4 text-center text-2xl font-black text-white">迷ったら投稿しない。</div>
      </div>
    </div>
  );
}

function Tag({icon:Icon,children}:{icon:LucideIcon;children:React.ReactNode}) { return <span className="inline-flex items-center gap-1 border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600"><Icon size={13}/>{children}</span>; }

function StatusLabel({children,tone}:{children:React.ReactNode;tone:'muted'|'good'}) { return <span className={`w-fit px-3 py-1 text-xs font-black ${tone==='good'?'bg-brand-700 text-white':'bg-slate-200 text-slate-600'}`}>{children}</span>; }

function Node({icon:Icon,label,muted,active}:{icon:LucideIcon;label:string;muted?:boolean;active?:boolean}) { return <div className={`grid place-items-center border p-4 text-center ${active?'border-brand-200 bg-white text-brand-800':'border-slate-200 bg-white'} ${muted?'opacity-55':''}`}><Icon size={30}/><b className="mt-2 text-sm">{label}</b></div>; }

function RolePanel({icon:Icon,label,metaphor,audience,color,items}:{icon:LucideIcon;label:string;metaphor:string;audience:string;color:'slate'|'brand';items:string[]}) {
  const active=color==='brand';
  return <div className={`relative overflow-hidden border p-5 ${active?'border-brand-300 bg-brand-50':'border-slate-200 bg-slate-50'}`}>
    <div className="flex items-start justify-between"><div className={`grid h-12 w-12 place-items-center ${active?'bg-brand-700 text-white':'bg-slate-900 text-white'}`}><Icon/></div><span className="text-xs font-black text-slate-400">→ {audience}</span></div>
    <p className="mt-4 text-xs font-bold text-slate-500">{label}</p><h2 className="text-2xl font-black text-slate-950">{metaphor}</h2>
    <div className="mt-4 grid grid-cols-3 gap-2">{items.map(x=><span key={x} className="bg-white p-3 text-center text-xs font-bold shadow-sm">{x}</span>)}</div>
  </div>;
}

function MiniPost({bad,title,tags}:{bad?:boolean;title:string;tags:string[]}) { return <div className={`relative overflow-hidden border p-3 ${bad?'border-rose-200 bg-rose-50':'border-emerald-200 bg-emerald-50'}`}><StatusLabel tone={bad?'muted':'good'}>{bad?'NG 情報過多':'OK 1テーマ'}</StatusLabel><div className={`mt-3 aspect-square p-3 ${bad?'bg-slate-200':'bg-brand-700 text-white'}`}><p className={`${bad?'text-sm text-slate-500':'text-xl'} font-black`}>{title}</p><div className="mt-4 flex flex-wrap gap-1">{tags.map(x=><span key={x} className={`px-1.5 py-1 text-[9px] ${bad?'bg-white text-slate-500':'bg-white/15 text-white'}`}>{x}</span>)}</div></div></div>; }

function PhotoPanel({bad}:{bad?:boolean}) { return <div className={`grid grid-cols-[1.35fr_.65fr] border ${bad?'border-rose-200':'border-emerald-200'}`}>
  <div className={`relative overflow-hidden ${bad?'bg-slate-700':'bg-sky-100'}`}><StoreScene bad={bad}/><span className={`absolute left-3 top-3 px-2 py-1 text-xs font-black ${bad?'bg-slate-950 text-white':'bg-emerald-600 text-white'}`}>{bad?'NG':'OK'}</span></div>
  <div className="flex flex-col justify-center gap-3 bg-white p-4">{(bad?['暗い','背景が散らかる','主役が小さい']:['明るい','背景を整理','主役へ寄る']).map((x,i)=><p key={x} className="flex items-center gap-2 text-xs font-bold">{bad?<X size={14} className="text-rose-500"/>:<Check size={14} className="text-emerald-600"/>}{x}{i===2&&<Camera className="ml-auto text-slate-300" size={15}/>}</p>)}</div>
  </div>; }

function StoreScene({bad}:{bad?:boolean}) { return <div className={`absolute inset-0 p-5 ${bad?'opacity-45':''}`}><div className="absolute inset-x-5 bottom-5 h-24 bg-white shadow-lg"><div className="grid h-full grid-cols-4 gap-2 p-3">{[0,1,2,3].map(i=><div key={i} className={`${i===1&&!bad?'scale-110 bg-brand-600':'bg-amber-300'} transition-transform`} />)}</div></div>{bad&&<><div className="absolute bottom-3 left-2 h-14 w-14 rotate-12 bg-slate-500"/><div className="absolute right-3 top-10 h-20 w-10 bg-slate-400"/></>}</div>; }

function PhoneFrame({children,className='',compact}:{children:React.ReactNode;className?:string;compact?:boolean}) { return <div className={`mx-auto overflow-hidden rounded-[2rem] border-[6px] border-slate-950 bg-white shadow-phone ${compact?'w-full max-w-[210px]':'w-full'} ${className}`}><div className="flex h-6 items-center justify-between px-3 text-[8px] font-black"><span>9:41</span><span>● ● ▰</span></div><div className="flex items-center gap-2 border-y border-slate-100 px-3 py-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-brand-700 text-[8px] font-black text-white">C4</span><span className="text-[9px] font-bold">coachandfour_store</span></div>{children}<div className="flex justify-between p-3"><span className="flex gap-2"><Heart size={15}/><MessageCircle size={15}/><Send size={15}/></span><Bookmark size={15}/></div></div>; }

function PostArtwork({mode,headline}:{mode:'good'|'bad';headline:string}) { const bad=mode==='bad'; return <div className={`relative aspect-square overflow-hidden p-4 ${bad?'bg-slate-100':'bg-[#e9f2ff]'}`}>{bad?<><div className="mx-auto mt-9 h-20 w-14 bg-slate-300"/><p className="mt-6 text-center text-xs text-slate-400">{headline}</p><div className="absolute inset-3 border border-dashed border-slate-300"/></>:<><span className="bg-amber-300 px-2 py-1 text-[9px] font-black">7/18–20</span><div className="mx-auto mt-5 h-24 w-20 rotate-6 bg-brand-700 shadow-lg"><div className="m-3 h-2 bg-white/80"/><div className="m-3 h-10 bg-white/15"/></div><p className="absolute inset-x-4 bottom-4 text-xl font-black leading-none text-slate-950">{headline}</p></>}</div>; }

function FormatPhone({mode}:{mode:'feed'|'stories'|'reels'}) { if(mode==='feed') return <PhoneFrame className="max-w-[230px]"><PostArtwork mode="good" headline="夏のおすすめ5選"/></PhoneFrame>; return <div className="relative mx-auto aspect-[9/16] w-[190px] overflow-hidden rounded-[2rem] border-[6px] border-slate-950 bg-slate-800 text-white shadow-phone"><StoreScene/><div className="absolute inset-x-3 top-3 h-1 bg-white/80"/><div className="absolute bottom-5 left-4"><p className="text-xs font-black">{mode==='stories'?'本日入荷しました':'売場を30秒でご案内'}</p><p className="mt-1 text-[9px] text-white/70">@coachandfour_store</p></div>{mode==='reels'&&<Play className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" fill="white"/>}</div>; }

function ProfileComparison() { return <div className="grid grid-cols-2 gap-3"><ProfileMini bad/><ProfileMini/></div>; }

function ProfileMini({bad}:{bad?:boolean}) { return <div className={`relative border-[5px] border-slate-950 bg-white p-3 ${bad?'opacity-65':''}`}><span className={`absolute right-2 top-2 px-2 py-1 text-[9px] font-black text-white ${bad?'bg-rose-500':'bg-emerald-600'}`}>{bad?'NG':'GOOD'}</span><div className="flex items-center gap-3"><div className={`grid h-12 w-12 place-items-center rounded-full ${bad?'bg-slate-200 text-slate-400':'bg-brand-700 text-white'} text-xs font-black`}>{bad?'?':'C4'}</div><div><p className="text-xs font-black">{bad?'店舗公式':'コーチャンフォー若葉台店'}</p><p className="text-[9px] text-slate-400">128 posts · 3,240 followers</p></div></div><div className="mt-3 bg-slate-50 p-2 text-[9px] leading-relaxed text-slate-600">{bad?'新着情報を発信します。':'書籍・文具・音楽・食品・カフェ。若葉台店の「今」をお届け。'}</div><div className="mt-3 flex gap-2">{['店舗案内','イベント','アクセス'].map(x=><div key={x} className="text-center"><span className={`block h-8 w-8 rounded-full ${bad?'bg-slate-100':'border-2 border-brand-200 bg-brand-50'}`}/><span className="text-[7px]">{bad?'':x}</span></div>)}</div><div className="mt-3 grid grid-cols-3 gap-1">{[0,1,2,3,4,5].map(i=><div key={i} className={`aspect-square ${bad?'bg-slate-200':'bg-brand-100'}`}>{!bad&&i<3&&<Pin size={10} className="m-1 text-brand-700"/>}</div>)}</div></div>; }

function RoleSplit({title,icon:Icon,tone,items}:{title:string;icon:LucideIcon;tone:'dark'|'brand';items:string[]}) { return <div className={`p-5 ${tone==='dark'?'bg-slate-950 text-white':'bg-brand-50 text-slate-950 border border-brand-200'}`}><Icon size={28} className={tone==='dark'?'text-amber-300':'text-brand-700'}/><h3 className="mt-3 text-xl font-black">{title}</h3><div className="mt-4 grid grid-cols-2 gap-2">{items.map(x=><span key={x} className={`p-2 text-xs font-bold ${tone==='dark'?'bg-white/10':'bg-white'}`}>{x}</span>)}</div></div>; }

function Decision({tone,icon:Icon,label,detail}:{tone:'good'|'warn'|'stop';icon:LucideIcon;label:string;detail:string}) { const cls={good:'border-emerald-300 bg-emerald-50 text-emerald-900',warn:'border-amber-300 bg-amber-50 text-amber-950',stop:'border-rose-300 bg-rose-50 text-rose-900'}[tone]; return <div className={`flex items-center gap-3 border p-3 ${cls}`}><span className="grid h-9 w-9 place-items-center bg-white"><Icon size={18}/></span><div><p className="text-sm font-black">{label}</p><p className="text-xs opacity-70">{detail}</p></div></div>; }
