import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { TokenDto } from 'src/token/token.dto';
import { UserModel } from 'src/user/user.model';

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
      description: `no user with such login, password doesn't match actual one, etc.`,
    }),
    ApiBadRequestResponse({
      description: `no login or password, or they are not a strings`,
    }),
  );
};

export const PostSingup = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Singnup',
      description: 'Adds new user',
    }),
    ApiCreatedResponse({
      description: 'Successful operation.',
      type: [UserModel],
    }),
    ApiBadRequestResponse({
      description: `no login or password, or they are not a strings`,
    }),
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
