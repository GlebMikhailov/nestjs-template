import { EUserRole } from '@user/domain/models/role.enum';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

@ObjectType()
export class GraphqlUserResponse {
    @Field(() => String)
    id: string;

    @Field(() => String)
    login: string;

    @Field(() => EUserRole)
    role: EUserRole;
}

registerEnumType(EUserRole, { name: 'UserRole' });
