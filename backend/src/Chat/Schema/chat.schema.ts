import { Schema } from 'mongoose';

export const ChatSchema = new Schema({
  sessionId: { type: String, required: true },
  conversation: [
    {
      role: { type: String, enum: ['user', 'model'], required: true },
      parts: [{ type: String }],
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});
