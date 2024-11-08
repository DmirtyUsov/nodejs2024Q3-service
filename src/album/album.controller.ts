import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumModel } from './album.model';
import { UpdateAlbumDto } from './update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll(): AlbumModel[] {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): AlbumModel {
    return this.albumService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) updateAlbumDto: UpdateAlbumDto): AlbumModel {
    return this.albumService.create(updateAlbumDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateAlbumDto: UpdateAlbumDto,
  ): AlbumModel {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string): AlbumModel {
    return this.albumService.delete(id);
  }
}
