import { IsNotEmpty, IsString, Length } from '@nestjs/class-validator';
import { SafeApiProperty } from '@core/http/rest/safe-api-property';

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    @SafeApiProperty({ type: 'string', example: 'admin' })
    login: string;

    @IsString()
    @Length(6, 200)
    @IsNotEmpty()
    @SafeApiProperty({ type: 'string', example: 'xxxxxx' })
    password: string;
}
