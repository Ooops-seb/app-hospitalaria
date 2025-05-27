import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FacturaService } from './factura.service';

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
}
