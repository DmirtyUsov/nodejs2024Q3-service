import { Injectable } from '@nestjs/common';
import { AlbumDB } from 'src/in-memory-db/album.db';
import { ArtistDB } from 'src/in-memory-db/artist.db';
import { TrackDB } from 'src/in-memory-db/track.db';
import { UserDB } from 'src/in-memory-db/user.db';

@Injectable()
export class MyDBService {
  user = new UserDB();
  artist = new ArtistDB();
  album = new AlbumDB();
  track = new TrackDB();

  cleanArtist(id: string): void {
    this.removeArtistFromAlbums(id);
    this.removerArtistFromTracks(id);
  }

  cleanAlbum(id: string): void {
    this.removeAlbumFromTracks(id);
  }

  private removeArtistFromAlbums(id: string): void {
    const albums = this.album.list();
    albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
        this.album.update(album.id, album);
      }
    });
  }

  private removerArtistFromTracks(id: string): void {
    const tracks = this.track.list();
    tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
        this.track.update(track.id, track);
      }
    });
  }

  private removeAlbumFromTracks(id: string): void {
    const tracks = this.track.list();
    tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
        this.track.update(track.id, track);
      }
    });
  }
}
