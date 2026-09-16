import type { HealthCheckResponse } from "../types/index.js";

export function getHealthStatus(): HealthCheckResponse {
  return {
    status: "ok",
    message: "API is running",
  };
}
