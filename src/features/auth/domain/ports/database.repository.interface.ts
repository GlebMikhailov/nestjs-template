import { SignInDto } from '../dto/sign-in.dto';
import { Session } from '../models/session.model';
import { Sessions } from '../models/sessions.model';

export interface IDatabaseRepository {
    createSession(signInDto: SignInDto): Promise<Session>;

    updateSession(refreshToken: string): Promise<Session>;

    deleteSession(accessToken: string): Promise<void>;

    getSessions(accessToken: string): Promise<Sessions[]>;
}
