import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DatabaseService } from 'src/database/database.service';
import { GuardModule } from 'src/guard/guard.module';

@Module({
  providers: [AlbumService, DatabaseService],
  controllers: [AlbumController],
  imports: [GuardModule],
})
export class AlbumModule {}
