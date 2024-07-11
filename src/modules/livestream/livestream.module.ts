import { Module } from "@nestjs/common";
import { LivestreamGateway } from "./gateways/livestream.gateway";
import { LiveStreamService } from "./services/livestream.service";
import { LivestreamController } from "./controllers/livestream.controller";
import { FFmpegService } from "./services/ffmpeg.service";

@Module({
    controllers: [LivestreamController],

    providers: [LivestreamGateway, LiveStreamService, FFmpegService]
})

export class LivestreamModule {}