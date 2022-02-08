import { Field, InputType } from 'type-graphql';

import { Gender, SexualOrientation, ShowPreference } from '../..';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  birthday?: string;

  @Field(type => Gender, { nullable: true })
  gender?: Gender;

  @Field(type => SexualOrientation, { nullable: true })
  sexualOrientation?: SexualOrientation;

  @Field(type => ShowPreference, { nullable: true })
  showPreference?: ShowPreference;

  @Field({ nullable: true })
  school?: string;
}
