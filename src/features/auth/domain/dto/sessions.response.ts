import { IsDate } from '@nestjs/class-validator';
import { Sessions } from '../models/sessions.model';

export class SessionsResponse {
    @IsDate()
    createdAt: string;

    @IsDate()
    lastOnline: string;

    constructor(sessions: Sessions) {
        this.lastOnline = sessions.updatedAt.toISOString();
        this.createdAt = sessions.createdAt.toISOString();
    }
}
