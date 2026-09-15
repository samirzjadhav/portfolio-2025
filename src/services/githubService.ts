import type {
  FetchGitHubDashboardOptions,
  GitHubCacheEntry,
  GitHubContributionCalendar,
  GitHubContributionDay,
  GitHubContributionLevel,
  GitHubDashboard,
  GitHubProfile,
  GitHubRepo,
} from "../types";
import { apiRequest, ApiError } from "./apiClient";

export const GITHUB_USERNAME = "samirzjadhav";

const PROFILE_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
const REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`;
const CONTRIBUTION_CHART_BASE_URL = "https://ghchart.rshah.org/6f5cff";
const CACHE_KEY = "github-dashboard-cache";
const CONTRIBUTIONS_CACHE_KEY = "github-contributions-cache";
const CACHE_TTL_MS = 5 * 60 * 1000;

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

interface ContributionsCacheEntry {
  expiresAt: number;
  data: GitHubContributionCalendar;
}

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

function readCachedContributions(): GitHubContributionCalendar | null {
  try {
    const cached = sessionStorage.getItem(CONTRIBUTIONS_CACHE_KEY);
    if (!cached) return null;

    const { expiresAt, data } = JSON.parse(cached) as ContributionsCacheEntry;
    if (Date.now() >= expiresAt) return null;

    return data;
  } catch {
    return null;
  }
}

function writeCachedContributions(data: GitHubContributionCalendar): void {
  const entry: ContributionsCacheEntry = {
    expiresAt: Date.now() + CACHE_TTL_MS,
    data,
  };
  sessionStorage.setItem(CONTRIBUTIONS_CACHE_KEY, JSON.stringify(entry));
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

async function fetchContributionCalendarFromGraphQL(
  username: string
): Promise<GitHubContributionCalendar> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: { username },
    }),
  });

  const body = (await response.json()) as GraphQLContributionsResponse;

  if (!response.ok) {
    throw new Error(
      body.message ??
        `GitHub GraphQL request failed (${response.status})`
    );
  }

  if (body.errors?.length) {
    throw new Error(body.errors[0]?.message ?? "GitHub GraphQL error");
  }

  const calendar =
    body.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar || !Array.isArray(calendar.weeks)) {
    throw new Error(`GitHub user "${username}" was not found.`);
  }

  return {
    username,
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks.map((week) => ({
      contributionDays: week.contributionDays.map(normalizeContributionDay),
    })),
  };
}

export async function fetchContributionCalendar({
  bypassCache = false,
}: FetchGitHubDashboardOptions = {}): Promise<GitHubContributionCalendar> {
  if (!bypassCache) {
    const cached = readCachedContributions();
    if (cached) return cached;
  }

  try {
    const data = await apiRequest<GitHubContributionCalendar>(
      bypassCache
        ? "/api/github/contributions?refresh=true"
        : "/api/github/contributions"
    );
    writeCachedContributions(data);
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    const data = await fetchContributionCalendarFromGraphQL(GITHUB_USERNAME);
    writeCachedContributions(data);
    return data;
  }
}
