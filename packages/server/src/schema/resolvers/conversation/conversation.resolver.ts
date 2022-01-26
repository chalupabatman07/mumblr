import { PubSubEngine } from 'graphql-subscriptions';
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from 'type-graphql';

import { isAuth, MumblrContext } from '../../../server';
import { conversationService, messageService, participantService } from '../../../services';
import { checkUserContext } from '../../../utils';
import { Conversation, CreateMessageInput, Message, Participant } from '../..';

@Resolver(of => Conversation)
export class ConversationResolver {
  @Query(() => Conversation)
  public getConversationById(@Arg('conversationId') conversationId: string): Promise<Conversation> {
    return conversationService.getConversationById(conversationId);
  }

  @Mutation(() => Conversation)
  @UseMiddleware(isAuth)
  async createMessageForConversation(
    @Arg('input') input: CreateMessageInput,
    @PubSub() pubSub: PubSubEngine,
    @Ctx() ctx: MumblrContext,
  ): Promise<Conversation> {
    const userId = checkUserContext(ctx);
    await messageService.createMessageForConversationId(userId, input);
    const conversation = await this.getConversationById(input.conversationId);
    await pubSub.publish('CONVERSATION', conversation);
    return conversation;
  }

  @Subscription(() => Conversation, { topics: 'CONVERSATION' })
  public subscribeByConversationId(@Root() root: any): Promise<Conversation> {
    return root;
  }

  @FieldResolver()
  public participants(@Root() conversation: Conversation): Promise<Participant[]> {
    return participantService.getAllParticipantsByConversationId(conversation.id);
  }

  @FieldResolver()
  public messages(@Root() conversation: Conversation): Promise<Message[]> {
    return messageService.getMessagesByConversationId(conversation.id);
  }
}
