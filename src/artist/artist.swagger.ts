import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ArtistModel } from './artist.model';
import { applyDecorators } from '@nestjs/common';
import { ApiDelete, ApiGetById, ApiPost, ApiPut } from 'src/swagger.decorators';
import { UpdateArtistDto } from './update-artist.dto';

const entity = 'Artist';

export const GetArtist = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all artists.',
      description: 'Gets all artists.',
    }),
    ApiOkResponse({
      description: 'Successful operation.',
      type: [ArtistModel],
    }),
  );
};

export const GetArtistById = () => {
  return applyDecorators(
    ApiGetById(entity),
    ApiOkResponse({
      description: 'Successful operation.',
      type: ArtistModel,
    }),
  );
};

export const PostArtist = () => {
  return applyDecorators(
    ApiPost(entity),
    ApiBody({
      type: UpdateArtistDto,
      description: 'Json structure for artist object',
    }),
    ApiCreatedResponse({
      description: 'The artist has been created.',
      type: ArtistModel,
    }),
  );
};

export const PutArtist = () => {
  return applyDecorators(
    ApiPut(entity),
    ApiOperation({
      summary: 'Update artist info.',
      description: 'Updates artist info by ID (uuid).',
    }),
    ApiOkResponse({
      description: 'The artist has been updated.',
      type: ArtistModel,
    }),
  );
};

export const DeleteArtist = () => {
  return applyDecorators(ApiDelete(entity));
};
