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
import { CommandModule } from 'nestjs-command';
import { LoggerService } from '@core/logger/logger';
import { HttpModule } from '@nestjs/axios';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { EnvironmentVariables } from '@core/config/variables';

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
        CommandModule,
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 2,
        }),
        PrometheusModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService<EnvironmentVariables>) => {
                return {
                    pushgateway: {
                        url: configService.get<string>('PUSHGATEWAY_URL'),
                    },
                };
            },
        }),
    ],
    providers: [AppService, CorsUpdater, LoggerService],
    exports: [
        CqrsModule,
        ConfigModule,
        JwtModule,
        PersistenceModule,
        EventEmitterModule,
        CorsUpdater,
        CommandModule,
        LoggerService,
        HttpModule,
    ],
})
export class GlobalModule {}
