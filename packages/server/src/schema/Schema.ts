import { buildSchema } from 'type-graphql';

import { ProfileResolver } from '../resolvers';

export const buildTypegraphqlSchema = async () => {
  return await buildSchema({
    resolvers: [ProfileResolver],
  });
};
