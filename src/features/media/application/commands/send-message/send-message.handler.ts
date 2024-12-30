import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendMessageCommand } from './send-message.command';
import { TELEGRAM_REPOSITORY_TOKEN } from '@media/infrastructure/providers/telegram.repository.provider';
import { ITelegramRepository } from '@media/domain/ports/telegram.repository.interface';

@Injectable()
@CommandHandler(SendMessageCommand)
export class SendMessageHandler implements ICommandHandler<SendMessageCommand> {
    constructor(
        @Inject(TELEGRAM_REPOSITORY_TOKEN)
        private readonly telegramRepository: ITelegramRepository,
    ) {}

    async execute(command: SendMessageCommand) {
        const { sendMessageDto } = command;
        await this.telegramRepository.sendMessage(sendMessageDto.message, 'HTML');
    }
}
