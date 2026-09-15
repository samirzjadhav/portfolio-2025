import { motion, type Variants } from "framer-motion";
import {
  getLanguageColor,
  type LanguageStat,
} from "../utils/githubDashboard";
import GitHubInlineState from "./GitHubInlineState";

interface GitHubLanguagesPanelProps {
  languages: LanguageStat[];
  variants?: Variants;
}

export default function GitHubLanguagesPanel({
  languages,
  variants,
}: GitHubLanguagesPanelProps) {
  return (
    <motion.section
      variants={variants}
      className="glass surface-card p-4 sm:p-5 md:p-6 h-full"
      aria-labelledby="github-languages-heading"
    >
      <h3
        id="github-languages-heading"
        className="flex items-center gap-2 text-base sm:text-lg font-semibold text-white"
      >
        <i className="bx bx-pie-chart-alt text-accent" aria-hidden="true" />
        Languages
      </h3>
      <p className="text-xs text-white/45 mt-1">
        Based on public repositories shown
      </p>

      {languages.length === 0 ? (
        <div className="mt-4">
          <GitHubInlineState
            variant="empty"
            icon="bx-code-alt text-white/40"
            title="No language data"
            message="Language breakdown appears when repositories include a primary language."
          />
        </div>
      ) : (
        <ul className="mt-4 sm:mt-5 space-y-3 sm:space-y-4">
          {languages.map((item) => (
            <li key={item.language}>
              <div className="flex items-center justify-between text-sm mb-1.5 gap-2">
                <span className="text-white/80 truncate">{item.language}</span>
                <span className="text-white/45 shrink-0">{item.percentage}%</span>
              </div>
              <div className="progress h-2" role="presentation">
                <span
                  className="block h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: getLanguageColor(item.language),
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </motion.section>
  );
}
