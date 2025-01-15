import {
    applyDecorators,
    HttpCode,
    SerializeOptions,
    SetMetadata,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TUserRole } from '@user/domain/models/role.enum';
import { AuthGuard } from '@core/http/auth.guard';
import { SerializerInterceptor } from '@core/http/serialization.interceptor';

export type TClientType = 'User' | 'Public';

export const USER_ROLES_KEY = 'user_roles';
export const CLIENTS_KEY = 'clients';

export const TOKEN_TYPE_KEY = 'tokenTypeKey';

export const UserRoles = (...roles: TUserRole[]) => SetMetadata(USER_ROLES_KEY, roles);

export const Clients = (...roles: TClientType[]) => SetMetadata(CLIENTS_KEY, roles);

export interface IUserAuthorizationMeta {
    roles: TUserRole[] | '*';
    /**
     * @default 'Access'
     */
    jwtTokenType?: 'Access' | 'Refresh';
}

export interface IAuthorizationMeta {
    user?: IUserAuthorizationMeta;
    isRequired?: boolean;
}

export interface IResponseMeta {
    description?: string;
}

export interface ISuccessResponseMeta {
    description?: string;
    code: 200 | 201 | 204;
    type?: any;
}

export interface IRestRequestInfoMeta {
    description: string;
    badRequest?: IResponseMeta;
    authorization?: IAuthorizationMeta;
    success: ISuccessResponseMeta;
}

export function RestRequestInfo(meta: IRestRequestInfoMeta) {
    const decorators: (ClassDecorator | MethodDecorator | PropertyDecorator)[] = [];
    decorators.push(ApiOperation({ summary: meta.description }));

    if (meta.badRequest) {
        decorators.push(
            ApiResponse({
                description: meta.badRequest.description,
                status: 400,
            }),
        );
    }

    if (meta.authorization) {
        const clients: TClientType[] = [];
        if (meta.authorization.user) {
            decorators.push(ApiResponse({ description: 'unauthorized', status: 401 }));

            if (meta.authorization.user.roles !== '*') {
                decorators.push(SetMetadata(USER_ROLES_KEY, meta.authorization.user.roles));
            }

            if (meta.authorization.user.jwtTokenType === 'Refresh') {
                decorators.push(SetMetadata(TOKEN_TYPE_KEY, 'Refresh'));
                decorators.push(ApiBearerAuth('Refresh'));
            } else {
                decorators.push(SetMetadata(TOKEN_TYPE_KEY, 'Access'));
                decorators.push(ApiBearerAuth('Access'));
            }

            clients.push('User');
        }
        if (!meta.authorization.isRequired) {
            clients.push('Public');
        }
        decorators.push(ApiResponse({ description: 'unauthorized', status: 401 }));
        decorators.push(SetMetadata(CLIENTS_KEY, clients));
        decorators.push(UseGuards(AuthGuard));
    }

    if (meta.success.type) {
        decorators.push(UseInterceptors(new SerializerInterceptor(meta.success.type)));
    }

    decorators.push(
        ApiResponse({
            description: meta.success.description ?? 'success',
            status: +meta.success.code,
            type: meta.success.type,
        }),
    );

    decorators.push(
        SerializeOptions({
            strategy: 'exposeAll',
            type: meta.success.type,
            excludeExtraneousValues: true,
            enableImplicitConversion: true,
        }),
    );
    decorators.push(HttpCode(meta.success.code));
    return applyDecorators(...decorators);
}
