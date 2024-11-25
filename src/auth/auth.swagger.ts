import { applyDecorators } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { TokenDto } from 'src/token/token.dto';

export const PostLogin = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Login',
      description: 'Logins a user and returns access & refresh JWT tokens',
    }),
    ApiOkResponse({
      description: 'Successful operation.',
      type: [TokenDto],
    }),
    ApiForbiddenResponse({
      description: 'Wrong password',
    }),
    ApiNotFoundResponse({ description: 'No user with this login' }),
  );
};
export const PostRefresh = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Refresh token',
      description: `Refreshes user's JWT tokens`,
    }),
    ApiOkResponse({
      description: 'Successful operation.',
      type: [TokenDto],
    }),
    ApiForbiddenResponse({
      description: 'Token invalid or expired',
    }),
    ApiNotFoundResponse({ description: 'No user with this login' }),
  );
};
