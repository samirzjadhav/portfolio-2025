import { useCallback, useEffect, useState } from "react";
import {
  fetchContributionCalendar,
  fetchGitHubDashboard,
} from "../services";
import type { GitHubDataState, UseGitHubDataResult } from "../types";
import type {
  GitHubContributionCalendar,
  GitHubContributionsStatus,
} from "../types/github";

const initialState: GitHubDataState = {
  status: "loading",
  profile: null,
  repos: [],
  error: null,
};

interface ContributionsState {
  status: GitHubContributionsStatus;
  data: GitHubContributionCalendar | null;
  error: string | null;
}

const initialContributionsState: ContributionsState = {
  status: "loading",
  data: null,
  error: null,
};

export function useGitHubData(): UseGitHubDataResult {
  const [retryKey, setRetryKey] = useState(0);
  const [state, setState] = useState<GitHubDataState>(initialState);
  const [contributionsState, setContributionsState] =
    useState<ContributionsState>(initialContributionsState);

  const retry = useCallback(() => {
    setState(initialState);
    setContributionsState(initialContributionsState);
    setRetryKey((key) => key + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadGitHubData() {
      try {
        const { profile, repos } = await fetchGitHubDashboard({
          bypassCache: retryKey > 0,
        });

        if (!cancelled) {
          setState({
            status: "success",
            profile,
            repos,
            error: null,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            status: "error",
            profile: null,
            repos: [],
            error:
              error instanceof Error
                ? error.message
                : "Unable to load GitHub dashboard data.",
          });
        }
      }
    }

    async function loadContributions() {
      try {
        const data = await fetchContributionCalendar({
          bypassCache: retryKey > 0,
        });

        if (!cancelled) {
          setContributionsState({
            status: "success",
            data,
            error: null,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setContributionsState({
            status: "error",
            data: null,
            error:
              error instanceof Error
                ? error.message
                : "Unable to load contribution activity.",
          });
        }
      }
    }

    loadGitHubData();
    loadContributions();

    return () => {
      cancelled = true;
    };
  }, [retryKey]);

  return {
    profile: state.profile,
    repos: state.repos,
    contributions: contributionsState.data,
    contributionsError: contributionsState.error,
    error: state.error,
    isLoading: state.status === "loading",
    isContributionsLoading: contributionsState.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    isEmpty: state.status === "success" && state.repos.length === 0,
    retry,
  };
}
