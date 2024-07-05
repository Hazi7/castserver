import { Module } from '@nestjs/common';
import { LiveModule } from './modules/live/live.module';
import { AuthModule } from './modules/auth/auth.module';
import { AccountModule } from './modules/account/account.module';
import { LivestreamModule } from './modules/livestream/livestream.module';

@Module({
    imports: [LivestreamModule, AuthModule, AccountModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
