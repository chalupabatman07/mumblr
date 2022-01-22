import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { Gender, SexualOrientation } from '../../enums';

@InputType()
export class UpdateProfileInput {
  @Field()
  profileId!: string;

  @Field({ nullable: true })
  @Length(5, 500)
  aboutMe?: string;

  @Field({ nullable: true })
  jobTitle?: string;

  @Field({ nullable: true })
  company?: string;

  @Field({ nullable: true })
  school?: string;

  @Field({ nullable: true })
  livingIn?: string;

  @Field(type => Gender, { nullable: true })
  gender?: Gender;

  @Field(type => SexualOrientation, { nullable: true })
  sexualOrientation?: SexualOrientation;
}
