import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomController } from './chatroom.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ChatroomController],
  providers: [ChatroomService, PrismaClient],
  imports: [PrismaClient],
})
export class ChatroomModule {}
