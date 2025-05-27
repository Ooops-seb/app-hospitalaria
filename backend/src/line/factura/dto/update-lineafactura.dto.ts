import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { EstadosEnum } from 'common/enums/Estado.enum';

export class UpdateLineaFacturaDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  cantidad?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  iva?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  subtotal?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  descuento?: number;

  @ApiPropertyOptional({ example: 'descargado', enum: EstadosEnum })
  @IsOptional()
  @IsEnum(EstadosEnum)
  estado?: EstadosEnum;
}
