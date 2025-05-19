import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateProcedimientoMedicoDto {
  @ApiProperty({ example: 'Cirugía menor ambulatoria' })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: '2024-05-19' })
  @IsDateString()
  registro: Date;

  @ApiProperty({ example: 300.0 })
  @IsNumber()
  precio: number;

  @ApiProperty({ example: 'Dra. María López' })
  @IsString()
  medico_acargo: string;

  @ApiProperty({ example: 'Apendicectomía' })
  @IsString()
  procedimiento: string;
}
