import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateImagenRayosXDto } from './dto/create-imagen.dto';
import { UpdateImagenRayosXDto } from './dto/update-imagen.dto';
import { ImagenService } from './imagen.service';
import { ServicioController } from '../service.controller';
import { ServicioService } from '../service.service';

@ApiTags('ImagenRayosX')
@Controller()
export class ImagenRayosXController extends ServicioController {
  constructor(private readonly service: ImagenService) {
    super(service as ServicioService);
  }

  @Post()
  create(@Body() dto: CreateImagenRayosXDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateImagenRayosXDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
