import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { TokenService } from '../token/token.service';
import { CredentialsDto } from './dto';
import { UserModel } from 'src/user/user.model';
import { TokenDto } from 'src/token/token.dto';
import { RefreshDto } from 'src/token/refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async signup(credentialsDto: CredentialsDto): Promise<UserModel> {
    const result = await this.userService.findLogin(credentialsDto.login);

    if (result) {
      throw new ConflictException('A user with this login already exists');
    }

    const newUser = await this.userService.create(credentialsDto);
    return new UserModel(newUser);
  }

  async login(credentialsDto: CredentialsDto): Promise<TokenDto> {
    const result = await this.userService.findLogin(credentialsDto.login);

    if (!result) {
      throw new NotFoundException('No user with this login');
    }

    const isPasswordValid = await this.userService.validatePasswords(
      credentialsDto.password,
      result.password,
    );

    if (!isPasswordValid) {
      throw new ForbiddenException('Wrong password');
    }
    return await this.tokenService.get(result.id, result.login);
  }

  async refresh(refreshDto: RefreshDto): Promise<TokenDto> {
    const payload = await this.tokenService.verifyRefresh(
      refreshDto.refreshToken,
    );

    if (!payload) {
      throw new ForbiddenException('Token invalid or expired');
    }

    const user = await this.userService.findLogin(payload.login);

    if (!user) {
      throw new NotFoundException('No user with this login');
    }

    return await this.tokenService.get(payload.userId, payload.login);
  }
}
