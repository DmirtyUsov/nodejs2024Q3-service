import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { TokenService } from '../token/token.service';
import { Request } from 'express';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = this.extractRefreshTokenFromHeader(request);

    const payload = await this.tokenService.verifyRefresh(refreshToken);

    if (!payload) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractRefreshTokenFromHeader(request: Request): string | undefined {
    const { refreshToken } = request.body;
    return refreshToken;
  }
}
