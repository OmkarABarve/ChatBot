import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeminiModule } from './gemini/gemini.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './Chat/Schema/chat.schema';
import { ChatService } from './Chat/Schema/chat.service';
import { GeminiController } from './gemini/gemini.controller';

console.log('\n🌐 Frontend URL: http://localhost:5173');
console.log('📡 Backend API: http://localhost:3000');
console.log('✨ Click the frontend link to open your app!\n');

@Module({
  imports: [
    GeminiModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/chatbot'),
    MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]),
  ],
  controllers: [AppController, GeminiController],
  providers: [AppService, ChatService],
})
export class AppModule {}