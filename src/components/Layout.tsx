import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Expand,
  MonitorPlay,
  Rows3,
  Shrink
} from 'lucide-react';
import type { SlideData } from '../data/training';
import { ChapterNav } from './ChapterNav';
import { ProgressBar } from './ProgressBar';

type LayoutProps = {
  children: ReactNode;
  slides: SlideData[];
  currentIndex: number;
  mode: 'presentation' | 'reader';
  onModeChange: (mode: 'presentation' | 'reader') => void;
  onNavigate: (index: number) => void;
};

export function Layout({
  children,
  slides,
  currentIndex,
  mode,
  onModeChange,
  onNavigate
}: LayoutProps) {
  const [tocOpen, setTocOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(Boolean(document.fullscreenElement));
  const current = slides[currentIndex];
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < slides.length - 1;

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
      setFullscreen(Boolean(document.fullscreenElement));
    } catch {
      setFullscreen(false);
    }
  };

  return (
    <div className="min-h-dvh">
      <header className="no-print sticky top-0 z-40 border-b border-white/80 bg-[#f6f8fb]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[71px] max-w-[1800px] items-center gap-3 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setTocOpen(true)}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 shadow-sm transition hover:border-brand-200 hover:text-brand-700 xl:hidden"
            aria-label="目次を開く"
          >
            <BookOpen size={16} aria-hidden="true" />
            <span className="hidden sm:inline">目次</span>
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="hidden rounded-full bg-brand-700 px-2 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-white sm:inline-flex">
                Instagram Training
              </span>
              <p className="truncate text-xs font-bold text-slate-900 sm:text-sm">{current.chapterTitle}</p>
            </div>
            <p className="mt-0.5 truncate text-[0.65rem] text-slate-500">{current.title}</p>
          </div>

          <div className="hidden items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm md:flex">
            <button
              type="button"
              onClick={() => onModeChange('presentation')}
              className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-bold transition ${
                mode === 'presentation' ? 'bg-brand-700 text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
              aria-pressed={mode === 'presentation'}
            >
              <MonitorPlay size={14} aria-hidden="true" /> 発表
            </button>
            <button
              type="button"
              onClick={() => onModeChange('reader')}
              className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-bold transition ${
                mode === 'reader' ? 'bg-brand-700 text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
              aria-pressed={mode === 'reader'}
            >
              <Rows3 size={14} aria-hidden="true" /> 閲覧
            </button>
          </div>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="hidden h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-brand-200 hover:text-brand-700 sm:grid"
            aria-label={fullscreen ? '全画面表示を終了' : '全画面表示'}
          >
            {fullscreen ? <Shrink size={17} aria-hidden="true" /> : <Expand size={17} aria-hidden="true" />}
          </button>
        </div>
        <ProgressBar current={currentIndex + 1} total={slides.length} />
      </header>

      <main className="mx-auto flex max-w-[1800px] gap-5 px-3 pb-28 pt-4 sm:px-6 lg:px-8 lg:pt-5">
        <ChapterNav
          slides={slides}
          currentIndex={currentIndex}
          onNavigate={onNavigate}
          variant="rail"
        />
        <div className={`print-stack min-w-0 flex-1 ${mode === 'reader' ? 'space-y-6' : ''}`}>{children}</div>
      </main>

      <ChapterNav
        slides={slides}
        currentIndex={currentIndex}
        onNavigate={onNavigate}
        open={tocOpen}
        onClose={() => setTocOpen(false)}
        variant="dialog"
      />

      <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-white/80 bg-[#f6f8fb]/92 px-3 py-3 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onNavigate(currentIndex - 1)}
            disabled={!canGoBack}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:border-brand-200 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="前のセクションへ"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            <span className="hidden sm:inline">戻る</span>
          </button>

          <button
            type="button"
            onClick={() => setTocOpen(true)}
            className="min-w-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-center shadow-sm"
            aria-label="目次を開く"
          >
            <p className="text-[0.6rem] font-bold uppercase tracking-widest text-brand-600">
              {current.chapterLabel}
            </p>
            <p className="max-w-[42vw] truncate text-xs font-semibold text-slate-800 sm:max-w-md sm:text-sm">
              {currentIndex + 1} / {slides.length} · {current.title}
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate(currentIndex + 1)}
            disabled={!canGoForward}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-700 px-4 text-sm font-bold text-white shadow-lg shadow-brand-700/20 transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="次のセクションへ"
          >
            <span className="hidden sm:inline">次へ</span>
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
