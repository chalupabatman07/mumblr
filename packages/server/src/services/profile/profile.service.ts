import { CreateProfileInput, Lifestyle, Profile, UpdateProfileInput } from '../../graphql';
import { Exception } from '../../utils';

class ProfileService {
  public async getAllProfiles(): Promise<Profile[]> {
    return await Profile.find();
  }

  public async getProfileByProfileId(profileId: string): Promise<Profile> {
    const profile = await Profile.findOne(profileId);
    if (!profile) {
      throw new Exception(404, `No profile found for id: ${profileId}`);
    }
    return profile;
  }

  public async getProfileByUserId(userId: string): Promise<Profile> {
    const profile = await Profile.findOne({
      where: {
        userId,
      },
    });
    if (!profile) {
      throw new Exception(404, `No profile found for user with id: ${userId}`);
    }
    return profile;
  }

  public async createProfile(userId: string, input: CreateProfileInput): Promise<Profile> {
    const { aboutMe, jobTitle, company, school, livingIn, gender, sexualOrientation } = input;
    const lifestyle = new Lifestyle();
    const profile = new Profile();

    profile.userId = userId;
    profile.aboutMe = aboutMe;
    profile.jobTitle = jobTitle;
    profile.company = company;
    profile.school = school;
    profile.livingIn = livingIn;
    profile.gender = gender;
    profile.sexualOrientation = sexualOrientation;
    profile.lifestyle = lifestyle;

    try {
      await profile.save();
    } catch (e) {
      throw new Exception(400, `An error occured while trying to create a profile for user with id ${userId}`);
    }

    return profile;
  }

  public async updateProfile(input: UpdateProfileInput): Promise<Profile> {
    const { profileId, aboutMe, jobTitle, company, school, livingIn, gender, sexualOrientation } = input;
    const profile = await this.getProfileByProfileId(profileId);

    profile.aboutMe = aboutMe ?? profile.aboutMe;
    profile.jobTitle = jobTitle ?? profile.jobTitle;
    profile.company = company ?? profile.company;
    profile.school = school ?? profile.school;
    profile.livingIn = livingIn ?? profile.livingIn;
    profile.gender = gender ?? profile.gender;
    profile.sexualOrientation = sexualOrientation ?? profile.sexualOrientation;

    try {
      await profile.save();
    } catch (e) {
      throw new Exception(400, `An error occured while trying to update profile with id: ${profileId}`);
    }

    return profile;
  }
}

export const profileService = new ProfileService();
