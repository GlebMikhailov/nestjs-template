import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { LoggerService } from '@core/logger/logger';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpAdapterHost } from '@nestjs/core';
import { getExceptionData } from '@core/exceptions/exception.parser';
import { AppException } from '@core/exceptions/app.exception';
import { SendMessageCommand } from '@media/application/commands/send-message/send-message.command';
import { SendMessageDto } from '@media/domain/dto/send-message.dto';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(
        private readonly loggerService: LoggerService,
        private readonly httpAdapterHost: HttpAdapterHost,
        private readonly commandBus: CommandBus,
    ) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const { httpAdapter } = this.httpAdapterHost;
        const path = httpAdapter.getRequestUrl(context.switchToHttp().getRequest());
        this.loggerService.info(`Calling new request: ${path}`);
        const now = Date.now();
        return next.handle().pipe(
            tap(() => {
                const timeAfterExecuting = Date.now();
                this.loggerService.debug(`Total ${timeAfterExecuting - now}ms`);
            }),
            catchError((error) => {
                const isCustomException = error instanceof AppException;
                console.log('isCustomException', isCustomException);
                if (isCustomException) {
                    this.loggerService.warn(
                        `Handled exception on path ${path}: ${getExceptionData(error).message}`,
                    );
                } else {
                    this.commandBus.execute(
                        new SendMessageCommand(new SendMessageDto(`New error handled: ${error}`)),
                    );
                    this.loggerService.error(`Error on path ${path}: ${error}`);
                }
                return throwError(() => error);
            }),
        );
    }
}
