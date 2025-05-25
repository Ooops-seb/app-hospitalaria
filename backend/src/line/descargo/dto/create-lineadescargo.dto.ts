import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateLineaDescargoDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'ID del producto (opcional)',
  })
  @IsOptional()
  @IsInt()
  producto_id?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID del servicio (opcional)',
  })
  @IsOptional()
  @IsInt()
  servicio_id?: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  cantidad: number;

  @ApiProperty({ example: 'Nota de venta ejemplo' })
  @IsString()
  nota_venta: string;
}
