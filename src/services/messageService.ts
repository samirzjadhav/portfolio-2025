import type { CreateMessageResult, MessageInput } from "../types/message";
import { apiRequest } from "./apiClient";

export async function sendMessage(
  form: HTMLFormElement
): Promise<CreateMessageResult> {
  const formData = new FormData(form);
  const payload: MessageInput = {
    name: String(formData.get("from_name") ?? "").trim(),
    email: String(formData.get("reply_to") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  return apiRequest<CreateMessageResult>("/api/messages", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
