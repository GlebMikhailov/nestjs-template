import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSessionsQuery } from './get-sessions.query';
import { IAuthDatabaseRepository } from '@auth/domain/ports/auth-database.repository.interface';
import { SessionsResponse } from '@auth/domain/dto/sessions.response';
import { AUTH_DATABASE_REPOSITORY_TOKEN } from '@auth/infrastructure/providers/database.repository.provider';

@Injectable()
@QueryHandler(GetSessionsQuery)
export class GetSessionsHandler implements IQueryHandler<GetSessionsQuery> {
    constructor(
        @Inject(AUTH_DATABASE_REPOSITORY_TOKEN)
        private readonly databaseRepository: IAuthDatabaseRepository,
    ) {}

    async execute(query: GetSessionsQuery): Promise<SessionsResponse[]> {
        const sessions = await this.databaseRepository.getUserSessions(query.accessToken);
        return sessions.map((session) => new SessionsResponse(session));
    }
}
