import type { Project } from "../types";

export interface ProjectCaseStudyContent {
  whatBuilt: {
    lead: string;
    body: string;
  };
  whyBuilt: string;
  howBuilt: string[];
  technicalDecisions: {
    tags: string[];
    /** Second clause from overview when split on " — ", if present in source data. */
    approachNote?: string;
  };
  challenges: string[];
  outcome: string;
}

/**
 * Maps existing project fields into a case-study narrative without rewriting copy.
 * Overview text is split on " — " when present (used consistently in project data).
 */
export function getProjectCaseStudy(project: Project): ProjectCaseStudyContent {
  const [whyBuilt, ...approachParts] = project.overview.split(" — ");
  const approachNote =
    approachParts.length > 0 ? approachParts.join(" — ").trim() : undefined;

  return {
    whatBuilt: {
      lead: project.shortDesc,
      body: project.description,
    },
    whyBuilt: whyBuilt.trim(),
    howBuilt: project.features,
    technicalDecisions: {
      tags: project.tags,
      approachNote,
    },
    challenges: project.challenges,
    outcome: project.outcome,
  };
}
