import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto, UserModel } from './dto';
import {
  DeleteUser,
  GetUser,
  GetUserById,
  PostUser,
  PutUser,
} from './user.swagger';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @GetUser()
  findAll(): Promise<UserModel[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @GetUserById()
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserModel> {
    return this.userService.findOne(id);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @PostUser()
  create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<UserModel> {
    return this.userService.create(createUserDto);
  }

  @PutUser()
  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserModel> {
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @DeleteUser()
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<UserModel> {
    return this.userService.delete(id);
  }
}
