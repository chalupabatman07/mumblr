import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateMessageInput {
  @Field(() => String)
  public conversationId!: string;

  @Field(() => String)
  public content!: string;
}
