import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSessionsQuery } from './get-sessions.query';
import { AUTH_DATABASE_REPOSITORY_TOKEN } from '../../../infrastructure/providers/database.repository.provider';
import { IDatabaseRepository } from '../../../domain/ports/database.repository.interface';
import { SessionsResponse } from '../../../domain/dto/sessions.response';

@Injectable()
@QueryHandler(GetSessionsQuery)
export class GetSessionsHandler implements IQueryHandler<GetSessionsQuery> {
    constructor(
        @Inject(AUTH_DATABASE_REPOSITORY_TOKEN)
        private readonly databaseRepository: IDatabaseRepository,
    ) {}

    async execute(query: GetSessionsQuery): Promise<SessionsResponse[]> {
        const sessions = await this.databaseRepository.getSessions(
            query.accessToken,
        );
        return sessions.map((session) => new SessionsResponse(session));
    }
}
