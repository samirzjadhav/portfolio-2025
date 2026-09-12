import { resumeSkillGroups } from "./resumeContent";
import { skillCategories } from "./skills";

const learningGroup = resumeSkillGroups.find(
  (group) => group.title === "Currently learning"
);

/** Skills listed under "Currently learning" on the resume. */
export const currentlyLearningSkills = learningGroup?.items ?? [];

const testingSkills =
  skillCategories.find((category) => category.title === "Testing")?.items ?? [];

export interface CurrentlyBuildingTopic {
  id: string;
  /** Display name — matches resume wording where applicable */
  name: string;
  terminalPath: string;
  summary: string;
  focusLines: string[];
  stack: string[];
  status: "learning" | "building";
}

function topic(
  entry: CurrentlyBuildingTopic
): CurrentlyBuildingTopic {
  return entry;
}

/** Interactive card content tied to resume learning areas — personal projects only. */
export const currentlyBuildingTopics: CurrentlyBuildingTopic[] = [
  topic({
    id: "typescript",
    name: "TypeScript",
    terminalPath: "~/portfolio/src",
    summary: "Deepening type-safe patterns across the frontend and API layer.",
    focusLines: [
      "Typing React components, hooks, and shared utilities",
      "Defining request/response types for Express routes",
      "Refactoring JavaScript modules toward strict TypeScript",
    ],
    stack: ["TypeScript", "React", "Next.js"],
    status: "learning",
  }),
  topic({
    id: "nodejs",
    name: "NodeJS",
    terminalPath: "~/portfolio/backend",
    summary: "Building and wiring Node.js services for this portfolio's API.",
    focusLines: [
      "Structuring Express apps with routes and controllers",
      "Connecting the React client to REST endpoints",
      "Environment config and error handling on the server",
    ],
    stack: ["Node.js", "Express.js", "REST APIs"],
    status: "building",
  }),
  topic({
    id: "expressjs",
    name: "ExpressJS",
    terminalPath: "~/portfolio/backend/src/routes",
    summary: "Practising REST API design with Express on personal projects.",
    focusLines: [
      "Contact and message endpoints with validation",
      "GitHub and project data routes for the portfolio",
      "Middleware for CORS, errors, and request validation",
    ],
    stack: ["Express.js", "Node.js", "REST APIs"],
    status: "building",
  }),
  topic({
    id: "mongodb",
    name: "MongoDB",
    terminalPath: "~/learning/mongodb",
    summary: "Learning document modelling and persistence for full-stack apps.",
    focusLines: [
      "Schema design for messages and portfolio data",
      "CRUD operations and query patterns in Node",
      "Connecting MongoDB to Express API handlers",
    ],
    stack: ["MongoDB", "Node.js", "Express.js"],
    status: "learning",
  }),
  topic({
    id: "testing",
    name: "Testing",
    terminalPath: "~/portfolio/tests",
    summary: "Building confidence with automated tests on UI and logic.",
    focusLines: [
      "Component tests with React Testing Library",
      "Unit tests using Jest and Vitest",
      "Testing forms, hooks, and API integration flows",
    ],
    stack: testingSkills.length > 0 ? [...testingSkills] : ["Testing"],
    status: "learning",
  }),
];

/** Resume learning labels that have a matching interactive topic. */
export function getResumeAlignedTopics(): CurrentlyBuildingTopic[] {
  const resumeNames = new Set(
    currentlyLearningSkills.map((skill) => skill.toLowerCase())
  );

  return currentlyBuildingTopics.filter((topic) =>
    resumeNames.has(topic.name.toLowerCase())
  );
}
