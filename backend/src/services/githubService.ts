import { env } from "../config/index.js";
import { AppError } from "../middleware/index.js";
import type {
  GitHubContributionCalendar,
  GitHubContributionDay,
  GitHubContributionLevel,
  GitHubDashboard,
  GitHubProfile,
  GitHubRepo,
} from "../types/index.js";

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

interface ContributionCacheEntry {
  expiresAt: number;
  data: GitHubContributionCalendar;
}

const contributionCache = new Map<string, ContributionCacheEntry>();

const CONTRIBUTIONS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              contributionLevel
              date
            }
          }
        }
      }
    }
  }
`;

interface GraphQLContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: GitHubContributionLevel;
}

interface GraphQLContributionsResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: Array<{ contributionDays: GraphQLContributionDay[] }>;
        };
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
  message?: string;
}

function getProfileUrl(username: string): string {
  return `https://api.github.com/users/${username}`;
}

function getReposUrl(username: string): string {
  return `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`;
}

function getGitHubAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };

  if (env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function fetchGitHubJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: getGitHubAuthHeaders(),
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

function readCachedContributions(
  username: string
): GitHubContributionCalendar | null {
  const cached = contributionCache.get(username);
  if (!cached) return null;

  if (Date.now() >= cached.expiresAt) {
    contributionCache.delete(username);
    return null;
  }

  return cached.data;
}

function writeCachedContributions(
  username: string,
  data: GitHubContributionCalendar
): void {
  contributionCache.set(username, {
    expiresAt: Date.now() + CACHE_TTL_MS,
    data,
  });
}

function normalizeContributionDay(
  day: GraphQLContributionDay
): GitHubContributionDay {
  return {
    date: day.date,
    contributionCount: day.contributionCount,
    contributionLevel: day.contributionLevel,
  };
}

export async function fetchContributionCalendar(
  username: string = env.GITHUB_USERNAME,
  bypassCache = false
): Promise<GitHubContributionCalendar> {
  if (!bypassCache) {
    const cached = readCachedContributions(username);
    if (cached) return cached;
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      ...getGitHubAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: { username },
    }),
  });

  const body = (await response.json()) as GraphQLContributionsResponse;

  if (!response.ok) {
    throw new AppError(
      response.status === 403 ? 503 : 502,
      body.message ??
        `GitHub GraphQL request failed (${response.status})`
    );
  }

  if (body.errors?.length) {
    throw new AppError(502, body.errors[0]?.message ?? "GitHub GraphQL error");
  }

  const calendar =
    body.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar || !Array.isArray(calendar.weeks)) {
    throw new AppError(404, `GitHub user "${username}" was not found.`);
  }

  const data: GitHubContributionCalendar = {
    username,
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks.map((week) => ({
      contributionDays: week.contributionDays.map(normalizeContributionDay),
    })),
  };

  writeCachedContributions(username, data);
  return data;
}
