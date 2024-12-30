import { Module } from '@nestjs/common';
import { MediaInfrastructureModule } from '@media/infrastructure/media-infrastructure.module';
import { MediaApplicationModule } from '@media/application/media-application.module';

@Module({
    imports: [MediaApplicationModule, MediaInfrastructureModule],
})
export class MediaModule {}
