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
import { HospedajeHospitalarioService } from './hospedaje.service';
import { CreateHospedajeHospitalarioDto } from './dto/create-hospedaje.dto';
import { UpdateHospedajeHospitalarioDto } from './dto/update-hospedaje.dto';

@ApiTags('Hospedaje Hospitalario')
@Controller('hospedaje_hospitalario')
export class HospedajeHospitalarioController {
  constructor(private readonly service: HospedajeHospitalarioService) {}

  @Post()
  create(@Body() dto: CreateHospedajeHospitalarioDto) {
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
    @Body() dto: UpdateHospedajeHospitalarioDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
