import { env } from "../config/index.js";
import { AppError } from "../middleware/index.js";
import type { GitHubDashboard, GitHubProfile, GitHubRepo } from "../types/index.js";

const CONTRIBUTION_CHART_BASE_URL = "https://ghchart.rshah.org/6f5cff";
const CACHE_TTL_MS = 5 * 60 * 1000;

interface GitHubErrorResponse {
  message?: string;
}

interface CacheEntry {
  expiresAt: number;
  data: GitHubDashboard;
}

const dashboardCache = new Map<string, CacheEntry>();

function getProfileUrl(username: string): string {
  return `https://api.github.com/users/${username}`;
}

function getReposUrl(username: string): string {
  return `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`;
}

async function fetchGitHubJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  const data = (await response.json()) as T & GitHubErrorResponse;

  if (!response.ok) {
    throw new AppError(
      response.status === 404 ? 404 : 502,
      data.message ?? `GitHub API request failed (${response.status})`
    );
  }

  return data;
}

function readCachedDashboard(username: string): GitHubDashboard | null {
  const cached = dashboardCache.get(username);
  if (!cached) return null;

  if (Date.now() >= cached.expiresAt) {
    dashboardCache.delete(username);
    return null;
  }

  return cached.data;
}

function writeCachedDashboard(username: string, data: GitHubDashboard): void {
  dashboardCache.set(username, {
    expiresAt: Date.now() + CACHE_TTL_MS,
    data,
  });
}

export async function fetchGitHubDashboard(
  username: string = env.GITHUB_USERNAME,
  bypassCache = false
): Promise<GitHubDashboard> {
  if (!bypassCache) {
    const cached = readCachedDashboard(username);
    if (cached) return cached;
  }

  const [profile, repos] = await Promise.all([
    fetchGitHubJson<GitHubProfile>(getProfileUrl(username)),
    fetchGitHubJson<GitHubRepo[]>(getReposUrl(username)),
  ]);

  if (!profile.login) {
    throw new AppError(502, "GitHub profile data was invalid or incomplete.");
  }

  if (!Array.isArray(repos)) {
    throw new AppError(502, "GitHub repository data was invalid or incomplete.");
  }

  const data: GitHubDashboard = { profile, repos };
  writeCachedDashboard(username, data);
  return data;
}

export function getContributionChartUrl(
  username: string = env.GITHUB_USERNAME
): string {
  return `${CONTRIBUTION_CHART_BASE_URL}/${username}`;
}
