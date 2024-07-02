import type { Redis } from "ioredis";

export class RedisService {
    constructor(private readonly redis: Redis) {}

    async get(key: string): Promise<string> {
    return this.redis.get(key);
    }

    async set(key: string, value: string): Promise<void> {
    await this.redis.set(key, value);
    }
}