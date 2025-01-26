import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '@user/application/commands/create-user/create-user.command';
import { IUserDatabaseRepository } from '@user/domain/ports/user-database.repository.interface';
import { UserAlreadyCreated } from '@user/domain/user.exceptions';
import { USER_DATABASE_REPOSITORY_TOKEN } from '@user/infrastructure/providers/database.repository.provider';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        @Inject(USER_DATABASE_REPOSITORY_TOKEN)
        private readonly userDatabaseRepository: IUserDatabaseRepository,
    ) {}

    async execute(command: CreateUserCommand) {
        const { createUserDto } = command;
        const existingUser = await this.userDatabaseRepository.getUserByLogin(createUserDto.login);
        if (existingUser) {
            throw new UserAlreadyCreated();
        }

        const user = await this.userDatabaseRepository.createUser(createUserDto);
        user.create();
    }
}
