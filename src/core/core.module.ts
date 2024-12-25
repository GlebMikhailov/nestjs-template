import { Module } from '@nestjs/common';
import { GlobalModule } from '@core/global.module';
import { RootModule } from '@root/root.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from '@core/exceptions/global-exception-filter';

@Module({
    imports: [GlobalModule, RootModule],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
    ],
})
export class CoreModule {}
