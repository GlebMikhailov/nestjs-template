import { CreateUserDto } from '@user/domain/dto/create-user.dto';
import { User } from '@user/domain/models/user.model';

export interface IUserDatabaseRepository {
    createUser(createUserDto: CreateUserDto): Promise<void>;

    getUserByLogin(login: string): Promise<User | null>;
}
