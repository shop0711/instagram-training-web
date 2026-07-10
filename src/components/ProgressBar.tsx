type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.max(0, Math.min(100, (current / total) * 100));

  return (
    <div className="h-1 w-full overflow-hidden bg-slate-200/70" aria-hidden="true">
      <div
        className="h-full rounded-r-full bg-gradient-to-r from-brand-500 via-brand-600 to-violet-500 transition-[width] duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
