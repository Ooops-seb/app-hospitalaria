import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateImagenRayosXDto {
  @ApiProperty({ example: 'Radiografía de tórax' })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: '2024-05-20' })
  @IsDateString()
  registro: Date;

  @ApiProperty({ example: 50.0 })
  @IsNumber()
  precio: number;

  @ApiProperty({ example: 'Tórax' })
  @IsString()
  zona_cuerpo: string;
}
