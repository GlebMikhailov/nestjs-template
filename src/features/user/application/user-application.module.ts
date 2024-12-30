import { Module } from '@nestjs/common';
import { CommandHandlers } from './commands';
import { UserInfrastructureModule } from '@user/infrastructure/user-infrastructure.module';
import { QueryHandlers } from '@user/application/queries';

@Module({
    imports: [UserInfrastructureModule],
    providers: [...CommandHandlers, ...QueryHandlers],
    exports: [...CommandHandlers, ...QueryHandlers],
})
export class UserApplicationModule {}
