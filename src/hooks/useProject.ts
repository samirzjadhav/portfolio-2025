import { useMemo } from "react";
import { getProjectBySlug } from "../services/projectService";
import { ApiError } from "../services/apiClient";
import type { Project } from "../types";

interface UseProjectResult {
  project: Project | null;
  error: string | null;
  isLoading: boolean;
  isError: boolean;
  isNotFound: boolean;
  retry: () => void;
}

export function useProject(slug: string | undefined): UseProjectResult {
  const normalizedSlug = slug?.trim() ?? "";

  return useMemo(() => {
    if (!normalizedSlug) {
      return {
        project: null,
        error: "Project not found.",
        isLoading: false,
        isError: true,
        isNotFound: true,
        retry: () => {},
      };
    }

    try {
      const project = getProjectBySlug(normalizedSlug);
      return {
        project,
        error: null,
        isLoading: false,
        isError: false,
        isNotFound: false,
        retry: () => {},
      };
    } catch (error) {
      const isNotFound =
        error instanceof ApiError && error.status === 404;
      const message =
        error instanceof Error ? error.message : "Unable to load project.";

      return {
        project: null,
        error: isNotFound ? "Project not found." : message,
        isLoading: false,
        isError: true,
        isNotFound,
        retry: () => {},
      };
    }
  }, [normalizedSlug]);
}
