import type { GitHubProfile, GitHubRepo } from "../types";

export interface LanguageStat {
  language: string;
  count: number;
  percentage: number;
}

export interface DashboardStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  languageCount: number;
  topLanguage: string | null;
  mostStarredRepo: string | null;
}

export function getTopRepos(repos: GitHubRepo[], limit = 5): GitHubRepo[] {
  return [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, limit);
}

export function getLanguageStats(repos: GitHubRepo[]): LanguageStat[] {
  const counts = new Map<string, number>();

  for (const repo of repos) {
    if (!repo.language) continue;
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }

  const total = Array.from(counts.values()).reduce((sum, count) => sum + count, 0);
  if (total === 0) return [];

  return Array.from(counts.entries())
    .map(([language, count]) => ({
      language,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

export function getDashboardStats(
  profile: GitHubProfile,
  repos: GitHubRepo[]
): DashboardStats {
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  const languages = getLanguageStats(repos);
  const topRepos = getTopRepos(repos, 1);

  return {
    publicRepos: profile.public_repos,
    followers: profile.followers,
    following: profile.following,
    totalStars,
    totalForks,
    languageCount: languages.length,
    topLanguage: languages[0]?.language ?? null,
    mostStarredRepo: topRepos[0]?.name ?? null,
  };
}

export const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572a5",
  Java: "#b07219",
  React: "#61dafb",
  "Vue": "#41b883",
  Go: "#00add8",
  Rust: "#dea584",
  Shell: "#89e051",
  PHP: "#4f5d95",
  Ruby: "#701516",
  Swift: "#fa7343",
  Kotlin: "#a97bff",
};

export function getLanguageColor(language: string): string {
  return LANGUAGE_COLORS[language] ?? "#c770c7";
}

export function getRepoLanguages(repos: GitHubRepo[]): string[] {
  const languages = new Set<string>();

  for (const repo of repos) {
    if (repo.language) {
      languages.add(repo.language);
    }
  }

  return Array.from(languages).sort((a, b) => a.localeCompare(b));
}

export function filterRepos(
  repos: GitHubRepo[],
  query: string,
  language: string | null
): GitHubRepo[] {
  const normalizedQuery = query.trim().toLowerCase();

  return repos.filter((repo) => {
    if (language && repo.language !== language) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchable = `${repo.name} ${repo.description ?? ""}`.toLowerCase();
    return searchable.includes(normalizedQuery);
  });
}
