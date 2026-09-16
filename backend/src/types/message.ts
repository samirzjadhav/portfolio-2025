export interface MessageInput {
  name: string;
  email: string;
  message: string;
}

export interface StoredMessage extends MessageInput {
  id: string;
  createdAt: string;
}

export interface CreateMessageResult {
  id: string;
  createdAt: string;
}
