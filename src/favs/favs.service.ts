import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { MyDBService } from 'src/mydb/mydb.service';
import { FavoritesDto } from './favorites.dto';
import { FavTables } from 'src/in-memory-db/favorites.db';

@Injectable()
export class FavsService {
  constructor(private readonly myDBService: MyDBService) {}

  findAll(): FavoritesDto {
    return this.myDBService.getFavorites();
  }

  addArtist(id: string): boolean {
    const table = FavTables.artist;
    const result = this.myDBService.addFavorites(table, id);
    if (!result) {
      throw new UnprocessableEntityException(makeErrorMessage(table, id));
    }
    return result;
  }

  addTrack(id: string): boolean {
    const table = FavTables.track;
    const result = this.myDBService.addFavorites(table, id);
    if (!result) {
      throw new UnprocessableEntityException(makeErrorMessage(table, id));
    }
    return result;
  }

  addAlbum(id: string): boolean {
    const table = FavTables.album;
    const result = this.myDBService.addFavorites(table, id);
    if (!result) {
      throw new UnprocessableEntityException(makeErrorMessage(table, id));
    }
    return result;
  }

  removeArtist(id: string): boolean {
    const table = FavTables.artist;
    const result = this.myDBService.removeFavorites(table, id);
    if (!result) {
      throw new NotFoundException(makeErrorMessage(table, id, true));
    }
    return result;
  }

  removeAlbum(id: string): boolean {
    const table = FavTables.album;
    const result = this.myDBService.removeFavorites(table, id);
    if (!result) {
      throw new NotFoundException(makeErrorMessage(table, id, true));
    }
    return result;
  }

  removeTrack(id: string): boolean {
    const table = FavTables.track;
    const result = this.myDBService.removeFavorites(table, id);
    if (!result) {
      throw new NotFoundException(makeErrorMessage(table, id, true));
    }
    return result;
  }
}

const makeErrorMessage = (
  table: FavTables,
  id: string,
  isRemove = false,
): string => {
  return `${table} with id: ${id} does not ${isRemove ? 'favorite' : 'exist'}.`;
};
