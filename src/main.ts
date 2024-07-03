import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { HttpException, ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';

(async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
        { cors: true }
    );

    const config = new DocumentBuilder()
        .setTitle('Webcaster')
        .setDescription('')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    fs.writeFileSync('./swagger.json', JSON.stringify(document));

    SwaggerModule.setup('swagger', app, document);

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new AllExceptionsFilter());

    await app.listen(81);
})();

process.on('uncaughtException', (err) => {
    console.log('🚀 ~ process.on ~ err:', err);
    // throw new HttpException(err.message, 500);
});