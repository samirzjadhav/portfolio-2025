import { randomUUID } from "node:crypto";
import type {
  CreateMessageResult,
  MessageInput,
  StoredMessage,
} from "../types/message.js";

const MAX_STORED_MESSAGES = 500;
const messages: StoredMessage[] = [];

export async function createMessage(
  input: MessageInput
): Promise<CreateMessageResult> {
  const storedMessage: StoredMessage = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };

  if (messages.length >= MAX_STORED_MESSAGES) {
    messages.shift();
  }

  messages.push(storedMessage);

  return {
    id: storedMessage.id,
    createdAt: storedMessage.createdAt,
  };
}

export function getStoredMessages(): readonly StoredMessage[] {
  return messages;
}
