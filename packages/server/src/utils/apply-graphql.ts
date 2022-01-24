import { GraphQLSchema } from 'graphql';
import Koa from 'koa';
import { graphqlHTTP } from 'koa-graphql';
import jwt from 'koa-jwt';
import Router from 'koa-router';
import path from 'path';
import { buildSchema } from 'type-graphql';

import { LifestyleResolver, ProfileResolver } from '../resolvers';
import { UserResolver } from '../resolvers/user';
import { LOGIN, SIGN_UP, UPDATE_PASSWORD } from '../routes';

const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [LifestyleResolver, ProfileResolver, UserResolver],
    emitSchemaFile: path.resolve(__dirname, '../generated/schema.gql'),
    validate: false,
  });

export const applyGraphql = async (app: Koa): Promise<void> => {
  const schema = await createSchema();

  const router = new Router();

  router.use(jwt({ secret: process.env.JWT_SECRET!, passthrough: true, cookie: 'token ' }));

  router.all(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true,
    }),
  );

  router.post(SIGN_UP.path, SIGN_UP.middleware);
  router.post(LOGIN.path, LOGIN.middleware);
  router.post(UPDATE_PASSWORD.path, UPDATE_PASSWORD.middleware);

  app.use(router.routes()).use(router.allowedMethods());
};
