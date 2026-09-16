import { Router } from "express";
import { z } from "zod";
import { postMessage } from "../controllers/index.js";
import { validateRequest } from "../middleware/index.js";

const messageBodySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("A valid email is required").max(254),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

const messagesRouter = Router();

messagesRouter.post(
  "/",
  validateRequest({ body: messageBodySchema }),
  postMessage
);

export default messagesRouter;
