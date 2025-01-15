import { Resolver, Query } from '@nestjs/graphql';
import { Clients } from '@core/http/rest/request.info';
import { GraphqlUserResponse } from '@user/domain/dto/graphql-user.response';
import { Client, TClient } from '@core/http/client';
import { GetUserQuery } from '@user/application/queries/get-user/get-user.query';
import { QueryBus } from '@nestjs/cqrs';

@Resolver()
export class UserResolver {
    constructor(private readonly queryBus: QueryBus) {}

    @Query(() => GraphqlUserResponse)
    @Clients('User')
    async getUser(@Client() client: TClient) {
        return this.queryBus.execute(new GetUserQuery(client.user.userId));
    }
}
