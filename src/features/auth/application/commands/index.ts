import { SignInHandler } from './sign-in/sign-in.handler';
import { SignOutHandler } from './sign-out/sign-out.handler';
import { UpdateTokenHandler } from './update-tokens/update-token.handler';

export const CommandHandlers = [SignInHandler, SignOutHandler, UpdateTokenHandler];
