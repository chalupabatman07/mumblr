import { registerEnumType } from 'type-graphql';

export enum Gender {
  MALE = 'MALE',
  WOMEN = 'WOMEN',
  GENDERFLUID = 'GENDERFLUID',
  GENDERQUEER = 'GENDERQUEER',
  NONBINARY = 'NONBINARY',
  TRANSGENDER = 'TRANSGENDER',
  TRANSSEXUAL = 'TRANSSEXUAL',
  TRANSMEN = 'TRANSMEN',
  TRANSWOMEN = 'TRANSWOMEN',
}

registerEnumType(Gender, {
  name: 'Gender',
  description: 'Users genders',
});
