import { HttpException } from '@nestjs/common';
import { AppException } from '@core/exceptions/app.exception';

export function getExceptionData(exception: unknown): { message: string } {
    if (exception instanceof HttpException) {
        return {
            message: exception.message,
        };
    }
    if (exception instanceof AppException) {
        return {
            message: exception.message,
        };
    }
    return {
        message: 'unknown',
    };
}
