import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto } from '@user/domain/dto/create-user.dto';
import { CreateUserCommand } from '@user/application/commands/create-user/create-user.command';

@Injectable()
export class RootCommand {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Command({
        command: 'seed:run',
        describe: 'Seed the database',
    })
    async seed() {
        const admin = new CreateUserDto('administdrator', 'p@ssw00rd', 'Admin');
        await this.commandBus.execute(new CreateUserCommand(admin));
    }
}
