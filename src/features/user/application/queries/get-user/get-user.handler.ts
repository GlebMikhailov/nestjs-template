import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { GetUserQuery } from '@user/application/queries/get-user/get-user.query';
import { USER_DATABASE_REPOSITORY_TOKEN } from '@user/infrastructure/providers/database.repository.provider';
import { IUserDatabaseRepository } from '@user/domain/ports/user-database.repository.interface';
import { User } from '@user/domain/models/user.model';

@Injectable()
@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
    constructor(
        @Inject(USER_DATABASE_REPOSITORY_TOKEN)
        private readonly userDatabaseRepository: IUserDatabaseRepository,
    ) {}

    async execute(query: GetUserQuery): Promise<User> {
        return await this.userDatabaseRepository.getUserById(query.id);
    }
}
