import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { WsModule } from './ws/ws.module';
import { ChatroomModule } from './chatroom/chatroom.module';

@Module({
  imports: [GatewayModule, WsModule, ChatroomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
