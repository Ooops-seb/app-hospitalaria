import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DescargoService } from './descargo.service';
import { CreateDescargoDto } from './dto/create-descargo.dto';
import { UpdateDescargoDto } from './dto/update-descargo.dto';

@Controller()
export class DescargoController {
  constructor(private readonly descargoService: DescargoService) {}

  @Post()
  create(@Body() createDescargoDto: CreateDescargoDto) {
    return this.descargoService.create(createDescargoDto);
  }

  @Get()
  findAll() {
    return this.descargoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.descargoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDescargoDto: UpdateDescargoDto,
  ) {
    return this.descargoService.update(+id, updateDescargoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.descargoService.remove(+id);
  }
}
