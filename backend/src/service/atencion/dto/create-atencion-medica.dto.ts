import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateAtencionMedicaDto {
  @ApiProperty({ example: 'Consulta médica general' })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: '2024-05-20' })
  @IsDateString()
  registro: Date;

  @ApiProperty({ example: 30.0 })
  @IsNumber()
  precio: number;

  @ApiProperty({ example: 'Dr. Juan Pérez' })
  @IsString()
  medico_acargo: string;
}
