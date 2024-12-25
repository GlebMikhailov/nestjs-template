import { Module } from '@nestjs/common';
import { CommandHandlers } from './commands';
import { QueryHandlers } from './query';
import { AuthInfrastructureModule } from '../infrastructure/auth-infrastructure.module';
import { UserInfrastructureModule } from '@user/infrastructure/user-infrastructure.module';

@Module({
    imports: [AuthInfrastructureModule, UserInfrastructureModule],
    providers: [...CommandHandlers, ...QueryHandlers],
    exports: [...CommandHandlers, ...QueryHandlers],
})
export class AuthApplicationModule {}
