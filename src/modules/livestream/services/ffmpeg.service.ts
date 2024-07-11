import { spawn, type ChildProcess } from "child_process";

export class FFmpegService {
    constructor() { }

    createFFmpegProcess() {

        const ffmpegProcess = spawn('ffmpeg', [
            '-i', 'pipe:0',
            '-tune', 'zerolatency',
            '-c', 'copy',
            '-buffer_size', '500000',
            '-f', 'flv',
            `pipe:1`
        ]);

        return ffmpegProcess;
    }

    destroyFFmpegProcess(ffmpegProcess: any) {
        ffmpegProcess.kill();
    }

}