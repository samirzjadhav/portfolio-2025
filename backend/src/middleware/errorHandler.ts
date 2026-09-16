import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "./errors/AppError.js";
import type { ApiErrorResponse } from "../types/index.js";

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error instanceof AppError) {
    const body: ApiErrorResponse = {
      success: false,
      error: {
        message: error.message,
        details: error.details,
      },
    };
    res.status(error.statusCode).json(body);
    return;
  }

  if (error instanceof ZodError) {
    const body: ApiErrorResponse = {
      success: false,
      error: {
        message: "Validation failed",
        details: error.flatten(),
      },
    };
    res.status(400).json(body);
    return;
  }

  console.error(error);

  const body: ApiErrorResponse = {
    success: false,
    error: {
      message: "Internal server error",
    },
  };
  res.status(500).json(body);
};
