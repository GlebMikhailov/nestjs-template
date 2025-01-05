import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';

export class SerializerInterceptor implements NestInterceptor {
    constructor(private response: any) {}

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        return handler.handle().pipe(
            map((data: any) => {
                return plainToInstance(this.response, data, {
                    excludeExtraneousValues: true,
                });
            }),
        );
    }
}
