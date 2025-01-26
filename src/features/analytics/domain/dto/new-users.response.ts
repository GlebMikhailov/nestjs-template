import { SafeApiProperty } from '@core/http/rest/safe-api-property';

export class NewUsersResponse {
    @SafeApiProperty({ example: 180 })
    totalUsers: number;
    @SafeApiProperty({ example: 190 })
    '24hours': number;
    @SafeApiProperty({ example: 234 })
    '72hours': number;
    @SafeApiProperty({ example: 2342 })
    '1week': number;
    @SafeApiProperty({ example: 4823 })
    '1month': number;
}
