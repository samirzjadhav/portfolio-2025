import { useMemo } from "react";
import { achievements } from "../data/achievements";
import { workExperience } from "../data/experience";
import { useGitHubData } from "./useGitHubData";
import { useProjects } from "./useProjects";

export type DeveloperStatStatus = "loading" | "ready" | "unavailable";

export interface DeveloperStat {
  id: string;
  label: string;
  icon: string;
  source: string;
  status: DeveloperStatStatus;
  value: number | null;
}

export function useDeveloperStats(): DeveloperStat[] {
  const {
    profile,
    isLoading: isGitHubLoading,
    isError: isGitHubError,
    isSuccess: isGitHubSuccess,
  } = useGitHubData();
  const {
    projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    isSuccess: isProjectsSuccess,
  } = useProjects();

  return useMemo(() => {
    const githubRepos: DeveloperStat = {
      id: "github-repos",
      label: "GitHub Repositories",
      icon: "bxl-github",
      source: "GitHub profile · public_repos",
      status: isGitHubLoading
        ? "loading"
        : isGitHubError || !isGitHubSuccess || !profile
          ? "unavailable"
          : "ready",
      value:
        isGitHubSuccess && profile ? profile.public_repos : null,
    };

    const githubFollowers: DeveloperStat = {
      id: "github-followers",
      label: "GitHub Followers",
      icon: "bx-group",
      source: "GitHub profile · followers",
      status: isGitHubLoading
        ? "loading"
        : isGitHubError || !isGitHubSuccess || !profile
          ? "unavailable"
          : "ready",
      value: isGitHubSuccess && profile ? profile.followers : null,
    };

    const portfolioProjects: DeveloperStat = {
      id: "portfolio-projects",
      label: "Portfolio Projects",
      icon: "bx-folder-open",
      source: "Portfolio · featured projects",
      status: isProjectsLoading
        ? "loading"
        : isProjectsError
          ? "unavailable"
          : "ready",
      value: isProjectsSuccess ? projects.length : null,
    };

    const experienceStat: DeveloperStat = {
      id: "experience",
      label: "Experience Roles",
      icon: "bx-briefcase",
      source: "Resume · work experience",
      status: "ready",
      value: workExperience.length,
    };

    const achievementsStat: DeveloperStat = {
      id: "achievements",
      label: "Achievements",
      icon: "bx-trophy",
      source: "Portfolio · achievements section",
      status: "ready",
      value: achievements.length,
    };

    return [
      githubRepos,
      githubFollowers,
      portfolioProjects,
      experienceStat,
      achievementsStat,
    ];
  }, [
    isGitHubError,
    isGitHubLoading,
    isGitHubSuccess,
    isProjectsError,
    isProjectsLoading,
    isProjectsSuccess,
    profile,
    projects.length,
  ]);
}
