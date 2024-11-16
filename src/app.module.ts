import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MyDbModule } from './mydb/mydb.module';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    MyDbModule,
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    ConfigModule.forRoot(),
    DatabaseModule,
  ],
})
export class AppModule {}
