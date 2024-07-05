import { Module } from "@nestjs/common";
import { LivestreamGateway } from "./gateways/livestream.gateway";

@Module({
    providers: [LivestreamGateway]
})

export class LivestreamModule {}