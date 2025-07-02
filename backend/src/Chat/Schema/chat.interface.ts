// chat.interface.ts

export interface ChatTurn {
  role: 'user' | 'model';
  parts: string[];
}

export interface ChatDocument {
  sessionId: string;
  conversation: ChatTurn[];
  updatedAt: Date;
}
