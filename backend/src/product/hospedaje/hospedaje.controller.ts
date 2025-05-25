import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateHospedajeHospitalarioDto } from './dto/create-hospedaje.dto';
import { UpdateHospedajeHospitalarioDto } from './dto/update-hospedaje.dto';
import { HospedajeHospitalarioService } from './hospedaje.service';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';

@ApiTags('HospedajeHospitalario')
@Controller()
export class HospedajeHospitalarioController extends ProductController {
  constructor(private readonly service: HospedajeHospitalarioService) {
    super(service as ProductService);
  }

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
