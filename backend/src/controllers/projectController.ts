import type { RequestHandler } from "express";
import { getAllProjects, getProjectBySlug } from "../services/index.js";
import type {
  ApiSuccessResponse,
  Project,
  ProjectListResponse,
} from "../types/index.js";

export const listProjects: RequestHandler = (_req, res, next) => {
  try {
    const data = getAllProjects();
    const response: ApiSuccessResponse<ProjectListResponse> = {
      success: true,
      data,
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getProject: RequestHandler = (req, res, next) => {
  try {
    const { slug } = req.params as { slug: string };
    const data = getProjectBySlug(slug);
    const response: ApiSuccessResponse<Project> = {
      success: true,
      data,
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
