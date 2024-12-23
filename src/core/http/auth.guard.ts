import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { CLIENTS_KEY, TClient, USER_ROLES_KEY } from '@core/http/rest/request.info';
import { EUserRole } from '@user/domain/models/role.enum';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredClients = this.reflector.getAllAndOverride<TClient[]>(CLIENTS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const requiredUserRoles = this.reflector.getAllAndOverride<EUserRole[]>(USER_ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredClients || requiredClients.length === 0) {
            return false;
        }
        const request = context.switchToHttp().getRequest();
        for (const client of requiredClients) {
            if (client === 'Public') {
                break;
            } else if (client === 'User') {
                try {
                    const token = this.extractBearerTokenFromHeader(request);
                    if (!token) {
                        break;
                    }
                    request['client'] = await this.jwtService.verifyAsync(token);
                    return requiredUserRoles.includes(request['client']['role']);
                } catch (err) {
                    return false;
                }
            }
        }
        return false;
    }

    private extractBearerTokenFromHeader(request: Request): string | null {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : null;
    }
}
