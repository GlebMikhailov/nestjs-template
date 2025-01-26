import { CreateUserDto } from '@user/domain/dto/create-user.dto';
import { User, UsersList } from '@user/domain/models/user.model';
import { GetUsersDto } from '@user/domain/dto/get-users.dto';

export interface IUserDatabaseRepository {
    createUser(createUserDto: CreateUserDto): Promise<User>;

    getUserByLogin(login: string): Promise<User | null>;

    getUserById(id: string): Promise<User | null>;

    getAllUsers(getUsersDto: GetUsersDto): Promise<UsersList>;
}
