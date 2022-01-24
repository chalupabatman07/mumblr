import Koa from 'koa';
import Router from 'koa-router';

import { authService } from '../auth';

export const SIGN_UP = {
  path: '/api/signup',
  middleware: async (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>, next: Koa.Next) => {
    const email = ctx.request.body.email;
    const password = ctx.request.body.password;
    try {
      const user = await authService.signUp(email, password, 'test#');
      ctx.body = user;
    } catch (e: any) {
      ctx.body = {
        error: {
          statusCode: e._statusCode,
          message: e.message,
        },
      };
    }
  },
};

export const LOGIN = {
  path: '/api/login',
  middleware: async (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>, next: Koa.Next) => {
    const email = ctx.request.body.email;
    const password = ctx.request.body.password;
    try {
      const user = await authService.login(email, password);
      ctx.body = user;
    } catch (e: any) {
      ctx.body = {
        error: {
          statusCode: e._statusCode,
          message: e.message,
        },
      };
    }
  },
};

export const UPDATE_PASSWORD = {
  path: '/api/update-password',
  middleware: async (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>, next: Koa.Next) => {
    const email = ctx.request.body.email;
    const currentPassword = ctx.request.body.currentPassword;
    const password = ctx.request.body.password;
    try {
      const user = await authService.changePassword(email, currentPassword, password);
      ctx.body = user;
    } catch (e: any) {
      ctx.body = {
        error: {
          statusCode: e._statusCode,
          message: e.message,
        },
      };
    }
  },
};
