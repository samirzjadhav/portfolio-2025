import { Router } from "express";
import { z } from "zod";
import { getProject, listProjects } from "../controllers/index.js";
import { validateRequest } from "../middleware/index.js";

const slugParamsSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid project slug"),
});

const projectsRouter = Router();

projectsRouter.get("/", listProjects);
projectsRouter.get(
  "/:slug",
  validateRequest({ params: slugParamsSchema }),
  getProject
);

export default projectsRouter;
