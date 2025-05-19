import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateHospedajeHospitalarioDto {
  @ApiProperty({ example: 'Habitación estándar - 1 cama' })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: 20.0 })
  @IsNumber()
  precio: number;

  @ApiProperty({ example: '2024-05-19' })
  @IsDateString()
  fecha_ingreso: Date;

  @ApiProperty({ example: '2024-05-20' })
  @IsDateString()
  fecha_salida: Date;
}
