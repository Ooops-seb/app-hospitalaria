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
import { SuministroMedicamentoService } from './suministro.service';
import { CreateSuministroMedicamentoDto } from './dto/create-suministro.dto';
import { UpdateSuministroMedicamentoDto } from './dto/update-suministro.dto';
import { ServicioController } from '../service.controller';
import { ServicioService } from '../service.service';

@ApiTags('SuministroMedicamento')
@Controller()
export class SuministroMedicamentoController extends ServicioController {
  constructor(private readonly suministro: SuministroMedicamentoService) {
    super(suministro as ServicioService);
  }

  @Post()
  create(@Body() dto: CreateSuministroMedicamentoDto) {
    return this.suministro.create(dto);
  }

  @Get()
  findAll() {
    return this.suministro.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.suministro.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSuministroMedicamentoDto,
  ) {
    return this.suministro.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.suministro.remove(id);
  }
}
