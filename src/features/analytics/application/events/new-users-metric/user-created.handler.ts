import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from './user-created.event';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { NEW_USER_METRIC } from '@analytics/application/metrics-names';

@Injectable()
@CommandHandler(UserCreatedEvent)
export class UserCreatedHandler implements ICommandHandler<UserCreatedEvent> {
    constructor(
        @InjectMetric(NEW_USER_METRIC)
        private readonly newUsers: Counter<string>,
    ) {}

    async execute() {
        console.log('execute');
        this.newUsers.inc();
    }
}
