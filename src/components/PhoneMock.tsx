import { Bookmark, Heart, MessageCircle, MoreHorizontal, Send, Sparkles } from 'lucide-react';

type PhoneMockProps = {
  headline?: string;
  subline?: string;
  badge?: string;
  variant?: 'hero' | 'good' | 'bad' | 'event';
  compact?: boolean;
};

export function PhoneMock({
  headline = '北海道フェア開催中',
  subline = '家族で楽しみたい、おすすめ5選',
  badge = '若葉台店',
  variant = 'hero',
  compact = false
}: PhoneMockProps) {
  const isBad = variant === 'bad';
  const isEvent = variant === 'event';

  return (
    <div
      className={`mx-auto w-full max-w-[310px] rounded-[2.4rem] border-[7px] border-slate-900 bg-slate-950 p-1.5 shadow-phone ${
        compact ? 'max-w-[250px]' : ''
      }`}
      aria-label="Instagram投稿のスマートフォンモック"
    >
      <div className="overflow-hidden rounded-[1.85rem] bg-white">
        <div className="flex h-7 items-center justify-between px-4 text-[0.58rem] font-bold text-slate-800">
          <span>9:41</span>
          <span className="tracking-widest">● ● ▰</span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-violet-600 p-[2px]">
              <div className="grid h-full w-full place-items-center rounded-full bg-white text-[0.55rem] font-black text-brand-800">C4</div>
            </div>
            <div>
              <p className="text-[0.63rem] font-bold text-slate-900">coachandfour_wakabadai</p>
              <p className="text-[0.52rem] text-slate-400">{badge}</p>
            </div>
          </div>
          <MoreHorizontal size={16} className="text-slate-500" aria-hidden="true" />
        </div>

        <div
          className={`relative aspect-square overflow-hidden ${
            isBad
              ? 'bg-slate-100'
              : isEvent
                ? 'bg-gradient-to-br from-brand-700 via-brand-600 to-violet-500'
                : 'bg-gradient-to-br from-sky-100 via-white to-violet-100'
          }`}
        >
          {isBad ? (
            <div className="flex h-full flex-col items-center justify-center gap-5 p-7 text-center">
              <div className="h-24 w-20 rotate-3 rounded-lg border border-slate-300 bg-white shadow-sm" />
              <p className="text-[0.75rem] font-medium text-slate-400">お知らせ</p>
              <div className="absolute bottom-3 right-3 rounded bg-slate-200 px-2 py-1 text-[0.46rem] text-slate-400">文字が小さい</div>
            </div>
          ) : (
            <div className="relative flex h-full flex-col justify-between p-5">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/85 px-2.5 py-1 text-[0.55rem] font-bold text-brand-800 shadow-sm backdrop-blur">
                  {isEvent ? '今週末開催' : '本日入荷'}
                </span>
                <Sparkles size={18} className={isEvent ? 'text-white/80' : 'text-violet-400'} aria-hidden="true" />
              </div>

              <div className="relative mx-auto grid h-28 w-36 place-items-center">
                <div className={`absolute h-24 w-20 -rotate-12 rounded-lg shadow-lg ${isEvent ? 'bg-white/80' : 'bg-amber-200'}`} />
                <div className={`absolute h-28 w-20 rotate-6 rounded-lg border-4 shadow-xl ${isEvent ? 'border-white/70 bg-amber-300' : 'border-white bg-brand-600'}`}>
                  <div className="mt-5 space-y-2 px-2">
                    <div className="h-2 rounded-full bg-white/75" />
                    <div className="h-8 rounded bg-white/20" />
                    <div className="h-2 w-2/3 rounded-full bg-white/60" />
                  </div>
                </div>
              </div>

              <div className={isEvent ? 'text-white' : 'text-slate-950'}>
                <p className="text-[1.35rem] font-black leading-[1.05] tracking-[-0.04em]">{headline}</p>
                <p className={`mt-2 text-[0.64rem] font-semibold ${isEvent ? 'text-white/80' : 'text-slate-600'}`}>{subline}</p>
              </div>
            </div>
          )}
        </div>

        <div className="px-3 pb-3 pt-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-slate-800">
              <Heart size={18} aria-hidden="true" />
              <MessageCircle size={18} aria-hidden="true" />
              <Send size={17} aria-hidden="true" />
            </div>
            <Bookmark size={18} aria-hidden="true" />
          </div>
          <div className="mt-2 h-2 w-24 rounded-full bg-slate-800" />
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100" />
          <div className="mt-1.5 h-1.5 w-4/5 rounded-full bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
