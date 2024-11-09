import { AlbumModel } from 'src/album/album.model';
import { ArtistModel } from 'src/artist/artist.model';
import { TrackModel } from 'src/track/track.model';

export class FavoritesDto {
  artists: ArtistModel[];
  albums: AlbumModel[];
  tracks: TrackModel[];
}
