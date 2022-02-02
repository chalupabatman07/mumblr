import 'reflect-metadata';

import AltairFastify from 'altair-fastify-plugin';
import { config } from 'dotenv';
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifyCompress from 'fastify-compress';
import fastifyCors from 'fastify-cors';
import fastifyWebsocket from 'fastify-websocket';
import { PubSub } from 'graphql-subscriptions';
import { makeHandler } from 'graphql-ws/lib/use/fastify-websocket';
import mercurius from 'mercurius';
import mercuriusAuth from 'mercurius-auth';
import MercuriusGQLUpload from 'mercurius-upload';

import { initTypeorm } from './db';
import { createSchema, IAuthBody, LOGIN, SIGN_UP } from './server';

config();

export const rejectEncoding: (encoding: any, request: any, reply: any) => string = (encoding, request, reply) => {
  reply.code(406);
  return `Encoding format ${encoding} not supported`;
};

const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => {
  return {
    authorization: req.headers.authorization,
  };
};

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;
declare module 'mercurius' {
  interface MercuriusContext extends PromiseType<ReturnType<typeof buildContext>> {}
}

export function fastifyAppClosePlugin(app: FastifyInstance) {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await app.close();
        },
      };
    },
  };
}

// TODO: Move this to env file
const origin = 'some website';

(async () => {
  await initTypeorm();

  const server = Fastify({ logger: true });
  const pubSub = new PubSub();
  const schema = await createSchema(pubSub);

  server.register(fastifyWebsocket);
  server.register(MercuriusGQLUpload);
  server.register(mercurius, {
    schema: schema,
    subscription: true,
    federationMetadata: false,
    graphiql: false,
    ide: false,
    path: '/graphql',
  });
  server.register(AltairFastify, {
    path: '/altair',
    baseURL: '/altair/',
    endpointURL: '/graphql',
    subscriptionsEndpoint: '/sub',
  });

  server.register(fastifyCors, instance => (req, callback) => {
    let corOptions;
    if (/localhost/.test(origin)) {
      corOptions = { origin: false };
    } else {
      corOptions = { origin: true };
    }
    callback(null, corOptions);
  });

  server.register(mercuriusAuth, {
    authContext(context) {
      return {
        identity: context.reply.request.headers['authorization'],
      };
    },
    async applyPolicy(authDirectiveAST, parent, args, context, info) {
      if (context.auth) return context.auth.identity === 'admin';
      return false;
    },
    authDirective: 'auth',
  });

  server.get('/sub', { websocket: true }, makeHandler({ schema }));

  server.post<{ Body: IAuthBody }>(LOGIN.path, LOGIN.options, LOGIN.handler);
  server.post<{ Body: IAuthBody }>(SIGN_UP.path, SIGN_UP.options, SIGN_UP.handler);

  server.register(fastifyCompress, { global: false, onUnsupportedEncoding: rejectEncoding });

  await server.listen(8080, err => {
    if (err) {
      server.log.error(err);
      return process.exit(1);
    }
    console.log('Subscription server registered');
  });
  console.log('Server started on port 8080');
})();
