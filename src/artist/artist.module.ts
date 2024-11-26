import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { DatabaseService } from 'src/database/database.service';
import { GuardModule } from 'src/guard/guard.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, DatabaseService],
  imports: [GuardModule],
})
export class ArtistModule {}
