import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IAuthDatabaseRepository } from '@auth/domain/ports/auth-database.repository.interface';
import { AUTH_DATABASE_REPOSITORY_TOKEN } from '@auth/infrastructure/providers/database.repository.provider';
import { SignOutCommand } from '@auth/application/commands/sign-out/sign-out.command';

@Injectable()
@CommandHandler(SignOutCommand)
export class SignOutHandler implements ICommandHandler<SignOutCommand> {
    constructor(
        @Inject(AUTH_DATABASE_REPOSITORY_TOKEN)
        private readonly authDatabaseRepository: IAuthDatabaseRepository,
    ) {}

    async execute(command: SignOutCommand) {
        const { accessToken } = command;
        await this.authDatabaseRepository.deleteSession(accessToken);
    }
}
