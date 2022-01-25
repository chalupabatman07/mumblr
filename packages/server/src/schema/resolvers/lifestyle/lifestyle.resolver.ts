import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import { lifestyleService } from '../../../services';
import { UpdateLifestyleInput } from '../../inputs';
import { Lifestyle } from '../../models';

@Resolver(of => Lifestyle)
export class LifestyleResolver {
  @Query(() => [Lifestyle])
  async getLifestyles(): Promise<Lifestyle[]> {
    return await lifestyleService.getAll();
  }

  @Mutation(() => Lifestyle)
  async updateLifestyle(@Arg('input') input: UpdateLifestyleInput): Promise<Lifestyle> {
    return await lifestyleService.updateLifestyle(input);
  }
}
