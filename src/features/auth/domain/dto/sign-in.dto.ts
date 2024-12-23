import { IsNotEmpty, IsString, Length } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    @ApiProperty({ type: 'string', example: 'admin' })
    login: string;

    @IsString()
    @Length(6, 200)
    @IsNotEmpty()
    @ApiProperty({ type: 'string', example: 'xxxxxx' })
    password: string;
}
