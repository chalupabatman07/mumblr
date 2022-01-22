import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import { Profile } from '../../models';

@Resolver()
export class ProfileResolver {
  @Query(() => [Profile])
  async getProfile(): Promise<Profile[]> {
    return await Profile.find();
  }

  @Mutation(() => Profile)
  async createProfile(@Arg('aboutMe') aboutMe: string): Promise<Profile> {
    const profile = Profile.create({
      aboutMe,
    });
    await profile.save();
    return profile;
  }
}
