import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Expose } from 'class-transformer';

export function SafeApiProperty(options: ApiPropertyOptions) {
    return applyDecorators(ApiProperty(options), Expose());
}
