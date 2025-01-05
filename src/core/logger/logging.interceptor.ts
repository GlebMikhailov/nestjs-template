import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { LoggerService } from '@core/logger/logger';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpAdapterHost } from '@nestjs/core';
import { getExceptionData } from '@core/exceptions/exception.parser';
import { AppException } from '@core/exceptions/app.exception';
import { SendMessageCommand } from '@media/application/commands/send-message/send-message.command';
import { SendMessageDto } from '@media/domain/dto/send-message.dto';
import { CommandBus } from '@nestjs/cqrs';
import { Counter, Histogram } from 'prom-client';
import { InjectMetric } from '@willsoto/nestjs-prometheus';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(
        private readonly loggerService: LoggerService,
        private readonly httpAdapterHost: HttpAdapterHost,
        private readonly commandBus: CommandBus,
        @InjectMetric('http_requests_total')
        private readonly httpRequestsTotal: Counter<string>,
        @InjectMetric('http_request_duration_seconds')
        private readonly httpRequestDurationSeconds: Histogram<string>,
    ) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const { httpAdapter } = this.httpAdapterHost;
        const path = httpAdapter.getRequestUrl(context.switchToHttp().getRequest());
        this.loggerService.info(`Calling new request: ${path}`);
        this.httpRequestsTotal.inc();
        const now = Date.now();
        return next.handle().pipe(
            tap(() => {
                const timeAfterExecuting = Date.now();
                this.httpRequestDurationSeconds.observe(timeAfterExecuting - now);
            }),
            catchError((error) => {
                const timeAfterExecuting = Date.now();
                const isCustomException = error instanceof AppException;
                if (isCustomException) {
                    this.loggerService.warn(
                        `Handled exception on path ${path}: ${getExceptionData(error).message}`,
                    );
                } else {
                    this.commandBus.execute(
                        new SendMessageCommand(
                            new SendMessageDto(
                                `New error handled:\n\n${this.monospaceFont()}${error}${this.monospaceFont()}`,
                            ),
                        ),
                    );
                    this.loggerService.error(`Error on path ${path}: ${error}`);
                }
                this.httpRequestDurationSeconds.observe(timeAfterExecuting - now);
                return throwError(() => error);
            }),
        );
    }

    private monospaceFont() {
        return '\`\`\`';
    }
}
