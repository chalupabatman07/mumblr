import { registerEnumType } from 'type-graphql';

export enum ShowPreference {
  MEN = 'MEN',
  WOMEN = 'WOMEN',
  EVERYONE = 'EVERYONE',
}

registerEnumType(ShowPreference, {
  name: 'ShowPreference',
  description: 'Who to show to the user',
});
