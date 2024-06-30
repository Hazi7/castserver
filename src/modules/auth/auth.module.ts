import { Module } from "@nestjs/common";
import { AccountService } from "./services/account.service";
import { AccountController } from "./controllers/account.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { EmailController } from "./controllers/email.controller";
import { EmailService } from "./services/email.service";

@Module({
    imports: [PrismaModule],
    controllers: [AccountController, EmailController],
    providers: [AccountService, EmailService]
})

export class AuthModule {}