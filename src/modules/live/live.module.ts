import { Module } from "@nestjs/common";
import { LiveService } from "./services/live.service";
import { LiveGateway } from "./gateways/live.gateway";
import { StreamingService } from "./services/streaming.service";
import { StreamingController } from "./controllers/steaming.controller";

@Module({
    providers: [LiveGateway, LiveService, StreamingService],
    controllers: [StreamingController],
    exports: [LiveGateway]
})

export class LiveModule {}