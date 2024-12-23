import { AggregateRoot } from '@nestjs/cqrs';

export interface ISessionsProperties {
    createdAt: Date;
    updatedAt: Date;
}

export class Sessions extends AggregateRoot implements ISessionsProperties {
    createdAt: Date;
    updatedAt: Date;

    constructor(props: ISessionsProperties) {
        super();
        Object.assign(this, props);
    }
}
