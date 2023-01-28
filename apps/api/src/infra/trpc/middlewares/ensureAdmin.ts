import { Role } from '@prisma/client';
import NotAuthorizedError from '@errors/notAuthorizedError';
import { middleware } from '../index';

const ensureAdmin = middleware(({ ctx, next }) => {
  if (ctx.user?.role !== Role.ADMIN) {
    throw new NotAuthorizedError();
  }

  return next();
});

export default ensureAdmin;
