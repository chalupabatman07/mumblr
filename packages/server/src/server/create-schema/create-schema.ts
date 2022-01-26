import { GraphQLSchema } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import path from 'path';
import { buildSchema } from 'type-graphql';

import {
  ConversationResolver,
  DiscoveryResolver,
  LifestyleResolver,
  MatchResolver,
  MessageResolver,
  ProfileResolver,
  UserResolver,
} from '../../schema';
import { TestResolver } from '../../schema/resolvers/test/test';

export const createSchema = async (pubSub: PubSub): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [
      ConversationResolver,
      DiscoveryResolver,
      LifestyleResolver,
      MatchResolver,
      MessageResolver,
      TestResolver,
      ProfileResolver,
      UserResolver,
    ],
    emitSchemaFile: path.resolve(__dirname, '../../../generated/schema.gql'),
    validate: false,
    pubSub: pubSub,
  });
