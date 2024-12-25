import { Body, Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SignInDto } from '@auth/domain/dto/sign-in.dto';
import { SignInCommand } from '@auth/application/commands/sign-in/sign-in.command';
import { RestRequestInfo } from '@core/http/rest/request.info';
import { SessionResponse } from '@auth/domain/dto/session.response';
import { Request } from 'express';

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
            code: '200',
            type: SessionResponse,
        },
        badRequest: {},
        authorization: {
            user: {
                roles: '*',
            },
        },
    })
    async getUser(@Req() request: Request) {
        console.log('client', request['client-info']);
    }
}
