import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { DatabaseService } from 'src/database/database.service';
import { GuardModule } from 'src/guard/guard.module';

@Module({
  providers: [FavsService, DatabaseService],
  controllers: [FavsController],
  imports: [GuardModule],
})
export class FavsModule {}
