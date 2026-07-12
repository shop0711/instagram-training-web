import { useState } from 'react';
import { BookOpenCheck, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

type SpeakerNoteProps = {
  children: string;
};

export function SpeakerNote({ children }: SpeakerNoteProps) {
  const [open, setOpen] = useState(false);
  const cues = children.split('。').map((cue) => cue.trim()).filter(Boolean).slice(0, 3);

  return (
    <div className="speaker-note no-print mt-5 max-w-3xl">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-brand-200 hover:text-brand-700"
        aria-expanded={open}
      >
        <BookOpenCheck size={15} aria-hidden="true" />
        補足解説を{open ? '閉じる' : '見る'}
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
            <div className="mt-3 grid gap-2 rounded-lg border border-amber-200/70 bg-amber-50/90 p-3 text-amber-950 sm:grid-cols-3">
              {cues.map((cue, index) => (
                <div key={cue} className="border-l-2 border-amber-400 bg-white/70 px-3 py-2 text-xs leading-relaxed">
                  <span className="mb-1 block text-[9px] font-black text-amber-700">ポイント{index + 1}</span>
                  {cue}。
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
