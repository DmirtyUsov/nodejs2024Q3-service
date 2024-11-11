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
import { ApiTags } from '@nestjs/swagger';
import { RemoveFavorite, GetFavorites, AddFavorite } from './favs.swagger';

@ApiTags('Favorites')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @GetFavorites()
  findAll(): FavoritesDto {
    return this.favsService.findAll();
  }

  @Post('/artist/:id')
  @AddFavorite('Artist')
  addArtist(@Param('id', ParseUUIDPipe) id: string): void {
    this.favsService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RemoveFavorite('Artist')
  removeArtist(@Param('id', ParseUUIDPipe) id: string): void {
    this.favsService.removeArtist(id);
  }

  @Post('/album/:id')
  @AddFavorite('Album')
  addAlbum(@Param('id', ParseUUIDPipe) id: string): void {
    this.favsService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RemoveFavorite('Album')
  removeAlbum(@Param('id', ParseUUIDPipe) id: string): void {
    this.favsService.removeAlbum(id);
  }

  @Post('/track/:id')
  @AddFavorite('Track')
  addTrack(@Param('id', ParseUUIDPipe) id: string): void {
    this.favsService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RemoveFavorite('Track')
  removeTrack(@Param('id', ParseUUIDPipe) id: string): void {
    this.favsService.removeTrack(id);
  }
}
