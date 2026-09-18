import { createApp } from "./app.js";
import { env } from "./config/index.js";

const app = createApp();
const server = app.listen(env.PORT, () => {
  console.info(`Portfolio API listening on http://localhost:${env.PORT}`);
});

function shutdown(signal: string): void {
  console.info(`Received ${signal}. Shutting down gracefully.`);
  server.close(() => {
    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  process.exit(1);
});
