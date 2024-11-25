import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavoritesDto } from './favorites.dto';
import { ApiTags } from '@nestjs/swagger';
import { RemoveFavorite, GetFavorites, AddFavorite } from './favs.swagger';
import { AuthGuard } from 'src/guard/auth.guard';

@ApiTags('Favorites')
@Controller('favs')
@UseGuards(AuthGuard)
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @GetFavorites()
  findAll(): Promise<FavoritesDto> {
    return this.favsService.findAll();
  }

  @Post('/artist/:id')
  @AddFavorite('Artist')
  async addArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.favsService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RemoveFavorite('Artist')
  async removeArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.favsService.removeArtist(id);
  }

  @Post('/album/:id')
  @AddFavorite('Album')
  async addAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.favsService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RemoveFavorite('Album')
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.favsService.removeAlbum(id);
  }

  @Post('/track/:id')
  @AddFavorite('Track')
  async addTrack(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.favsService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RemoveFavorite('Track')
  async removeTrack(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.favsService.removeTrack(id);
  }
}
