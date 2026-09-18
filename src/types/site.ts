export interface PageMeta {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export type SectionId =
  | "home"
  | "about"
  | "skills"
  | "building"
  | "experience"
  | "stats"
  | "achievements"
  | "education"
  | "portfolio"
  | "contact";

export interface NavAnchorLink {
  name: string;
  href: string;
}

export interface SectionNavLink extends NavAnchorLink {
  section: SectionId;
}
