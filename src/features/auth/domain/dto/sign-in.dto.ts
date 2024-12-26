import { IsNotEmpty, IsString, Length } from '@nestjs/class-validator';
import { SaveApiProperty } from '@core/http/rest/save-api-property';

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    @SaveApiProperty({ type: 'string', example: 'admin' })
    login: string;

    @IsString()
    @Length(6, 200)
    @IsNotEmpty()
    @SaveApiProperty({ type: 'string', example: 'xxxxxx' })
    password: string;
}
