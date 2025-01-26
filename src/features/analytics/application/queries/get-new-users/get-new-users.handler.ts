import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { GetNewUsersQuery } from './get-new-users.query';
import { ANALYTICS_VIKTORIA_REPOSITORY_TOKEN } from '@analytics/infrastructure/providers/database.repository.provider';
import { IViktoriaRepository } from '@analytics/domain/ports/viktoria-repository.repository.interface';
import { NewUsersResponse } from '@analytics/domain/dto/new-users.response';

@Injectable()
@QueryHandler(GetNewUsersQuery)
export class GetNewUsersHandler implements IQueryHandler<GetNewUsersQuery> {
    constructor(
        @Inject(ANALYTICS_VIKTORIA_REPOSITORY_TOKEN)
        private readonly viktoriaRepository: IViktoriaRepository,
    ) {}

    async execute(): Promise<NewUsersResponse> {
        return this.viktoriaRepository.getNewUsers();
    }
}
