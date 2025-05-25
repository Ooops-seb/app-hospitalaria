import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { EstadosEnum } from 'common/enums/Estado.enum';

export class ChangeStatusDto {
  @ApiProperty({ enum: EstadosEnum })
  @IsEnum(EstadosEnum)
  estado: EstadosEnum;
}
