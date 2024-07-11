import { Controller, Get, Res } from "@nestjs/common";
import type { FastifyReply } from "fastify";
import { LivestreamGateway } from "../gateways/livestream.gateway";

@Controller('livestream')
export class LivestreamController {
    constructor(private readonly livestreamGateway: LivestreamGateway) { }

    @Get('streaming')
    async getStreaming(@Res() res: FastifyReply) {
        res.headers({
            'transfer-encoding': 'chunked',
            'Content-Type': 'video/x-flv'
        })

        const streamData$ = this.livestreamGateway.getStreamData$();
        streamData$.subscribe({
            next: (data) => {
                res.send(data);
            },
            complete: () => { 

            }
        })
    }

}