import { Conversation, Participant } from '../../schema';
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

  public async createConversation(userId: string, matchId: string): Promise<Conversation> {
    const conversation = new Conversation();
    const participantOne = new Participant();
    const participantTwo = new Participant();

    participantOne.userId = userId;
    participantTwo.userId = matchId;

    try {
      await participantOne.save();
      await participantTwo.save();
      conversation.participants = [participantOne, participantTwo];
      conversation.messages = [];
      await conversation.save();
    } catch (e) {
      throw new Exception(400, `An error occured while trying to make a conversation for match with id: ${matchId}`);
    }

    return conversation;
  }
}

export const conversationService = new ConversationService();
