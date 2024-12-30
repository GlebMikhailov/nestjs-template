import { TelegramRepository } from '@media/infrastructure/adapters/providers/telegram.repository';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@core/config/variables';

export const TELEGRAM_REPOSITORY_TOKEN = 'TELEGRAM_REPOSITORY_TOKEN';

export const TelegramRepositoryProvider = {
    provide: TELEGRAM_REPOSITORY_TOKEN,
    useFactory: (httpService: HttpService, configService: ConfigService<EnvironmentVariables>) => {
        return new TelegramRepository(httpService, configService);
    },
    inject: [HttpService, ConfigService],
};
