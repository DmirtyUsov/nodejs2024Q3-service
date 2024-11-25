import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { DatabaseService } from 'src/database/database.service';
import { TokenModule } from 'src/token/token.module';

@Module({
  providers: [FavsService, DatabaseService],
  controllers: [FavsController],
  imports: [TokenModule],
})
export class FavsModule {}
