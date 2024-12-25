import { Module } from '@nestjs/common';
import { AuthApplicationModule } from './application/auth-application.module';
import { AuthInfrastructureModule } from './infrastructure/auth-infrastructure.module';

@Module({
    imports: [AuthApplicationModule, AuthInfrastructureModule],
})
export class AuthModule {}
