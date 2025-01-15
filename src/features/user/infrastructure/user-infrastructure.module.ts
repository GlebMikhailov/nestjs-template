import { Module } from '@nestjs/common';
import { Providers } from './providers';
import { HttpControllers } from '@user/infrastructure/adapters/http/controllers';
import { GraphqlResolvers } from '@user/infrastructure/adapters/http/resolvers';

@Module({
    controllers: [...HttpControllers],
    providers: [...Providers, ...GraphqlResolvers],
    exports: [...Providers],
})
export class UserInfrastructureModule {}
