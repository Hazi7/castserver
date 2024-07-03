import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Prisma, PrismaClient, type User } from "@prisma/client";
import { PrismaException } from "src/common/exceptions/prisma.exception";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import { isEmail, isMobilePhone } from "class-validator";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(accountIdentifier: string, password: string) {
        let user: User;
        
        if (isEmail(accountIdentifier)) {
            user = await this.findUserByUniqueField({ email: accountIdentifier });
        } else if (isMobilePhone(accountIdentifier, "zh-CN")) {
            user = await this.findUserByUniqueField({ phoneNumber: accountIdentifier });
        } else {
            user = await this.findUserByUniqueField({ username: accountIdentifier });
        }

        if (!user) {
            throw new BadRequestException('🍇账户不存在，请先注册🍇');
        }

        const isValid = await bcrypt.compare(password, user.password);

        return isValid;
    }

    async findUserByUniqueField(where: Prisma.UserWhereUniqueInput) {
        try {
            return await this.prismaService.user.findUnique({ where });
        } catch(error) {
            throw new PrismaException(error);
        }
    }

    async updateUserByUniqueField(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {
        console.log('🚀 ~ AccountService ~ updateUserByUniqueField ~ where:', where);
        try {
            return await this.prismaService.user.update({
                where,
                data
            })
        } catch (error) {
            console.log('🚀 ~ AccountService ~ updateUserByUniqueField ~ error:', error);
            throw new PrismaException(error);
        }
    }

}