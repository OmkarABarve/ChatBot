// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Post, Body, Get } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { UIMessage } from 'ai';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('ask')
  async askGemini(
    @Body('sessionId') sessionId: string,
    @Body('messages') messages?: UIMessage[],
    @Body('prompt') prompt?: string,
  ) {
    console.log('Received sessionId:', sessionId);
    console.log('Received messages:', messages);
    console.log('Received prompt:', prompt);

    let uiMessages: UIMessage[];

    if (messages && messages.length > 0) {
      // Use provided messages
      uiMessages = messages;
    } else if (prompt) {
      // Convert prompt to UIMessage format
      uiMessages = [
        {
          id: Date.now().toString(),
          role: 'user' as const,
          parts: [
            {
              type: 'text' as const,
              text: prompt,
            },
          ],
        },
      ];
    } else {
      // Default message
      uiMessages = [
        {
          id: Date.now().toString(),
          role: 'user' as const,
          parts: [
            {
              type: 'text' as const,
              text: 'Hello, I want to start the interview',
            },
          ],
        },
      ];
    }

    const response = await this.geminiService.interviewWithTools(
      sessionId || 'default-session',
      uiMessages,
    );
    return { response };
  }
}