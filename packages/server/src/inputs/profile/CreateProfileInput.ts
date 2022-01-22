import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { Gender, SexualOrientation } from '../../enums';

@InputType()
export class CreateProfileInput {
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

  @Field(type => Gender)
  gender!: Gender;

  @Field(type => SexualOrientation)
  sexualOrientation!: SexualOrientation;
}
