import { useCallback, useState } from "react";
import { getProjects } from "../services/projectService";
import type { Project } from "../types";

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
  const projects = getProjects();

  const retry = useCallback(() => {
    setRetryKey((key) => key + 1);
  }, []);

  void retryKey;

  return {
    projects,
    error: null,
    isLoading: false,
    isError: false,
    isSuccess: true,
    isEmpty: projects.length === 0,
    retry,
  };
}
