import { Injectable } from '@nestjs/common';
import { FavoritesDto } from 'src/favs/favorites.dto';
import { AlbumDB } from 'src/in-memory-db/album.db';
import { ArtistDB } from 'src/in-memory-db/artist.db';
import { FavoritesDB, FavTables } from 'src/in-memory-db/favorites.db';
import { TrackDB } from 'src/in-memory-db/track.db';
import { UserDB } from 'src/in-memory-db/user.db';

@Injectable()
export class MyDBService {
  user = new UserDB();
  artist = new ArtistDB();
  album = new AlbumDB();
  track = new TrackDB();
  private favorites = new FavoritesDB();

  cleanArtist(id: string): void {
    this.removeArtistFromAlbums(id);
    this.removerArtistFromTracks(id);
    this.removeFavorites(FavTables.artist, id);
  }

  cleanAlbum(id: string): void {
    this.removeAlbumFromTracks(id);
    this.removeFavorites(FavTables.album, id);
  }

  cleanTrack(id: string): void {
    this.removeFavorites(FavTables.track, id);
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

  getFavorites(): FavoritesDto {
    const favoritesDto: FavoritesDto = {
      albums: [],
      artists: [],
      tracks: [],
    };

    const artists = this.favorites.list(FavTables.artist);
    artists.forEach((id) => {
      const artist = this.artist.get(id);
      if (artist) {
        favoritesDto.artists.push(artist);
      }
    });

    const albums = this.favorites.list(FavTables.album);
    albums.forEach((id) => {
      const album = this.album.get(id);
      if (album) {
        favoritesDto.albums.push(album);
      }
    });

    const tracks = this.favorites.list(FavTables.track);
    tracks.forEach((id) => {
      const track = this.track.get(id);
      if (track) {
        favoritesDto.tracks.push(track);
      }
    });

    return favoritesDto;
  }

  addFavorites(table: FavTables, id: string): boolean {
    const result = this[table].get(id);
    if (!result) {
      return false;
    }
    this.favorites.add(table, id);
    return true;
  }

  removeFavorites(table: FavTables, id: string): boolean {
    return this.favorites.delete(table, id);
  }
}
