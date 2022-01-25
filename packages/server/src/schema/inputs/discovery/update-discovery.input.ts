import { Field, InputType, Int } from 'type-graphql';

import { ShowPreference } from '../../enums';

@InputType()
export class UpdateDiscoveryInput {
  @Field(() => String)
  public discoveryId!: string;

  @Field(() => String)
  public location?: string;

  @Field(() => Int)
  public distance?: number;

  @Field(type => ShowPreference)
  public showPreference?: ShowPreference;

  @Field(() => Int)
  public agePreferenceStart?: number;

  @Field(() => Int)
  public agePreferenceEnd?: number;

  @Field(() => Boolean)
  public showOnlyInAgeRange?: boolean;

  @Field(() => Boolean)
  public showGlobal?: boolean;

  @Field(() => Boolean)
  public showMe?: boolean;
}
