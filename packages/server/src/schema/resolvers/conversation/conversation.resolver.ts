import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql';

import { conversationService, messageService, participantService } from '../../../services';
import { Conversation, Message, Participant } from '../..';

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

  @FieldResolver()
  public messages(@Root() conversation: Conversation): Promise<Message[]> {
    return messageService.getMessagesByConversationId(conversation.id);
  }
}
