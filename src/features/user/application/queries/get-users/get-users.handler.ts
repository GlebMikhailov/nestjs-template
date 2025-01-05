import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { USER_DATABASE_REPOSITORY_TOKEN } from '@user/infrastructure/providers/database.repository.provider';
import { IUserDatabaseRepository } from '@user/domain/ports/user-database.repository.interface';
import { UsersList } from '@user/domain/models/user.model';
import { GetUsersQuery } from '@user/application/queries/get-users/get-users.query';

@Injectable()
@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
    constructor(
        @Inject(USER_DATABASE_REPOSITORY_TOKEN)
        private readonly userDatabaseRepository: IUserDatabaseRepository,
    ) {}

    async execute(query: GetUsersQuery): Promise<UsersList> {
        const { getUsersDto } = query;
        return this.userDatabaseRepository.getAllUsers(getUsersDto);
    }
}
