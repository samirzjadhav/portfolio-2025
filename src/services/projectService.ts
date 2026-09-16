import { projectImagesBySlug } from "../data/projectImages";
import type { Project, ProjectListResponse } from "../types";
import { apiRequest } from "./apiClient";

function resolveProjectImage(project: Project): Project {
  return {
    ...project,
    img: projectImagesBySlug[project.slug] ?? project.img,
  };
}

export async function fetchProjects(): Promise<Project[]> {
  const data = await apiRequest<ProjectListResponse>("/api/projects");
  return data.projects.map(resolveProjectImage);
}

export async function fetchProjectBySlug(slug: string): Promise<Project> {
  const project = await apiRequest<Project>(`/api/projects/${slug}`);
  return resolveProjectImage(project);
}
