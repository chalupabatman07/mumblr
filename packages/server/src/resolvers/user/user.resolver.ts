import { Query, Resolver, UseMiddleware } from 'type-graphql';

import { isAuth } from '../../auth';
import { User } from '../../models';

@Resolver(of => User)
export class UserResolver {
  @Query(() => User)
  @UseMiddleware(isAuth)
  async me(): Promise<User | undefined> {
    return undefined;
  }
}
