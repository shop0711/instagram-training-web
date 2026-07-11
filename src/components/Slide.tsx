import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import type { SlideData } from '../data/training';
import { SpeakerNote } from './SpeakerNote';

type SlideProps = {
  slide: SlideData;
  children: ReactNode;
  mode: 'presentation' | 'reader';
};

export function Slide({ slide, children, mode }: SlideProps) {
  return (
    <motion.section
      id={slide.id}
      data-slide-number={slide.number}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className={`slide-shell relative isolate overflow-hidden border border-white/80 bg-white shadow-soft ${
        mode === 'presentation'
          ? 'h-[calc(100dvh-158px)] min-h-[560px] rounded-lg'
          : 'min-h-[78vh] scroll-mt-24 rounded-lg md:min-h-[720px]'
      }`}
      aria-labelledby={`${slide.id}-title`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1 bg-gradient-to-r from-brand-700 via-sky-400 to-amber-400" />
      <div className="flex h-full min-h-inherit flex-col px-5 py-5 sm:px-7 sm:py-6 lg:px-9 lg:py-7 xl:px-11">
        <div className="mb-3 flex items-center justify-between gap-4">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            {slide.eyebrow}
          </span>
          <span className="text-xs font-semibold tabular-nums text-slate-400">
            {String(slide.number).padStart(2, '0')}
          </span>
        </div>

        <div className="min-h-0 flex-1">{children}</div>

        <SpeakerNote>{slide.speakerNote}</SpeakerNote>
      </div>
    </motion.section>
  );
}
