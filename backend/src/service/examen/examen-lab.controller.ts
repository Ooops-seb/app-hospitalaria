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
import { CreateExamenLabDto } from './dto/create-examen-lab.dto';
import { UpdateExamenLabDto } from './dto/update-examen-lab.dto';
import { ExamenLabService } from './examen-lab.service';

@ApiTags('ExamenLab')
@Controller()
export class ExamenLabController {
  constructor(private readonly service: ExamenLabService) {}

  @Post()
  create(@Body() dto: CreateExamenLabDto) {
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
    @Body() dto: UpdateExamenLabDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
