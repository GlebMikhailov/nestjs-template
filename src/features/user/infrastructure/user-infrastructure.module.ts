import { Module } from '@nestjs/common';
import { Providers } from './providers';
import { HttpControllers } from '@user/infrastructure/adapters/http/controllers';

@Module({
    controllers: [...HttpControllers],
    providers: [...Providers],
    exports: [...Providers],
})
export class UserInfrastructureModule {}
