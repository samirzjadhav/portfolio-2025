import { useCallback, useEffect, useState } from "react";
import { fetchGitHubDashboard } from "../services";
import type { GitHubDataState, UseGitHubDataResult } from "../types";

const initialState: GitHubDataState = {
  status: "loading",
  profile: null,
  repos: [],
  error: null,
};

export function useGitHubData(): UseGitHubDataResult {
  const [retryKey, setRetryKey] = useState(0);
  const [state, setState] = useState<GitHubDataState>(initialState);

  const retry = useCallback(() => {
    setState(initialState);
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

    loadGitHubData();

    return () => {
      cancelled = true;
    };
  }, [retryKey]);

  return {
    profile: state.profile,
    repos: state.repos,
    error: state.error,
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    isEmpty: state.status === "success" && state.repos.length === 0,
    retry,
  };
}
