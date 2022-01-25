import { Match } from '../../graphql';
import { Exception } from '../../utils';
import { conversationService } from '..';

class MatchService {
  public async getAll(): Promise<Match[]> {
    return await Match.find();
  }

  public async getById(id: string): Promise<Match> {
    const match = await Match.findOne(id);
    if (!match) {
      throw new Exception(404, `Could not find a match with id: ${id}`);
    }
    return match;
  }

  public async createMatch(userId: string, matchId: string): Promise<Match> {
    const conversation = await conversationService.createConversation(userId, matchId);
    const match = new Match();
    match.userId = userId;
    match.matchId = matchId;
    match.conversation = conversation;

    try {
      await match.save();
    } catch (e) {
      throw new Exception(400, 'An error occured while trying to create a match');
    }

    return match;
  }
}

export const matchService = new MatchService();
