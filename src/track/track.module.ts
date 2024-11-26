import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DatabaseService } from 'src/database/database.service';
import { GuardModule } from 'src/guard/guard.module';

@Module({
  providers: [TrackService, DatabaseService],
  controllers: [TrackController],
  imports: [GuardModule],
})
export class TrackModule {}
