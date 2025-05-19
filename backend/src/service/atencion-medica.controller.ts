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
import { AtencionMedicaService } from './atencion-medica.service';
import { CreateAtencionMedicaDto } from './dto/create-atencion-medica.dto';
import { UpdateAtencionMedicaDto } from './dto/update-atencion-medica.dto';

@ApiTags('AtencionMedica')
@Controller('atencion-medica')
export class AtencionMedicaController {
  constructor(private readonly service: AtencionMedicaService) {}

  @Post()
  create(@Body() dto: CreateAtencionMedicaDto) {
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
    @Body() dto: UpdateAtencionMedicaDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
