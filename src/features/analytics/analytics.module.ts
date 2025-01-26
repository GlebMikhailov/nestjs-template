import { Module } from '@nestjs/common';
import { AnalyticsApplicationModule } from '@analytics/application/analytics-application.module';
import { AnalyticsInfrastructureModule } from '@analytics/infrastructure/analytics-infrastructure.module';

@Module({
    imports: [AnalyticsApplicationModule, AnalyticsInfrastructureModule],
})
export class AnalyticsModule {}
