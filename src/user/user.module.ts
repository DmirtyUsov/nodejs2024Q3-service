import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseService } from 'src/database/database.service';
import { ConfigService } from '@nestjs/config';
import { GuardModule } from 'src/guard/guard.module';

@Module({
  controllers: [UserController],
  providers: [UserService, DatabaseService, ConfigService],
  imports: [GuardModule],
})
export class UserModule {}
