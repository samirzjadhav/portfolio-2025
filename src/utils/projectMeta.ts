import { getCanonicalUrl } from "../config/site";
import type { PageMeta } from "../types";
import type { Project } from "../types/project";

export function getProjectPageMeta(project: Project): PageMeta {
  return {
    title: `${project.title} — Samir Jadhav`,
    description: project.description,
    path: `/projects/${project.slug}`,
  };
}

export function getProjectCanonicalUrl(slug: string): string {
  return getCanonicalUrl(`/projects/${slug}`);
}
