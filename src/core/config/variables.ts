import { IsEnum, IsNumber, IsString, Max, Min } from '@nestjs/class-validator';

export enum Environment {
    Development = 'development',
    Production = 'production',
    Local = 'local',
}

export class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment;

    @IsNumber()
    @Min(0)
    @Max(65535)
    PORT: number;

    @IsString()
    DATABASE_URL: string;

    @IsString()
    TELEGRAM_BOT_TOKEN: string;

    @IsString()
    TELEGRAM_CHAT_ID: string;
}

export type TEnvironment = keyof typeof Environment;
