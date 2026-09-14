import type { ProjectGalleryImage } from "../types/gallery";
import type { Project } from "../types/project";

/**
 * Optional extra gallery images keyed by project slug.
 * Falls back to the primary project image when no extras exist.
 */
const projectGalleryBySlug: Record<string, ProjectGalleryImage[]> = {};

export function getProjectGalleryImages(project: Project): ProjectGalleryImage[] {
  const configured = projectGalleryBySlug[project.slug];
  if (configured && configured.length > 0) {
    return configured;
  }

  return [
    {
      src: project.img,
      alt: `${project.title} project screenshot`,
      caption: `${project.title} — project preview`,
    },
  ];
}
