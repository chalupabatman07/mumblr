import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';

import { isAuth, MumblrContext } from '../../../server';
import { matchService } from '../../../services';
import { checkUserContext } from '../../../utils';
import { Match } from '../..';

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
}
