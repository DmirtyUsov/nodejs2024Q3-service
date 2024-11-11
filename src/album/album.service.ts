import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MyDBService } from 'src/mydb/mydb.service';
import { AlbumModel } from './album.model';
import { UpdateAlbumDto } from './update-album.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class AlbumService {
  constructor(private readonly myDBService: MyDBService) {}

  findAll(): AlbumModel[] {
    return this.myDBService.album.list();
  }

  findOne(id: string): AlbumModel {
    const artist = this.myDBService.album.get(id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  create(updateAlbumDto: UpdateAlbumDto): AlbumModel {
    const { name, year, artistId } = updateAlbumDto;
    const id = randomUUID();

    const newAlbum: AlbumModel = {
      id,
      name,
      year,
      artistId,
    };
    const result = this.myDBService.album.add(id, newAlbum);
    if (!result) {
      throw new ForbiddenException();
    }
    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): AlbumModel {
    const { name, year, artistId } = updateAlbumDto;
    const album: AlbumModel = this.myDBService.album.get(id);

    if (!album) {
      throw new NotFoundException();
    }

    album.name = name;
    album.year = year;
    album.artistId = artistId;

    const result = this.myDBService.album.update(id, album);
    return result;
  }

  delete(id: string): AlbumModel {
    const artist = this.myDBService.album.delete(id);
    if (!artist) {
      throw new NotFoundException();
    }
    this.myDBService.cleanAlbum(id);
    return artist;
  }
}
