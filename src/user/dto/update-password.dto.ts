import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    type: 'string',
    example: 'OldPassword',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string; // previous password

  @ApiProperty({
    type: 'string',
    example: 'NewPassword',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string; // new password
}
