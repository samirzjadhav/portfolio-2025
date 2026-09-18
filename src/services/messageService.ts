import type { CreateMessageResult, MessageInput } from "../types/message";
import { apiRequest } from "./apiClient";

export async function sendContactMessage(
  input: MessageInput
): Promise<CreateMessageResult> {
  const payload: MessageInput = {
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
  };

  return apiRequest<CreateMessageResult>("/api/messages", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** @deprecated Use sendContactMessage with controlled form values. */
export async function sendMessage(
  form: HTMLFormElement
): Promise<CreateMessageResult> {
  const formData = new FormData(form);
  return sendContactMessage({
    name: String(formData.get("from_name") ?? ""),
    email: String(formData.get("reply_to") ?? ""),
    message: String(formData.get("message") ?? ""),
  });
}
