import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RestRequestInfo, TClientType } from '@core/http/rest/request.info';
import { SessionResponse } from '@auth/domain/dto/session.response';
import { Client } from '@core/http/client';

@Controller('user')
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
            type: SessionResponse,
        },
        badRequest: {},
        authorization: {
            user: {
                roles: '*',
            },
        },
    })
    async getUser(@Client() client: TClientType) {
        console.log('client', client);
    }
}
