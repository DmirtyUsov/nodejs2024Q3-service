import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MyDBService } from 'src/mydb/mydb.service';
import { TrackModel } from './track.model';
import { UpdateTrackDto } from './update-track.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class TrackService {
  constructor(private readonly myDBService: MyDBService) {}

  findAll(): TrackModel[] {
    return this.myDBService.track.list();
  }

  findOne(id: string): TrackModel {
    const artist = this.myDBService.track.get(id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  create(updateTrackDto: UpdateTrackDto): TrackModel {
    const { name, albumId, artistId, duration } = updateTrackDto;
    const id = randomUUID();

    const newTrack: TrackModel = {
      id,
      name,
      artistId,
      albumId,
      duration,
    };
    const result = this.myDBService.track.add(id, newTrack);
    if (!result) {
      throw new ForbiddenException();
    }
    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): TrackModel {
    const { name, albumId, artistId, duration } = updateTrackDto;
    const track: TrackModel = this.myDBService.track.get(id);

    if (!track) {
      throw new NotFoundException();
    }

    track.name = name;
    track.albumId = albumId;
    track.artistId = artistId;
    track.duration = duration;

    const result = this.myDBService.track.update(id, track);
    return result;
  }

  delete(id: string): TrackModel {
    const track = this.myDBService.track.delete(id);
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }
}
