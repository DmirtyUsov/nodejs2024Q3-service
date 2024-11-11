import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Lady Gaga',
  })
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: 'boolean',
    example: true,
  })
  grammy: boolean;
}
