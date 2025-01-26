import { NewUsersResponse } from '@analytics/domain/dto/new-users.response';

export interface IViktoriaRepository {
    getNewUsers(): Promise<NewUsersResponse>;
}
