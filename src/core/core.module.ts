import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { GlobalModule } from '@core/global.module';
import { RootModule } from '@root/root.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionFilter } from '@core/exceptions/global-exception-filter';

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
    ],
})
export class CoreModule {}
