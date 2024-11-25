import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { DatabaseService } from 'src/database/database.service';
import { TokenModule } from 'src/token/token.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, DatabaseService],
  imports: [TokenModule],
})
export class ArtistModule {}
