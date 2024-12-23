export class AppException extends Error {
    constructor(readonly message: string) {
        super(message);
    }
}
