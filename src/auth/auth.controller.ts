import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto';
import { UserModel } from 'src/user/user.model';
import { StatusCodes } from 'http-status-codes';
import { TokenDto } from 'src/token/token.dto';

@ApiTags('Authentication and Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentialsDto: CredentialsDto): Promise<TokenDto> {
    return await this.authService.login(credentialsDto);
  }

  @Post('signup')
  @HttpCode(StatusCodes.CREATED)
  @UseInterceptors(ClassSerializerInterceptor)
  async signup(@Body() credentialsDto: CredentialsDto): Promise<UserModel> {
    return await this.authService.signup(credentialsDto);
  }

  @Post('refresh')
  refresh() {}
}
