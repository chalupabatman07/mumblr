import { buildSchema } from 'type-graphql';

import { LifestyleResolver, ProfileResolver } from '../resolvers';

export const buildTypegraphqlSchema = async () => {
  return await buildSchema({
    resolvers: [LifestyleResolver, ProfileResolver],
  });
};
