import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { ApiNullOrUUIDProperty } from 'src/swagger.decorators';

export class UpdateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'The Wall',
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    example: 1979,
  })
  year: number;

  @ValidateIf((_object, value) => value !== null)
  @IsUUID()
  @ApiNullOrUUIDProperty('Artist ID')
  artistId?: string | null; // refers to Artist
}
