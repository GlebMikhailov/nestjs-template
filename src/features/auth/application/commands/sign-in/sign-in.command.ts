import { SignInDto } from '../../../domain/dto/sign-in.dto';

export class SignInCommand {
    constructor(public readonly signInDto: SignInDto) {}
}
