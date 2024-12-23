import { Module } from '@nestjs/common';
import { CommandHandlers } from './commands';
import { QueryHandlers } from './query';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

@Module({
    imports: [InfrastructureModule],
    providers: [...CommandHandlers, ...QueryHandlers],
    exports: [...CommandHandlers, ...QueryHandlers],
})
export class ApplicationModule {}
