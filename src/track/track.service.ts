import { Injectable } from '@nestjs/common';
import { TrackModel } from './track.model';
import { UpdateTrackDto } from './update-track.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<TrackModel[]> {
    return await this.databaseService.track.findMany();
  }

  async findOne(id: string): Promise<TrackModel> {
    try {
      const artist = await this.databaseService.track.findUniqueOrThrow({
        where: { id },
      });
      return artist;
    } catch (error) {
      DatabaseService.handleError(error);
    }
  }

  async create(updateTrackDto: UpdateTrackDto): Promise<TrackModel> {
    try {
      const result = await this.databaseService.track.create({
        data: updateTrackDto,
      });
      return result;
    } catch (error) {
      DatabaseService.handleError(error);
    }
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackModel> {
    try {
      const result = await this.databaseService.track.update({
        where: { id },
        data: updateTrackDto,
      });
      return result;
    } catch (error) {
      DatabaseService.handleError(error);
    }
  }

  async delete(id: string): Promise<TrackModel> {
    try {
      const track = await this.databaseService.track.delete({ where: { id } });
      return track;
    } catch (error) {
      DatabaseService.handleError(error);
    }
  }
}
