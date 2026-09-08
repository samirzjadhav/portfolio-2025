import type { NavAnchorLink, SectionNavLink } from "../types";

export const footerNavLinks: NavAnchorLink[] = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Achievements", href: "#achievements" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "#contact" },
];

export const sectionNavLinks: SectionNavLink[] = [
  { name: "About", href: "#about", section: "about" },
  { name: "Skills", href: "#skills", section: "skills" },
  { name: "Experience", href: "#experience", section: "experience" },
  { name: "Contact", href: "#contact", section: "contact" },
];
