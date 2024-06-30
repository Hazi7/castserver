import { Injectable } from '@nestjs/common';
import { spawn, type ChildProcessWithoutNullStreams } from 'child_process';
import type { Writable } from 'stream';

@Injectable()
export class StreamingService {
    private ffmpegProcess: Map<string, { ffmpeg: ChildProcessWithoutNullStreams, stdin: Writable }> = new Map();
    constructor() {}
    
    async startStreaming(roomId: string) {

        const ffmpeg = spawn('ffmpeg', [
            '-i', 'pipe:0',
            '-tune', 'zerolatency',
            '-c', 'copy',
            '-buffer_size', '500000',
            '-f', 'flv',
            `pipe:1`
        ]);

        ffmpeg.stderr.on('data', (data) => {
            console.log(`ffmpeg stderr: ${data}`);
        })

        this.ffmpegProcess.set(roomId, { ffmpeg, stdin: ffmpeg.stdin })
    }

    async receiveMediaData(roomId: string, mediaData: Buffer) {
        const processInfo = this.ffmpegProcess.get(roomId);
        if (processInfo) {
            processInfo.stdin.write(mediaData);
        }
    }

    async getStreamingUrl(roomId: string) {
        const processInfo = this.ffmpegProcess.get(roomId);
        return processInfo.ffmpeg.stdout;
    }
}