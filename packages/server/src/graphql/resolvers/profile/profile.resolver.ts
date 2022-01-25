import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  ResolverInterface,
  Root,
  UseMiddleware,
} from 'type-graphql';

import { isAuth, MumblrContext } from '../../../server';
import { discoveryService, lifestyleService, profileService } from '../../../services';
import { checkUserContext } from '../../../utils';
import { CreateProfileInput, UpdateProfileInput } from '../../inputs';
import { Discovery, Lifestyle, Profile } from '../../models';

@Resolver(of => Profile)
export class ProfileResolver implements ResolverInterface<Profile> {
  @Query(() => [Profile])
  async getProfile(): Promise<Profile[]> {
    return await profileService.getAllProfiles();
  }

  @Query(() => Profile)
  @UseMiddleware(isAuth)
  async myProfile(@Ctx() ctx: MumblrContext): Promise<Profile> {
    const userId = checkUserContext(ctx);
    return profileService.getProfileByUserId(userId);
  }

  @Mutation(() => Profile)
  @UseMiddleware(isAuth)
  async createProfile(@Arg('input') input: CreateProfileInput, @Ctx() ctx: MumblrContext): Promise<Profile> {
    const userId = checkUserContext(ctx);
    return await profileService.createProfile(userId, input);
  }

  @Mutation(() => Profile)
  @UseMiddleware(isAuth)
  async updateProfile(@Arg('input') input: UpdateProfileInput): Promise<Profile> {
    return await profileService.updateProfile(input);
  }

  @FieldResolver()
  async lifestyle(@Root() profile: Profile): Promise<Lifestyle> {
    return await lifestyleService.getByLifestyleId(profile.lifestyleId);
  }

  @FieldResolver()
  async discovery(@Root() profile: Profile): Promise<Discovery> {
    return await discoveryService.getByDiscoveryId(profile.discoveryId);
  }
}
