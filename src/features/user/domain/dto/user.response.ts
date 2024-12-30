import { SaveApiProperty } from '@core/http/rest/save-api-property';
import { EUserRole, TUserRole } from '@user/domain/models/role.enum';

export class UserResponse {
    @SaveApiProperty({
        example: 'A0D4BE67-459C-410E-B793-9E6BF2BBF624',
    })
    id: string;
    @SaveApiProperty({
        example: 'administrator',
    })
    login: string;
    @SaveApiProperty({
        example: 'Admin',
        enum: EUserRole,
    })
    role: TUserRole;
}
