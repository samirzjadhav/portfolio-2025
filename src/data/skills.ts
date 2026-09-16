import type { SkillCategory, SkillCategoryName, SkillsData } from "../types";

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Database",
    items: ["MongoDB", "Firebase"],
  },
  {
    title: "Testing",
    items: ["Jest", "Vitest", "React Testing Library"],
  },
  {
    title: "Tools",
    items: [
      "VS Code",
      "Git",
      "GitHub",
      "Vercel",
      "NPM",
      "Figma",
      "Linux",
    ],
  },
];

const stackGroupTitles: SkillCategoryName[] = [
  "Frontend",
  "Backend",
  "Database",
];

const workflowGroupTitles: SkillCategoryName[] = ["Testing", "Tools"];

export const skillsData: SkillsData = {
  categories: skillCategories,
  stackGroupTitles,
  workflowGroupTitles,
  otherSkillsDescription:
    "UI/UX basics, component-driven development, animation integration, responsive-first design, deployment workflows, and performance optimization.",
};

function filterCategories(titles: SkillCategoryName[]): SkillCategory[] {
  return skillCategories.filter(({ title }) => titles.includes(title));
}

export const stackCategories = filterCategories(stackGroupTitles);
export const workflowCategories = filterCategories(workflowGroupTitles);
