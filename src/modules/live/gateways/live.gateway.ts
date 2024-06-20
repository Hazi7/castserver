import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, type OnGatewayInit } from "@nestjs/websockets";
import type { Server, Socket } from "socket.io";
import type { CreateRoomDto } from "../dto/create-room.dto";
import type { JoinRoomDto } from "../dto/join-room-dto";
import type { startStreamingDto } from "../dto/start-streaming.dto";
import { StreamingService } from "../services/streaming.service";
import { LiveService } from "../services/live.service";
import type { ReceiveMediaDataDto } from "../dto/receive-media-data.dto";

@WebSocketGateway(82, { 
    namespace: 'live',
    cors: {
        origin: '*',
    }
})
export class LiveGateway{
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly liveService: LiveService,
        private readonly streamingService: StreamingService
    ) {} 

    @SubscribeMessage("createRoom")
    handleCreateRoom(
        @MessageBody() createRoomDto: CreateRoomDto,
        @ConnectedSocket() client: Socket
    ) {
        const room = this.liveService.createRoom(createRoomDto);
        client.join(room.id);
        this.server.emit('roomCreated', room);
    }

    @SubscribeMessage("joinRoom")
    handleJoinRoom(
        @MessageBody() JoinRoomDto: JoinRoomDto,
        @ConnectedSocket() client: Socket
    ) {
        this.liveService.joinRoom(JoinRoomDto);
        client.join(JoinRoomDto.roomId);
        this.server.to(JoinRoomDto.roomId).emit('userJoined', JoinRoomDto.username) 
    }

    @SubscribeMessage("message")
    handleMessage(
        @MessageBody() message: { roomId: string, content: string }
    ) {
        console.log(message);
        this.server.to(message.roomId).emit('message', message);
    }

    @SubscribeMessage("startStreaming")
    async handleStartStreaming(
        @MessageBody() { roomId }: startStreamingDto,
        @ConnectedSocket() client: Socket
    ){
        try {
            const ffmpegStdin = await this.streamingService.startStreaming(roomId);
        } catch (error) {
            console.log(error)
        }
    }

    @SubscribeMessage("receiveMediaData")
    async handleReceiveMediaData(
        @MessageBody() { roomId, mediaData }: ReceiveMediaDataDto,
        @ConnectedSocket() client: Socket
    ) {
        try {
            await this.streamingService.receiveMediaData(roomId, mediaData);
        } catch (error) {
            console.log(error)
        }
    }
    
}