import { todayISOString } from '@mumblr/shared';

import { CreateMessageInput, Message } from '../../schema';
import { Exception } from '../../utils';

class MessageService {
  public getAll(): Promise<Message[]> {
    return Message.find();
  }

  public getMessagesByConversationId(conversationId: string): Promise<Message[]> {
    return Message.find({
      where: {
        conversationId,
      },
    });
  }

  public async createMessageForConversationId(
    userId: string,
    { content, conversationId }: CreateMessageInput,
  ): Promise<Message[]> {
    const message = new Message();
    message.sentBy = userId;
    message.content = content;
    message.sentAt = todayISOString();
    message.conversationId = conversationId;

    try {
      await message.save();
    } catch (e) {
      throw new Exception(400, `Something went wrong creating an error for conversation with id: ${conversationId}`);
    }

    return Message.find({
      where: {
        conversationId,
      },
    });
  }
}

export const messageService = new MessageService();
