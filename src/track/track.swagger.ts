import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { TrackModel } from './track.model';
import { ApiDelete, ApiGetById, ApiPost, ApiPut } from 'src/swagger.decorators';
import { UpdateTrackDto } from './update-track.dto';

const entity = 'Track';

export const GetTrack = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all tracks.',
      description: 'Gets all tracks.',
    }),
    ApiOkResponse({
      description: 'Successful operation.',
      type: [TrackModel],
    }),
  );
};

export const GetTrackById = () => {
  return applyDecorators(
    ApiGetById(entity),
    ApiOkResponse({
      description: 'Successful operation.',
      type: TrackModel,
    }),
  );
};

export const PostTrack = () => {
  return applyDecorators(
    ApiPost(entity),
    ApiBody({
      type: UpdateTrackDto,
      description: 'Json structure for track object',
    }),
    ApiCreatedResponse({
      description: 'The track has been created.',
      type: TrackModel,
    }),
  );
};

export const PutTrack = () => {
  return applyDecorators(
    ApiPut(entity),
    ApiOperation({
      summary: 'Update track info.',
      description: 'Updates track info by ID (uuid).',
    }),
    ApiOkResponse({
      description: 'The track has been updated.',
      type: TrackModel,
    }),
  );
};

export const DeleteTrack = () => {
  return applyDecorators(ApiDelete(entity));
};
