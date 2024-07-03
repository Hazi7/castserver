import { HttpException, HttpStatus, InternalServerErrorException } from "@nestjs/common";
import type { SMTPError } from "nodemailer/lib/smtp-connection";
import { SmtpStatusMessages } from "../constants/smtp-status.constant";

export class SmtpException extends InternalServerErrorException {
    constructor(exception: SMTPError) {
        
        const message = SmtpStatusMessages[exception.responseCode] || 'SMTP服务器异常'

        super(message);
    }
}