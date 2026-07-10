import { ArrowRight, Check, X } from 'lucide-react';
import { motion } from 'motion/react';
import type { CompareExample } from '../data/training';

type CompareCardsProps = {
  examples: CompareExample[];
};

export function CompareCards({ examples }: CompareCardsProps) {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {examples.map((example, index) => (
        <motion.article
          key={example.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 * index, duration: 0.36 }}
          className="surface-card overflow-hidden p-4 sm:p-5"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="chip">{example.label}</span>
            <ArrowRight size={16} className="text-brand-500" aria-hidden="true" />
          </div>
          <div className="grid gap-2 sm:grid-cols-[0.82fr_auto_1.18fr] sm:items-stretch">
            <div className="rounded-2xl bg-slate-100 p-3.5 text-sm leading-relaxed text-slate-500">
              <div className="mb-2 flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">
                <X size={13} aria-hidden="true" /> Before
              </div>
              {example.before}
            </div>
            <div className="hidden items-center justify-center text-slate-300 sm:flex">
              <ArrowRight size={17} aria-hidden="true" />
            </div>
            <div className="rounded-2xl border border-brand-100 bg-brand-50 p-3.5 text-sm font-semibold leading-relaxed text-brand-950">
              <div className="mb-2 flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-brand-600">
                <Check size={13} aria-hidden="true" /> After
              </div>
              {example.after}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
