import { Injectable } from '@nestjs/common';
import { AlbumDB } from 'src/in-memory-db/album.db';
import { ArtistDB } from 'src/in-memory-db/artist.db';
import { UserDB } from 'src/in-memory-db/user.db';

@Injectable()
export class MyDBService {
  user = new UserDB();
  artist = new ArtistDB();
  album = new AlbumDB();

  cleanArtist(id: string): void {
    this.removeArtistFromAlbums(id);
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
}
