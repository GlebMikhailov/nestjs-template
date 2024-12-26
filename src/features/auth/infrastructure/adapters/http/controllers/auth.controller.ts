import { Body, Controller, Delete, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SignInDto } from '@auth/domain/dto/sign-in.dto';
import { SignInCommand } from '@auth/application/commands/sign-in/sign-in.command';
import { RestRequestInfo } from '@core/http/rest/request.info';
import { SessionResponse } from '@auth/domain/dto/session.response';
import { SignOutCommand } from '@auth/application/commands/sign-out/sign-out.command';
import { Request } from 'express';
import { Client, TClient } from '@core/http/client';
import { UpdateTokenCommand } from '@auth/application/commands/update-tokens/update-token.command';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Post('sign-in')
    @RestRequestInfo({
        description: 'Sign in',
        success: {
            code: 200,
            type: SessionResponse,
        },
        badRequest: {},
    })
    async signIn(@Body() signInDto: SignInDto) {
        return await this.commandBus.execute(new SignInCommand(signInDto));
    }

    @Delete()
    @RestRequestInfo({
        description: 'Sign out',
        success: {
            code: 204,
        },
        authorization: {
            user: {
                roles: '*',
            },
        },
    })
    async signOut(@Client() client: TClient) {
        await this.commandBus.execute(new SignOutCommand(client.value));
    }

    @Post('update-tokens')
    @RestRequestInfo({
        description: 'Update tokens',
        success: {
            code: 200,
            type: SessionResponse,
        },
        authorization: {
            user: {
                roles: '*',
                jwtTokenType: 'Refresh',
            },
        },
    })
    async updateTokens(@Req() req: Request) {
        return this.commandBus.execute(new UpdateTokenCommand(req['client-info'].accessToken));
    }
}
