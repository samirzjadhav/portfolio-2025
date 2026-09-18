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

export interface GitHubContributionChart {
  username: string;
  chartUrl: string;
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
