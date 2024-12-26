import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { EUserRole } from '@user/domain/models/role.enum';
import { extractBearerTokenFromHeader } from '@core/http/utils';

export type TTokenType = 'Access' | 'Refresh';

export type TToken = {
    type: TTokenType;
    userId: string;
    role: EUserRole;
};

export type TClient = {
    user: TToken;
    value: string;
};

export const Client = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): TClient | null => {
        const request = ctx.switchToHttp().getRequest();
        let result: TClient = null;
        if (request.headers.authorization && request['client-info']) {
            result = {
                user: request['client-info'],
                value: extractBearerTokenFromHeader(request),
            };
        }
        return result;
    },
);
