import type { NavAnchorLink, SectionNavLink } from "../types";

export const footerNavLinks: NavAnchorLink[] = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

export const sectionNavLinks: SectionNavLink[] = [
  { name: "About", href: "#about", section: "about" },
  { name: "Skills", href: "#skills", section: "skills" },
  { name: "Projects", href: "#portfolio", section: "portfolio" },
  { name: "Contact", href: "#contact", section: "contact" },
];
