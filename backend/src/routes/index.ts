import { Router } from "express";
import contactRouter from "./contact.routes.js";
import githubRouter from "./github.routes.js";
import healthRouter from "./health.routes.js";
import messagesRouter from "./messages.routes.js";
import projectsRouter from "./projects.routes.js";

const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/projects", projectsRouter);
apiRouter.use("/messages", messagesRouter);
apiRouter.use("/contact", contactRouter);
apiRouter.use("/github", githubRouter);

export default apiRouter;
