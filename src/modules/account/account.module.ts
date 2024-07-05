import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from 'src/shared/mailer/email.service';
import { AccountService } from './account.service';

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
export class AccountModule {}
