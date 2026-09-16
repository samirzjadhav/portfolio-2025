import { projects } from "../data/projects.js";
import { AppError } from "../middleware/index.js";
import type { Project, ProjectListResponse } from "../types/project.js";

export function getAllProjects(): ProjectListResponse {
  return {
    count: projects.length,
    projects,
  };
}

export function getProjectBySlug(slug: string): Project {
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    throw new AppError(404, `Project not found: ${slug}`);
  }

  return project;
}
