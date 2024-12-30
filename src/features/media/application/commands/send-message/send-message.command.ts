import { SendMessageDto } from '@media/domain/dto/send-message.dto';

export class SendMessageCommand {
    constructor(public readonly sendMessageDto: SendMessageDto) {}
}
