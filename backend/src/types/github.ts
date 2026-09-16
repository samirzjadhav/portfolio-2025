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
