import { Module } from '@nestjs/common';
import { UserInfrastructureModule } from '@user/infrastructure/user-infrastructure.module';
import { QueryHandlers } from '@user/application/queries';
import { CommandHandlers } from '@user/application/commands';

@Module({
    imports: [UserInfrastructureModule],
    providers: [...CommandHandlers, ...QueryHandlers],
    exports: [...CommandHandlers, ...QueryHandlers],
})
export class UserApplicationModule {}
