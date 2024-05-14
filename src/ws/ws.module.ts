import { Module } from '@nestjs/common';
import { WsService } from './ws.service';
import { WsGateway } from './ws.gateway';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [WsGateway, WsService, PrismaClient],
  imports: [PrismaClient],
})
export class WsModule {}
