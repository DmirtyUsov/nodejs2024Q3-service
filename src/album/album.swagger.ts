import { applyDecorators } from '@nestjs/common';
import { AlbumModel } from './album.model';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiDelete, ApiGetById, ApiPost, ApiPut } from 'src/swagger.decorators';
import { UpdateAlbumDto } from './update-album.dto';

const entity = 'Album';

export const GetAlbum = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all albums.',
      description: 'Gets all albums.',
    }),
    ApiOkResponse({
      description: 'Successful operation.',
      type: [AlbumModel],
    }),
  );
};

export const GetAlbumById = () => {
  return applyDecorators(
    ApiGetById(entity),
    ApiOkResponse({
      description: 'Successful operation.',
      type: AlbumModel,
    }),
  );
};

export const PostAlbum = () => {
  return applyDecorators(
    ApiPost(entity),
    ApiBody({
      type: UpdateAlbumDto,
      description: 'Json structure for album object',
    }),
    ApiCreatedResponse({
      description: 'The album has been created.',
      type: AlbumModel,
    }),
  );
};

export const PutAlbum = () => {
  return applyDecorators(
    ApiPut(entity),
    ApiOperation({
      summary: 'Update album info.',
      description: 'Updates album info by ID (uuid).',
    }),
    ApiOkResponse({
      description: 'The album has been updated.',
      type: AlbumModel,
    }),
  );
};

export const DeleteAlbum = () => {
  return applyDecorators(ApiDelete(entity));
};
