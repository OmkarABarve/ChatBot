import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './chat.service';
import { ChatSchema } from './chat.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }])],
  providers: [ChatService],
  exports: [ChatService], // ✅ Make it usable outside
})
export class ChatModule {}
