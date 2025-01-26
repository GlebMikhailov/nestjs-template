import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { RestRequestInfo } from '@core/http/rest/request.info';
import { GetNewUsersQuery } from '@analytics/application/queries/get-new-users/get-new-users.query';
import { NewUsersResponse } from '@analytics/domain/dto/new-users.response';

@Controller('analytics')
@ApiTags('Analytics')
export class AnalyticsController {
    constructor(private readonly queryBus: QueryBus) {}

    @Get('metrics/sign-in')
    @RestRequestInfo({
        description: 'Total sign-in',
        success: {
            code: 200,
            type: NewUsersResponse,
        },
        authorization: {
            user: {
                roles: ['Owner'],
            },
        },
    })
    async getSignIn() {
        return await this.queryBus.execute(new GetNewUsersQuery());
    }
}
