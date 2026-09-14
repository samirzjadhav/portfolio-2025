import type { Project } from "../types";

export type TechUsageSource =
  | "feature"
  | "challenge"
  | "overview"
  | "description"
  | "outcome";

export interface TechUsageEntry {
  id: string;
  source: TechUsageSource;
  sourceLabel: string;
  text: string;
}

export interface ProjectTechProfile {
  tag: string;
  usages: TechUsageEntry[];
}

const SOURCE_LABELS: Record<TechUsageSource, string> = {
  feature: "How I built it",
  challenge: "Challenges",
  overview: "Why I built it",
  description: "What I built",
  outcome: "Outcome",
};

/** Search terms derived from existing tag labels — no new project copy. */
const TAG_SEARCH_TERMS: Record<string, string[]> = {
  React: ["react"],
  Firebase: ["firebase"],
  Tailwind: ["tailwind"],
  Stripe: ["stripe"],
  HTML: ["html", "semantic html"],
  CSS: ["css", "styling", "typography"],
  JS: ["javascript", "vanilla js", " js"],
  "Context API": ["context api", "context"],
  API: ["api", "rest api"],
  Design: ["design", "visual", "presentation"],
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function getTagSearchTerms(tag: string): string[] {
  const preset = TAG_SEARCH_TERMS[tag];
  if (preset) return preset;
  return [tag.toLowerCase()];
}

export function textMatchesTag(text: string, tag: string): boolean {
  const normalized = text.toLowerCase();
  return getTagSearchTerms(tag).some((term) => normalized.includes(term));
}

function collectProjectTexts(project: Project): TechUsageEntry[] {
  const entries: TechUsageEntry[] = [];

  const push = (source: TechUsageSource, text: string, index: number) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    entries.push({
      id: `${source}-${index}`,
      source,
      sourceLabel: SOURCE_LABELS[source],
      text: trimmed,
    });
  };

  push("description", project.description, 0);
  push("overview", project.overview, 0);
  project.features.forEach((text, index) => push("feature", text, index));
  project.challenges.forEach((text, index) => push("challenge", text, index));
  push("outcome", project.outcome, 0);

  return entries;
}

export function getProjectTechProfiles(project: Project): ProjectTechProfile[] {
  const corpus = collectProjectTexts(project);

  return project.tags.map((tag) => ({
    tag,
    usages: corpus.filter((entry) => textMatchesTag(entry.text, tag)),
  }));
}

export function getAllTechUsageEntries(project: Project): TechUsageEntry[] {
  return collectProjectTexts(project);
}

export interface TextHighlightSegment {
  text: string;
  highlighted: boolean;
}

/** Split copy into segments for inline <mark> styling. */
export function getHighlightedSegments(
  text: string,
  tag: string
): TextHighlightSegment[] {
  const terms = getTagSearchTerms(tag)
    .map((term) => term.trim())
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

  if (terms.length === 0) {
    return [{ text, highlighted: false }];
  }

  const pattern = new RegExp(
    `(${terms.map(escapeRegExp).join("|")})`,
    "gi"
  );
  const parts = text.split(pattern);

  if (parts.length <= 1) {
    return [{ text, highlighted: false }];
  }

  return parts
    .filter((part) => part.length > 0)
    .map((part) => ({
      text: part,
      highlighted: terms.some(
        (term) => part.toLowerCase() === term.toLowerCase()
      ),
    }));
}
