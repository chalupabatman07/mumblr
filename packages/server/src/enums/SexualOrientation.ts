import { registerEnumType } from 'type-graphql';

export enum SexualOrientation {
  STRAIGHT = 'STRAIGHT',
  GAY = 'GAY',
  LESBIAN = 'LESBIAN',
  BISEXUAL = 'BISEXUAL',
  ASEXUAL = 'ASEXUAL',
  DEMISEXUAL = 'DEMISEXUAL',
  PANSEXUAL = 'PANSEXUAL',
  QUEER = 'QUEER',
  QUESTIONING = 'QUESTIONING',
}

registerEnumType(SexualOrientation, {
  name: 'SexualOrientation',
  description: 'How the user swings',
});
