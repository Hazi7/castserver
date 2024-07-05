import { Catch, HttpException, type ArgumentsHost, ExceptionFilter, BadRequestException, NotFoundException } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { ResponseModel } from "../models/response.model";
import { PrismaException } from "../exceptions/prisma.exception";

@Catch(
    HttpException,
    PrismaException,
    BadRequestException,
    NotFoundException
)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const res = ctx.getResponse<FastifyReply>();
        const req = ctx.getRequest<FastifyRequest>();
        
        const statusCode = exception.getStatus();
        const exceptionRes: any = exception.getResponse();

        const message = typeof exceptionRes?.message === 'string' ? exceptionRes.message : exceptionRes.message[0];
        
        const resModel = ResponseModel.error(statusCode, message, req.url, exception.name)

        res.status(statusCode).send(resModel);
    }
}