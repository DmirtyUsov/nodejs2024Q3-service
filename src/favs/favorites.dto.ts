import { ApiProperty } from '@nestjs/swagger';
import { AlbumModel } from 'src/album/album.model';
import { ArtistModel } from 'src/artist/artist.model';
import { TrackModel } from 'src/track/track.model';

export class FavoritesDto {
  @ApiProperty({ type: [ArtistModel] })
  artists: ArtistModel[];
  @ApiProperty({ type: [AlbumModel] })
  albums: AlbumModel[];
  @ApiProperty({ type: [TrackModel] })
  tracks: TrackModel[];
}
