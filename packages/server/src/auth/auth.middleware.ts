import { verify } from 'jsonwebtoken';
import { Request, Response } from 'koa';
import { MiddlewareFn } from 'type-graphql';

import { Exception } from '../utils';

// TODO: change this name once we come up with app name
export interface BlinderContext {
  request: Request;
  response: Response;
  payload?: { userId: string };
}

export const isAuth: MiddlewareFn<BlinderContext> = ({ context }, next) => {
  const authorized = context.request.headers['authorization'];
  if (!authorized) {
    throw new Exception(401, 'Not authorized');
  }

  try {
    const token = authorized.split(' ')[1];
    const user = verify(token, process.env.JWT_SECRET!) as any;
    const payload = {
      userId: user.data.id,
    };
    context.payload = payload;
  } catch (e) {
    throw new Exception(401, 'Not authorized');
  }

  return next();
};
