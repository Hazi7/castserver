import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Prisma } from "@prisma/client";
import { PrismaException } from "src/common/exceptions/prisma.exception";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async createUser(data: Prisma.UserCreateInput) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;
        } catch (error) {
            throw error;
        }

        try {
            return await this.prismaService.user.create({ data });
        } catch (error) {
            throw new PrismaException(error);
        }
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