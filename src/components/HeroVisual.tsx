import { Clock3, MapPin, MousePointerClick } from 'lucide-react';
import { motion } from 'motion/react';
import { PhoneMock } from './PhoneMock';

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[520px] py-4">
      <div className="absolute inset-x-10 top-16 h-64 rounded-full bg-instagram-soft blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: 0 }}
        animate={{ opacity: 1, y: 0, rotate: -3 }}
        transition={{ delay: 0.15, duration: 0.55 }}
        className="absolute left-0 top-14 z-10 hidden rounded-2xl border border-white/80 bg-white/90 p-3 shadow-card backdrop-blur sm:block"
      >
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <MapPin size={15} className="text-brand-600" />
          若葉台店から発信
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: 0 }}
        animate={{ opacity: 1, y: 0, rotate: 3 }}
        transition={{ delay: 0.28, duration: 0.55 }}
        className="absolute bottom-20 right-0 z-10 hidden rounded-2xl border border-white/80 bg-white/90 p-3 shadow-card backdrop-blur sm:block"
      >
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <MousePointerClick size={15} className="text-violet-500" />
          Webで操作しながら学ぶ
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-0"
      >
        <PhoneMock />
      </motion.div>
      <div className="relative z-10 mx-auto mt-4 flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm">
        <Clock3 size={14} className="text-brand-600" aria-hidden="true" />
        約30分
      </div>
    </div>
  );
}
