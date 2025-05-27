import { ApiProperty } from '@nestjs/swagger';
import { EstadosEnum } from 'common/enums/Estado.enum';
import { IsEnum } from 'class-validator';

export class ChangeStatusLineaDto {
  @ApiProperty({ enum: EstadosEnum })
  @IsEnum(EstadosEnum)
  estado: EstadosEnum;
}
