import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';

import { BlinderContext, isAuth } from '../../../server';
import { Exception } from '../../../utils';
import { User } from '../../models';

@Resolver(of => User)
export class UserResolver {
  @Query(() => User)
  @UseMiddleware(isAuth)
  async me(@Ctx() context: BlinderContext): Promise<User> {
    if (!context.payload) {
      throw new Exception(400, 'Oops, something went wrong. Try again later.');
    }

    const { userId } = context.payload;
    const user = await User.findOne(userId);
    if (!user) {
      throw new Exception(404, `User with id: ${userId} was not found`);
    }

    return user;
  }
}
