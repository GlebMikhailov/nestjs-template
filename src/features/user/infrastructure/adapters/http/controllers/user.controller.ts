import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RestRequestInfo } from '@core/http/rest/request.info';
import { Client, TClient } from '@core/http/client';
import { GetUserQuery } from '@user/application/queries/get-user/get-user.query';
import { UserResponse, UsersListResponse } from '@user/domain/dto/user.response';
import { GetUsersDto } from '@user/domain/dto/get-users.dto';
import { GetUsersQuery } from '@user/application/queries/get-users/get-users.query';
import { UserNotFound } from '@user/domain/user.exceptions';

@Controller('users')
@ApiTags('User')
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get('/current')
    @RestRequestInfo({
        description: "Get current requestor's user",
        success: {
            code: 200,
            type: UserResponse,
        },
        authorization: {
            user: {
                roles: '*',
            },
        },
    })
    async getUser(@Client() client: TClient) {
        return this.queryBus.execute(new GetUserQuery(client.user.userId));
    }

    @Get()
    @RestRequestInfo({
        description: 'Get list of the users',
        success: {
            code: 200,
            type: UsersListResponse,
        },
        authorization: {
            user: {
                roles: ['Admin'],
            },
        },
    })
    async getAllUsers(@Query() getUsersDto: GetUsersDto): Promise<UsersListResponse> {
        return await this.queryBus.execute(new GetUsersQuery(getUsersDto));
    }

    @Get(':userId')
    @RestRequestInfo({
        description: 'Get user by id',
        success: {
            code: 200,
            type: UserResponse,
        },
        badRequest: {},
        authorization: {
            user: {
                roles: ['Admin'],
            },
        },
    })
    async getUserById(@Param('userId') userId: string): Promise<UserResponse> {
        const user = await this.queryBus.execute(new GetUserQuery(userId));
        if (!user) {
            throw new UserNotFound();
        }
        return user;
    }
}
