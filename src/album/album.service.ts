import { Injectable } from '@nestjs/common';
import { AlbumModel } from './album.model';
import { UpdateAlbumDto } from './update-album.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<AlbumModel[]> {
    return await this.databaseService.album.findMany();
  }

  async findOne(id: string): Promise<AlbumModel> {
    try {
      const artist = await this.databaseService.album.findUniqueOrThrow({
        where: { id },
      });
      return artist;
    } catch (error) {
      DatabaseService.handleError(error);
    }
  }

  async create(updateAlbumDto: UpdateAlbumDto): Promise<AlbumModel> {
    const result = await this.databaseService.album.create({
      data: updateAlbumDto,
    });
    return result;
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumModel> {
    try {
      const result = await this.databaseService.album.update({
        where: { id },
        data: updateAlbumDto,
      });
      return result;
    } catch (error) {
      DatabaseService.handleError(error);
    }
  }

  async delete(id: string): Promise<AlbumModel> {
    try {
      const artist = await this.databaseService.album.delete({
        where: { id },
      });
      return artist;
    } catch (error) {
      DatabaseService.handleError(error);
    }
  }
}
