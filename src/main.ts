import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@core/config/variables';
import { AppService } from '@core/app/app.service';
import { CorsUpdater } from '@core/cors/cors-updater';
import helmet from 'helmet';
import { CoreModule } from '@core/core.module';

async function bootstrap() {
    const app = await NestFactory.create(CoreModule);
    const configService: ConfigService<EnvironmentVariables> = app.get(ConfigService);

    app.setGlobalPrefix('api');

    const appService = app.get<AppService>(AppService);
    const corsUpdater = app.get<CorsUpdater>(CorsUpdater);
    appService.setAppInstance(app);

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    corsUpdater.update();

    if (configService.get('NODE_ENV') !== 'production') {
        const config = new DocumentBuilder()
            .setTitle('Template')
            .setDescription('The templates API description')
            .setVersion('1.0')
            .addBearerAuth(
                {
                    description: `[just text field] Please enter token in following format: Bearer <JWT>`,
                    name: 'Authorization',
                    bearerFormat: 'Bearer',
                    scheme: 'Bearer',
                    type: 'http',
                    in: 'Header',
                },
                'Access',
            )
            .addBearerAuth(
                {
                    description: `[just text field] Please enter token in following format: Bearer <JWT>`,
                    name: 'Authorization',
                    bearerFormat: 'Bearer',
                    scheme: 'Bearer',
                    type: 'http',
                    in: 'Header',
                },
                'Refresh',
            )
            .build();
        const documentFactory = () => SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api/docs', app, documentFactory);
    }

    app.use(helmet());

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: { enableImplicitConversion: true },
        }),
    );

    await app.listen(configService.get('PORT'));
}

bootstrap();
