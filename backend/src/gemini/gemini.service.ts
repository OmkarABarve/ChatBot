/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { generateText, generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { ChatService } from 'src/Chat/Schema/chat.service';
import {
  createIntroductionTool,
  createQuestionsTool,
  createConclusionTool,
} from '../../tools';

@Injectable()
export class GeminiService {
  constructor(private readonly chatService: ChatService) {}

  async interviewWithTools(
    prompt: string,
    sessionId: string,
    systemPrompt?: string,
  ): Promise<string> {
    console.log("GeminiService InterviewWithTools called");
    try {
      const result = await generateText({
        model: google('gemini-1.5-flash-latest'),
        messages: [
          {
            role: 'system',
            content: systemPrompt || 'You are an Excel interview assistant.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        tools: {
          introTool: createIntroductionTool(),
          questionsTool: createQuestionsTool(),
          conclusionTool: createConclusionTool(),
        },
        toolChoice: 'auto',
      });

      // Save the conversation
      await this.chatService.addTurn(sessionId, {
        role: 'user',
        parts: [prompt],
      });

      await this.chatService.addTurn(sessionId, {
        role: 'model',
        parts: [result.text],
      });

      return result.text;
    } catch (error) {
      console.error('💥 Gemini error:', error);
      throw new Error('Gemini API failed');
    }
  }
}
