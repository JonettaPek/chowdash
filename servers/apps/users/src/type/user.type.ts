import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entity/user.entity';

@ObjectType()
export class ErrorType {
  @Field()
  message: string;

  @Field({ nullable: true })
  code?: string;
}

@ObjectType()
export class RegisterResponse {
  @Field()
  activation_token: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType | null;
}

@ObjectType()
export class ActivateAccountResponse {
  @Field(() => User, { nullable: true })
  user: User | null;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType | null;
}

@ObjectType()
export class LoginResponse {
  @Field(() => User, { nullable: true })
  user?: User | null;

  @Field(() => String, { nullable: true })
  accessToken: string | null;

  @Field(() => String, { nullable: true })
  refreshToken: string | null;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType | null;
}
