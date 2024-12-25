import { Session } from '../models/session.model';
import { Sessions } from '../models/sessions.model';
import { TUserRole } from '@user/domain/models/role.enum';

export interface IAuthDatabaseRepository {
    createSession(userId: string, userRole: TUserRole): Promise<Session>;

    updateSession(refreshToken: string): Promise<Session>;

    deleteSession(accessToken: string): Promise<void>;

    getUserSessions(userId: string): Promise<Sessions[]>;
}
