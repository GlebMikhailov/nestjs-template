import { TUserRole } from '@user/domain/models/role.enum';

export class GetUserQuery {
    constructor(
        public readonly id: string,
        public readonly role: TUserRole,
    ) {}
}
