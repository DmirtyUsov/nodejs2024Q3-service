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
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumModel } from './album.model';
import { UpdateAlbumDto } from './update-album.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteAlbum,
  GetAlbum,
  GetAlbumById,
  PostAlbum,
  PutAlbum,
} from './album.swagger';
import { AuthGuard } from 'src/auth.guard';

@ApiTags('Album')
@UseGuards(AuthGuard)
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @GetAlbum()
  findAll(): Promise<AlbumModel[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  @GetAlbumById()
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<AlbumModel> {
    return this.albumService.findOne(id);
  }

  @Post()
  @PostAlbum()
  create(
    @Body(ValidationPipe) updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumModel> {
    return this.albumService.create(updateAlbumDto);
  }

  @Put(':id')
  @PutAlbum()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumModel> {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @DeleteAlbum()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<AlbumModel> {
    return this.albumService.delete(id);
  }
}
