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
import { ArtistService } from './artist.service';
import { ArtistModel } from './artist.model';
import { UpdateArtistDto } from './update-artist.dto';
import {
  DeleteArtist,
  GetArtist,
  GetArtistById,
  PostArtist,
  PutArtist,
} from './artist.swagger';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { ApiAuth } from 'src/swagger.decorators';

@ApiTags('Artist')
@Controller('artist')
@UseGuards(AuthGuard)
@ApiAuth()
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @GetArtist()
  findAll(): Promise<ArtistModel[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  @GetArtistById()
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ArtistModel> {
    return this.artistService.findOne(id);
  }

  @Post()
  @PostArtist()
  create(
    @Body(ValidationPipe) updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistModel> {
    return this.artistService.create(updateArtistDto);
  }

  @Put(':id')
  @PutArtist()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistModel> {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @DeleteArtist()
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<ArtistModel> {
    return this.artistService.delete(id);
  }
}
