import { Catch, HttpException, HttpStatus, type ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import type { FastifyRequest } from "fastify";
import type { FastifyReply } from "fastify/types/reply";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();
        const request = ctx.getRequest<FastifyRequest>();
        const status = 
        exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        
        response.code(status).send({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}