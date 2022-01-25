import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';

import { isAuth, MumblrContext } from '../../../server';
import { messageService } from '../../../services';
import { checkUserContext } from '../../../utils';
import { CreateMessageInput, Message } from '../..';

@Resolver(of => Message)
export class MessageResolver {
  @Query(() => [Message])
  public getAllMessages(): Promise<Message[]> {
    return messageService.getAll();
  }

  @Query(() => [Message])
  public getMessagesByConversationId(@Arg('conversationId') conversationId: string): Promise<Message[]> {
    return messageService.getMessagesByConversationId(conversationId);
  }

  @Mutation(() => [Message])
  @UseMiddleware(isAuth)
  public async createMessageForConversationId(
    @Arg('input') input: CreateMessageInput,
    @Ctx() ctx: MumblrContext,
  ): Promise<Message[]> {
    const userId = checkUserContext(ctx);
    return await messageService.createMessageForConversationId(userId, input);
  }
}
