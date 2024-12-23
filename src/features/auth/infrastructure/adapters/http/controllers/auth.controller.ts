import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SignInDto } from '@auth/domain/dto/sign-in.dto';
import { SignInCommand } from '@auth/application/commands/sign-in/sign-in.command';
import { RestRequestInfo } from '@core/http/rest/request.info';
import { SessionResponse } from '@auth/domain/dto/session.response';

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
            code: '200',
            type: SessionResponse,
        },
        badRequest: {},
    })
    async signIn(@Body() signInDto: SignInDto) {
        return await this.commandBus.execute(new SignInCommand(signInDto));
    }
}
