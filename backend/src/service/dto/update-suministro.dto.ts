import { PartialType } from '@nestjs/swagger';
import { CreateSuministroMedicamentoDto } from './create-suministro.dto';

export class UpdateSuministroMedicamentoDto extends PartialType(
  CreateSuministroMedicamentoDto,
) {}
