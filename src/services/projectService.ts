import staticProjects from "../data/project";
import { projectImagesBySlug } from "../data/projectImages";
import { isBackendConfigured } from "../config/api";
import type { Project, ProjectListResponse } from "../types";
import { apiRequest, ApiError } from "./apiClient";

function resolveProjectImage(project: Project): Project {
  return {
    ...project,
    img: projectImagesBySlug[project.slug] ?? project.img,
  };
}

function getStaticProjects(): Project[] {
  return staticProjects.map(resolveProjectImage);
}

function findStaticProject(slug: string): Project | undefined {
  return getStaticProjects().find((project) => project.slug === slug);
}

export async function fetchProjects(): Promise<Project[]> {
  if (!isBackendConfigured()) {
    return getStaticProjects();
  }

  try {
    const data = await apiRequest<ProjectListResponse>("/api/projects");
    return data.projects.map(resolveProjectImage);
  } catch {
    return getStaticProjects();
  }
}

export async function fetchProjectBySlug(slug: string): Promise<Project> {
  if (!isBackendConfigured()) {
    const project = findStaticProject(slug);
    if (!project) {
      throw new ApiError("Project not found", 404);
    }
    return project;
  }

  try {
    const project = await apiRequest<Project>(`/api/projects/${slug}`);
    return resolveProjectImage(project);
  } catch (error) {
    const fallback = findStaticProject(slug);
    if (fallback) return fallback;
    throw error;
  }
}
