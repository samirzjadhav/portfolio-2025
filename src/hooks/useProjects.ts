import { useCallback, useEffect, useState } from "react";
import { fetchProjects } from "../services/projectService";
import type { Project } from "../types";

type ProjectsStatus = "loading" | "success" | "error";

interface ProjectsState {
  status: ProjectsStatus;
  projects: Project[];
  error: string | null;
}

const initialState: ProjectsState = {
  status: "loading",
  projects: [],
  error: null,
};

interface UseProjectsResult {
  projects: Project[];
  error: string | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isEmpty: boolean;
  retry: () => void;
}

export function useProjects(): UseProjectsResult {
  const [retryKey, setRetryKey] = useState(0);
  const [state, setState] = useState<ProjectsState>(initialState);

  const retry = useCallback(() => {
    setState(initialState);
    setRetryKey((key) => key + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      try {
        const projects = await fetchProjects();

        if (!cancelled) {
          setState({
            status: "success",
            projects,
            error: null,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            status: "error",
            projects: [],
            error:
              error instanceof Error
                ? error.message
                : "Unable to load projects.",
          });
        }
      }
    }

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, [retryKey]);

  return {
    projects: state.projects,
    error: state.error,
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    isEmpty: state.status === "success" && state.projects.length === 0,
    retry,
  };
}
