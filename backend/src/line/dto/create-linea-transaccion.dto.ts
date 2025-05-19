import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateLineaDeTransaccionDto {
  @ApiProperty({ example: 2 })
  @IsInt()
  cantidad: number;

  @ApiProperty({ example: 15.0 })
  @IsNumber()
  precio_unitario: number;

  @ApiProperty({ example: 1, description: 'ID de la factura asociada' })
  @IsInt()
  @IsNotEmpty()
  factura_id: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID del producto asociado (opcional)',
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  producto_id?: number | null;

  @ApiPropertyOptional({
    example: 2,
    description: 'ID del servicio asociado (opcional)',
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  servicio_id?: number | null;
}
