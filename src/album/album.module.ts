import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DatabaseService } from 'src/database/database.service';
import { TokenModule } from 'src/token/token.module';

@Module({
  providers: [AlbumService, DatabaseService],
  controllers: [AlbumController],
  imports: [TokenModule],
})
export class AlbumModule {}
