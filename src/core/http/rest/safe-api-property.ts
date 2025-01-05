import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Expose } from 'class-transformer';
import { ExposeOptions } from 'class-transformer/types/interfaces';

export function SafeApiProperty(
    apiPropertyOptions: ApiPropertyOptions,
    exposeOptions?: ExposeOptions,
) {
    return applyDecorators(ApiProperty(apiPropertyOptions), Expose(exposeOptions));
}
