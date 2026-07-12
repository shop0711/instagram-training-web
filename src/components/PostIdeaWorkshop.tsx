import { useMemo, useState } from 'react';
import { Check, Clipboard, RotateCcw, Sparkles, WandSparkles } from 'lucide-react';
import { assetById } from '../data/assetManifest';
import {
  postTypes,
  samplePostIdea,
  timingReasons,
  type PostIdeaInput,
  type PostType,
  type TimingReason,
} from '../data/postTemplates';
import { generatePostCopy, type GeneratedPostCopy } from '../utils/generatePostCopy';

const emptyIdea: PostIdeaInput = {
  type: '新商品',
  name: '',
  reason: '本日入荷',
  location: '',
  audience: '',
  feature: '',
};

export function PostIdeaWorkshop() {
  const [input, setInput] = useState<PostIdeaInput>(emptyIdea);
  const [result, setResult] = useState<GeneratedPostCopy | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');
  const media = assetById.img_4824.media ?? assetById.img_4824.path;

  const update = <Key extends keyof PostIdeaInput>(key: Key, value: PostIdeaInput[Key]) => {
    setInput((current) => ({ ...current, [key]: value }));
    setError('');
  };

  const generate = () => {
    if (!input.name.trim()) {
      setError('商品名・イベント名を入力してください。');
      setResult(null);
      return;
    }
    setResult(generatePostCopy(input));
    setError('');
  };

  const copy = async (label: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    window.setTimeout(() => setCopied(''), 1600);
  };

  const reset = () => {
    setInput(emptyIdea);
    setResult(null);
    setError('');
    setCopied('');
  };

  return (
    <div className="post-workshop grid h-full min-h-0 gap-4 overflow-y-auto pr-1 lg:grid-cols-[1.05fr_.95fr]" aria-label="投稿案作成フォーム">
      <form
        className="space-y-4 border border-slate-200 bg-slate-50 p-4 sm:p-5"
        onSubmit={(event) => { event.preventDefault(); generate(); }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-[10px] font-black text-brand-700">30秒ワーク</p>
            <p className="text-sm font-black text-slate-950">店舗にある事実を6つに整理</p>
          </div>
          <button type="button" onClick={() => { setInput(samplePostIdea); setResult(null); setError(''); }} className="inline-flex min-h-11 items-center gap-2 border border-brand-200 bg-white px-3 text-xs font-black text-brand-800">
            <WandSparkles size={15} /> サンプルを入力
          </button>
        </div>

        <ChoiceField label="1. 投稿内容の種類" options={postTypes} value={input.type} onChange={(value) => update('type', value as PostType)} />

        <TextField label="2. 商品名・イベント名" required value={input.name} placeholder="北海道限定ヨーグルッペ" error={error} onChange={(value) => update('name', value)} />

        <ChoiceField label="3. 今見る理由" options={timingReasons} value={input.reason} onChange={(value) => update('reason', value as TimingReason)} />

        <div className="grid gap-3 sm:grid-cols-2">
          <TextField label="4. どこにありますか？" value={input.location} placeholder="マルシェ売場入口" onChange={(value) => update('location', value)} />
          <TextField label="5. 誰におすすめですか？" value={input.audience} placeholder="北海道商品が好きな方" onChange={(value) => update('audience', value)} />
        </div>
        <TextField label="6. 特徴・おすすめポイント（任意）" value={input.feature} placeholder="爽やかな味わいで、休憩時間にもおすすめ" onChange={(value) => update('feature', value)} />

        <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-brand-700 px-5 text-sm font-black text-white shadow-lg shadow-brand-700/20 hover:bg-brand-800">
          <Sparkles size={17} /> 投稿案を作る
        </button>
      </form>

      <div className="min-h-[420px]" aria-live="polite">
        {result ? (
          <PostResultCard result={result} media={media} copied={copied} onCopy={copy} onReset={reset} />
        ) : (
          <div className="flex h-full min-h-[420px] flex-col justify-center border border-brand-200 bg-brand-50 p-5">
            <p className="text-xs font-black text-brand-700">BEFORE → AFTER</p>
            <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="border border-slate-200 bg-white p-4 text-center text-sm font-bold text-slate-400">お知らせ</div>
              <span className="font-black text-brand-500">→</span>
              <div className="bg-brand-700 p-4 text-center text-sm font-black text-white">本日入荷｜北海道限定</div>
            </div>
            <p className="mt-5 text-xl font-black leading-snug text-slate-950">完璧な広告ではなく、<br />事実を整理した投稿を。</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">入力内容はブラウザ内だけで処理され、外部へ送信されません。</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ChoiceField({ label, options, value, onChange }: { label: string; options: readonly string[]; value: string; onChange: (value: string) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-black text-slate-800">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            type="button"
            key={option}
            onClick={() => onChange(option)}
            aria-pressed={value === option}
            className={`min-h-11 rounded-full border px-3 text-xs font-bold transition ${value === option ? 'border-brand-700 bg-brand-700 text-white' : 'border-slate-200 bg-white text-slate-600'}`}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function TextField({ label, value, placeholder, onChange, required = false, error = '' }: { label: string; value: string; placeholder: string; onChange: (value: string) => void; required?: boolean; error?: string }) {
  const id = useMemo(() => `post-field-${label.replace(/[^0-9]/g, '') || 'feature'}`, [label]);
  return (
    <label htmlFor={id} className="block text-xs font-black text-slate-800">
      {label}
      <input
        id={id}
        value={value}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`mt-2 min-h-12 w-full rounded-md border bg-white px-3 text-base font-medium text-slate-900 outline-none placeholder:text-sm placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 ${error ? 'border-rose-500' : 'border-slate-200'}`}
      />
      {error && <span id={`${id}-error`} role="alert" className="mt-1 block text-xs font-bold text-rose-600">{error}</span>}
    </label>
  );
}

function PostResultCard({ result, media, copied, onCopy, onReset }: { result: GeneratedPostCopy; media: string; copied: string; onCopy: (label: string, text: string) => void; onReset: () => void }) {
  const items = [
    { label: 'フィード見出し', text: result.headline },
    { label: 'キャプション', text: result.caption },
    { label: 'ストーリーズ文', text: result.story },
  ];

  return (
    <article className="overflow-hidden border-[5px] border-slate-950 bg-white shadow-phone">
      <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
        <span className="h-8 w-8 rounded-full bg-brand-700" />
        <div><p className="text-xs font-black">coachandfour_wakabadai</p><p className="text-[9px] text-slate-500">投稿案プレビュー</p></div>
        {copied && <span className="ml-auto flex items-center gap-1 bg-emerald-50 px-2 py-1 text-[10px] font-black text-emerald-700"><Check size={12} />コピーしました</span>}
      </div>
      <div className="relative aspect-[16/9] overflow-hidden text-white">
        <img src={media} alt="北海道限定ヨーグルッペの実在投稿素材" width="900" height="900" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/10 to-transparent" />
        <span className="absolute left-4 top-4 bg-amber-300 px-2 py-1 text-[9px] font-black text-slate-950">教材用・生成イメージ</span>
        <p className="absolute inset-x-4 bottom-4 text-xl font-black leading-tight sm:text-2xl">{result.headline}</p>
      </div>
      <div className="max-h-[360px] space-y-3 overflow-y-auto p-4">
        {items.map((item) => (
          <section key={item.label} className="border border-slate-200 bg-slate-50 p-3">
            <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-xs font-black text-brand-800">{item.label}</h3>
              <button type="button" onClick={() => onCopy(item.label, item.text)} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1 whitespace-nowrap border border-slate-200 bg-white px-3 text-[10px] font-black text-slate-700"><Clipboard size={13} />{item.label}をコピー</button>
            </div>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-700">{item.text}</p>
          </section>
        ))}
        <p className="border-l-4 border-emerald-500 bg-emerald-50 p-3 text-sm font-black leading-relaxed text-emerald-950">情報を少し整理しただけで、“お知らせ”が来店理由のある投稿に変わりました。</p>
        <button type="button" onClick={onReset} className="inline-flex min-h-11 w-full items-center justify-center gap-2 border border-slate-300 bg-white text-xs font-black text-slate-700"><RotateCcw size={15} />入力をリセット</button>
      </div>
    </article>
  );
}
