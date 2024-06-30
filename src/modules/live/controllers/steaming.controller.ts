import { Controller, Get, Res } from "@nestjs/common";
import { StreamingService } from "../services/streaming.service";
import { FastifyReply } from "fastify/types/reply";

@Controller()
export class StreamingController {

    constructor(private readonly streamingService: StreamingService) {}

    @Get('streaming')
    async streaming(@Res() res: FastifyReply) {
        res
        .header('transfer-encoding', 'chunked')
        .header('Content-Type', 'video/x-flv');

        const stream = await this.streamingService.getStreamingUrl('test');

        try {
            res.send(stream);
        } catch (error) {
            console.log(error);
        }

    }
}