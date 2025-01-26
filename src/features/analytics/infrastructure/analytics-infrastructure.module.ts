import { Module } from '@nestjs/common';
import { HttpControllers } from '@analytics/infrastructure/adapters/http/controllers';
import { Providers } from '@analytics/infrastructure/providers';

@Module({
    controllers: [...HttpControllers],
    providers: [...Providers],
    exports: [...Providers],
})
export class AnalyticsInfrastructureModule {}
