/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { generateText, generateObject, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { ChatService } from 'src/Chat/Schema/chat.service';
import {
  createIntroductionTool,
  createQuestionsTool,
  createConclusionTool,
} from '../../tools';
import { UIMessage } from 'ai';
import { generateInterviewSystemPrompt } from 'systemprompt';

@Injectable()
export class GeminiService {
  constructor(private readonly chatService: ChatService) {}

  async interviewWithTools(sessionId: string, uiMessages?: UIMessage[]) {
    const system = generateInterviewSystemPrompt();
    const messages = convertToModelMessages(uiMessages || []);
    console.log('GeminiService InterviewWithTools called');
    try {
      const result = await generateText({
        model: google('gemini-1.5-flash-latest'),
        system,
        tools: {
          introTool: createIntroductionTool(),
          questionsTool: createQuestionsTool(),
          conclusionTool: createConclusionTool(),
        },
        toolChoice: 'auto',
        messages,
      });

      // Save the conversation
      /*
      await this.chatService.addTurn(sessionId, {
        role: 'user',
        parts: [prompt],
      });

      await this.chatService.addTurn(sessionId, {
        role: 'model',
        parts: [result.text],
      });
      */
      console.log('Result text:', result.text);
      console.log('Tool calls:', result.toolCalls);
      console.log('Usage:', result.usage);
      return result.text;
    } catch (error) {
      console.error('💥 Gemini error:', error);
      throw new Error('Gemini API failed');
    }
  }
}
