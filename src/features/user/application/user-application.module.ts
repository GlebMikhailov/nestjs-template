import { Module } from '@nestjs/common';
import { CommandHandlers } from './commands';
import { UserInfrastructureModule } from '@user/infrastructure/user-infrastructure.module';

@Module({
    imports: [UserInfrastructureModule],
    providers: [...CommandHandlers],
    exports: [...CommandHandlers],
})
export class UserApplicationModule {}
