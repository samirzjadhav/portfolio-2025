import { GitHubContributionHeatmapSkeleton } from "./GitHubContributionHeatmap";
import GitHubHeroSkeleton from "./GitHubHeroSkeleton";
import GitHubRepoCardSkeleton from "./GitHubRepoCardSkeleton";

function StatCardSkeleton() {
  return (
    <div className="glass surface-card surface-card--compact p-3.5 sm:p-4 md:p-5 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-3 w-16 rounded bg-white/10" />
        <div className="h-5 w-5 rounded bg-white/10" />
      </div>
      <div className="mt-2 h-7 sm:h-8 w-12 rounded bg-white/10" />
    </div>
  );
}

function PanelSkeleton() {
  return (
    <div className="glass surface-card p-4 sm:p-5 md:p-6 animate-pulse h-full">
      <div className="h-5 w-32 rounded bg-white/10" />
      <div className="mt-2 h-3 w-48 rounded bg-white/10" />
      <div className="mt-5 space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-3 w-full rounded bg-white/10" />
            <div className="h-2 w-full rounded bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GitHubDashboardSkeleton() {
  return (
    <div
      className="flex flex-col gap-8 md:gap-10 w-full"
      aria-busy="true"
      aria-label="Loading GitHub dashboard"
    >
      <GitHubHeroSkeleton />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <StatCardSkeleton key={index} />
        ))}
      </div>

      <section className="glass surface-card p-4 md:p-5 animate-pulse">
        <div className="h-5 w-44 rounded bg-white/10 mb-4" />
        <div className="rounded-lg border border-white/10 bg-[#0a0612] p-3 md:p-4">
          <GitHubContributionHeatmapSkeleton />
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        <PanelSkeleton />
        <PanelSkeleton />
      </div>

      <section>
        <div className="h-5 w-40 rounded bg-white/10 mb-4 animate-pulse" />
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <GitHubRepoCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
