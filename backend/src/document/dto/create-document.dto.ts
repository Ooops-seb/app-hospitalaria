import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDocumentoTransaccionalDto {
  @ApiProperty({ example: 123 })
  @IsInt()
  nro: number;

  @ApiProperty({ example: '2024-05-19' })
  @IsDateString()
  fecha: Date;

  @ApiProperty({ example: 150.5 })
  @IsNumber()
  valor: number;

  @ApiProperty({ example: 1, description: 'ID del paciente relacionado' })
  @IsNotEmpty()
  @IsInt()
  paciente_id: number;
}
