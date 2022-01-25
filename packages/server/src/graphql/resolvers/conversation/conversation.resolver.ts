import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql';

import { conversationService, participantService } from '../../../services';
import { Conversation, Participant } from '../..';

@Resolver(of => Conversation)
export class ConversationResolver {
  @Query(() => Conversation)
  public getConversationById(@Arg('conversationId') conversationId: string): Promise<Conversation> {
    return conversationService.getConversationById(conversationId);
  }

  @FieldResolver()
  public participants(@Root() conversation: Conversation): Promise<Participant[]> {
    return participantService.getAllParticipantsByConversationId(conversation.id);
  }
}
