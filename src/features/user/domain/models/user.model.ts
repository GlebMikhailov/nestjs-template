import { AggregateRoot } from '@nestjs/cqrs';
import { TUserRole } from '@user/domain/models/role.enum';

export interface IUserProperties {
    id: string;
    login: string;
    password: string;
    role: TUserRole;
}

export class User extends AggregateRoot implements IUserProperties {
    id: string;
    login: string;
    password: string;
    role: TUserRole;

    constructor(props: IUserProperties) {
        super();
        Object.assign(this, props);
    }
}
