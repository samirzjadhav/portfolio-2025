import { Router } from "express";
import { z } from "zod";
import { postContactMessage } from "../controllers/index.js";
import { validateRequest } from "../middleware/index.js";

const contactBodySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("A valid email is required").max(254),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

const contactRouter = Router();

contactRouter.post(
  "/",
  validateRequest({ body: contactBodySchema }),
  postContactMessage
);

export default contactRouter;
