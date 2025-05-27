import { Body, Param, Patch, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ChangeStatusDto } from '../service/common/dtos/change-status.dto';
import { DocumentService } from './document.service';

export class DocumentController {
  constructor(protected readonly documentService: DocumentService) {}

  @Patch(':id/cambiar-estado')
  @ApiOperation({ summary: 'Cambiar estado del documento' })
  @ApiResponse({
    status: 200,
    description: 'Estado actualizado correctamente.',
  })
  changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ChangeStatusDto,
  ) {
    return this.documentService.changeStatus(id, dto);
  }
}
