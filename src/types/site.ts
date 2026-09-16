export interface PageMeta {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export type SectionId = "home" | "about" | "skills" | "portfolio" | "contact";

export interface NavAnchorLink {
  name: string;
  href: string;
}

export interface SectionNavLink extends NavAnchorLink {
  section: SectionId;
}
