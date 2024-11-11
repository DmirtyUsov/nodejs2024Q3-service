import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MyDBService } from 'src/mydb/mydb.service';
import { ArtistModel } from './artist.model';
import { UpdateArtistDto } from './update-artist.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ArtistService {
  constructor(private readonly myDBService: MyDBService) {}

  findAll(): ArtistModel[] {
    return this.myDBService.artist.list();
  }

  findOne(id: string): ArtistModel {
    const artist = this.myDBService.artist.get(id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  create(updateArtistDto: UpdateArtistDto): ArtistModel {
    const { name, grammy } = updateArtistDto;
    const id = randomUUID();

    const newArtist: ArtistModel = {
      id,
      name,
      grammy,
    };
    const result = this.myDBService.artist.add(id, newArtist);
    if (!result) {
      throw new ForbiddenException();
    }
    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): ArtistModel {
    const { name, grammy } = updateArtistDto;
    const artist: ArtistModel = this.myDBService.artist.get(id);

    if (!artist) {
      throw new NotFoundException();
    }

    artist.name = name;
    artist.grammy = grammy;

    const result = this.myDBService.artist.update(id, artist);
    return result;
  }

  delete(id: string): ArtistModel {
    const artist = this.myDBService.artist.delete(id);
    if (!artist) {
      throw new NotFoundException();
    }
    this.myDBService.cleanArtist(id);
    return artist;
  }
}
