import { PrismaService } from '@core/persistence/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@user/domain/dto/create-user.dto';
import { User, Users, UsersList } from '@user/domain/models/user.model';
import { IUserDatabaseRepository } from '@user/domain/ports/user-database.repository.interface';
import * as bcrypt from 'bcrypt';
import { GetUsersDto } from '@user/domain/dto/get-users.dto';
import { BASE_LIMIT, BASE_OFFSET } from '@core/common/base.paginated-list';
import { UnavailableOrderKey, UnavailableQueryKey } from '@core/exceptions/app.exception';

@Injectable()
export class UserDatabaseRepository implements IUserDatabaseRepository {
    constructor(private readonly prismaService: PrismaService) {}

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await this.hashPassword(createUserDto.password);
        const user = await this.prismaService.user.create({
            data: {
                login: createUserDto.login,
                password: hashedPassword,
                role: createUserDto.role,
            },
        });
        return new User(user);
    }

    async getUserByLogin(login: string): Promise<User> {
        const user = await this.prismaService.user.findFirst({
            where: {
                login,
            },
        });
        if (!user) {
            return null;
        }
        return new User(user);
    }

    async getUserById(id: string): Promise<User | null> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            return null;
        }
        return new User(user);
    }

    async getAllUsers(getUsersDto: GetUsersDto): Promise<UsersList> {
        // Check query keys
        if (!['login'].includes(getUsersDto.queryKey)) {
            throw new UnavailableQueryKey();
        }
        if (!['login', 'role'].includes(getUsersDto.orderBy)) {
            throw new UnavailableOrderKey();
        }
        const where = getUsersDto.queryValue
            ? {
                  [getUsersDto.queryKey]: {
                      contains: getUsersDto.queryValue,
                      mode: 'insensitive',
                  },
              }
            : {};
        const [data, count] = await this.prismaService.$transaction([
            this.prismaService.user.findMany({
                where,
                skip: getUsersDto.offset ?? BASE_OFFSET,
                take: getUsersDto.limit ?? BASE_LIMIT,
                orderBy: {
                    [getUsersDto.orderBy]: getUsersDto.orderingType,
                },
            }),
            this.prismaService.user.count({
                where,
            }),
        ]);
        return new UsersList(
            data.map((record) => new Users(record)),
            count,
        );
    }
}
