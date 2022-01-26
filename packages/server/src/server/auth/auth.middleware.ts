import { verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';

import { Exception } from '../../utils';

export interface MumblrContext {
  auth?: any;
  payload?: { userId: string };
}

export const isAuth: MiddlewareFn<MumblrContext> = ({ context }, next) => {
  const authorized = context.auth.identity;
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
