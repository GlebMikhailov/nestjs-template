export class AppException extends Error {
    constructor(readonly message: string) {
        super(message);
    }
}

export class InvalidTokenType extends AppException {
    constructor(readonly message: string = 'invalid-token-type') {
        super(message);
    }
}

export class InvalidToken extends AppException {
    constructor(readonly message: string = 'invalid-token') {
        super(message);
    }
}

export class UnavailableQueryKey extends AppException {
    constructor(readonly message: string = 'unavailable-query-key') {
        super(message);
    }
}

export class UnavailableOrderKey extends AppException {
    constructor(readonly message: string = 'unavailable-order-key') {
        super(message);
    }
}
