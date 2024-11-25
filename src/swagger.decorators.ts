import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiUUIDProperty = ApiProperty({
  type: 'string',
  format: 'uuid',
  example: '0a35dd62-e09f-444b-a628-f4e7c6954f57',
});

export const ApiNullOrUUIDProperty = (description: string) => {
  return ApiProperty({
    description,
    oneOf: [
      {
        type: 'string',
        format: 'uuid',
        example: '0a35dd62-e09f-444b-a628-f4e7c6954f50',
      },
      { type: 'null' },
    ],
  });
};

export const ApiUUIDParam = (entity: string) => {
  return ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: `${entity}'s ID `,
  });
};

export const ApiGetById = (entity: string) => {
  return applyDecorators(
    ApiUUIDParam(entity),
    ApiOperation({
      summary: `Get single ${entity}.`,
      description: `Gets single ${entity} by ID (uuid).`,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. Id is invalid (not uuid).',
    }),
    ApiNotFoundResponse({
      description: ` ${entity} not found.`,
    }),
  );
};

export const ApiPost = (entity: string) => {
  return applyDecorators(
    ApiOperation({
      summary: `Create a new ${entity}.`,
      description: `Creates a new ${entity}.`,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. Error in request body.',
    }),
  );
};

export const ApiPut = (entity: string) => {
  return applyDecorators(
    ApiUUIDParam(entity),
    ApiBadRequestResponse({
      description: 'Bad request. Id is invalid (not uuid).',
    }),
    ApiNotFoundResponse({
      description: `${entity} not found.`,
    }),
  );
};

export const ApiDelete = (entity: string) => {
  return applyDecorators(
    ApiUUIDParam(entity),
    ApiOperation({
      summary: `Delete ${entity}.`,
      description: `Deletes ${entity} by ID (uuid).`,
    }),
    ApiNoContentResponse({
      description: `The ${entity} has been deleted.`,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. Id is invalid (not uuid).',
    }),
    ApiNotFoundResponse({
      description: `${entity} not found.`,
    }),
  );
};

export const ApiAuth = () => {
  return applyDecorators(
    ApiUnauthorizedResponse({
      description: 'Access token is missing or invalid',
    }),
  );
};
