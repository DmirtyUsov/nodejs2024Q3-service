import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [TokenService, ConfigService],
  exports: [TokenService, ConfigService],
  imports: [ConfigModule, JwtModule],
})
export class TokenModule {}
