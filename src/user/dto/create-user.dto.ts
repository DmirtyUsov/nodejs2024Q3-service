import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: 'string', example: 'TestUser' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ type: 'string', example: 'StrongPas' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
