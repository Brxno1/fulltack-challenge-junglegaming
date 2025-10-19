import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface AuthenticatedUser {
  userId: string;
  email: string;
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
