import { Module } from "@nestjs/common";
import { LiveService } from "./services/live.service";
import { LiveGateway } from "./gateways/live.gateway";
import { StreamingService } from "./services/streaming.service";

@Module({
    providers: [LiveGateway, LiveService, StreamingService],
    exports: [LiveGateway]
})

export class LiveModule {}