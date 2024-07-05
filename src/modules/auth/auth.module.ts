import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { EmailService } from "../../shared/mailer/email.service";
import { PrismaModule } from "prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({
            secret: 'your-secret-key',
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, EmailService]
})

export class AuthModule {}