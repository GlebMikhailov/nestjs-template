import { Module } from '@nestjs/common';
import { QueryHandlers } from '@analytics/application/queries';
import { EventHandlers } from 'src/features/analytics/application/events';
import { AnalyticsInfrastructureModule } from '@analytics/infrastructure/analytics-infrastructure.module';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';
import { NEW_USER_METRIC } from '@analytics/application/metrics-names';

@Module({
    imports: [AnalyticsInfrastructureModule],
    providers: [
        ...EventHandlers,
        ...QueryHandlers,
        makeCounterProvider({
            name: NEW_USER_METRIC,
            help: 'Metric for new users',
        }),
    ],
    exports: [...EventHandlers, ...QueryHandlers],
})
export class AnalyticsApplicationModule {}
