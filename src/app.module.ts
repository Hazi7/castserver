import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LiveModule } from './modules/live/live.module';

@Module({
  imports: [LiveModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
