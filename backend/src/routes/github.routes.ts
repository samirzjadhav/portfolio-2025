import { Router } from "express";
import { z } from "zod";
import { getGitHubDashboard } from "../controllers/index.js";
import { validateRequest } from "../middleware/index.js";

const githubQuerySchema = z.object({
  refresh: z.enum(["true", "false"]).optional(),
});

const githubRouter = Router();

githubRouter.get(
  "/",
  validateRequest({ query: githubQuerySchema }),
  getGitHubDashboard
);

export default githubRouter;
