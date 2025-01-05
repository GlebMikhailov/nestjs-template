import { SafeApiProperty } from '@core/http/rest/safe-api-property';
import { IsEnum, IsInt, IsOptional, IsString, Max, MaxLength, Min } from '@nestjs/class-validator';
import { AggregateRoot } from '@nestjs/cqrs';

export const BASE_OFFSET = 0;
export const BASE_LIMIT = 25;

export enum EOrderingType {
    Asc = 'asc',
    Desc = 'desc',
}

export type TOrderingType = 'asc' | 'desc';

export class BasePaginatedListRequest {
    @SafeApiProperty({
        description: `default value is ${BASE_OFFSET}`,
        example: 10,
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsInt()
    @Min(0)
    offset?: number;

    @SafeApiProperty({
        description: `default value is ${BASE_LIMIT}`,
        example: 0,
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsInt()
    @Max(100)
    @Min(0)
    limit?: number;

    @SafeApiProperty({
        description: 'order by key',
        example: 'createdAt',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    @MaxLength(30)
    orderBy?: string;

    @SafeApiProperty({
        description: "Ordering type; default value is 'asc'",
        example: 'asc',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsEnum(EOrderingType)
    orderingType?: TOrderingType;

    @SafeApiProperty({
        description: "Query key, example: 'name'",
        example: 'name',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    @MaxLength(30)
    queryKey?: string;

    @SafeApiProperty({
        description: "Query value, example: 'John'",
        example: 'John',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    @MaxLength(30)
    queryValue?: string;
}

export class BasePaginatedListAggregateRoot<T> extends AggregateRoot {
    data: T[];
    count: number;

    constructor(data: T[], count: number) {
        super();
        this.data = data;
        this.count = count;
    }
}

export abstract class BasePaginatedListResponse<T> {
    abstract data: T[];
    @SafeApiProperty({
        description: 'Total count of the requested data',
        example: 9012,
    })
    count: number;
}
