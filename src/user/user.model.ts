import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { ApiUUIDProperty } from 'src/swagger.decorators';

export class UserModel {
  @IsUUID('4')
  @ApiUUIDProperty
  id: string; // uuid v4
  @ApiProperty({ type: 'string', example: 'TestUser' })
  login: string;
  @Exclude()
  password: string;
  @ApiProperty({
    type: 'number',
    example: 1,
  })
  version: number; // integer number, increments on update
  @ApiProperty({
    type: 'number',
    example: 1655000000,
  })
  createdAt: number; // timestamp of creation
  @ApiProperty({
    type: 'number',
    example: 1655000000,
  })
  updatedAt: number; // timestamp of last update

  constructor(partial: Partial<UserModel>) {
    Object.assign(this, partial);
  }
}
