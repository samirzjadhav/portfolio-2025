import { useId } from "react";
import { motion, type Variants } from "framer-motion";
import type { GitHubRepo } from "../types";
import { getLanguageColor } from "../utils/githubDashboard";
import { useMotionVariants } from "../motion";

interface GitHubRepoCardProps {
  repo: GitHubRepo;
  rank?: number;
  variants?: Variants;
}

function formatUpdatedDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function GitHubRepoCard({
  repo,
  rank,
  variants,
}: GitHubRepoCardProps) {
  const { hover } = useMotionVariants();
  const titleId = useId();

  const language = repo.language ?? "Unknown";
  const languageColor = getLanguageColor(language);
  const updatedLabel = formatUpdatedDate(repo.updated_at);

  return (
    <motion.article
      variants={variants}
      whileHover={hover.repoCard()}
      aria-labelledby={titleId}
      className="h-full"
    >
      <div
        className="flex h-full flex-col glass surface-card surface-card--compact p-5 md:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            {rank !== undefined && (
              <span className="text-xs font-bold text-accent">#{rank}</span>
            )}
            <h4
              id={titleId}
              className={`font-semibold text-white break-words ${rank !== undefined ? "mt-1" : ""}`}
            >
              {repo.name}
            </h4>
          </div>

          <span
            className="chip text-xs shrink-0 inline-flex items-center gap-1.5"
            title={`Primary language: ${language}`}
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full shrink-0"
              style={{ backgroundColor: languageColor }}
            />
            {language}
          </span>
        </div>

        <p className="mt-3 text-sm text-white/65 leading-relaxed line-clamp-2 flex-1">
          {repo.description || "No description provided."}
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/55">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Stars</dt>
            <dd className="flex items-center gap-1">
              <i className="bx bx-star text-accent" aria-hidden="true" />
              {repo.stargazers_count}
            </dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Forks</dt>
            <dd className="flex items-center gap-1">
              <i className="bx bx-git-branch text-accent" aria-hidden="true" />
              {repo.forks_count}
            </dd>
          </div>
          <div className="col-span-2 flex items-center gap-1.5">
            <dt className="sr-only">Last updated</dt>
            <dd className="flex items-center gap-1">
              <i className="bx bx-time-five text-accent" aria-hidden="true" />
              Updated {updatedLabel}
            </dd>
          </div>
        </dl>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${repo.name} on GitHub (opens in new tab)`}
          className="
            mt-5 inline-flex items-center gap-2 self-start
            text-sm font-medium text-accent
            focus-visible:underline
          "
        >
          View on GitHub
          <motion.span
            aria-hidden="true"
            className="inline-flex"
            initial={false}
            whileHover={hover.nudge(4)}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <i className="bx bx-right-arrow-alt text-lg" />
          </motion.span>
        </a>
      </div>
    </motion.article>
  );
}
