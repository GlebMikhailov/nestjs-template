import { AppException } from '@core/exceptions/app.exception';

export class InvalidCredentialsException extends AppException {
    constructor(message = 'invalid-credentials') {
        super(message);
    }
}

export class TooManySessions extends AppException {
    constructor(message = 'too-many-sessions') {
        super(message);
    }
}
