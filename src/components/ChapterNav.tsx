import { BookOpen, X } from 'lucide-react';
import type { SlideData } from '../data/training';
import { chapters } from '../data/training';

type ChapterNavProps = {
  slides: SlideData[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  open?: boolean;
  onClose?: () => void;
  variant?: 'rail' | 'dialog';
};

export function ChapterNav({
  slides,
  currentIndex,
  onNavigate,
  open = true,
  onClose,
  variant = 'rail'
}: ChapterNavProps) {
  if (!open) return null;

  const list = (
    <nav aria-label="研修資料の目次" className="space-y-6">
      {chapters.map((chapter) => {
        const chapterSlides = slides
          .map((slide, index) => ({ slide, index }))
          .filter(({ slide }) => slide.chapter === chapter.id);

        return (
          <section key={chapter.id} aria-labelledby={`${chapter.id}-nav-title`}>
            <div className="mb-2 flex items-center justify-between gap-3 px-2">
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-brand-600">
                  {chapter.label}
                </p>
                <h2 id={`${chapter.id}-nav-title`} className="mt-1 text-sm font-semibold leading-snug text-slate-900">
                  {chapter.title}
                </h2>
              </div>
              <span className="text-[0.65rem] font-semibold text-slate-400">{chapter.range}</span>
            </div>
            <div className="space-y-1">
              {chapterSlides.map(({ slide, index }) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => {
                    onNavigate(index);
                    onClose?.();
                  }}
                  aria-current={index === currentIndex ? 'page' : undefined}
                  className={`group flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left text-xs transition ${
                    index === currentIndex
                      ? 'bg-brand-50 font-semibold text-brand-800'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[0.65rem] font-bold tabular-nums ${
                      index === currentIndex
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                    }`}
                  >
                    {String(slide.number).padStart(2, '0')}
                  </span>
                  <span className="line-clamp-2 leading-snug">{slide.title}</span>
                </button>
              ))}
            </div>
          </section>
        );
      })}
    </nav>
  );

  if (variant === 'rail') {
    return (
      <aside className="no-print hidden w-[260px] shrink-0 overflow-y-auto rounded-[1.75rem] border border-white/80 bg-white/75 p-4 shadow-card backdrop-blur-xl xl:block">
        <div className="mb-5 flex items-center gap-2 px-2 text-sm font-bold text-slate-900">
          <BookOpen size={17} className="text-brand-600" aria-hidden="true" />
          目次
        </div>
        {list}
      </aside>
    );
  }

  return (
    <div className="no-print fixed inset-0 z-50 bg-slate-950/35 p-3 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="目次">
      <div className="ml-auto h-full w-full max-w-md overflow-y-auto rounded-[1.75rem] bg-white p-5 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <BookOpen size={18} className="text-brand-600" aria-hidden="true" />
            研修の目次
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
            aria-label="目次を閉じる"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        {list}
      </div>
    </div>
  );
}
