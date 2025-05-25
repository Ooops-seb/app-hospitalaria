import { Body, Param, Patch, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChangeStatusDto } from '../service/common/dtos/change-status.dto';
import { ProductService } from './product.service';

export class ProductController {
  constructor(protected readonly productService: ProductService) {}

  @Patch(':id/cambiar-estado')
  @ApiOperation({ summary: 'Cambiar estado del producto' })
  @ApiResponse({
    status: 200,
    description: 'Estado actualizado correctamente.',
  })
  changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ChangeStatusDto,
  ) {
    return this.productService.changeStatus(id, dto);
  }
}
