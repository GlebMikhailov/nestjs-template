import { Module } from '@nestjs/common';
import { UserApplicationModule } from '@user/application/user-application.module';
import { UserInfrastructureModule } from '@user/infrastructure/user-infrastructure.module';

@Module({
    imports: [UserApplicationModule, UserInfrastructureModule],
})
export class UserModuleModule {}
