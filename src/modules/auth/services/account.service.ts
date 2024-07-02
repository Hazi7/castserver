import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Prisma } from "@prisma/client";
import { PrismaException } from "src/common/exceptions/prisma.exception";
import { SmtpException } from "src/common/exceptions/smtp.exception";
import { PrismaService } from "src/prisma/prisma.service";
import { EmailService } from "src/shared/mailer/email.service";

@Injectable()
export class AccountService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly emailService: EmailService,
        private readonly jwtService: JwtService
    ) {}

    async createUser(data: Prisma.UserCreateInput) {
        try {
            return await this.prismaService.user.create({
                data
            });
        } catch (error) {
            throw new PrismaException(error);
        }
    }

    async findUserByEmail(email: string) {
        try {
            return await this.prismaService.user.findUnique({
                where: {
                    email
                }
            });
        } catch (error) {
            throw new PrismaException(error);
        }
    }

    async verifyCode(token: string) {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            throw new SmtpException(error);
        }
    }

    async updateUserVerificationStatus(email: string) {
        try {
            return await this.prismaService.user.update({
                where: { email },
                data: { isVerified: true }
            })
        } catch (error) {
            throw new PrismaException(error);
        }
    }

}