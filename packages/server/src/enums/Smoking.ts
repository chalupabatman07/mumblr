import { registerEnumType } from 'type-graphql';

export enum Smoking {
  SOCIAL_SMOKER = 'SOCIAL_SMOKER',
  SMOKER_WHILE_DRINKING = 'SMOKER_WHILE_DRINKING',
  NONSMOKER = 'NONSMOKER',
  SMOKER = 'SMOKER',
}

registerEnumType(Smoking, {
  name: 'Smoking',
  description: 'Does the user smoke?',
});
