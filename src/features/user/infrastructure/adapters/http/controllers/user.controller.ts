import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RestRequestInfo } from '@core/http/rest/request.info';
import { Client, TClient } from '@core/http/client';
import { GetUserQuery } from '@user/application/queries/get-user/get-user.query';
import { UserResponse } from '@user/domain/dto/user.response';

@Controller('users')
@ApiTags('User')
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @RestRequestInfo({
        description: "Get current requestor's user",
        success: {
            code: 200,
            type: UserResponse,
        },
        badRequest: {},
        authorization: {
            user: {
                roles: '*',
            },
        },
    })
    async getUser(@Client() client: TClient) {
        return this.queryBus.execute(new GetUserQuery(client.user.userId, client.user.role));
    }
}
