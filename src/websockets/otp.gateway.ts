import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(80, { cors: { origin: '*' } })
export class OtpGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('connected')
  handleConnection(client: any, ...args: any[]) {
    console.log('Connected');
  }
}
