import { Module } from "@nestjs/common";
import { AccountService } from "./services/account.service";
import { AccountController } from "./controllers/account.controller";
import { EmailService } from "../../shared/mailer/email.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({
            secret: 'your-secret-key',
        })
    ],
    controllers: [AccountController],
    providers: [AccountService, EmailService]
})

export class AuthModule {}