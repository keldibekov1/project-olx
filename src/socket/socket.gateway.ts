import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({ cors: true })
  export class SocketGateway {
    @WebSocketServer()
    server: Server;
  
    private userSockets = new Map<string, string>(); 
  
    handleConnection(client: Socket) {
      const userId = client.handshake.query.userId as string;
      if (userId) {
        this.userSockets.set(userId, client.id);
      }
    }
  
    handleDisconnect(client: Socket) {
      const userId = [...this.userSockets.entries()].find(([_, id]) => id === client.id)?.[0];
      if (userId) {
        this.userSockets.delete(userId);
      }
    }
  
    sendNotification(userId: string, data: any) {
      const socketId = this.userSockets.get(userId);
      if (socketId) {
        this.server.to(socketId).emit('notification', data);
      }
    }
  }
  