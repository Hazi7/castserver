import { Module } from '@nestjs/common';
import { RedisModule as NestRedisModule } from '@nestjs-modules/ioredis';

@Module({
    imports: [
        NestRedisModule.forRoot({
            type: 'single',
            url: 'redis://localhost:6379',
            options: {
              password: '1sxlo00OL'  
            }
        })
    ],
    exports: [NestRedisModule]
})
export class RedisModule {}