import { registerEnumType } from 'type-graphql';

export enum Pets {
  DOG = 'DOG',
  CAT = 'CAT',
  REPTILE = 'REPTILE',
  BIRD = 'BIRD',
  FISH = 'FISH',
  PET_FREE = 'PET_FREE',
  ALL_PETS = 'ALL_PETS',
}

registerEnumType(Pets, {
  name: 'Pets',
  description: 'Pets that users can have',
});
