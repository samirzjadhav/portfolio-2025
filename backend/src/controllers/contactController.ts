import type { RequestHandler } from "express";
import { submitContactMessage } from "../services/index.js";
import type {
  ApiSuccessResponse,
  ContactMessageInput,
  ContactMessageResult,
} from "../types/index.js";

export const postContactMessage: RequestHandler = async (req, res, next) => {
  try {
    const input = req.body as ContactMessageInput;
    const data = await submitContactMessage(input);

    const response: ApiSuccessResponse<ContactMessageResult> = {
      success: true,
      data,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};
