import { PrismaService } from '@core/persistence/prisma.service';
import { AuthDatabaseRepository } from '@auth/infrastructure/adapters/persistence/auth-database.repository';
import { JwtService } from '@nestjs/jwt';

export const AUTH_DATABASE_REPOSITORY_TOKEN = 'AUTH_DATABASE_REPOSITORY_TOKEN';

export const DatabaseRepositoryProvider = {
    provide: AUTH_DATABASE_REPOSITORY_TOKEN,
    useFactory: (prismaService: PrismaService, jwtService: JwtService) => {
        return new AuthDatabaseRepository(prismaService, jwtService);
    },
    inject: [PrismaService, JwtService],
};
