import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { TemplatedApp } from "uWebSockets.js";

@WebSocketGateway(83, {
    cors: {
        origin: '*',
    }
})
export class LivestreamGateway {
    @WebSocketServer()
    server;
    handleMessage(client: any, message) {
        console.log(message)
    }
}