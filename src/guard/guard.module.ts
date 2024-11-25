import { Module } from '@nestjs/common';
import { TokenModule } from 'src/token/token.module';
import { AuthGuard } from './auth.guard';
import { ConfigModule } from '@nestjs/config';
import { TokenService } from 'src/token/token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TokenModule, ConfigModule, JwtModule],
  providers: [AuthGuard, TokenService],
  exports: [TokenModule],
})
export class GuardModule {}
