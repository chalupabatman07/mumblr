import { Arg, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from 'type-graphql';

import { CreateProfileInput, UpdateProfileInput } from '../../inputs';
import { Lifestyle, Profile } from '../../models';

@Resolver(of => Profile)
export class ProfileResolver implements ResolverInterface<Profile> {
  @Query(() => [Profile])
  async getProfile(): Promise<Profile[]> {
    const profile = await Profile.find();
    return profile;
  }

  @Mutation(() => Profile)
  async createProfile(@Arg('input') input: CreateProfileInput): Promise<Profile> {
    const { aboutMe, jobTitle, company, school, livingIn, gender, sexualOrientation } = input;
    const lifestyle = new Lifestyle();
    const profile = new Profile();

    profile.aboutMe = aboutMe;
    profile.jobTitle = jobTitle;
    profile.company = company;
    profile.school = school;
    profile.livingIn = livingIn;
    profile.gender = gender;
    profile.sexualOrientation = sexualOrientation;
    profile.lifestyle = lifestyle;

    await profile.save();
    return profile;
  }

  @Mutation(() => Profile)
  async updateProfile(@Arg('input') input: UpdateProfileInput): Promise<Profile> {
    const { profileId, aboutMe, jobTitle, company, school, livingIn, gender, sexualOrientation } = input;
    const profile = await Profile.findOne(profileId);
    if (!profile) {
      throw new Error('User profile not found');
    }

    profile.aboutMe = aboutMe ?? profile.aboutMe;
    profile.jobTitle = jobTitle ?? profile.jobTitle;
    profile.company = company ?? profile.company;
    profile.school = school ?? profile.school;
    profile.livingIn = livingIn ?? profile.livingIn;
    profile.gender = gender ?? profile.gender;
    profile.sexualOrientation = sexualOrientation ?? profile.sexualOrientation;

    await profile.save();
    return profile;
  }

  @FieldResolver()
  async lifestyle(@Root() profile: Profile): Promise<Lifestyle> {
    const usersLifestyle = (await Lifestyle.findOne(profile.lifestyleId)) ?? new Lifestyle();
    return usersLifestyle;
  }
}
