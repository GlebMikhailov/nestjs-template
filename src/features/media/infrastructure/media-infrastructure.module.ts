import { Module } from '@nestjs/common';
import { Providers } from './providers';

@Module({
    providers: [...Providers],
    exports: [...Providers],
})
export class MediaInfrastructureModule {}
