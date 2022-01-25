import { Participant } from '../../graphql';

class ParticipantService {
  public async getAllParticipantsByConversationId(conversationId: string): Promise<Participant[]> {
    try {
      console.log('sup beech');
      return Participant.find({
        where: {
          conversation: {
            id: conversationId,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
    const parts: Participant[] = [];
    return parts;
  }
}

export const participantService = new ParticipantService();
