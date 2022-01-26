import { PubSubEngine } from 'graphql-subscriptions';
import { Arg, Field, Mutation, ObjectType, Publisher, PubSub, Resolver, Root, Subscription } from 'type-graphql';

@ObjectType()
class MessagePayload {
  @Field(() => String)
  public message!: string;
}

@Resolver()
export class TestResolver {
  @Mutation(() => String)
  async sendMessage(@Arg('message') message: string, @PubSub() pubSub: PubSubEngine): Promise<string> {
    await pubSub.publish('B', message);
    return message;
  }

  @Mutation(() => String)
  async publisherMutation(
    @PubSub('B') publish: Publisher<MessagePayload>,
    @Arg('message') message: string,
  ): Promise<string> {
    await publish({ message });
    return message;
  }

  @Subscription({ topics: 'B' })
  normalSubscription(@Root() root: MessagePayload): String {
    console.log('the fuck');
    return root.message;
  }

  @Subscription(() => String, { topics: 'B' })
  async receiveMessage(@Root() root: string): Promise<string> {
    console.log('damnit just work');
    return root;
  }
}
