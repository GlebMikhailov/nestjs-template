import { GetUsersDto } from '@user/domain/dto/get-users.dto';

export class GetUsersQuery {
    constructor(public readonly getUsersDto: GetUsersDto) {}
}
