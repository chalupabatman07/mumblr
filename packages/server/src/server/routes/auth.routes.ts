import { FastifyReply, FastifyRequest } from 'fastify';

import { authService } from '../auth';

export interface IAuthBody {
  email: string;
  password: string;
}

export interface IChangePasswordBody {
  email: string;
  password: string;
  currentPassword: string;
}

const AUTH_SCHEMA = {
  body: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        user: {
          id: { type: 'string' },
          email: { type: 'string' },
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

const CHANGE_PASSWORD_SCHEMA = {
  body: {
    email: { type: 'string' },
    password: { type: 'string' },
    currentPassword: { type: 'string' },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        user: {
          id: { type: 'string' },
          email: { type: 'string' },
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
    const email = request.body.email;
    const password = request.body.password;
    try {
      const user = await authService.signUp(email, password, 'test#');
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
    const email = request.body.email;
    const password = request.body.password;
    try {
      const user = await authService.login(email, password);
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

export const UPDATE_PASSWORD = {
  path: '/api/update-password',
  options: {
    schema: CHANGE_PASSWORD_SCHEMA,
  },
  handler: async (request: FastifyRequest<{ Body: IChangePasswordBody }>, reply: FastifyReply) => {
    const email = request.body.email;
    const currentPassword = request.body.currentPassword;
    const password = request.body.password;
    try {
      const user = await authService.changePassword(email, currentPassword, password);
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
