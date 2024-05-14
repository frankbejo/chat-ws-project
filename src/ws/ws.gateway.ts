import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { WsService } from './ws.service';
import { CreateWDto } from './dto/create-w.dto';
import { UpdateWDto } from './dto/update-w.dto';
import { PrismaClient } from '@prisma/client';
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@WebSocketGateway()
export class WsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly wsService: WsService,
    private readonly prismaService: PrismaClient,
  ) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('createW')
  async create(@MessageBody() createWDto: CreateWDto) {
    const newObjectId = new ObjectId();
    const message = await this.prismaService.messages.create({
      data: {
        createdBy: createWDto.userId,
        id: String(newObjectId),
        message: createWDto.message,
        ownerAccountId: '1234',
        userId: createWDto.userId,
      },
    });
    this.server.emit('onMessage', {
      msg: 'New Mesasge',
      content: message,
    });
  }

  @SubscribeMessage('typing')
  async typing(@MessageBody() isTyping: boolean) {
    this.server.emit('isTyping', isTyping);
  }

  @SubscribeMessage('findOneW')
  findOne(@MessageBody() id: number) {
    return this.wsService.findOne(id);
  }

  @SubscribeMessage('updateW')
  update(@MessageBody() updateWDto: UpdateWDto) {
    return this.wsService.update(updateWDto.id, updateWDto);
  }

  @SubscribeMessage('removeW')
  remove(@MessageBody() id: number) {
    return this.wsService.remove(id);
  }
}
