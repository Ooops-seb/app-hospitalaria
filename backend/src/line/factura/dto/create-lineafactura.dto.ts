import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateLineaFacturaDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'ID del producto (opcional)',
  })
  @IsOptional()
  @IsInt()
  productoId?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID del servicio (opcional)',
  })
  @IsOptional()
  @IsInt()
  servicioId?: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  cantidad: number;

  @ApiProperty({ example: 100.0 })
  @IsNumber()
  precio_unitario: number;

  @ApiProperty({ example: 112.0 })
  @IsNumber()
  subtotal: number;

  @ApiProperty({ example: 12.0 })
  @IsNumber()
  iva: number;

  @ApiProperty({ example: 0.0 })
  @IsNumber()
  descuento: number;
}
