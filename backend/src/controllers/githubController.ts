import type { RequestHandler } from "express";
import { env } from "../config/index.js";
import {
  fetchContributionCalendar,
  fetchGitHubDashboard,
  getContributionChartUrl,
} from "../services/index.js";
import type {
  ApiSuccessResponse,
  GitHubContributionCalendar,
  GitHubContributionChart,
  GitHubDashboard,
} from "../types/index.js";

interface GitHubDashboardPayload extends GitHubDashboard {
  contributionChart: GitHubContributionChart;
}

export const getGitHubDashboard: RequestHandler = async (req, res, next) => {
  try {
    const bypassCache =
      env.NODE_ENV === "development" && req.query.refresh === "true";
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
  } catch (error) {
    next(error);
  }
};

export const getGitHubContributions: RequestHandler = async (req, res, next) => {
  try {
    const bypassCache =
      env.NODE_ENV === "development" && req.query.refresh === "true";
    const calendar = await fetchContributionCalendar(undefined, bypassCache);

    const response: ApiSuccessResponse<GitHubContributionCalendar> = {
      success: true,
      data: calendar,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
