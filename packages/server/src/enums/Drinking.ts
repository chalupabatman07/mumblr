import { registerEnumType } from 'type-graphql';

export enum Drinking {
  SOCIAL_DRINKER = 'SOCIAL_DRINKER',
  NONDRINKER = 'NONDRINKER',
  DRINKER = 'DRINKER',
}

registerEnumType(Drinking, {
  name: 'Drinking',
  description: 'Does the user drink',
});
