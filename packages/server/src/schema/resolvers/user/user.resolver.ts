import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';

import { isAuth, MumblrContext } from '../../../server';
import { userService } from '../../../services';
import { checkUserContext } from '../../../utils';
import { User } from '../../models';

@Resolver(of => User)
export class UserResolver {
  @Query(() => User)
  @UseMiddleware(isAuth)
  async me(@Ctx() context: MumblrContext): Promise<User> {
    const userId = checkUserContext(context);
    return await userService.getUserById(userId);
  }
}
