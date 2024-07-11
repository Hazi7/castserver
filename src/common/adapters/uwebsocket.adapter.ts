import { WebSocketAdapter, INestApplicationContext } from '@nestjs/common';
import { MessageMappingProperties } from '@nestjs/websockets';
import { EMPTY, Observable, fromEvent, of } from 'rxjs';
import * as events from 'events';
import { mergeMap, filter } from 'rxjs/operators';
import { App, TemplatedApp } from 'uWebSockets.js';

export class UWebSocketAdapter implements WebSocketAdapter {
    constructor(private app: INestApplicationContext) {}

    // 创建 WS 实例 这个方法会让 NestJS App 在使用 app.useWebSocketAdapter() 后被调用
    create(port: number, options?: any): any {
        const server = App();
        server.listen(port, (token) => {
            if (token) {
                console.log(`Listening to port ${port}`);
            } else {
                console.log(`Failed to listen to po3rt ${port}`);
            }
        });
        return server;
    }

    // 由create方法回调触发， 第一个参数为create方法返回的

    bindClientConnect(server: TemplatedApp, callback: Function) {
        server.ws('/*', { 
            open: (ws) => {
                Object.defineProperty(ws, 'emitter', {
                    configurable: false,
                    value: new events.EventEmitter()
                });
                callback(ws); 
            },
            message: (ws, message, isBinary) => {
                ws['emitter'].emit('message', { message, isBinary })
            },
            drain: (ws) => {
                ws.getBufferedAmount(); // to simulate some work
            },
            close: (ws, code, message) => {
                ws.send('close');
            },
        });
    }

    // 将传入消息绑定到相应的消息处理程序
    // 该方法会拿到在 Gateway 类中通过 @SubscribeMessage() 装饰器标记的方法列表
    bindMessageHandlers(
        client: WebSocket,
        handlers: MessageMappingProperties[],
        process: (data: { message: ArrayBuffer, isBinary: boolean }) => Observable<{ message: ArrayBuffer, isBinary: boolean }>
    ) {
        const message$ = fromEvent(client['emitter'], 'message');
        message$
            .pipe(
                mergeMap((data: { message: ArrayBuffer, isBinary: boolean }) => this.bindMessageHandler(data, handlers, process)),
                filter(result => result)
            )
            .subscribe(response => {
                client.send(JSON.stringify(response));
            });
    }
    
    // handlers 是sub
    bindMessageHandler(
        buffer: { message: ArrayBuffer, isBinary: boolean },
        handlers: MessageMappingProperties[],
        process: (data: any) => Observable<any>
    ) {
        console.log('🚀 ~ UWebSocketAdapter ~ isBinary:', buffer.isBinary);
        const stringMessageData = Buffer.from(buffer.message).toString('utf-8');
        const message = JSON.parse(stringMessageData);
        const messageHandler = handlers.find(
            handler => handler.message === message.event
        )

        if (!messageHandler) {
            return EMPTY;
        }

        return process(messageHandler.callback(message))
    }

    close(server: any) {
        server.close();
    }
}
