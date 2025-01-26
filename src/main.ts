import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@core/config/variables';
import { AppService } from '@core/app/app.service';
import { CorsUpdater } from '@core/cors/cors-updater';
import helmet from 'helmet';
import { CoreModule } from '@core/core.module';
import { LoggerService } from '@core/logger/logger';

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

    const isProductionMode = configService.get('NODE_ENV') === 'production';
    if (!isProductionMode) {
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

    app.use(
        helmet({
            crossOriginEmbedderPolicy: false,
            contentSecurityPolicy: {
                directives: {
                    imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
                    scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
                    manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
                    frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
                },
            },
        }),
    );

    await app.listen(configService.get('PORT'));
    const baseEndpoint = configService.get('BACKEND_URL');
    const logger = app.get(LoggerService);
    logger.info(`App started on the ${baseEndpoint}`);
    if (!isProductionMode) {
        logger.info(`Swagger is available on the ${baseEndpoint}/api/docs`);
        logger.info(`Graphql is available on the ${baseEndpoint}/graphql`);
    }
}

bootstrap();
