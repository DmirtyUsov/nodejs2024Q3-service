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
import { TrackService } from './track.service';
import { TrackModel } from './track.model';
import { UpdateTrackDto } from './update-track.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteTrack,
  GetTrack,
  GetTrackById,
  PostTrack,
  PutTrack,
} from './track.swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { ApiAuth } from 'src/swagger.decorators';

@ApiTags('Track')
@Controller('track')
@UseGuards(AuthGuard)
@ApiAuth()
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @GetTrack()
  findAll(): Promise<TrackModel[]> {
    return this.trackService.findAll();
  }

  @Get(':id')
  @GetTrackById()
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<TrackModel> {
    return this.trackService.findOne(id);
  }

  @Post()
  @PostTrack()
  create(
    @Body(ValidationPipe) updateTrackDto: UpdateTrackDto,
  ): Promise<TrackModel> {
    return this.trackService.create(updateTrackDto);
  }

  @Put(':id')
  @PutTrack()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateTrackDto: UpdateTrackDto,
  ): Promise<TrackModel> {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @DeleteTrack()
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<TrackModel> {
    return this.trackService.delete(id);
  }
}
