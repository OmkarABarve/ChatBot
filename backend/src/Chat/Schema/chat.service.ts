/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatDocument } from './chat.interface';
@Injectable()
export class ChatService {

  
  constructor(@InjectModel('Chat') private readonly ChatModel: Model<any>) {
    console.log('ChatService initialized ✅');
  }
  async addTurn(
    sessionId: string,
    turn: { role: 'user' | 'model'; parts: string[] },
  ) {
    const existing = await this.ChatModel.findOne({ sessionId });
    if (!existing) {
      await this.ChatModel.create({
        sessionId,
        conversation: [turn],
        updatedAt: new Date(),
      });
    } else {
      existing.conversation.push(turn);
      existing.updatedAt = new Date();
      await existing.save();
    }
  }

  async getConversation(sessionId: string) {
    return this.ChatModel.findOne({ sessionId }).lean<ChatDocument>().exec();
  }
}