import { randomUUID } from "node:crypto";
import type { ContactMessageInput, ContactMessageResult } from "../types/index.js";

/**
 * Accepts contact messages in memory until PostgreSQL and email delivery
 * are wired up in a later iteration.
 */
export async function submitContactMessage(
  input: ContactMessageInput
): Promise<ContactMessageResult> {
  const result: ContactMessageResult = {
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
  };

  if (process.env.NODE_ENV !== "test") {
    console.info("[contact] message received", {
      id: result.id,
      nameLength: input.name.length,
    });
  }

  return result;
}
