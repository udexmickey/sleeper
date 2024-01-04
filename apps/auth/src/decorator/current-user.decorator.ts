import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../users/models/user.schema';

const getCurrentUser = (ctx: ExecutionContext): User => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return getCurrentUser(ctx);
  },
);
