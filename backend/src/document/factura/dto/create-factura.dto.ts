import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateFacturaDto {
  @ApiProperty({ example: '001001000012345' })
  @IsString()
  clave_acceso: string;

  @ApiProperty({
    example: 1,
    description: 'ID del documento transaccional relacionado',
  })
  @IsInt()
  @IsNotEmpty()
  documento_id: number;
}
