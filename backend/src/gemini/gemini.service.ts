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
    console.log('Session ID:', sessionId);
    console.log('Messages:', JSON.stringify(messages, null, 2));
    
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

      console.log('Result text:', result.text);
      console.log('Tool calls:', result.toolCalls);
      console.log('Usage:', result.usage);

      return result.text;
    } catch (error) {
      console.error('💥 Gemini error:', error);
      throw new Error(`Gemini API failed: ${error.message}`);
    }
  }
}