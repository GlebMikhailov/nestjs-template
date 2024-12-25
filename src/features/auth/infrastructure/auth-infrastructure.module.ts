import { Module } from '@nestjs/common';
import { HttpControllers } from './adapters/http/controllers';
import { Providers } from './providers';

@Module({
    controllers: [...HttpControllers],
    providers: [...Providers],
    exports: [...Providers],
})
export class AuthInfrastructureModule {}
