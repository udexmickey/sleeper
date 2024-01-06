import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { userDto } from '../dto/user.dto';

const getCurrentUser = (ctx: ExecutionContext): userDto => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return getCurrentUser(ctx);
  },
);
