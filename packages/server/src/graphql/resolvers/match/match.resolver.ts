import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql';

import { isAuth, MumblrContext } from '../../../server';
import { conversationService, matchService } from '../../../services';
import { checkUserContext } from '../../../utils';
import { Conversation, Match } from '../..';

@Resolver(of => Match)
export class MatchResolver {
  @Query(() => [Match])
  async getMatches(): Promise<Match[]> {
    return await matchService.getAll();
  }

  @Mutation(() => Match)
  @UseMiddleware(isAuth)
  async createMatch(@Arg('matchId') matchId: string, @Ctx() ctx: MumblrContext): Promise<Match> {
    const userId = checkUserContext(ctx);
    return await matchService.createMatch(userId, matchId);
  }

  @FieldResolver()
  async conversation(@Root() match: Match): Promise<Conversation> {
    return await conversationService.getConversationById(match.conversationId);
  }
}
