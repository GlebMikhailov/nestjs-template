import { AppException } from '@core/exceptions/app.exception';

export class UserAlreadyCreated extends AppException {
    constructor(message = 'user-already-created') {
        super(message);
    }
}

export class UserNotFound extends AppException {
    constructor(message = 'user-not-found') {
        super(message);
    }
}
