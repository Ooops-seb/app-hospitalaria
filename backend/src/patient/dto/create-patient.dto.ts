import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumberString, IsString } from 'class-validator';

export class CreatePacienteDto {
  @ApiProperty({ example: 'Juan' })
  @IsString()
  nombres: string;

  @ApiProperty({ example: 'Pérez' })
  @IsString()
  apellidos: string;

  @ApiProperty({ example: '1234567890' })
  @IsNumberString()
  cedula: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsDateString()
  fecha_nacimiento: Date;

  @ApiProperty({ example: '0998765432' })
  @IsNumberString()
  telefono: string;
}
