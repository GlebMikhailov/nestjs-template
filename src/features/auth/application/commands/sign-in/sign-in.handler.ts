import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInCommand } from './sign-in.command';
import { IAuthDatabaseRepository } from '@auth/domain/ports/auth-database.repository.interface';
import { AUTH_DATABASE_REPOSITORY_TOKEN } from '@auth/infrastructure/providers/database.repository.provider';
import { IUserDatabaseRepository } from '@user/domain/ports/user-database.repository.interface';
import { InvalidCredentialsException } from '@auth/domain/exceptions';
import { USER_DATABASE_REPOSITORY_TOKEN } from '@user/infrastructure/providers/database.repository.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
    constructor(
        @Inject(AUTH_DATABASE_REPOSITORY_TOKEN)
        private readonly authDatabaseRepository: IAuthDatabaseRepository,
        @Inject(USER_DATABASE_REPOSITORY_TOKEN)
        private readonly userDatabaseRepository: IUserDatabaseRepository,
    ) {}

    async execute(command: SignInCommand) {
        const { signInDto } = command;
        const existingUser = await this.userDatabaseRepository.getUserByLogin(signInDto.login);
        if (!existingUser) {
            throw new InvalidCredentialsException();
        }
        const isPasswordMatch = await bcrypt.compare(signInDto.password, existingUser.password);
        if (!isPasswordMatch) {
            throw new InvalidCredentialsException();
        }
        return await this.authDatabaseRepository.createSession(existingUser.id, existingUser.role);
    }
}
