import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateExamenLabDto {
  @ApiProperty({ example: 'Hemograma completo' })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: '2024-05-20' })
  @IsDateString()
  registro: Date;

  @ApiProperty({ example: 18.5 })
  @IsNumber()
  precio: number;

  @ApiProperty({ example: 'Sangre' })
  @IsString()
  tipo_examen: string;
}
