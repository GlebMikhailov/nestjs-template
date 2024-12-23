import { PrismaService } from '../../../../core/persistence/prisma.service';
import { DatabaseRepository } from '../adapters/persistence/database.repository';

export const AUTH_DATABASE_REPOSITORY_TOKEN = 'AUTH_DATABASE_REPOSITORY_TOKEN';

export const DatabaseRepositoryProvider = {
    provide: AUTH_DATABASE_REPOSITORY_TOKEN,
    useFactory: (prismaService: PrismaService) => {
        return new DatabaseRepository(prismaService);
    },
    inject: [PrismaService],
};
