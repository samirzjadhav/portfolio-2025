import type { RequestHandler } from "express";
import { createMessage } from "../services/index.js";
import type { ApiSuccessResponse, CreateMessageResult, MessageInput } from "../types/index.js";

export const postMessage: RequestHandler = async (req, res, next) => {
  try {
    const input = req.body as MessageInput;
    const data = await createMessage(input);

    const response: ApiSuccessResponse<CreateMessageResult> = {
      success: true,
      data,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};
