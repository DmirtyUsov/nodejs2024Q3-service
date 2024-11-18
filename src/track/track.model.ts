import { ApiProperty } from '@nestjs/swagger';
import { ApiNullOrUUIDProperty, ApiUUIDProperty } from 'src/swagger.decorators';

export class TrackModel {
  @ApiUUIDProperty
  id: string; // uuid v4
  @ApiProperty({
    type: 'string',
    example: 'Diamonds',
  })
  name: string;
  @ApiNullOrUUIDProperty('Artist ID')
  artistId: string | null; // refers to Artist
  @ApiNullOrUUIDProperty('Album ID')
  albumId: string | null; // refers to Album
  @ApiProperty({
    type: 'number',
    example: 225,
  })
  duration: number; // integer number
}
