import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInCommand } from './sign-in.command';
import { AUTH_DATABASE_REPOSITORY_TOKEN } from '../../../infrastructure/providers/database.repository.provider';
import { IDatabaseRepository } from '../../../domain/ports/database.repository.interface';

@Injectable()
@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
    constructor(
        @Inject(AUTH_DATABASE_REPOSITORY_TOKEN)
        private readonly databaseRepository: IDatabaseRepository,
    ) {}

    async execute(command: SignInCommand) {
        const { signInDto } = command;
        return await this.databaseRepository.createSession(signInDto);
    }
}
