import AltairFastify from 'altair-fastify-plugin';
import fastify from 'fastify';
import mercurius from 'mercurius';

import { createTypeGraphQLSchema } from './temp/createTypeGraphQLSchema';

const app = fastify();

(async () => {
  const schema = await createTypeGraphQLSchema();

  app.register(mercurius, {
    schema,
    graphiql: false,
    ide: false,
    path: '/graphql',
  });

  app.register(AltairFastify, {
    path: '/altair',
    baseURL: '/altair/',
    // 'endpointURL' should be the same as the mercurius 'path'
    endpointURL: '/graphql',
  });

  app.listen(8080, (): void => console.log(`SERVER STARTED ON PORT 8080`));
})();
