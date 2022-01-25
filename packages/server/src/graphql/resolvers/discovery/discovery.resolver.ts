import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import { discoveryService } from '../../../services';
import { Discovery, UpdateDiscoveryInput } from '../..';

@Resolver(of => Discovery)
export class DiscoveryResolver {
  @Query(() => [Discovery])
  async getDiscoveries(): Promise<Discovery[]> {
    return await discoveryService.getAll();
  }

  @Mutation(() => Discovery)
  async updateDiscovery(@Arg('input') input: UpdateDiscoveryInput): Promise<Discovery> {
    return await discoveryService.updateDiscovery(input);
  }
}
