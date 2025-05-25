import { Controller, Post, Body } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { DocumentController } from '../document.controller';
import { DocumentService } from '../document.service';

@Controller()
export class FacturaController extends DocumentController {
  constructor(private readonly facturaService: FacturaService) {
    super(facturaService as unknown as DocumentService);
  }

  @Post()
  create(@Body() createFacturaDto: CreateFacturaDto) {
    return this.facturaService.create(createFacturaDto);
  }
}
