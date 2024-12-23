import { AggregateRoot } from '@nestjs/cqrs';

export interface ISessionProperties {
    accessToken: string;
    refreshToken: string;
}

export class Session extends AggregateRoot implements ISessionProperties {
    accessToken: string;
    refreshToken: string;

    constructor(props: ISessionProperties) {
        super();
        Object.assign(this, props);
    }
}
