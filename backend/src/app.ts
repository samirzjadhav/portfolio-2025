import cors from "cors";
import express from "express";
import helmet from "helmet";
import { corsOptions, env } from "./config/index.js";
import {
  errorHandler,
  githubRateLimiter,
  notFoundHandler,
  writeRateLimiter,
} from "./middleware/index.js";
import apiRouter from "./routes/index.js";

export function createApp() {
  const app = express();

  if (env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
  }

  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(express.json({ limit: "32kb" }));
  app.use("/api/messages", writeRateLimiter);
  app.use("/api/contact", writeRateLimiter);
  app.use("/api/github", githubRateLimiter);

  app.get("/", (_req, res) => {
    res.status(200).json({
      success: true,
      data: {
        name: "Portfolio API",
        version: "1.0.0",
      },
    });
  });

  app.use("/api", apiRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
