import { Injectable } from '@nestjs/common';
import { IAuthDatabaseRepository } from '@auth/domain/ports/auth-database.repository.interface';
import { PrismaService } from '@core/persistence/prisma.service';
import { Sessions } from '@auth/domain/models/sessions.model';
import { Session } from '@auth/domain/models/session.model';
import { JwtService } from '@nestjs/jwt';
import { TUserRole } from '@user/domain/models/role.enum';

@Injectable()
export class AuthDatabaseRepository implements IAuthDatabaseRepository {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    async getUserSessions(userId: string): Promise<Sessions[]> {
        const userSessions = await this.prisma.session.findMany({
            where: {
                userId,
            },
        });
        return userSessions.map((session) => new Sessions(session));
    }

    async createSession(userId: string, userRole: TUserRole): Promise<Session> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    userId,
                    role: userRole,
                    type: 'Access',
                },
                { expiresIn: '15m' },
            ),
            this.jwtService.signAsync(
                {
                    userId,
                    role: userRole,
                    type: 'Refresh',
                },
                { expiresIn: '30d' },
            ),
        ]);
        const session = await this.prisma.session.create({
            data: {
                accessToken: accessToken,
                refreshToken: refreshToken,
                userId: userId,
            },
        });
        return new Session(session);
    }

    updateSession(refreshToken: string): Promise<Session> {
        throw new Error('Method not implemented.');
    }

    deleteSession(accessToken: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
