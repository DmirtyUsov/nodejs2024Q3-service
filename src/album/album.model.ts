import { ApiProperty } from '@nestjs/swagger';
import { ApiNullOrUUIDProperty, ApiUUIDProperty } from 'src/swagger.decorators';

export class AlbumModel {
  @ApiUUIDProperty
  id: string; // uuid v4
  @ApiProperty({
    type: 'string',
    example: 'The Wall',
  })
  name: string;
  @ApiProperty({
    type: 'number',
    example: 1979,
  })
  year: number;
  @ApiNullOrUUIDProperty('Artist ID')
  artistId: string | null; // refers to Artist
}
