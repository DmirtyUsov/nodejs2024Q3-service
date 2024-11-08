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
import { TrackService } from './track.service';
import { TrackModel } from './track.model';
import { UpdateTrackDto } from './update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  findAll(): TrackModel[] {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): TrackModel {
    return this.trackService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) updateTrackDto: UpdateTrackDto): TrackModel {
    return this.trackService.create(updateTrackDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateTrackDto: UpdateTrackDto,
  ): TrackModel {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string): TrackModel {
    return this.trackService.delete(id);
  }
}
