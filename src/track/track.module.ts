import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DatabaseService } from 'src/database/database.service';
import { TokenModule } from 'src/token/token.module';

@Module({
  providers: [TrackService, DatabaseService],
  controllers: [TrackController],
  imports: [TokenModule],
})
export class TrackModule {}
