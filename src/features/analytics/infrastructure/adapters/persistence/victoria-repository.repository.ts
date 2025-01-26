import { Injectable } from '@nestjs/common';
import { IViktoriaRepository } from '@analytics/domain/ports/viktoria-repository.repository.interface';
import { NewUsersResponse } from '@analytics/domain/dto/new-users.response';

@Injectable()
export class VictoriaRepository implements IViktoriaRepository {
    constructor() {}

    async getNewUsers(): Promise<NewUsersResponse> {
        throw new Error('not-implemented');
    }
}
