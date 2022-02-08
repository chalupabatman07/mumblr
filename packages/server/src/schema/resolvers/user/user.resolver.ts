import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';

import { authService, isAuth, MumblrContext } from '../../../server';
import { AuthToken } from '../../../server/auth/auth.model';
import { userService } from '../../../services';
import { checkUserContext } from '../../../utils';
import { UpdateUserInput } from '../..';
import { User } from '../../models';

@Resolver(of => User)
export class UserResolver {
  @Query(() => User)
  @UseMiddleware(isAuth)
  async me(@Ctx() context: MumblrContext): Promise<User> {
    const userId = checkUserContext(context);
    return await userService.getUserById(userId);
  }

  @Mutation(() => AuthToken)
  async createUser(@Arg('phoneNumber') phoneNumber: string): Promise<AuthToken> {
    return await authService.signUp(phoneNumber);
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async updateUser(@Arg('input') input: UpdateUserInput, @Ctx() context: MumblrContext): Promise<User> {
    const userId = checkUserContext(context);
    return userService.updateUserById(userId, input);
  }
}
