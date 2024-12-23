import { Module } from '@nestjs/common';
import { CommonModule } from '@core/common.module';
import { FeaturesModule } from '../features/features.module';

@Module({
    imports: [CommonModule, FeaturesModule],
})
export class CoreModule {}
