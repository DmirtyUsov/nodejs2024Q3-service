import { ForbiddenException, Injectable } from '@nestjs/common';
import { ArtistModel } from './artist.model';
import { UpdateArtistDto } from './update-artist.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<ArtistModel[]> {
    return await this.databaseService.artist.findMany();
  }

  async findOne(id: string): Promise<ArtistModel> {
    try {
      const artist = await this.databaseService.artist.findUniqueOrThrow({
        where: { id },
      });
      return artist;
    } catch (error) {
      DatabaseService.handleError(error);
    }
  }

  async create(updateArtistDto: UpdateArtistDto): Promise<ArtistModel> {
    const result = await this.databaseService.artist.create({
      data: updateArtistDto,
    });
    if (!result) {
      throw new ForbiddenException();
    }
    return result;
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistModel> {
    try {
      const result = await this.databaseService.artist.update({
        where: { id },
        data: updateArtistDto,
      });
      return result;
    } catch (error) {
      DatabaseService.handleError(error);
    }
  }

  async delete(id: string): Promise<ArtistModel> {
    try {
      const artist = await this.databaseService.artist.delete({
        where: { id },
      });
      return artist;
    } catch (error) {
      DatabaseService.handleError(error);
    }
  }
}
