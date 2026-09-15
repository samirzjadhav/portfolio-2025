import { motion, type Variants } from "framer-motion";
import type { DashboardStats } from "../utils/githubDashboard";

interface GitHubStatsPanelProps {
  stats: DashboardStats;
  variants?: Variants;
}

export default function GitHubStatsPanel({
  stats,
  variants,
}: GitHubStatsPanelProps) {
  const items = [
    { label: "Total stars", value: stats.totalStars, icon: "bx-star" },
    { label: "Total forks", value: stats.totalForks, icon: "bx-git-branch" },
    { label: "Languages used", value: stats.languageCount, icon: "bx-code-alt" },
    { label: "Top language", value: stats.topLanguage ?? "—", icon: "bx-layer" },
    {
      label: "Most starred",
      value: stats.mostStarredRepo ?? "—",
      icon: "bx-trophy",
    },
  ];

  return (
    <motion.section
      variants={variants}
      className="glass surface-card p-4 sm:p-5 md:p-6 h-full"
      aria-labelledby="github-stats-heading"
    >
      <h3
        id="github-stats-heading"
        className="flex items-center gap-2 text-base sm:text-lg font-semibold text-white"
      >
        <i className="bx bx-bar-chart-alt-2 text-accent" aria-hidden="true" />
        GitHub Stats
      </h3>

      <ul className="mt-4 sm:mt-5 space-y-2 sm:space-y-3">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.03] px-3 py-2 sm:py-2.5"
          >
            <span className="flex items-center gap-2 text-xs sm:text-sm text-white/65 min-w-0">
              <i
                className={`bx ${item.icon} text-accent shrink-0`}
                aria-hidden="true"
              />
              {item.label}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white truncate">
              {item.value}
            </span>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}
