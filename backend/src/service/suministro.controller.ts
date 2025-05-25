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
import { CreateSuministroMedicamentoDto } from './dto/create-suministro.dto';
import { UpdateSuministroMedicamentoDto } from './dto/update-suministro.dto';
import { SuministroMedicamentoService } from './suministro.service';

@ApiTags('SuministroMedicamento')
@Controller('suministro-medicamento')
export class SuministroMedicamentoController {
  constructor(private readonly suministro: SuministroMedicamentoService) {}

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
