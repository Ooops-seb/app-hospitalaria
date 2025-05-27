import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateComidaDto {
  @ApiProperty({ example: 'Ensalada mixta' })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: 3.99 })
  @IsNumber()
  precio: number;

  @ApiProperty({ example: 'Alto en fibra' })
  @IsString()
  valor_nutritivo: string;

  @ApiProperty({ example: 'Vegetariana' })
  @IsString()
  tipo: string;
}
