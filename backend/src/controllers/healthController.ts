import type { RequestHandler } from "express";
import { getHealthStatus } from "../services/index.js";
import type { HealthCheckResponse } from "../types/index.js";

export const getHealth: RequestHandler = (_req, res, next) => {
  try {
    const response: HealthCheckResponse = getHealthStatus();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
