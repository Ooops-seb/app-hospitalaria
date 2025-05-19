import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateSuministroMedicamentoDto {
  @ApiProperty({ example: 'Administración de insulina' })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: '2024-05-20' })
  @IsDateString()
  registro: Date;

  @ApiProperty({ example: 12.0 })
  @IsNumber()
  precio: number;

  @ApiProperty({ example: 'Insulina subcutánea' })
  @IsString()
  tipo_suministro: string;
}
