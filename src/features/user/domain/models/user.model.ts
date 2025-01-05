import { AggregateRoot } from '@nestjs/cqrs';
import { TUserRole } from '@user/domain/models/role.enum';
import { BasePaginatedListAggregateRoot } from '@core/common/base.paginated-list';

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

export interface IUsersProperties extends Omit<IUserProperties, 'password'> {
    id: string;
    role: TUserRole;
    login: string;
}

export class Users extends AggregateRoot implements IUsersProperties {
    id: string;
    login: string;
    role: TUserRole;

    constructor(props: IUsersProperties) {
        super();
        Object.assign(this, props);
    }
}

export class UsersList extends BasePaginatedListAggregateRoot<Users> {
    data: Users[];
}
