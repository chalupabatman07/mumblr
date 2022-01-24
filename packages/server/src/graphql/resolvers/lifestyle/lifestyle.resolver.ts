import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import { UpdateLifestyleInput } from '../../inputs';
import { Lifestyle } from '../../models';

@Resolver(of => Lifestyle)
export class LifestyleResolver {
  @Query(() => [Lifestyle])
  async getLifestyles(): Promise<Lifestyle[]> {
    const lifestyles = await Lifestyle.find();
    return lifestyles;
  }

  @Mutation(() => Lifestyle)
  async updateLifestyle(@Arg('input') input: UpdateLifestyleInput): Promise<Lifestyle> {
    const { lifestyleId, drinking, smoking, marijuana, zodiac, pets } = input;
    const lifestyle = await Lifestyle.findOne(lifestyleId);
    if (!lifestyle) {
      throw new Error('Users lifestyle was not found');
    }

    lifestyle.drinking = drinking ?? lifestyle.drinking;
    lifestyle.smoking = smoking ?? lifestyle.smoking;
    lifestyle.marijuana = marijuana ?? lifestyle.marijuana;
    lifestyle.zodiac = zodiac ?? lifestyle.zodiac;
    lifestyle.pets = pets ?? lifestyle.pets;

    await lifestyle.save();
    return lifestyle;
  }
}
