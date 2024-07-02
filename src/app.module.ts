import { Module } from '@nestjs/common';
import { LiveModule } from './modules/live/live.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [LiveModule, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
