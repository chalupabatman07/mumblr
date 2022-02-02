import { FastifyReply, FastifyRequest } from 'fastify';

import { authService } from '../auth';

export interface IAuthBody {
  phoneNumber: string;
}

const AUTH_SCHEMA = {
  body: {
    phoneNumber: { type: 'string' },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        user: {
          id: { type: 'string' },
          phoneNumber: { type: 'string' },
        },
        token: { type: 'string' },
      },
    },
    404: {
      type: 'object',
      properties: {
        error: {
          statusCode: { type: 'string' },
          message: { type: 'string' },
        },
      },
    },
  },
};

export const SIGN_UP = {
  path: '/api/signup',
  options: {
    schema: AUTH_SCHEMA,
  },
  handler: async (request: FastifyRequest<{ Body: IAuthBody }>, reply: FastifyReply) => {
    const phoneNumber = request.body.phoneNumber;

    try {
      const user = await authService.signUp(phoneNumber);
      reply.send(user);
    } catch (e: any) {
      const error = {
        error: {
          statusCode: e._statusCode,
          message: e.message,
        },
      };
      reply.code(404);
      reply.send(error);
    }
  },
};

export const LOGIN = {
  path: '/api/login',
  options: {
    schema: AUTH_SCHEMA,
  },
  handler: async (request: FastifyRequest<{ Body: IAuthBody }>, reply: FastifyReply) => {
    const phoneNumber = request.body.phoneNumber;

    try {
      const user = await authService.login(phoneNumber);
      reply.send(user);
    } catch (e: any) {
      const error = {
        error: {
          statusCode: e._statusCode,
          message: e.message,
        },
      };
      reply.code(404);
      reply.send(error);
    }
  },
};
