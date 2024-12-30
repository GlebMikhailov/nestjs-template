import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { AppException } from '@core/exceptions/app.exception';
import { HttpAdapterHost } from '@nestjs/core';
import { getExceptionData } from '@core/exceptions/exception.parser';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const { httpAdapter } = this.httpAdapterHost;

        httpAdapter.reply(
            response,
            {
                ...getExceptionData(exception),
                path: httpAdapter.getRequestUrl(context.getRequest()),
                timestamp: new Date().toISOString(),
            },
            this.getStatus(exception),
        );
    }

    private getStatus(exception: unknown) {
        if (exception instanceof HttpException) {
            return exception.getStatus();
        }
        if (exception instanceof AppException) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
