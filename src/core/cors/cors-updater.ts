import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from '@core/app/app.service';

@Injectable()
export class CorsUpdater {
    constructor(
        private readonly appService: AppService,
        private readonly configService: ConfigService,
    ) {}

    private headers = [
        'Accept',
        'Authorization',
        'Content-Type',
        'X-Requested-With',
        'apollo-require-preflight',
        'x-apollo-operation-name',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Methods',
        'Access-Control-Allow-Credentials',
    ];

    private BASE_URLS = ['http://localhost:3000'];

    update(urls?: string[]) {
        const app = this.appService.getAppInstance();

        const methods = ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE', 'PATCH'];

        switch (this.configService.get('ENVIRONMENT_TYPE')) {
            case 'dev':
                app.enableCors({
                    origin: [...this.BASE_URLS, ...(urls ?? [])],
                    methods: methods,
                    credentials: true,
                });
                break;
            case 'prod':
                app.enableCors({
                    origin: [...this.BASE_URLS, ...(urls ?? [])],
                    methods: methods,
                    credentials: true,
                });
                break;
            default:
                app.enableCors({
                    origin: '*',
                    allowedHeaders: this.headers,
                    methods: methods,
                    credentials: false,
                });
                break;
        }
    }
}
