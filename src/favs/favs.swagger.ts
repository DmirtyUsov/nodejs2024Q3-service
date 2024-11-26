import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FavoritesDto } from './favorites.dto';
import { ApiUUIDParam } from 'src/swagger.decorators';

export const GetFavorites = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all favorites.',
      description: 'Gets all favorites.',
    }),
    ApiOkResponse({
      description: 'Successful operation.',
      type: FavoritesDto,
    }),
  );
};

export const AddFavorite = (entity: string) => {
  return applyDecorators(
    ApiUUIDParam(entity),
    ApiOperation({
      summary: `Add ${entity} to Favorites.`,
      description: `Adds ${entity} to Favorites.`,
    }),
    ApiCreatedResponse({
      description: `The ${entity} has been added`,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. Id is invalid (not uuid).',
    }),
    ApiUnprocessableEntityResponse({
      description: `${entity} not found.`,
    }),
  );
};

export const RemoveFavorite = (entity: string) => {
  return applyDecorators(
    ApiUUIDParam(entity),
    ApiOperation({
      summary: `Remove ${entity} from Favorites.`,
      description: `Removes ${entity} from Favorites by ID.`,
    }),
    ApiNoContentResponse({
      description: `The ${entity} has been removed.`,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. Id is invalid (not uuid).',
    }),
    ApiNotFoundResponse({
      description: `${entity} not found in Favorites.`,
    }),
  );
};
