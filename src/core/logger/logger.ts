import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables, TEnvironment } from '@core/config/variables';

@Injectable()
export class LoggerService {
    private errorLogger: winston.Logger;
    private commonLogger: winston.Logger;

    private readonly mode: TEnvironment | null = null;

    constructor(private readonly configService: ConfigService<EnvironmentVariables>) {
        this.errorLogger = this.createLogger('error');
        this.commonLogger = this.createLogger('info');
    }

    private createLogger(level: string): winston.Logger {
        return winston.createLogger({
            level: level,
            format: winston.format.combine(
                winston.format.timestamp({ format: 'hh:mm:ss:SSS A' }),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} ${level.toUpperCase()} ${message}`;
                }),
            ),
            transports: [
                new winston.transports.DailyRotateFile({
                    dirname: `logs/%DATE%`,
                    datePattern: 'YYYY-MM-DD',
                    maxSize: '1k',
                    maxFiles: 1,
                }),
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.ms(),
                        nestWinstonModuleUtilities.format.nestLike('Template', {
                            colors: true,
                            prettyPrint: true,
                            processId: true,
                            appName: true,
                        }),
                    ),
                }),
            ],
        });
    }

    error(message: string) {
        this.errorLogger.error(message);
    }

    warn(message: string) {
        this.commonLogger.warn(message);
    }

    debug(message: string) {
        this.commonLogger.debug(message);
    }

    info(message: string) {
        this.commonLogger.info(message);
    }
}
