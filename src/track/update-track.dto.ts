import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { ApiNullOrUUIDProperty } from 'src/swagger.decorators';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Diamonds',
  })
  name: string;

  @ValidateIf((_object, value) => value !== null)
  @IsUUID()
  @ApiNullOrUUIDProperty('Artist ID')
  artistId?: string | null; // refers to Artist

  @ValidateIf((_object, value) => value !== null)
  @IsUUID()
  @ApiNullOrUUIDProperty('Album ID')
  albumId?: string | null; // refers to Album

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    example: 225,
  })
  duration: number; // integer number
}
