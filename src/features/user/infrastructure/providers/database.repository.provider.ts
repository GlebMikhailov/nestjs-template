import { PrismaService } from '@core/persistence/prisma.service';
import { UserDatabaseRepository } from '@user/infrastructure/adapters/persistence/user-database.repository';

export const USER_DATABASE_REPOSITORY_TOKEN = 'USER_DATABASE_REPOSITORY_TOKEN';

export const DatabaseRepositoryProvider = {
    provide: USER_DATABASE_REPOSITORY_TOKEN,
    useFactory: (prismaService: PrismaService) => {
        return new UserDatabaseRepository(prismaService);
    },
    inject: [PrismaService],
};
