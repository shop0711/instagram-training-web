import { useMemo, useState } from 'react';
import { Check, RotateCcw, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

type ChecklistProps = {
  items: string[];
};

export function Checklist({ items }: ChecklistProps) {
  const [checked, setChecked] = useState<Set<number>>(() => new Set());
  const complete = checked.size === items.length;
  const progress = useMemo(() => (items.length ? Math.round((checked.size / items.length) * 100) : 0), [checked, items.length]);

  const toggle = (index: number) => {
    setChecked((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="surface-card p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-950">投稿前チェック</p>
          <p className="mt-1 text-xs text-slate-500">クリックして確認できます</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-black tabular-nums text-brand-700">{progress}%</p>
          <button
            type="button"
            onClick={() => setChecked(new Set())}
            className="mt-1 inline-flex items-center gap-1 text-[0.65rem] font-semibold text-slate-400 hover:text-slate-700"
            aria-label="チェックをリセット"
          >
            <RotateCcw size={11} aria-hidden="true" /> リセット
          </button>
        </div>
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        {items.map((item, index) => {
          const selected = checked.has(index);
          return (
            <button
              key={item}
              type="button"
              onClick={() => toggle(index)}
              aria-pressed={selected}
              className={`flex min-h-12 items-center gap-3 rounded-2xl border p-3 text-left text-sm font-medium leading-snug transition ${
                selected
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                  : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:border-brand-200 hover:bg-brand-50/50'
              }`}
            >
              <motion.span
                animate={{ scale: selected ? [1, 1.18, 1] : 1 }}
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg border ${
                  selected ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 bg-white text-transparent'
                }`}
              >
                <Check size={15} aria-hidden="true" />
              </motion.span>
              {item}
            </button>
          );
        })}
      </div>

      <div
        className={`mt-4 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold ${
          complete ? 'bg-amber-50 text-amber-950' : 'bg-slate-100 text-slate-600'
        }`}
        aria-live="polite"
      >
        <ShieldAlert size={18} className={complete ? 'text-amber-600' : 'text-slate-400'} aria-hidden="true" />
        {complete ? '確認後も、迷ったら相談。' : '「投稿OK」ではなく、迷ったら相談。'}
      </div>
    </div>
  );
}
