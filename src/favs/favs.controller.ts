import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavoritesDto } from './favorites.dto';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll(): FavoritesDto {
    return this.favsService.findAll();
  }

  @Post('/artist/:id')
  addArtist(@Param('id', ParseUUIDPipe) id: string): void {
    this.favsService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', ParseUUIDPipe) id: string): void {
    this.favsService.removeArtist(id);
  }

  @Post('/album/:id')
  addAlbum(@Param('id', ParseUUIDPipe) id: string): void {
    this.favsService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', ParseUUIDPipe) id: string): void {
    this.favsService.removeAlbum(id);
  }

  @Post('/track/:id')
  addTrack(@Param('id', ParseUUIDPipe) id: string): void {
    this.favsService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', ParseUUIDPipe) id: string): void {
    this.favsService.removeTrack(id);
  }
}
