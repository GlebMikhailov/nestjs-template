import { Module } from '@nestjs/common';
import { AuthModule } from '@auth/auth.module';
import { RootCommand } from './infrastructure/adapters/commands';
import { CommandModule } from 'nestjs-command';
import { ConfigService } from '@nestjs/config';
import { UserModuleModule } from '@user/user.module';
import { MediaApplicationModule } from '@media/application/media-application.module';
import { AnalyticsModule } from '@analytics/analytics.module';

@Module({
    imports: [AuthModule, CommandModule, UserModuleModule, MediaApplicationModule, AnalyticsModule],
    providers: [RootCommand, ConfigService],
})
export class RootModule {}
