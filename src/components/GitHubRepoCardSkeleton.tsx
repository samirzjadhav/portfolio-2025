export default function GitHubRepoCardSkeleton() {
  return (
    <div
      className="glass surface-card surface-card--compact p-5 md:p-6 animate-pulse"
      aria-hidden="true"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="h-5 w-2/3 rounded bg-white/10" />
        <div className="h-6 w-16 rounded-full bg-white/10 shrink-0" />
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full rounded bg-white/10" />
        <div className="h-3 w-4/5 rounded bg-white/10" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="h-3 w-12 rounded bg-white/10" />
        <div className="h-3 w-12 rounded bg-white/10" />
        <div className="col-span-2 h-3 w-28 rounded bg-white/10" />
      </div>
      <div className="mt-5 h-4 w-24 rounded bg-white/10" />
    </div>
  );
}
