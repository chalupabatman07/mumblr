import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import { CreateProfileInput } from '../../inputs';
import { Profile } from '../../models';

@Resolver()
export class ProfileResolver {
  @Query(() => [Profile])
  async getProfile(): Promise<Profile[]> {
    return await Profile.find();
  }

  @Mutation(() => Profile)
  async createProfile(@Arg('CreateProfileInput') input: CreateProfileInput): Promise<Profile> {
    const { aboutMe, jobTitle, company, school, livingIn, gender, sexualOrientation } = input;

    const profile = Profile.create({
      aboutMe,
      jobTitle,
      company,
      school,
      livingIn,
      gender,
      sexualOrientation,
    });

    await profile.save();
    return profile;
  }
}
