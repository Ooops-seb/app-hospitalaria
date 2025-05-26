import { Controller, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';
import { LineaTransaccionController } from '../linea-transaccion.controller';
import { DescargoService } from './descargo.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateLineaDescargoDto } from './dto/update-lineadescargo.dto';

@ApiTags('Linea Descargo')
@Controller('linea-descargo')
export class DescargoController extends LineaTransaccionController {
  constructor(private readonly descargoService: DescargoService) {
    super(descargoService);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Editar una línea de descargo' })
  @ApiResponse({
    status: 200,
    description: 'Línea de descargo actualizada correctamente.',
  })
  updateLineaDescargo(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLineaDescargoDto,
  ) {
    return this.descargoService.updateLineaDescargo(id, dto);
  }
}
