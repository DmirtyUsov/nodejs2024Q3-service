import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { TokenDto } from './token.dto';
import { PayloadModel } from './payload.model';

@Injectable()
export class TokenService {
  private accessJwtOptions: JwtSignOptions;
  private refreshJwtOptions: JwtSignOptions;

  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.accessJwtOptions = {
      secret: this.config.get<string>('JWT_SECRET_KEY') || 'defaultSecrete',
      accessExpiresIn: this.config.get<string>('TOKEN_EXPIRE_TIME') || '1h',
    };
    this.refreshJwtOptions = {
      secret:
        this.config.get<string>('JWT_SECRET_REFRESH_KEY') ||
        'defaultRefreshSecrete',
      accessExpiresIn:
        this.config.get<string>('TOKEN_REFRESH_EXPIRE_TIME') || '24h',
    };
  }

  async get(userId: string, userLogin: string): Promise<TokenDto> {
    const payload: PayloadModel = {
      userId,
      login: userLogin,
    };
    const accessOptions = {
      secret: this.accessJwtOptions.secret,
      expiresIn: this.accessJwtOptions.accessExpiresIn,
    };
    const accessToken = await this.jwtService.signAsync(payload, accessOptions);

    const refreshOptions = {
      secret: this.refreshJwtOptions.secret,
      expiresIn: this.refreshJwtOptions.accessExpiresIn,
    };

    const refreshToken = await this.jwtService.signAsync(
      payload,
      refreshOptions,
    );
    return { accessToken, refreshToken };
  }

  async verify(token: string): Promise<PayloadModel | null> {
    if (!token) {
      return null;
    }

    const options: JwtVerifyOptions = { secret: this.accessJwtOptions.secret };

    try {
      const payload = await this.jwtService.verifyAsync<PayloadModel>(
        token,
        options,
      );

      return payload;
    } catch {
      return null;
    }
  }

  async verifyRefresh(token: string): Promise<PayloadModel | null> {
    if (!token) {
      return null;
    }

    const options: JwtVerifyOptions = { secret: this.refreshJwtOptions.secret };

    try {
      const payload = await this.jwtService.verifyAsync<PayloadModel>(
        token,
        options,
      );
      return payload;
    } catch {
      return null;
    }
  }
}
