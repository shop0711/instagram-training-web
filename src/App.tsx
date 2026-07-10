import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Bot,
  CalendarDays,
  Camera,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Coffee,
  Compass,
  Eye,
  FileText,
  Grid3X3,
  HeartHandshake,
  Lightbulb,
  MapPin,
  MessageCircle,
  Music2,
  PackageOpen,
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
  WandSparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { Checklist } from './components/Checklist';
import { CompareCards } from './components/CompareCards';
import { FormatTabs } from './components/FormatTabs';
import { HeroVisual } from './components/HeroVisual';
import { Layout } from './components/Layout';
import { PhoneMock } from './components/PhoneMock';
import { ProfileMock } from './components/ProfileMock';
import { Slide } from './components/Slide';
import {
  aiCanDo,
  aiNeedsFromStore,
  riskChecklist,
  trainingSlides
} from './data/training';
import type { SlideData } from './data/training';

type ViewMode = 'presentation' | 'reader';

const goalIcons = [Target, Store, ShieldCheck];
const lifestyleIcons = [BookOpen, PenLine, Music2, UtensilsCrossed, Coffee];
const ideaIcons = [
  PackageOpen,
  Grid3X3,
  Sparkles,
  Save,
  HeartHandshake,
  CalendarDays,
  Clock3,
  UtensilsCrossed,
  PenLine,
  ShoppingBag,
  FileText,
  ArrowRight
];
const algorithmIcons = [Eye, Save, Send, MessageCircle, CircleUserRound];

function resetPageScroll() {
  window.scrollTo({ top: 0, left: 0 });
  document.scrollingElement?.scrollTo({ top: 0, left: 0 });
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<ViewMode>('presentation');
  const [isMobile, setIsMobile] = useState(false);
  const effectiveMode: ViewMode = isMobile ? 'reader' : mode;

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 899px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('presentation-mode', effectiveMode === 'presentation');
    document.documentElement.classList.toggle('presentation-mode', effectiveMode === 'presentation');
    if (effectiveMode === 'presentation') {
      resetPageScroll();
      window.requestAnimationFrame(resetPageScroll);
    }
    return () => {
      document.body.classList.remove('presentation-mode');
      document.documentElement.classList.remove('presentation-mode');
    };
  }, [effectiveMode]);

  const navigate = useCallback(
    (index: number) => {
      const nextIndex = Math.max(0, Math.min(trainingSlides.length - 1, index));
      setCurrentIndex(nextIndex);
      if (effectiveMode === 'reader') {
        window.requestAnimationFrame(() => {
          document.getElementById(trainingSlides[nextIndex].id)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        });
      } else {
        resetPageScroll();
        window.requestAnimationFrame(resetPageScroll);
      }
    },
    [effectiveMode]
  );

  useEffect(() => {
    if (effectiveMode !== 'presentation') return;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('button, input, textarea, select, [role="tab"]')) return;

      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        navigate(currentIndex + 1);
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        navigate(currentIndex - 1);
      }
      if (event.key === 'Home') {
        event.preventDefault();
        navigate(0);
      }
      if (event.key === 'End') {
        event.preventDefault();
        navigate(trainingSlides.length - 1);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentIndex, effectiveMode, navigate]);

  useEffect(() => {
    if (effectiveMode !== 'reader') return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-slide-number]'));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const number = Number((visible.target as HTMLElement).dataset.slideNumber);
        if (Number.isFinite(number)) setCurrentIndex(number - 1);
      },
      { rootMargin: '-18% 0px -56% 0px', threshold: [0.15, 0.35, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [effectiveMode]);

  const visibleSlides = useMemo(
    () => (effectiveMode === 'presentation' ? [trainingSlides[currentIndex]] : trainingSlides),
    [currentIndex, effectiveMode]
  );

  return (
    <Layout
      slides={trainingSlides}
      currentIndex={currentIndex}
      mode={effectiveMode}
      onModeChange={setMode}
      onNavigate={navigate}
    >
      {visibleSlides.map((slide) => (
        <Slide key={slide.id} slide={slide} mode={effectiveMode}>
          <SlideContent slide={slide} />
        </Slide>
      ))}
    </Layout>
  );
}

function SlideContent({ slide }: { slide: SlideData }) {
  switch (slide.kind) {
    case 'cover':
      return (
        <div className="grid h-full gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="flex flex-col justify-center">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="chip"><MapPin size={13} /> コーチャンフォー若葉台店</span>
              <span className="chip"><Clock3 size={13} /> 30分研修</span>
            </div>
            <h1 id={`${slide.id}-title`} className="slide-title">{slide.title}</h1>
            <p className="mt-5 max-w-3xl text-balance text-[clamp(1.3rem,2.5vw,2.35rem)] font-medium leading-tight tracking-[-0.035em] text-brand-700">
              {slide.description}
            </p>
            <p className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-500 shadow-sm">
              <Compass size={15} className="text-violet-500" /> {slide.keyPhrase}
            </p>
          </div>
          <HeroVisual />
        </div>
      );

    case 'goals':
      return (
        <div className="flex h-full flex-col justify-center">
          <SlideHeading slide={slide} />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {slide.cards?.map((card, index) => {
              const Icon = goalIcons[index] ?? Target;
              return (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="surface-card group relative overflow-hidden p-5 sm:p-7"
                >
                  <div className="absolute right-4 top-3 text-6xl font-black tracking-tighter text-slate-100">0{index + 1}</div>
                  <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 transition group-hover:-translate-y-1">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <h3 className="relative mt-8 text-xl font-bold tracking-tight text-slate-950">{card.title}</h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-slate-600">{card.description}</p>
                </motion.article>
              );
            })}
          </div>
          <div className="key-phrase mt-6 max-w-3xl">明日から、迷わず1本投稿できる状態へ。</div>
        </div>
      );

    case 'statement':
      return (
        <div className="grid h-full gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <SlideHeading slide={slide} />
            <div className="mt-7 space-y-3">
              {slide.bullets?.map((bullet, index) => (
                <BulletRow key={bullet} index={index} text={bullet} />
              ))}
            </div>
            {slide.keyPhrase && <div className="key-phrase mt-7">{slide.keyPhrase}</div>}
          </div>
          <div className="relative mx-auto w-full max-w-lg rounded-[2rem] border border-slate-200 bg-slate-50/70 p-6 sm:p-8">
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-100 blur-3xl" />
            <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <ConnectionCard icon={Store} label="店舗" detail="今日の売場・現場の温度" />
              <div className="flex flex-col items-center gap-2 text-brand-500">
                <Send size={25} />
                <div className="h-14 w-px bg-gradient-to-b from-brand-300 to-violet-300" />
                <HeartHandshake size={25} />
              </div>
              <ConnectionCard icon={Users} label="お客様" detail="安心・発見・来店のきっかけ" />
            </div>
            <p className="relative mt-6 text-center text-sm font-semibold text-slate-600">小さな接点を積み重ねる</p>
          </div>
        </div>
      );

    case 'account-roles':
      return (
        <div className="flex h-full flex-col justify-center">
          <SlideHeading slide={slide} />
          <div className="mt-7 grid gap-4 lg:grid-cols-2">
            <RoleCard
              icon={Compass}
              label="本体アカウント"
              audience="全国のお客様へ"
              items={['企業全体のブランド', '大型キャンペーン', '全店共通情報']}
              tone="slate"
            />
            <RoleCard
              icon={Store}
              label="店舗アカウント"
              audience="地域のお客様へ"
              items={['今日の入荷・今の売場', '店舗限定情報・イベント', 'スタッフおすすめ']}
              tone="brand"
            />
          </div>
          <div className="mt-5 flex flex-col items-start justify-between gap-3 rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 to-brand-50 px-5 py-4 sm:flex-row sm:items-center">
            <span className="text-sm font-semibold text-slate-700">役割を分けると、同じ企業でも情報に奥行きが生まれます。</span>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-800 shadow-sm">{slide.keyPhrase}</span>
          </div>
        </div>
      );

    case 'customer-view':
      return (
        <div className="flex h-full flex-col justify-center">
          <SlideHeading slide={slide} compact />
          <div className="mt-6">
            <CompareCards examples={slide.compareExamples ?? []} />
          </div>
          {slide.keyPhrase && <div className="key-phrase mt-5">{slide.keyPhrase}</div>}
        </div>
      );

    case 'lifestyle':
      return (
        <div className="grid h-full gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <SlideHeading slide={slide} />
            {slide.keyPhrase && <div className="key-phrase mt-7">{slide.keyPhrase}</div>}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {slide.cards?.map((card, index) => {
              const Icon = lifestyleIcons[index] ?? Sparkles;
              return (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.07 }}
                  className={`surface-card flex items-center gap-4 p-4 ${index === 4 ? 'sm:col-span-2' : ''}`}
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-violet-50 text-brand-700">
                    <Icon size={23} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">{card.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{card.description}</p>
                  </div>
                </motion.article>
              );
            })}
            <div className="sm:col-span-2 rounded-2xl border border-dashed border-brand-200 bg-brand-50/50 p-4 text-center text-sm font-semibold text-brand-900">
              商品を並べるのではなく、店内で過ごす「一日」を見せる。
            </div>
          </div>
        </div>
      );

    case 'idea-grid':
      return (
        <div className="flex h-full flex-col justify-center">
          <SlideHeading slide={slide} compact />
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
            {slide.cards?.map((card, index) => {
              const Icon = ideaIcons[index] ?? Lightbulb;
              return (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.035 }}
                  className="group rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-card sm:p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <Icon size={18} className="text-brand-600" aria-hidden="true" />
                    <span className="text-[0.58rem] font-bold text-slate-300">#{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-slate-900">{card.title}</h3>
                  <p className="mt-1 text-[0.7rem] leading-relaxed text-slate-500">{card.description}</p>
                </motion.article>
              );
            })}
          </div>
          {slide.keyPhrase && <div className="key-phrase mt-5">{slide.keyPhrase}</div>}
        </div>
      );

    case 'five-steps':
      return (
        <div className="flex h-full flex-col justify-center">
          <SlideHeading slide={slide} />
          <div className="mt-9 grid gap-3 md:grid-cols-5">
            {slide.cards?.map((card, index) => (
              <div key={card.title} className="relative">
                <motion.article
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.09 }}
                  className="surface-card h-full p-4"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-700 text-sm font-black text-white">{index + 1}</span>
                  <h3 className="mt-5 text-base font-bold text-slate-950">{card.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{card.description}</p>
                </motion.article>
                {index < 4 && <ChevronRight className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 text-brand-300 md:block" size={20} />}
              </div>
            ))}
          </div>
          {slide.keyPhrase && <div className="key-phrase mt-7 text-center">{slide.keyPhrase}</div>}
        </div>
      );

    case 'photo-check':
      return (
        <div className="grid h-full gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SlideHeading slide={slide} />
            <div className="mt-7 space-y-2.5">
              {slide.bullets?.map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600"><Check size={16} /></span>
                  {item}
                  <span className="ml-auto text-[0.62rem] font-bold text-slate-300">0{index + 1}</span>
                </div>
              ))}
            </div>
            {slide.keyPhrase && <div className="key-phrase mt-6">{slide.keyPhrase}</div>}
          </div>
          <div className="relative mx-auto w-full max-w-lg rounded-[2rem] bg-slate-950 p-5 shadow-phone">
            <div className="aspect-[4/3] overflow-hidden rounded-[1.3rem] bg-gradient-to-br from-amber-100 via-white to-brand-100 p-5">
              <div className="flex h-full items-end gap-4 rounded-xl border border-white/80 bg-white/55 p-4 backdrop-blur-sm">
                <div className="h-3/4 flex-1 rounded-lg bg-brand-700 p-3 shadow-lg">
                  <div className="h-2 w-2/3 rounded bg-white/80" />
                  <div className="mt-3 h-1/2 rounded bg-white/15" />
                </div>
                <div className="h-2/3 w-1/3 rounded-lg bg-amber-300 p-3 shadow-lg">
                  <div className="h-2 rounded bg-white/70" />
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-white">
              <span className="text-xs font-semibold text-white/60">1×　明るさ +0.3</span>
              <span className="grid h-12 w-12 place-items-center rounded-full border-4 border-white/90"><Camera size={21} /></span>
              <span className="text-xs font-semibold text-white/60">整理済み</span>
            </div>
          </div>
        </div>
      );

    case 'formats':
      return (
        <div className="flex h-full flex-col justify-start">
          <SlideHeading slide={slide} compact />
          <div className="mt-6"><FormatTabs items={slide.formats ?? []} /></div>
          {slide.keyPhrase && <div className="key-phrase mt-5 text-center">{slide.keyPhrase}</div>}
        </div>
      );

    case 'first-image':
      return (
        <div className="grid h-full gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <SlideHeading slide={slide} compact />
            <div className="mt-5 space-y-2">
              {slide.bullets?.map((bullet, index) => <BulletRow key={bullet} index={index} text={bullet} />)}
            </div>
            {slide.keyPhrase && <div className="key-phrase mt-5">{slide.keyPhrase}</div>}
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            <div>
              <p className="mb-3 text-center text-xs font-bold text-slate-400">弱い1枚目</p>
              <PhoneMock variant="bad" compact headline="お知らせ" />
            </div>
            <div>
              <p className="mb-3 text-center text-xs font-bold text-brand-700">伝わる1枚目</p>
              <PhoneMock variant="good" compact headline="本日入荷" subline="限定カラー、数量限定です" />
            </div>
          </div>
        </div>
      );

    case 'patterns':
      return (
        <div className="flex h-full flex-col justify-center">
          <SlideHeading slide={slide} compact />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {slide.patterns?.map((pattern, index) => (
              <motion.article
                key={pattern.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="surface-card overflow-hidden"
              >
                <div className={`relative aspect-[16/9] p-4 ${index % 2 === 0 ? 'bg-gradient-to-br from-brand-100 to-white' : 'bg-gradient-to-br from-violet-100 to-white'}`}>
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[0.58rem] font-bold text-brand-800 shadow-sm">{pattern.lead}</span>
                  <div className="absolute bottom-4 left-4 h-14 w-11 -rotate-6 rounded bg-white shadow-md" />
                  <div className="absolute bottom-4 left-10 h-16 w-12 rotate-6 rounded bg-brand-600 shadow-lg" />
                  <div className="absolute bottom-5 right-4 w-24">
                    <div className="h-3 rounded bg-slate-900/80" />
                    <div className="mt-2 h-2 w-2/3 rounded bg-slate-500/40" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-base font-bold text-slate-950">{pattern.title}</h3>
                  <ul className="mt-3 space-y-2">
                    {pattern.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
          {slide.keyPhrase && <div className="key-phrase mt-5 text-center">{slide.keyPhrase}</div>}
        </div>
      );

    case 'word-shift':
      return (
        <div className="grid h-full gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <SlideHeading slide={slide} />
            {slide.keyPhrase && <div className="key-phrase mt-7">{slide.keyPhrase}</div>}
          </div>
          <div className="surface-card overflow-hidden">
            <div className="grid grid-cols-[0.82fr_auto_1.18fr] bg-slate-950 px-4 py-3 text-[0.65rem] font-bold uppercase tracking-widest text-white/70">
              <span>弱い言葉</span><span /><span>行動につながる言葉</span>
            </div>
            <div className="divide-y divide-slate-100">
              {slide.wordPairs?.map((pair, index) => (
                <motion.div
                  key={pair.before}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="grid grid-cols-[0.82fr_auto_1.18fr] items-center gap-3 px-4 py-3.5"
                >
                  <span className="text-sm font-medium text-slate-400">{pair.before}</span>
                  <ArrowRight size={15} className="text-brand-400" />
                  <span className="text-sm font-bold text-brand-900">{pair.after}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'profile':
      return (
        <div className="grid h-full gap-8 lg:grid-cols-[0.83fr_1.17fr] lg:items-center">
          <div>
            <SlideHeading slide={slide} compact />
            <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {slide.bullets?.map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-xs font-black text-brand-700">{index + 1}</span>
                  {item}
                </div>
              ))}
            </div>
            {slide.keyPhrase && <div className="key-phrase mt-5">{slide.keyPhrase}</div>}
          </div>
          <ProfileMock />
        </div>
      );

    case 'algorithm':
      return (
        <div className="flex h-full flex-col justify-center">
          <SlideHeading slide={slide} compact />
          <div className="mt-6 grid gap-3 sm:grid-cols-5">
            {slide.cards?.map((card, index) => {
              const Icon = algorithmIcons[index] ?? Eye;
              return (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                  className="surface-card p-4 text-center"
                >
                  <div className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700"><Icon size={20} /></div>
                  <h3 className="mt-3 text-sm font-bold text-slate-950">{card.title}</h3>
                  <p className="mt-1 text-[0.68rem] leading-relaxed text-slate-500">{card.description}</p>
                </motion.article>
              );
            })}
          </div>
          <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-500">
              <span className="mb-2 block text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">一般的</span>
              「北海道フェア開催中！」
            </div>
            <ArrowRight className="mx-auto rotate-90 text-brand-400 lg:rotate-0" size={19} />
            <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm font-bold text-brand-950">
              <span className="mb-2 block text-[0.65rem] font-bold uppercase tracking-wider text-brand-600">保存したくなる</span>
              「北海道フェアで絶対買ってほしい商品5選」
            </div>
          </div>
          {slide.keyPhrase && <div className="key-phrase mt-5 text-center">{slide.keyPhrase}</div>}
        </div>
      );

    case 'ai':
      return (
        <div className="flex h-full flex-col justify-center">
          <SlideHeading slide={slide} compact />
          <div className="mt-5 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <AiList title="AIに任せられること" icon={Bot} items={aiCanDo} tone="brand" />
              <AiList title="店舗から渡すこと" icon={Store} items={aiNeedsFromStore} tone="warm" />
            </div>
            <div className="surface-card p-4 sm:p-5">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-950 p-4 text-white">
                  <div className="mb-3 flex items-center gap-2 text-xs font-bold text-white/60"><PenLine size={15} /> AIへの入力例</div>
                  <p className="text-sm leading-relaxed">
                    北海道限定のお菓子が今日入荷しました。若葉台店の入口近くで展開しています。週末に家族で楽しめる内容としてInstagram投稿文を作ってください。
                  </p>
                </div>
                <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4">
                  <div className="mb-3 flex items-center gap-2 text-xs font-bold text-brand-700"><WandSparkles size={15} /> 出力例</div>
                  <p className="text-sm font-semibold leading-relaxed text-brand-950">
                    北海道旅行気分を、若葉台で。限定お菓子が本日入荷しました。週末のおやつや、ご家族へのちょっとした手土産にもおすすめです。
                  </p>
                  <p className="mt-3 text-xs text-brand-700">📍入口近く・数量限定</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-violet-100 bg-violet-50 px-4 py-3 text-sm font-bold text-violet-900">
                <Sparkles size={19} className="shrink-0 text-violet-600" />
                {slide.keyPhrase}
              </div>
            </div>
          </div>
        </div>
      );

    case 'risk-summary':
      return (
        <div className="flex h-full flex-col justify-center">
          <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700">
                <ShieldCheck size={15} /> OFFICIAL ACCOUNT
              </div>
              <h1 id={`${slide.id}-title`} className="mt-5 text-balance text-[clamp(3rem,7vw,7rem)] font-black leading-[0.92] tracking-[-0.065em] text-slate-950">
                迷ったら<br /><span className="text-brand-700">投稿しない。</span>
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">{slide.description}</p>
            </div>
            <Checklist items={riskChecklist} />
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-4">
            {[
              '来店理由を届ける',
              '毎日の売場をネタにする',
              'AIで伝わる形に整える',
              '最後は人が確認する'
            ].map((item, index) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow-sm">
                <span className="mr-2 text-brand-600">0{index + 1}</span>{item}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl bg-slate-950 px-5 py-4 text-center text-sm font-semibold leading-relaxed text-white sm:text-base">
            {slide.keyPhrase}
          </div>
        </div>
      );
  }
}

function SlideHeading({ slide, compact = false }: { slide: SlideData; compact?: boolean }) {
  return (
    <div>
      <h1 id={`${slide.id}-title`} className={`slide-title ${compact ? 'lg:text-[3.6rem]' : ''}`}>{slide.title}</h1>
      {slide.description && <p className="slide-description mt-4">{slide.description}</p>}
    </div>
  );
}

function BulletRow({ index, text }: { index: number; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold leading-relaxed text-slate-700 shadow-sm"
    >
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-50 text-xs font-black text-brand-700">{index + 1}</span>
      {text}
    </motion.div>
  );
}

function ConnectionCard({ icon: Icon, label, detail }: { icon: typeof Store; label: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-white bg-white/90 p-5 text-center shadow-card">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700"><Icon size={27} /></div>
      <p className="mt-4 text-lg font-bold text-slate-950">{label}</p>
      <p className="mt-2 text-xs leading-relaxed text-slate-500">{detail}</p>
    </div>
  );
}

function RoleCard({
  icon: Icon,
  label,
  audience,
  items,
  tone
}: {
  icon: typeof Store;
  label: string;
  audience: string;
  items: string[];
  tone: 'slate' | 'brand';
}) {
  const brand = tone === 'brand';
  return (
    <article className={`rounded-[1.75rem] border p-5 sm:p-6 ${brand ? 'border-brand-200 bg-brand-50/70' : 'border-slate-200 bg-slate-50/80'}`}>
      <div className="flex items-center justify-between gap-4">
        <div className={`grid h-12 w-12 place-items-center rounded-2xl ${brand ? 'bg-brand-700 text-white' : 'bg-white text-slate-600 shadow-sm'}`}><Icon size={24} /></div>
        <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${brand ? 'bg-white text-brand-800' : 'bg-white text-slate-500'}`}>{audience}</span>
      </div>
      <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">{label}</h3>
      <ul className="mt-5 grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        {items.map((item) => (
          <li key={item} className="rounded-xl bg-white/90 px-3 py-3 text-sm font-semibold leading-snug text-slate-700 shadow-sm">{item}</li>
        ))}
      </ul>
    </article>
  );
}

function AiList({
  title,
  icon: Icon,
  items,
  tone
}: {
  title: string;
  icon: typeof Bot;
  items: string[];
  tone: 'brand' | 'warm';
}) {
  const isBrand = tone === 'brand';
  return (
    <div className={`rounded-2xl border p-4 ${isBrand ? 'border-brand-100 bg-brand-50/75' : 'border-amber-100 bg-amber-50/75'}`}>
      <div className="flex items-center gap-2 text-sm font-bold text-slate-950">
        <Icon size={18} className={isBrand ? 'text-brand-700' : 'text-amber-700'} /> {title}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => <span key={item} className="rounded-full bg-white px-2.5 py-1.5 text-[0.68rem] font-semibold text-slate-600 shadow-sm">{item}</span>)}
      </div>
    </div>
  );
}

export default App;
