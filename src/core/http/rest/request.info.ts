import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TUserRole } from '@user/domain/models/role.enum';
import { AuthGuard } from '@core/http/auth.guard';

export type TClient = 'User' | 'Public';
export const USER_ROLES_KEY = 'user_roles';
export const CLIENTS_KEY = 'clients';

export interface IUserAuthorizationMeta {
    roles: TUserRole[];
}

export interface IAuthorizationMeta {
    user?: IUserAuthorizationMeta;
    isPublic?: boolean;
}

export interface IResponseMeta {
    description?: string;
}

export interface ISuccessResponseMeta {
    description?: string;
    code: '200' | '201' | '204';
    type: any;
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
        const clients: TClient[] = [];
        if (meta.authorization.user) {
            decorators.push(ApiResponse({ description: 'unauthorized', status: 401 }));
            decorators.push(SetMetadata(USER_ROLES_KEY, meta.authorization.user.roles));
            decorators.push(ApiBearerAuth());
            clients.push('User');
        }
        if (meta.authorization.isPublic) {
            clients.push('Public');
        }
        decorators.push(ApiResponse({ description: 'unauthorized', status: 401 }));
        decorators.push(SetMetadata(CLIENTS_KEY, clients));
        decorators.push(UseGuards(AuthGuard));
    }

    decorators.push(
        ApiResponse({
            description: meta.success.description ?? 'success',
            status: +meta.success.code,
            type: meta.success.type,
        }),
    );
    return applyDecorators(...decorators);
}
