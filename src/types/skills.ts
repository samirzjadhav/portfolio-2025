export type SkillCategoryName =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Testing"
  | "Tools";

export interface SkillCategory {
  title: SkillCategoryName;
  items: string[];
}

export interface SkillsData {
  categories: SkillCategory[];
  stackGroupTitles: SkillCategoryName[];
  workflowGroupTitles: SkillCategoryName[];
  otherSkillsDescription: string;
}
