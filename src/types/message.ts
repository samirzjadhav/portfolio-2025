export interface MessageInput {
  name: string;
  email: string;
  message: string;
}

export interface CreateMessageResult {
  id: string;
  createdAt: string;
}

export type ContactFormStatus =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };
