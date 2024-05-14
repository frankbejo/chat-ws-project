import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';
import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';

@Controller('chatroom')
export class ChatroomController {
  constructor(
    private readonly chatroomService: ChatroomService,
    private readonly prismaService: PrismaClient,
  ) {}

  @Post('/create/one')
  async create(@Body() createChatroomDto: CreateChatroomDto) {
    console.log({ userId: createChatroomDto.userId });
    const newObjectId = new ObjectId();
    const createdChatRoom = await this.prismaService.chatRoom.create({
      data: {
        createdBy: createChatroomDto.userId,
        id: String(newObjectId),
        ownerAccountId: '1234',
      },
    });
    return createdChatRoom;
  }

  @Get()
  findAll() {
    return this.chatroomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatroomService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChatroomDto: UpdateChatroomDto,
  ) {
    return this.chatroomService.update(+id, updateChatroomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatroomService.remove(+id);
  }
}
