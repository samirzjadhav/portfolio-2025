import { contactInfo } from "./contact";
import { workExperience } from "./experience";

export const HERO_ROLE = "Frontend Engineer";

export const HERO_EYEBROW = `${HERO_ROLE} · ${contactInfo.location}`;

export const HERO_TAGLINE =
  "I build production-ready React & Next.js products — polished UI, smooth interactions, and maintainable frontends.";

export const HERO_TECH = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Framer Motion",
] as const;

export interface HeroHighlight {
  id: string;
  label: string;
  value: string;
  detail: string;
  href: string;
  icon: string;
  external?: boolean;
}

export function getHeroHighlights(): HeroHighlight[] {
  const latest = workExperience[0];

  return [
    {
      id: "experience",
      label: "Experience",
      value: `${workExperience.length} internships`,
      detail: latest ? `${latest.role} @ ${latest.company}` : "Frontend internships",
      href: "#experience",
      icon: "bx-briefcase",
    },
    {
      id: "projects",
      label: "Projects",
      value: "Portfolio work",
      detail: "Case studies & live demos",
      href: "#portfolio",
      icon: "bx-folder-open",
    },
    {
      id: "stack",
      label: "Core stack",
      value: "React ecosystem",
      detail: "Next.js · TypeScript · Tailwind",
      href: "#skills",
      icon: "bx-code-alt",
    },
    {
      id: "contact",
      label: "Contact",
      value: "Get in touch",
      detail: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      icon: "bx-envelope",
      external: true,
    },
  ];
}

export const ABOUT_SUMMARY = `Frontend engineer with internship experience at Skynox Tech and Propacity. I focus on React, Next.js, and Tailwind — shipping responsive interfaces, reusable components, and performance-minded web apps that users enjoy.`;
