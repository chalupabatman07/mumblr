import AltairFastify from 'altair-fastify-plugin';
import { config } from 'dotenv';
import fastify from 'fastify';
import mercurius from 'mercurius';

import { initTypeorm } from './db';
import { buildTypegraphqlSchema } from './schema';

const app = fastify();

config();

(async () => {
  await initTypeorm();

  const schema = await buildTypegraphqlSchema();
  app.register(mercurius, {
    schema,
    graphiql: false,
    ide: false,
    path: '/graphql',
  });

  app.register(AltairFastify, {
    path: '/altair',
    baseURL: '/altair/',
    endpointURL: '/graphql',
  });

  app.listen(8080, (): void => console.log(`SERVER STARTED ON PORT 8080`));
})();
