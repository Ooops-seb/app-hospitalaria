import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DescargoService } from './descargo.service';
import { CreateDescargoDto } from './dto/create-descargo.dto';
import { DocumentController } from '../document.controller';
import { DocumentService } from '../document.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class DescargoController extends DocumentController {
  constructor(private readonly descargoService: DescargoService) {
    super(descargoService as unknown as DocumentService);
  }

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

  @Post(':id/clonar-a-factura')
  @ApiOperation({ summary: 'Clonar descargo a factura' })
  @ApiResponse({
    status: 200,
    description: 'Factura y líneas creadas correctamente.',
  })
  async clonarADocumentoFactura(
    @Param('id') id: number,
    @Body('clave_acceso') clave_acceso: string,
  ): Promise<{ message: string }> {
    return this.descargoService.clonarADocumentoFactura(id, clave_acceso);
  }
}
