import { useCallback, useEffect, useState } from "react";
import { ApiError } from "../services/apiClient";
import { fetchProjectBySlug } from "../services/projectService";
import type { Project } from "../types";

type ProjectStatus = "loading" | "success" | "error";

interface ProjectState {
  status: ProjectStatus;
  project: Project | null;
  error: string | null;
}

const loadingState: ProjectState = {
  status: "loading",
  project: null,
  error: null,
};

const notFoundState: ProjectState = {
  status: "error",
  project: null,
  error: "Project not found.",
};

interface UseProjectResult {
  project: Project | null;
  error: string | null;
  isLoading: boolean;
  isError: boolean;
  isNotFound: boolean;
  retry: () => void;
}

function getInitialState(slug: string | undefined): ProjectState {
  return slug?.trim() ? loadingState : notFoundState;
}

export function useProject(slug: string | undefined): UseProjectResult {
  const normalizedSlug = slug?.trim() ?? "";
  const [retryKey, setRetryKey] = useState(0);
  const [state, setState] = useState<ProjectState>(() =>
    getInitialState(normalizedSlug)
  );

  const retry = useCallback(() => {
    if (!normalizedSlug) return;
    setState(loadingState);
    setRetryKey((key) => key + 1);
  }, [normalizedSlug]);

  useEffect(() => {
    if (!normalizedSlug) return;

    let cancelled = false;

    async function loadProject() {
      try {
        const project = await fetchProjectBySlug(normalizedSlug);

        if (!cancelled) {
          setState({
            status: "success",
            project,
            error: null,
          });
        }
      } catch (error) {
        if (!cancelled) {
          const isNotFound =
            error instanceof ApiError && error.status === 404;
          const message =
            error instanceof Error ? error.message : "Unable to load project.";

          setState({
            status: "error",
            project: null,
            error: isNotFound ? "Project not found." : message,
          });
        }
      }
    }

    loadProject();

    return () => {
      cancelled = true;
    };
  }, [normalizedSlug, retryKey]);

  return {
    project: state.project,
    error: state.error,
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isNotFound: state.status === "error" && state.error === "Project not found.",
    retry,
  };
}
