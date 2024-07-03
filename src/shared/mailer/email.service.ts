import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { generateHtml } from 'src/common/utils/mjml.util';
import { JwtService } from '@nestjs/jwt';
import { SmtpException } from 'src/common/exceptions/smtp.exception';
import type { SMTPError } from 'nodemailer/lib/smtp-connection';


@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;
    constructor( private readonly jwtService: JwtService ) {
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
                    minVersion: 'TLSv1.3'
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
        const token = this.jwtService.sign(
            {
                email: email
            }, 
            {
                secret: process.env.JWT_SECRET,
            }
        );
        const url = `http://localhost:81/users/confirm-authentication?token=${token}`

        const mailOptions = {
            from: `Webcaster<${process.env.EMAIL_USER}>`, // 发件人
            to: email, // 收件人
            subject: `🎉Webcaster 邮箱验证🎉`, // 邮件主题
            html: generateHtml(url)
        };
        
        await this.transporter.sendMail(mailOptions).catch((error: SMTPError) => {
            throw new SmtpException(error);
        })
    }

    async verifyCode(token: string) {
        try {
            return await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}