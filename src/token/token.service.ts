import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { TokenDto } from './token.dto';
import { Request } from 'express';
import { PayloadModel } from './payload.model';

@Injectable()
export class TokenService {
  private jwtOptions: JwtSignOptions;

  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.jwtOptions = {
      secret: this.config.get<string>('JWT_SECRET_KEY') || 'defaultSecrete',
      expiresIn: this.config.get<string>('TOKEN_EXPIRE_TIME'),
    };
  }

  async get(userId: string, userLogin: string): Promise<TokenDto> {
    const payload: PayloadModel = {
      userId,
      login: userLogin,
    };
    const accessToken = await this.jwtService.signAsync(
      payload,
      this.jwtOptions,
    );
    return { accessToken };
  }

  async verify(request: Request): Promise<PayloadModel | null> {
    let token: string;

    if (request) {
      token = this.extractTokenFromHeader(request);
    }

    if (!token) {
      return null;
    }

    const options: JwtVerifyOptions = { secret: this.jwtOptions.secret };

    try {
      const payload = await this.jwtService.verifyAsync(token, options);

      return payload;
    } catch {
      return null;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
