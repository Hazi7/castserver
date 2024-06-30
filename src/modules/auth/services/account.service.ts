import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AccountService {
    constructor(private readonly prismaService: PrismaService) {}

    async createUser(data: Prisma.UserCreateInput) {
        return this.prismaService.user.create({
            data
        });
    }

}