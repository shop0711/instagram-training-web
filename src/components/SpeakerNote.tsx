import { useState } from 'react';
import { ChevronDown, Mic2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

type SpeakerNoteProps = {
  children: string;
};

export function SpeakerNote({ children }: SpeakerNoteProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="speaker-note no-print mt-5 max-w-3xl">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-brand-200 hover:text-brand-700"
        aria-expanded={open}
      >
        <Mic2 size={15} aria-hidden="true" />
        講師メモを{open ? '閉じる' : '表示'}
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-2xl border border-amber-200/70 bg-amber-50/85 px-4 py-3 text-sm leading-relaxed text-amber-950">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
