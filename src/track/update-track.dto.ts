import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((_object, value) => value !== null)
  @IsUUID()
  artistId?: string | null; // refers to Artist

  @ValidateIf((_object, value) => value !== null)
  @IsUUID()
  albumId?: string | null; // refers to Album

  @IsNumber()
  @IsNotEmpty()
  duration: number; // integer number
}
