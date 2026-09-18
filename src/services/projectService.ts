import staticProjects from "../data/project";
import { projectImagesBySlug } from "../data/projectImages";
import type { Project } from "../types";
import { ApiError } from "./apiClient";

let cachedProjects: Project[] | null = null;

function buildProjectList(): Project[] {
  return staticProjects.map((project) => ({
    ...project,
    img: projectImagesBySlug[project.slug] ?? project.img,
  }));
}

/** Portfolio projects are static content — always served from the frontend bundle. */
export function getProjects(): Project[] {
  if (!cachedProjects) {
    cachedProjects = buildProjectList();
  }
  return cachedProjects;
}

export function getProjectBySlug(slug: string): Project {
  const project = getProjects().find((entry) => entry.slug === slug);
  if (!project) {
    throw new ApiError("Project not found", 404);
  }
  return project;
}

/** @deprecated Prefer getProjects() — kept for existing async call sites. */
export async function fetchProjects(): Promise<Project[]> {
  return getProjects();
}

/** @deprecated Prefer getProjectBySlug() — kept for existing async call sites. */
export async function fetchProjectBySlug(slug: string): Promise<Project> {
  return getProjectBySlug(slug);
}
