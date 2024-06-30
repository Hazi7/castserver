import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LiveModule } from './modules/live/live.module';
import { AuthModule } from './modules/auth/auth.module';
import { AllExceptionsFilter } from './common/filters/all.filter';

@Module({
    imports: [LiveModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
