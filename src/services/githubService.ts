import type {
  FetchGitHubDashboardOptions,
  GitHubCacheEntry,
  GitHubDashboard,
  GitHubProfile,
  GitHubRepo,
} from "../types";

export const GITHUB_USERNAME = "samirzjadhav";

const PROFILE_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
const REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`;
const CONTRIBUTION_CHART_BASE_URL = "https://ghchart.rshah.org/6f5cff";
const CACHE_KEY = "github-dashboard-cache";
const CACHE_TTL_MS = 5 * 60 * 1000;

interface GitHubErrorResponse {
  message?: string;
}

async function fetchGitHubJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const data = (await response.json()) as T & GitHubErrorResponse;

  if (!response.ok) {
    const message =
      data.message || `GitHub API request failed (${response.status})`;
    throw new Error(message);
  }

  return data;
}

function readCachedDashboard(): GitHubDashboard | null {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { expiresAt, data } = JSON.parse(cached) as GitHubCacheEntry;
    if (Date.now() >= expiresAt) return null;

    return data;
  } catch {
    return null;
  }
}

function writeCachedDashboard(data: GitHubDashboard): void {
  const entry: GitHubCacheEntry = {
    expiresAt: Date.now() + CACHE_TTL_MS,
    data,
  };
  sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry));
}

export async function fetchGitHubDashboard({
  bypassCache = false,
}: FetchGitHubDashboardOptions = {}): Promise<GitHubDashboard> {
  if (!bypassCache) {
    const cached = readCachedDashboard();
    if (cached) return cached;
  }

  const [profile, repos] = await Promise.all([
    fetchGitHubJson<GitHubProfile>(PROFILE_URL),
    fetchGitHubJson<GitHubRepo[]>(REPOS_URL),
  ]);

  if (!profile.login) {
    throw new Error("GitHub profile data was invalid or incomplete.");
  }

  if (!Array.isArray(repos)) {
    throw new Error("GitHub repository data was invalid or incomplete.");
  }

  const data: GitHubDashboard = { profile, repos };
  writeCachedDashboard(data);
  return data;
}

export function getContributionChartUrl(
  username: string = GITHUB_USERNAME
): string {
  return `${CONTRIBUTION_CHART_BASE_URL}/${username}`;
}
