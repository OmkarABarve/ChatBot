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
    @Body('messages') messages: UIMessage[],
  ) {
    console.log(messages);
    const uiMessages = messages || [
      {
        id: Date.now().toString(),
        role: 'user' as const,
        parts: [
          {
            type: 'text' as const,  // ✅ REQUIRED
            text: 'Helo', // ✅ REQUIRED
          },
        ],
      },
    ];

    const response = await this.geminiService.interviewWithTools(
      sessionId,
      uiMessages,
    );
    return { response };
  }
}
