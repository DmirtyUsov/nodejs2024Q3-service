import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [JwtService, ConfigService, TokenService],
  exports: [TokenService],
})
export class TokenModule {}
