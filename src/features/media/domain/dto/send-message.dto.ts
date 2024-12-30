export class SendMessageDto {
    constructor(readonly message: string) {}
}

export type TTelegramMessageType = 'MARKDOWN' | 'HTML';
