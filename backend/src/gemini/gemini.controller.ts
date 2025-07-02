// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Post, Body, Get } from '@nestjs/common';
import { GeminiService } from './gemini.service';
@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}
  @Post('ask')
  async askGemini(
    @Body('prompt') prompt: string,
    @Body('sessionId') sessionId: string,
  ) {
    if (prompt.toLowerCase().includes(`lets chat`)) {
      const response = await this.geminiService.chatting(prompt, sessionId); //sessionId comes fom frontend
      return { response };
    } else {
      const response = await this.geminiService.ask(prompt);
      return { response };
    }
  }
  //@Get('session/:id')


}
