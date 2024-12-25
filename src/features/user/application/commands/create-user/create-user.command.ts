import { CreateUserDto } from '@user/domain/dto/create-user.dto';

export class CreateUserCommand {
    constructor(readonly createUserDto: CreateUserDto) {}
}
