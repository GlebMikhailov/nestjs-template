import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import {
    CLIENTS_KEY,
    TClientType,
    TOKEN_TYPE_KEY,
    USER_ROLES_KEY,
} from '@core/http/rest/request.info';
import { TUserRole } from '@user/domain/models/role.enum';
import { TTokenType } from '@core/http/client';
import { extractBearerTokenFromHeader } from '@core/http/utils';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredClients = this.reflector.getAllAndOverride<TClientType[]>(CLIENTS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredClients || requiredClients.length === 0) {
            return false;
        }

        if (requiredClients.includes('User')) {
            const userResult = await this.handleUser(context);
            if (userResult) {
                return true;
            }
        }

        if (requiredClients.includes('Public')) {
            return true;
        }
        throw new UnauthorizedException();
    }

    private async handleUser(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const requiredUserRoles = this.reflector.getAllAndOverride<TUserRole[]>(USER_ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const tokenType = this.reflector.getAllAndOverride<TTokenType>(TOKEN_TYPE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        try {
            const token = extractBearerTokenFromHeader(request);
            if (!token) {
                return false;
            }
            request['client-info'] = await this.jwtService.verifyAsync(token);
            if (tokenType === 'Access') {
                if (request['client-info'].type !== 'Access') {
                    return false;
                }
            } else {
                if (request['client-info'].type !== 'Refresh') {
                    return false;
                }
            }
            if (!requiredUserRoles) {
                return true;
            }
            return requiredUserRoles.includes(request['client-info']['role']);
        } catch (err) {
            return false;
        }
    }
}
