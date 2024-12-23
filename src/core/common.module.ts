import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { validate } from './config/env.validation';
import { PersistenceModule } from './persistence/persistence.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppService } from '@core/app/app.service';
import { CorsUpdater } from '@core/cors/cors-updater';
import { ThrottlerModule } from '@nestjs/throttler';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            validate: validate,
            isGlobal: true,
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get('JWT_SECRET'),
                };
            },
        }),
        CqrsModule,
        PersistenceModule,
        EventEmitterModule.forRoot(),
        ThrottlerModule.forRoot([
            {
                ttl: 10_000,
                limit: 20,
            },
        ]),
    ],
    providers: [AppService, CorsUpdater],
    exports: [
        CqrsModule,
        ConfigModule,
        JwtModule,
        PersistenceModule,
        EventEmitterModule,
        CorsUpdater,
    ],
})
export class CommonModule {}
