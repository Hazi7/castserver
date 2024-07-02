import { HttpException, HttpStatus } from "@nestjs/common";
import type { SMTPError } from "nodemailer/lib/smtp-connection";
import { SmtpStatusEnum, SmtpStatusMessages } from "../constants/smtp-status.constant";

export class SmtpException extends HttpException {
    constructor(exception: SMTPError) {

        const status = HttpStatus.INTERNAL_SERVER_ERROR;
        const message = SmtpStatusMessages[exception.responseCode] || 'SMTP服务器异常'

        super(message, status);
    }
}