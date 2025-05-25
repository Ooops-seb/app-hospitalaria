import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLineaDescargoDto } from '../../../line/descargo/dto/create-lineadescargo.dto';

export class CreateDescargoDto {
  @ApiProperty({ example: '2025-05-25' })
  @IsDateString()
  fecha: Date;

  @ApiProperty({ example: 'Av. Siempre Viva 123' })
  @IsString()
  direccion: string;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  cliente: string;

  @ApiProperty({ example: 1, description: 'ID del paciente relacionado' })
  @IsInt()
  @IsNotEmpty()
  paciente_id: number;

  @ApiProperty({ type: [CreateLineaDescargoDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLineaDescargoDto)
  lineas: CreateLineaDescargoDto[];
}
