import { Conversation } from '../../graphql';
import { Exception } from '../../utils';

class ConversationService {
  public async getAll(): Promise<Conversation[]> {
    return await Conversation.find();
  }

  public async getConversationById(conversationId: string): Promise<Conversation> {
    const conversation = await Conversation.findOne(conversationId);
    if (!conversation) {
      throw new Exception(404, `No conversation found for conversation with id: ${conversationId}`);
    }
    return conversation;
  }

  public async createConversation(matchId: string): Promise<Conversation> {
    const conversation = new Conversation();

    try {
      await conversation.save();
    } catch (e) {
      throw new Exception(400, `An error occured while trying to make a conversation for match with id: ${matchId}`);
    }

    return conversation;
  }
}

export const conversationService = new ConversationService();
