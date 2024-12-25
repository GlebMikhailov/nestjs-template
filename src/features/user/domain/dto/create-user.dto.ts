import { IsEnum, IsNotEmpty, IsString, Length } from '@nestjs/class-validator';
import { EUserRole, TUserRole } from '@user/domain/models/role.enum';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    login: string;

    @IsString()
    @Length(6, 200)
    @IsNotEmpty()
    password: string;

    @IsEnum(EUserRole)
    role: TUserRole;

    constructor(login: string, password: string, role: TUserRole) {
        this.login = login;
        this.password = password;
        this.role = role;
    }
}
