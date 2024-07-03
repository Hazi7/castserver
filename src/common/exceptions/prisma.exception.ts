import { HttpException, HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaStatusEnum, PrismaStatusMessages, type PrismaClientError } from "../constants/prisma-status.constant";
import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

export class PrismaException extends InternalServerErrorException {
    constructor(exception: PrismaClientError) {
        let message: string;
        
        if (exception instanceof PrismaClientKnownRequestError) {
            message = PrismaStatusMessages[exception.code];
        } else if (exception instanceof PrismaClientValidationError) {
            message = '数据库进行交互时，提供的输入数据未能通过验证'
        } else if (exception instanceof PrismaClientRustPanicError) {
            message = 'Prisma底层Rust引擎错误'
        } else if (exception instanceof PrismaClientUnknownRequestError) {
            message = 'Prisma无法识别或处理所发出的请求'
        } else if (exception instanceof PrismaClientInitializationError) {
            message = 'Prisma初始化异常'
        } else {
            message = '🤐数据库异常🤐'
        }

        super(message);
    }
} 
