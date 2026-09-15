import { getLanguageColor } from "../utils/githubDashboard";

interface GitHubRepoToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  languages: string[];
  selectedLanguage: string | null;
  onLanguageChange: (language: string | null) => void;
  totalCount: number;
  filteredCount: number;
}

export default function GitHubRepoToolbar({
  searchQuery,
  onSearchChange,
  languages,
  selectedLanguage,
  onLanguageChange,
  totalCount,
  filteredCount,
}: GitHubRepoToolbarProps) {
  const searchId = "github-repo-search";

  return (
    <div
      className="mb-4 sm:mb-5 space-y-3 sm:space-y-4"
      role="search"
      aria-label="Filter public repositories"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1 min-w-0">
          <label htmlFor={searchId} className="sr-only">
            Search repositories by name or description
          </label>
          <i
            className="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id={searchId}
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search repositories…"
            autoComplete="off"
            spellCheck={false}
            className="
              github-repo-search w-full rounded-lg border border-white/10
              bg-white/[0.04] py-2.5 pl-10 pr-10 text-base sm:text-sm text-white
              placeholder:text-white/35
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60
            "
          />
          {searchQuery.length > 0 && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="
                absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5
                text-white/45 hover:text-white/80
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60
              "
              aria-label="Clear search"
            >
              <i className="bx bx-x text-lg" aria-hidden="true" />
            </button>
          )}
        </div>

        <p
          className="text-xs text-white/45 shrink-0 sm:text-right"
          aria-live="polite"
          aria-atomic="true"
        >
          Showing {filteredCount} of {totalCount}
        </p>
      </div>

      {languages.length > 0 && (
        <div className="github-language-filters -mx-1 px-1 overflow-x-auto pb-1">
          <div
            className="flex items-center gap-2 min-w-max"
            role="group"
            aria-label="Filter by language"
          >
            <FilterChip
              label="All"
              active={selectedLanguage === null}
              onClick={() => onLanguageChange(null)}
            />
            {languages.map((language) => (
              <FilterChip
                key={language}
                label={language}
                active={selectedLanguage === language}
                color={getLanguageColor(language)}
                onClick={() =>
                  onLanguageChange(
                    selectedLanguage === language ? null : language
                  )
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface FilterChipProps {
  label: string;
  active: boolean;
  color?: string;
  onClick: () => void;
}

function FilterChip({ label, active, color, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`
        inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5
        text-xs font-medium whitespace-nowrap transition-colors
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60
        ${
          active
            ? "border-accent/50 bg-accent/15 text-white"
            : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white/80"
        }
      `}
    >
      {color && (
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
      )}
      {label}
    </button>
  );
}
