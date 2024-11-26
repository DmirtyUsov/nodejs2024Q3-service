import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto';
import { UserModel } from 'src/user/user.model';
import { StatusCodes } from 'http-status-codes';
import { TokenDto } from 'src/token/token.dto';
import { RefreshGuard } from 'src/guard/refresh.guard';
import { RefreshDto } from 'src/token/refresh.dto';
import { PostLogin, PostRefresh, PostSingup } from './auth.swagger';

@ApiTags('Authentication and Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @PostLogin()
  // @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() credentialsDto: CredentialsDto): Promise<TokenDto> {
    return await this.authService.login(credentialsDto);
  }

  @Post('signup')
  @PostSingup()
  @HttpCode(StatusCodes.CREATED)
  @UseInterceptors(ClassSerializerInterceptor)
  async signup(@Body() credentialsDto: CredentialsDto): Promise<UserModel> {
    return await this.authService.signup(credentialsDto);
  }

  @Post('refresh')
  @UseGuards(RefreshGuard)
  @PostRefresh()
  async refresh(@Body() refreshDto: RefreshDto): Promise<TokenDto> {
    return await this.authService.refresh(refreshDto);
  }
}
