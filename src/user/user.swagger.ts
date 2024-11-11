import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UserModel } from './user.model';
import { CreateUserDto } from './dto';
import { ApiDelete, ApiGetById, ApiPost, ApiPut } from 'src/swagger.decorators';

const entity = 'User';

export const GetUser = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all users.',
      description: 'Gets all users.',
    }),
    ApiOkResponse({
      description: 'Successful operation.',
      type: [UserModel],
    }),
  );
};

export const GetUserById = () => {
  return applyDecorators(
    ApiGetById(entity),
    ApiOkResponse({
      description: 'Successful operation.',
      type: UserModel,
    }),
  );
};

export const PostUser = () => {
  return applyDecorators(
    ApiPost(entity),
    ApiBody({
      type: CreateUserDto,
      description: 'Json structure for user object',
    }),
    ApiCreatedResponse({
      description: 'The user has been created.',
      type: UserModel,
    }),
  );
};

export const PutUser = () => {
  return applyDecorators(
    ApiPut(entity),
    ApiOperation({
      summary: "Update user's password.",
      description: "Updates user's password by ID (uuid).",
    }),
    ApiOkResponse({
      description: 'The user has been updated.',
      type: UserModel,
    }),
    ApiForbiddenResponse({
      description: 'oldPassword is wrong.',
    }),
  );
};

export const DeleteUser = () => {
  return applyDecorators(ApiDelete(entity));
};
