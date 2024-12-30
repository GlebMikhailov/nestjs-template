import { Injectable } from '@nestjs/common';
import { IAuthDatabaseRepository } from '@auth/domain/ports/auth-database.repository.interface';
import { PrismaService } from '@core/persistence/prisma.service';
import { Sessions } from '@auth/domain/models/sessions.model';
import { Session } from '@auth/domain/models/session.model';
import { JwtService } from '@nestjs/jwt';
import { TUserRole } from '@user/domain/models/role.enum';
import { SessionNotFound } from '@auth/domain/exceptions';

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
            this.generateAccessToken(userId, userRole),
            this.generateRefreshToken(userId, userRole),
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

    async updateSession(oldRefreshToken: string): Promise<Session> {
        const oldSession = await this.prisma.session.findFirst({
            where: {
                refreshToken: oldRefreshToken,
            },
            include: {
                user: true,
            },
        });

        if (!oldSession) {
            throw new SessionNotFound();
        }
        const [accessToken, refreshToken] = await Promise.all([
            this.generateAccessToken(oldSession.user.id, oldSession.user.role),
            this.generateRefreshToken(oldSession.user.id, oldSession.user.role),
        ]);
        const newSession = await this.prisma.session.update({
            where: {
                id: oldSession.id,
            },
            data: {
                accessToken,
                refreshToken,
            },
            include: {
                user: true,
            },
        });
        return new Session(newSession);
    }

    async deleteSession(accessToken: string): Promise<void> {
        await this.prisma.session.delete({
            where: {
                accessToken,
            },
        });
    }

    private async generateAccessToken(userId: string, userRole: TUserRole) {
        return this.jwtService.signAsync(
            {
                userId,
                role: userRole,
                type: 'Access',
            },
            { expiresIn: '15m' },
        );
    }

    private async generateRefreshToken(userId: string, userRole: TUserRole) {
        return this.jwtService.signAsync(
            {
                userId,
                role: userRole,
                type: 'Refresh',
            },
            { expiresIn: '30d' },
        );
    }
}
