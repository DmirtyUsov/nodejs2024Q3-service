import { FavoritesModel } from 'src/favs/favorites.model';

export enum FavTables {
  artist = 'artist',
  album = 'album',
  track = 'track',
}

export class FavoritesDB {
  private db: FavoritesModel;

  constructor() {
    this.db = {
      artist: new Set<string>(),
      album: new Set<string>(),
      track: new Set<string>(),
    };
  }

  add(table: FavTables, id: string): void {
    this.db[table].add(id);
  }

  delete(table: FavTables, id: string): boolean {
    return this.db[table].delete(id);
  }

  list(table: FavTables): string[] {
    return Array.from(this.db[table].values());
  }
}
