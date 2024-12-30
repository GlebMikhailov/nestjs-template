import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IAuthDatabaseRepository } from '@auth/domain/ports/auth-database.repository.interface';
import { AUTH_DATABASE_REPOSITORY_TOKEN } from '@auth/infrastructure/providers/database.repository.provider';
import { UpdateTokenCommand } from '@auth/application/commands/update-tokens/update-token.command';

@Injectable()
@CommandHandler(UpdateTokenCommand)
export class UpdateTokenHandler implements ICommandHandler<UpdateTokenCommand> {
    constructor(
        @Inject(AUTH_DATABASE_REPOSITORY_TOKEN)
        private readonly authDatabaseRepository: IAuthDatabaseRepository,
    ) {}

    async execute(command: UpdateTokenCommand) {
        const { refreshToken } = command;
        return await this.authDatabaseRepository.updateSession(refreshToken);
    }
}
