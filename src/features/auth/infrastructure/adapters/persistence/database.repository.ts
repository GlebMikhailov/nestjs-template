import { Injectable } from '@nestjs/common';
import { IDatabaseRepository } from '../../../domain/ports/database.repository.interface';
import { PrismaService } from '../../../../../core/persistence/prisma.service';
import { Sessions } from '../../../domain/models/sessions.model';
import { SignInDto } from '../../../domain/dto/sign-in.dto';
import { Session } from '../../../domain/models/session.model';

@Injectable()
export class DatabaseRepository implements IDatabaseRepository {
    constructor(private readonly prisma: PrismaService) {}

    getSessions(accessToken: string): Promise<Sessions[]> {
        throw new Error('Method not implemented.');
    }

    async createSession(signInDto: SignInDto): Promise<Session> {
        throw new Error('Method not implemented.');
        // this.prisma.session.create({
        //     data: {
        //         accessToken: '',
        //         refreshToken: '',
        //     },
        // });
    }

    updateSession(refreshToken: string): Promise<Session> {
        throw new Error('Method not implemented.');
    }

    deleteSession(accessToken: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
