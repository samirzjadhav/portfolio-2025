export interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  html_url: string;
  homepage: string | null;
}

export interface GitHubDashboard {
  profile: GitHubProfile;
  repos: GitHubRepo[];
}

export type GitHubContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

export interface GitHubContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: GitHubContributionLevel;
}

export interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[];
}

export interface GitHubContributionCalendar {
  username: string;
  totalContributions: number;
  weeks: GitHubContributionWeek[];
}

export type GitHubContributionsStatus = "loading" | "success" | "error";

export type GitHubDataStatus = "loading" | "success" | "error";

export interface GitHubDataState {
  status: GitHubDataStatus;
  profile: GitHubProfile | null;
  repos: GitHubRepo[];
  error: string | null;
}

export interface UseGitHubDataResult {
  profile: GitHubProfile | null;
  repos: GitHubRepo[];
  contributions: GitHubContributionCalendar | null;
  contributionsError: string | null;
  error: string | null;
  isLoading: boolean;
  isContributionsLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isEmpty: boolean;
  retry: () => void;
}

export interface GitHubCacheEntry {
  expiresAt: number;
  data: GitHubDashboard;
}

export interface FetchGitHubDashboardOptions {
  bypassCache?: boolean;
}
