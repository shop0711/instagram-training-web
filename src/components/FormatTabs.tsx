import { useState } from 'react';
import { Grid3X3, Play, Radio, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { FormatItem } from '../data/training';

type FormatTabsProps = {
  items: FormatItem[];
};

const icons = {
  feed: Grid3X3,
  stories: Radio,
  reels: Play
};

export function FormatTabs({ items }: FormatTabsProps) {
  const [activeId, setActiveId] = useState<FormatItem['id']>(items[0]?.id ?? 'feed');
  const active = items.find((item) => item.id === activeId) ?? items[0];

  if (!active) return null;

  const ActiveIcon = icons[active.id];

  return (
    <div className="surface-card overflow-hidden p-3 sm:p-5">
      <div className="grid grid-cols-3 gap-2 rounded-2xl bg-slate-100 p-1.5" role="tablist" aria-label="投稿形式">
        {items.map((item) => {
          const Icon = icons[item.id];
          const selected = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveId(item.id)}
              className={`flex min-h-12 items-center justify-center gap-2 rounded-xl px-2 text-xs font-bold transition sm:text-sm ${
                selected
                  ? 'bg-white text-brand-800 shadow-sm'
                  : 'text-slate-500 hover:bg-white/60 hover:text-slate-800'
              }`}
            >
              <Icon size={17} aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="min-h-[280px] p-3 pt-5 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.24 }}
            className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center"
          >
            <div>
              <div className="mb-4 inline-grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                <ActiveIcon size={27} aria-hidden="true" />
              </div>
              <p className="eyebrow">{active.purpose}</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{active.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{active.summary}</p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
                <Sparkles size={14} aria-hidden="true" />
                強み：{active.accent}
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {active.items.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-sm font-semibold text-slate-700"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
