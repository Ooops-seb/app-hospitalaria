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
import { CreateProcedimientoMedicoDto } from './dto/create-procedimiento-medico.dto';
import { UpdateProcedimientoMedicoDto } from './dto/update-procedimiento-medico.dto';
import { ProcedimientoMedicoService } from './procedimiento-medico.service';

@ApiTags('Procedimiento Medico')
@Controller('procedimiento-medico')
export class ProcedimientoMedicoController {
  constructor(private readonly service: ProcedimientoMedicoService) {}

  @Post()
  create(@Body() dto: CreateProcedimientoMedicoDto) {
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
    @Body() dto: UpdateProcedimientoMedicoDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
