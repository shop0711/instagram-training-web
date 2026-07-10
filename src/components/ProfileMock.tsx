import { BookOpen, CalendarDays, MapPin, Pin, Sparkles } from 'lucide-react';

const highlights = [
  { label: '店舗案内', icon: MapPin },
  { label: 'イベント', icon: CalendarDays },
  { label: 'おすすめ', icon: Sparkles },
  { label: 'アクセス', icon: BookOpen }
];

export function ProfileMock() {
  return (
    <div className="relative mx-auto w-full max-w-[430px] rounded-[2rem] border-[6px] border-slate-900 bg-white p-5 shadow-phone">
      <div className="mb-5 flex items-start gap-5">
        <div className="relative grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-violet-600 p-[3px]">
          <div className="grid h-full w-full place-items-center rounded-full bg-white text-lg font-black text-brand-800">C4</div>
          <Label className="-left-5 -top-4" text="1. 画像" />
        </div>
        <div className="min-w-0 flex-1 pt-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-bold text-slate-950">コーチャンフォー若葉台店</h3>
            <Label className="-right-4 -top-3" text="2. 名前欄" />
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            {['投稿 128', 'フォロワー 3,240', 'フォロー 86'].map((item) => (
              <span key={item} className="text-[0.64rem] font-semibold text-slate-700">{item}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative rounded-xl bg-slate-50 p-3 text-[0.72rem] leading-relaxed text-slate-700">
        書籍・文具・音楽・食品・カフェを一度に楽しめる大型複合店。新商品、イベント、若葉台店の「今」をお届けします。
        <Label className="-right-5 top-1/2 -translate-y-1/2" text="3. 自己紹介" />
      </div>

      <div className="relative mt-5 flex gap-3 overflow-hidden">
        {highlights.map(({ label, icon: Icon }) => (
          <div key={label} className="shrink-0 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border-2 border-white bg-brand-50 ring-1 ring-slate-200">
              <Icon size={18} className="text-brand-700" aria-hidden="true" />
            </div>
            <p className="mt-1 text-[0.55rem] font-semibold text-slate-600">{label}</p>
          </div>
        ))}
        <Label className="-right-5 bottom-2" text="5. ハイライト" />
      </div>

      <div className="relative mt-5 grid grid-cols-3 gap-1">
        {[0, 1, 2].map((item) => (
          <div key={item} className="relative aspect-square rounded-md bg-gradient-to-br from-brand-100 to-violet-100">
            <Pin size={13} className="absolute right-1.5 top-1.5 text-brand-700" aria-hidden="true" />
            <div className="absolute inset-x-2 bottom-2 h-2 rounded-full bg-white/80" />
          </div>
        ))}
        <Label className="-bottom-8 left-1/2 -translate-x-1/2" text="4. 固定投稿" />
      </div>
    </div>
  );
}

type LabelProps = {
  text: string;
  className: string;
};

function Label({ text, className }: LabelProps) {
  return (
    <span className={`absolute z-10 whitespace-nowrap rounded-full bg-brand-700 px-2 py-1 text-[0.56rem] font-bold text-white shadow-lg ${className}`}>
      {text}
    </span>
  );
}
