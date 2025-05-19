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
import { CreateLineaDeTransaccionDto } from './dto/create-linea-transaccion.dto';
import { UpdateLineaDeTransaccionDto } from './dto/update-linea-transaccion.dto';
import { LineaTransaccionService } from './linea-transaccion.service';

@ApiTags('LineaTransaccion')
@Controller('linea-transaccion')
export class LineaTransaccionController {
  constructor(private readonly service: LineaTransaccionService) {}

  @Post()
  create(@Body() dto: CreateLineaDeTransaccionDto) {
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
    @Body() dto: UpdateLineaDeTransaccionDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
