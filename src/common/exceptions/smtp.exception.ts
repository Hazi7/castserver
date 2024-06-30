import { HttpException, HttpStatus } from "@nestjs/common";
import { SmtpCodeEnum } from "src/constants/smtp-code.constant";

export class SmtpException extends HttpException {
    smtpError: string;
    constructor(message: string, status: keyof typeof HttpStatus, errorType: number) {
        super(message, HttpStatus[status]);
        this.smtpError = SmtpCodeEnum[errorType];
    }
}