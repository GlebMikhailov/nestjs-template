import { Injectable } from '@nestjs/common';
import { ITelegramRepository } from '@media/domain/ports/telegram.repository.interface';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { TTelegramMessageType } from '@media/domain/dto/send-message.dto';
import { EnvironmentVariables } from '@core/config/variables';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TelegramRepository implements ITelegramRepository {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService<EnvironmentVariables>,
    ) {}

    readonly botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    readonly chatId = this.configService.get<string>('TELEGRAM_CHAT_ID');

    private readonly url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;

    async sendMessage(message: string, mode: TTelegramMessageType = 'HTML'): Promise<void> {
        const payload = {
            chat_id: this.chatId,
            text: message,
            parse_mode: mode,
        };

        await firstValueFrom(this.httpService.post(this.url, payload));
    }
}
