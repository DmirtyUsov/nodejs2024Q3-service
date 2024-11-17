import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { FavoritesDto } from './favorites.dto';
import { DatabaseService } from 'src/database/database.service';

const tempUser = {
  login: 'User for Favorites tests',
  password: 'password',
};

enum FavTables {
  artist = 'artist',
  album = 'album',
  track = 'track',
}

@Injectable()
export class FavsService {
  private userIdForTest: string;
  constructor(private readonly databaseService: DatabaseService) {
    this.databaseService.user
      .findFirst({
        where: {
          login: tempUser.login,
        },
      })
      .then(async (user) => {
        if (!user) {
          user = await this.databaseService.user.create({ data: tempUser });
        }
        this.userIdForTest = user.id;
      });
  }

  async findAll(userId: string = this.userIdForTest): Promise<FavoritesDto> {
    const result: FavoritesDto = {
      albums: [],
      artists: [],
      tracks: [],
    };

    const data = await this.databaseService.user.findUnique({
      where: { id: userId },
      select: {
        FavsArtists: { select: { artist: true } },
        FavsAlbums: { select: { album: true } },
        FavsTracks: { select: { track: true } },
      },
    });

    result.artists = data.FavsArtists.map((item) => item.artist);
    result.albums = data.FavsAlbums.map((item) => item.album);
    result.tracks = data.FavsTracks.map((item) => item.track);
    return result;
  }

  async addArtist(
    id: string,
    userId: string = this.userIdForTest,
  ): Promise<void> {
    const table = FavTables.artist;

    const result = await this.databaseService.artist.findUnique({
      where: { id },
    });
    if (!result) {
      throw new UnprocessableEntityException(makeErrorMessage(table, id));
    }
    await this.databaseService.favsArtists.create({
      data: { userId, artistId: id },
    });
  }

  async addTrack(
    id: string,
    userId: string = this.userIdForTest,
  ): Promise<void> {
    const table = FavTables.track;
    const result = await this.databaseService.track.findUnique({
      where: { id },
    });
    if (!result) {
      throw new UnprocessableEntityException(makeErrorMessage(table, id));
    }
    await this.databaseService.favsTracks.create({
      data: { userId, trackId: id },
    });
  }

  async addAlbum(
    id: string,
    userId: string = this.userIdForTest,
  ): Promise<void> {
    const table = FavTables.album;
    const result = await this.databaseService.album.findUnique({
      where: { id },
    });
    if (!result) {
      throw new UnprocessableEntityException(makeErrorMessage(table, id));
    }
    await this.databaseService.favsAlbums.create({
      data: { userId, albumId: id },
    });
  }

  async removeArtist(
    id: string,
    userId: string = this.userIdForTest,
  ): Promise<void> {
    const table = FavTables.artist;
    try {
      await this.databaseService.favsArtists.delete({
        where: { userId_artistId: { userId, artistId: id } },
      });
    } catch (error) {
      const message = makeErrorMessage(table, id, true);
      DatabaseService.handleError(error, message);
    }
  }

  async removeAlbum(id: string, userId: string = this.userIdForTest) {
    const table = FavTables.album;
    try {
      const result = await this.databaseService.favsAlbums
        .delete({
          where: { userId_albumId: { userId, albumId: id } },
        })
        .catch((error) => DatabaseService.handleError(error));
      console.log('result', result);
    } catch (error) {
      const message = makeErrorMessage(table, id, true);
      DatabaseService.handleError(error, message);
    }
  }

  async removeTrack(
    id: string,
    userId: string = this.userIdForTest,
  ): Promise<void> {
    const table = FavTables.track;
    try {
      await this.databaseService.favsTracks.delete({
        where: { userId_trackId: { userId, trackId: id } },
      });
    } catch (error) {
      const message = makeErrorMessage(table, id, true);
      DatabaseService.handleError(error, message);
    }
  }
}

const makeErrorMessage = (
  table: FavTables,
  id: string,
  isRemove = false,
): string => {
  return `${table} with id: ${id} does not ${isRemove ? 'favorite' : 'exist'}.`;
};
