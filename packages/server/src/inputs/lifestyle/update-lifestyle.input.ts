import { Field, InputType } from 'type-graphql';

import { Drinking, Pets, Smoking, Zodiac } from '../../enums';

@InputType()
export class UpdateLifestyleInput {
  @Field()
  lifestyleId!: string;

  @Field(type => Drinking, { nullable: true })
  drinking?: Drinking;

  @Field(type => Smoking, { nullable: true })
  smoking?: Smoking;

  @Field(type => Smoking, { nullable: true })
  marijuana?: Smoking;

  @Field(type => Zodiac, { nullable: true })
  zodiac?: Zodiac;

  @Field(type => Pets, { nullable: true })
  pets?: Pets;
}
