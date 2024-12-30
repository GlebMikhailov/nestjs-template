import { TTelegramMessageType } from '@media/domain/dto/send-message.dto';

export interface ITelegramRepository {
    sendMessage(message: string, mode: TTelegramMessageType): Promise<void>;
}
