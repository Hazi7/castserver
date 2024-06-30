import { HttpException, Injectable, UseFilters } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import * as nodemailer from 'nodemailer';
import { SmtpException } from 'src/common/exceptions/smtp.exception';
import { AllExceptionsFilter } from 'src/common/filters/all.filter';
import { SmtpCodeEnum, SmtpMessageEnum } from '../../../constants/smtp-code.constant';
import { HttpExceptionFilter } from 'src/common/filters/http.filter';


@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;
    constructor() {
        try {
            this.transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: Number(process.env.EMAIL_PORT),
                secure: process.env.EMAIL_SECURE === 'true',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
                tls: {
                    rejectUnauthorized: false,
                    ciphers: 'HIGH',
                    minVersion: 'TLSv1.2'
                },
                pool: true, // 启用连接池
                maxConnections: 5, // 连接池的最大连接数
                rateLimit: 10, // 每秒最多发送的邮件数量，避免被邮件服务商限制、
            });
        } catch (error) {
            console.log(error)
        }

    }
    
    async sendVerificationCode(email: string) {
        const mailOptions = {
            from: `Webcaster<${process.env.EMAIL_USER}>`, // 发件人
            to: email, // 收件人
            subject: `验证电子邮箱：${ 3254 }`, // 邮件主题
            html: '<p>666</p>'
        };
        
        try { 
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            throw new SmtpException(SmtpMessageEnum[SmtpCodeEnum[error.responseCode]], 'INTERNAL_SERVER_ERROR', error.responseCode);
        }
    }
}