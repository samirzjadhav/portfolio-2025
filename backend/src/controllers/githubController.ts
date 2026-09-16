import type { RequestHandler } from "express";
import {
  fetchGitHubDashboard,
  getContributionChartUrl,
} from "../services/index.js";
import type {
  ApiSuccessResponse,
  GitHubContributionChart,
  GitHubDashboard,
} from "../types/index.js";

interface GitHubDashboardPayload extends GitHubDashboard {
  contributionChart: GitHubContributionChart;
}

export const getGitHubDashboard: RequestHandler = async (req, res) => {
  const bypassCache = req.query.refresh === "true";
  const dashboard = await fetchGitHubDashboard(undefined, bypassCache);

  const data: GitHubDashboardPayload = {
    ...dashboard,
    contributionChart: {
      username: dashboard.profile.login,
      chartUrl: getContributionChartUrl(dashboard.profile.login),
    },
  };

  const response: ApiSuccessResponse<GitHubDashboardPayload> = {
    success: true,
    data,
  };

  res.status(200).json(response);
};
