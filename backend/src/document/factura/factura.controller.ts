import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FacturaService } from './factura.service';
import { UpdateFacturaDto } from './dto/update-factura.dto';

@ApiTags('Factura')
@Controller()
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  @Get()
  findAll() {
    return this.facturaService.findAllWithRelations();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.facturaService.findOneWithRelations(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFacturaDto,
  ) {
    return this.facturaService.update(id, dto);
  }

  @Post(':id/facturar')
  async facturar(@Param('id', ParseIntPipe) id: number) {
    return this.facturaService.facturar(id);
  }
}
