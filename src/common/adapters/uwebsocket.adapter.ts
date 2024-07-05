import { WebSocketAdapter, INestApplicationContext } from '@nestjs/common';
import { MessageMappingProperties } from '@nestjs/websockets';
import { Observable, fromEvent, of } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators';
import { App, type TemplatedApp } from 'uWebSockets.js';

export class UWebSocketAdapter implements WebSocketAdapter {
    constructor(private app: INestApplicationContext) {}

    // 对应WebSocketGateway装饰器
    create(port: number, options?: any): any {
        const server = App();
        server.listen(port, (token) => {
            console.log('🚀 ~ UWebSocketAdapter ~ server.listen ~ token:', token);
            if (token) {
                console.log(`Listening to port ${port}`);
            } else {
                console.log(`Failed to listen to port ${port}`);
            }
        });
        return server;
    }

    bindClientConnect(server: TemplatedApp, callback: Function) {
        server.ws('/*', {
            open: (ws) => callback(ws),
            message: (ws, message, isBinary) => {
                ws.getBufferedAmount(); // to simulate some work
            },
            drain: (ws) => {
                ws.getBufferedAmount(); // to simulate some work
            },
            close: (ws, code, message) => {
                ws.getBufferedAmount(); // to simulate some work
            },
        });
    }

    bindMessageHandlers(client: WebSocket, handlers: MessageMappingProperties[], process: (data: any) => Observable<any>) {
        fromEvent(client, '')
            .pipe(
            mergeMap(data => this.bindMessageHandler(data, handlers, process)),
            filter(result => result)
            )
            .subscribe(response => client.send(JSON.stringify(response)));
    }

    bindMessageHandler(buffer: any, handlers: MessageMappingProperties[], process: (data: any) => Observable<any>): Observable<any> {
        const message = JSON.parse(buffer);
        const messageHandler = handlers.find(handler => handler.message === message.event);
        if (!messageHandler) {
            return of(null);
        }
        return process(messageHandler.callback(message.data));
    }

    close(server: any) {
        server.close();
    }
}
