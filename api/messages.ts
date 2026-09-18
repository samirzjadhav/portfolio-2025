import { randomUUID } from "node:crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";

interface MessageBody {
  name?: string;
  email?: string;
  message?: string;
}

interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

interface ApiErrorResponse {
  success: false;
  error: { message: string };
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { nameMax: 100, emailMax: 254, messageMax: 5000 } as const;

function validateBody(body: MessageBody): string | null {
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name) return "Name is required.";
  if (name.length > LIMITS.nameMax) {
    return `Name must be ${LIMITS.nameMax} characters or fewer.`;
  }
  if (!email) return "Email is required.";
  if (email.length > LIMITS.emailMax) {
    return `Email must be ${LIMITS.emailMax} characters or fewer.`;
  }
  if (!EMAIL_PATTERN.test(email)) return "Enter a valid email address.";
  if (!message) return "Message is required.";
  if (message.length > LIMITS.messageMax) {
    return `Message must be ${LIMITS.messageMax} characters or fewer.`;
  }

  return null;
}

async function notifyByEmail(body: Required<MessageBody>): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();

  if (!apiKey || !to) return;

  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ??
    "Portfolio Contact <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: body.email,
      subject: `Portfolio message from ${body.name}`,
      text: body.message,
    }),
  });

  if (!response.ok) {
    console.error("[contact] email delivery failed", response.status);
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    const payload: ApiErrorResponse = {
      success: false,
      error: { message: "Method not allowed" },
    };
    res.status(405).json(payload);
    return;
  }

  try {
    const body = (req.body ?? {}) as MessageBody;
    const validationError = validateBody(body);

    if (validationError) {
      const payload: ApiErrorResponse = {
        success: false,
        error: { message: validationError },
      };
      res.status(400).json(payload);
      return;
    }

    const payload: Required<MessageBody> = {
      name: body.name!.trim(),
      email: body.email!.trim(),
      message: body.message!.trim(),
    };

    await notifyByEmail(payload);

    const data = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    };

    const response: ApiSuccessResponse<typeof data> = {
      success: true,
      data,
    };

    res.status(201).json(response);
  } catch (error) {
    console.error("[contact] handler error", error);
    const payload: ApiErrorResponse = {
      success: false,
      error: { message: "Something went wrong. Please try again." },
    };
    res.status(500).json(payload);
  }
}
