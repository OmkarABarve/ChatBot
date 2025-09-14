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
    
      const response = await this.geminiService.interviewWithTools(prompt, sessionId); //sessionId comes fom frontend
    return { response };
  }
  //@Get('session/:id')


}