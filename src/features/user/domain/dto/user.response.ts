import { SafeApiProperty } from '@core/http/rest/safe-api-property';
import { EUserRole, TUserRole } from '@user/domain/models/role.enum';
import { BasePaginatedListResponse } from '@core/common/base.paginated-list';
import { Type } from 'class-transformer';

export class UserResponse {
    @SafeApiProperty({
        example: 'A0D4BE67-459C-410E-B793-9E6BF2BBF624',
    })
    id: string;
    @SafeApiProperty({
        example: 'administrator',
    })
    login: string;
    @SafeApiProperty({
        example: 'Admin',
        enum: EUserRole,
    })
    role: TUserRole;
}

export class UsersResponse extends UserResponse {}

export class UsersListResponse extends BasePaginatedListResponse<UsersResponse> {
    @SafeApiProperty({ type: UsersResponse })
    @Type(() => UsersResponse)
    data: UsersResponse[];
}
