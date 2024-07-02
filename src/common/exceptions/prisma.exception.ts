import { HttpException, HttpStatus } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import { PrismaStatusEnum, PrismaStatusMessages } from "../constants/prisma-status.constant";

export class PrismaException extends HttpException {
    constructor(exception: Prisma.PrismaClientKnownRequestError) {
        const { code } = exception;

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = PrismaStatusMessages[code] || '操作数据库异常';

        super(message, status);
    }
} 