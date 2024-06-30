import { Catch, type ArgumentsHost } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { SmtpException } from "../exceptions/smtp.exception";
import { ResponseModel } from "../models/response.model";

@Catch(SmtpException)
export class HttpExceptionFilter {
    catch(exception: SmtpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const res = ctx.getResponse<FastifyReply>();
        const req = ctx.getRequest<FastifyRequest>();
        
        const statusCode = exception.getStatus();
        const message = exception.message;
        
        const resModel = ResponseModel.error(statusCode, message, req.url, exception.smtpError)

        res.status(statusCode).send(resModel);
    }
}