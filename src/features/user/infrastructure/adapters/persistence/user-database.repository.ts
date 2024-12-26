import { PrismaService } from '@core/persistence/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@user/domain/dto/create-user.dto';
import { User } from '@user/domain/models/user.model';
import { IUserDatabaseRepository } from '@user/domain/ports/user-database.repository.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserDatabaseRepository implements IUserDatabaseRepository {
    constructor(private readonly prismaService: PrismaService) {}

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    async createUser(createUserDto: CreateUserDto): Promise<void> {
        const hashedPassword = await this.hashPassword(createUserDto.password);
        await this.prismaService.user.create({
            data: {
                login: createUserDto.login,
                password: hashedPassword,
                role: createUserDto.role,
            },
        });
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
}
