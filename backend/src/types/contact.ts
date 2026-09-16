export interface ContactMessageInput {
  name: string;
  email: string;
  message: string;
}

export interface ContactMessageResult {
  id: string;
  receivedAt: string;
}
