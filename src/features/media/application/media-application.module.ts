import { Module } from '@nestjs/common';
import { MediaInfrastructureModule } from '@media/infrastructure/media-infrastructure.module';
import { CommandHandlers } from '@media/application/commands';

@Module({
    imports: [MediaInfrastructureModule],
    providers: [...CommandHandlers],
    exports: [...CommandHandlers],
})
export class MediaApplicationModule {}
