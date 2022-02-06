import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AuthToken {
  @Field(() => String)
  public token!: string;
}
