import { registerAs } from "@nestjs/config";

export const redisRegToken = 'redis';

export const redisConfig = registerAs(redisRegToken, () => ({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
}));