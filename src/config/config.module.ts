import { Module } from "@nestjs/common";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.development.local', '.env.development'],
            isGlobal: true,
        })
    ],
})
export class ConfigModule {}