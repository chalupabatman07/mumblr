import { BlinderContext } from '../server';
import { Exception } from '.';

export const checkUserContext = (ctx: BlinderContext): string => {
  if (!ctx.payload) {
    throw new Exception(400, 'Oops! Something went wrong. Try again later?');
  }

  const { userId } = ctx.payload;
  if (!userId) {
    throw new Exception(400, 'An error occured while trying to create users profile');
  }

  return userId;
};
