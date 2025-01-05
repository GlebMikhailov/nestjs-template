import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common';
import { GlobalModule } from '@core/global.module';
import { RootModule } from '@root/root.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { GlobalExceptionFilter } from '@core/exceptions/global-exception-filter';
import { makeCounterProvider, makeHistogramProvider } from '@willsoto/nestjs-prometheus';
import { LoggingInterceptor } from '@core/logger/logging.interceptor';

@Module({
    imports: [GlobalModule, RootModule],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                transform: true,
                whitelist: true,
                transformOptions: { enableImplicitConversion: true },
            }),
        },
        makeCounterProvider({
            name: 'http_requests_total',
            help: 'The total number of processed queries',
        }),
        makeHistogramProvider({
            name: 'http_request_duration_seconds',
            help: 'Duration of HTTP requests in seconds',
            buckets: [5, 10, 30, 50, 100, 250, 300, 600, 700, 1000],
        }),
    ],
})
export class CoreModule {}
