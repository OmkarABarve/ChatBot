/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI, Content } from '@google/generative-ai';
import { ChatService } from 'src/Chat/Schema/chat.service'; // Fix path if needed
//import { ChatTurn } from 'src/chat/chat.interface'; // Optional: if you typed it
interface ChatTurn {
  role: 'user' | 'model';
  parts: string[];
}



@Injectable()
export class GeminiService {
  constructor(private readonly chatService: ChatService) {}

  private genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  private model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  async ask(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error('💥 Gemini error:', error);
      throw new Error('Gemini API failed');
    }
  }

  async chatting(
    prompt: string,
    sessionId: string,
    systemPrompt?: string,
  ): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

      // Save user message
      await this.chatService.addTurn(sessionId, {
        role: 'user',
        parts: [prompt],
      });

      // If it's a new chat with system prompt
      if (systemPrompt) {
        const chat = model.startChat({
          history: [],
          systemInstruction: systemPrompt,
        });

        const result = await chat.sendMessage(prompt);
        const reply = result.response.text();

        await this.chatService.addTurn(sessionId, {
          role: 'model',
          parts: [reply],
        });

        return reply;
      }

      // Continue conversation from stored history
      const raw = await this.chatService.getConversation(sessionId);
      const history = raw?.conversation ?? [];

      const chat = model.startChat({
  history: history.map((turn) => ({
    role: turn.role,
    parts: turn.parts.map((text) => ({ text })),
  })),
});

      const result = await chat.sendMessage(prompt);
      const reply = result.response.text();

      await this.chatService.addTurn(sessionId, {
        role: 'model',
        parts: [reply],
      });

      return reply;
    } catch (error) {
      console.error('💥 Gemini error:', error);
      throw new Error('Gemini API failed');
    }
  }
}
