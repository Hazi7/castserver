import { Catch, HttpException, type ArgumentsHost, ExceptionFilter, BadRequestException } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { ResponseModel } from "../models/response.model";
import { PrismaException } from "../exceptions/prisma.exception";

@Catch(
    HttpException,
    PrismaException,
    BadRequestException
)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const res = ctx.getResponse<FastifyReply>();
        const req = ctx.getRequest<FastifyRequest>();
        
        const statusCode = exception.getStatus();
        const message = exception.message;
        
        const resModel = ResponseModel.error(statusCode, message, req.url, exception.name)

        res.status(statusCode).send(resModel);
    }
}