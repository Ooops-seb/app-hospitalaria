import { Patch, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChangeStatusLineaDto } from './entities/dto/change-status-linea.dto';
import { LineaTransaccionService } from './linea-transaccion.service';

export class LineaTransaccionController {
  constructor(
    protected readonly lineaTransaccionService: LineaTransaccionService,
  ) {}

  @Patch(':id/cambiar-estado')
  @ApiOperation({ summary: 'Cambiar estado de la línea de transacción' })
  @ApiResponse({
    status: 200,
    description: 'Estado actualizado correctamente.',
  })
  changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ChangeStatusLineaDto,
  ) {
    return this.lineaTransaccionService.changeStatus(id, dto);
  }
}
