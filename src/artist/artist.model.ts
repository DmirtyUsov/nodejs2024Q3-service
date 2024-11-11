import { ApiProperty } from '@nestjs/swagger';
import { ApiUUIDProperty } from 'src/swagger.decorators';

export class ArtistModel {
  @ApiUUIDProperty
  id: string; // uuid v4
  @ApiProperty({
    type: 'string',
    example: 'Lady Gaga',
  })
  name: string;
  @ApiProperty({
    type: 'boolean',
    example: true,
  })
  grammy: boolean;
}
