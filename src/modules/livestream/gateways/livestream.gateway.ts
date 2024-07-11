import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import type { TemplatedApp } from "uWebSockets.js";
import { LiveStreamService } from "../services/livestream.service";
import { FFmpegService } from "../services/ffmpeg.service";
import type { ChildProcess } from "child_process";
import { Subject } from "rxjs";
import { StreamStartDto } from "../dto/stream-start.dto";
import { StreamReceiveDto } from "../dto/stream-Receive.dto";
import type { StreamEndDto } from "../dto/stream-End.dto";

@WebSocketGateway(83, {
    cors: {
        origin: '*',
    }
})
export class LivestreamGateway {
    @WebSocketServer()
    server: TemplatedApp;
    streamData$: Subject<Buffer> = new Subject();
    ffmpegProcessMap: Map<string, ChildProcess> = new Map();


    constructor(
        private readonly liveStreamService: LiveStreamService,
        private readonly ffmpegService: FFmpegService

    ) {}

    @SubscribeMessage('streamStart')
    handleStreamStart(@MessageBody() streamStartDto: StreamStartDto) {

        const { roomId } = streamStartDto;
        const ffmpegProcess = this.ffmpegService.createFFmpegProcess();
        this.ffmpegProcessMap.set(roomId, ffmpegProcess);

        ffmpegProcess.stdout.on('data', (data: Buffer) => {
            console.log(data);
            this.streamData$.next(data);
        });

        ffmpegProcess.on('error', (error) => {
            console.error('FFmpeg process error:', error);
            this.streamData$.error(error);
        });

        ffmpegProcess.on('close', (code) => {
            console.log('FFmpeg process closed with code:', code);
            this.streamData$.complete();
        });
    }
    
    @SubscribeMessage('streamReceive')
    handleStreamReceive(@MessageBody() streamReceiveDto: StreamReceiveDto) {
        const { roomId, data } = streamReceiveDto;

        const ffmpegProcess = this.ffmpegProcessMap.get(roomId);
        ffmpegProcess.stdin.write(data);
    }

    @SubscribeMessage('streamEnd')
    handleStreamEnd(@MessageBody() streamEndDto: StreamEndDto) {
        const { roomId } = streamEndDto;
        const ffmpegProcess = this.ffmpegProcessMap.get(roomId);

        ffmpegProcess.kill();
        this.ffmpegProcessMap.delete(roomId);
    }

    getStreamData$() { 
        return this.streamData$.asObservable();
    }

}