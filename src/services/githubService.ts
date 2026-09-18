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

export const GITHUB_USERNAME = "samirzjadhav";

const PROFILE_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
const REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`;
const CONTRIBUTION_CHART_BASE_URL = "https://ghchart.rshah.org/6f5cff";
const CACHE_KEY = "github-dashboard-cache";
const CONTRIBUTIONS_CACHE_KEY = "github-contributions-cache";
const CACHE_TTL_MS = 5 * 60 * 1000;

interface ContributionsCacheEntry {
  expiresAt: number;
  data: GitHubContributionCalendar;
}

interface GitHubErrorResponse {
  message?: string;
}

interface PublicContributionEntry {
  date: string;
  count: number;
  level: number;
}

interface PublicContributionsResponse {
  total: { lastYear: number };
  contributions: PublicContributionEntry[];
}

const CONTRIBUTION_LEVELS: GitHubContributionLevel[] = [
  "NONE",
  "FIRST_QUARTILE",
  "SECOND_QUARTILE",
  "THIRD_QUARTILE",
  "FOURTH_QUARTILE",
];

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

async function fetchContributionCalendarFromPublicApi(
  username: string
): Promise<GitHubContributionCalendar> {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
  );

  if (!response.ok) {
    throw new Error(
      `Contribution data request failed (${response.status}). Please try again.`
    );
  }

  const body = (await response.json()) as PublicContributionsResponse;

  if (!Array.isArray(body.contributions)) {
    throw new Error("Contribution data was invalid or incomplete.");
  }

  const days: GitHubContributionDay[] = body.contributions.map((entry) => ({
    date: entry.date,
    contributionCount: entry.count,
    contributionLevel:
      CONTRIBUTION_LEVELS[entry.level] ?? "NONE",
  }));

  const weeks = [];
  for (let index = 0; index < days.length; index += 7) {
    weeks.push({ contributionDays: days.slice(index, index + 7) });
  }

  return {
    username,
    totalContributions: body.total.lastYear,
    weeks,
  };
}

export async function fetchContributionCalendar({
  bypassCache = false,
}: FetchGitHubDashboardOptions = {}): Promise<GitHubContributionCalendar> {
  if (!bypassCache) {
    const cached = readCachedContributions();
    if (cached) return cached;
  }

  const data = await fetchContributionCalendarFromPublicApi(GITHUB_USERNAME);
  writeCachedContributions(data);
  return data;
}
