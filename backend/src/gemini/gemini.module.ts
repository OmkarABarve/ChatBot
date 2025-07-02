import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';
import { ChatModule } from 'src/Chat/Schema/chat.module';

@Module({
  imports:[ChatModule],
  providers: [GeminiService],
  controllers: [GeminiController]
})
export class GeminiModule {}
