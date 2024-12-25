import { CoreModule } from '@core/core.module';
import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(CoreModule, {
        logger: ['error', 'warn', 'fatal'],
    });
    app.select(CommandModule).get(CommandService).exec();
    await app.close();
}

bootstrap();
